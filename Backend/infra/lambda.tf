 #Lambda Functions
module "lambda_function" {
  source   = "terraform-aws-modules/lambda/aws"
  for_each = local.lambda_functions

  function_name = "cvtes_${each.key}_function"
  handler       = each.value.handler
  runtime       = "python3.9"
  timeout       = each.value.timeout

  source_path = "${path.module}/../src/${each.key}.py"

  create_role = false
  lambda_role = aws_iam_role.lambda_role.arn

  environment_variables = each.value.environment

  tags = local.common_tags
}

# S3 Lambda Permissions
resource "aws_lambda_permission" "s3_invoke_lambda" {
  for_each = local.lambda_functions
  
  statement_id  = "AllowS3Invoke${title(each.key)}"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function[each.key].lambda_function_name
  principal     = "s3.amazonaws.com"
  source_arn    = module.s3_bucket.s3_bucket_arn
}

# S3 Bucket Notifications
resource "aws_s3_bucket_notification" "lambda_triggers" {
  bucket = module.s3_bucket.s3_bucket_id

  dynamic "lambda_function" {
    for_each = {
      transcribe = {
        events        = ["s3:ObjectCreated:*"]
        filter_suffix = ".mp3"
      }
      transcribe_wav = {
        events        = ["s3:ObjectCreated:*"]
        filter_suffix = ".wav"
      }
      comprehend = {
        events        = ["s3:ObjectCreated:*"]
        filter_prefix = "transcripts/"
        filter_suffix = ".json"
      }
    }
    
    content {
      lambda_function_arn = contains(["transcribe", "transcribe_wav"], lambda_function.key) ? module.lambda_function["lambda_transcribe"].lambda_function_arn : module.lambda_function["lambda_comprehend"].lambda_function_arn
      events              = lambda_function.value.events
      filter_prefix       = lookup(lambda_function.value, "filter_prefix", null)
      filter_suffix       = lambda_function.value.filter_suffix
    }
  }

  depends_on = [aws_lambda_permission.s3_invoke_lambda]
}