
# ======================================================
# KMS Key for ClinicaVoice Encryption & Compliance
# ======================================================
resource "aws_kms_key" "clinica_key" {
  description         = "Customer-managed KMS key for ClinicaVoice encryption and compliance"
  enable_key_rotation = true

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      }
    ]
  })

  tags = {
    Name        = "clinica-key"
    Environment = "prod"
    Project     = "ClinicaVoice"
  }
}

# Optional alias for better visibility in AWS Console
resource "aws_kms_alias" "clinica_key_alias" {
  name          = "alias/clinica-key"
  target_key_id = aws_kms_key.clinica_key.id
}


# -------------------------------
# Lambda Function
# -------------------------------
data "archive_file" "transcribe_zip" {
  type        = "zip"
  source_file = "lambda_transcribe.py"
  output_path = "transcribe.zip"
}

resource "aws_lambda_function" "transcribe_lambda_function" {
  filename         = data.archive_file.transcribe_zip.output_path
  function_name    = "clinica-voice-processor"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda_transcribe.lambda_handler"
  source_code_hash = filebase64sha256(data.archive_file.transcribe_zip.output_path)
  runtime          = "python3.9"
  environment {
    variables = {
      DYNAMO_TABLE = aws_dynamodb_table.clinica_metadata_table.name
      BUCKET_NAME  = aws_s3_bucket.clinica_voice_bucket.bucket
    }
  }
}

#resource "aws_lambda_function" "clinica_lambda" {
#function_name = "clinica-voice-processor"
#role          = aws_iam_role.lambda_exec_role.arn
#handler       = "lambda_function.lambda_handler"
#runtime       = "python3.9"
#filename      = "lambda.zip"
#timeout       = 10
#memory_size   = 128

#environment {
#variables = {
#STAGE = "prod"
#}
#}
#}



data "archive_file" "comprehend_zip" {
  type        = "zip"
  source_file = "lambda_comprehend.py"
  output_path = "comprehend.zip"
}

resource "aws_lambda_function" "comprehend_lambda_function" {
  filename         = data.archive_file.comprehend_zip.output_path
  function_name    = "clinica-voice-comprehend"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda_comprehend.lambda_handler"
  source_code_hash = filebase64sha256(data.archive_file.comprehend_zip.output_path)
  runtime          = "python3.9"
  environment {
    variables = {
      DYNAMO_TABLE = aws_dynamodb_table.clinica_metadata_table.name
      BUCKET_NAME  = aws_s3_bucket.clinica_voice_bucket.bucket
    }
  }
}

#resource "aws_lambda_function" "comprehend_lambda" {
#function_name = "clinica-comprehend-medical"
#role          = aws_iam_role.lambda_exec_role.arn
#handler       = "lambda_comprehend.lambda_handler"
#runtime       = "python3.9"
#filename      = "lambda_comprehend.zip"
#timeout       = 60

#environment {
#variables = {
# REGION = "us-east-1"
# }
#}
#}

# ---------------------------------------
# S3 Trigger for Comprehend Lambda
# ---------------------------------------
resource "aws_lambda_permission" "allow_s3_to_invoke_comprehend" {
  statement_id  = "AllowS3InvokeComprehend"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.comprehend_lambda_function.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.clinica_voice_bucket.arn
}

resource "aws_s3_bucket_notification" "trigger_comprehend_lambda" {
  bucket = aws_s3_bucket.clinica_voice_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.comprehend_lambda_function.arn
    events              = ["s3:ObjectCreated:*"]
    filter_suffix       = ".json" # triggers only for JSON output files
  }

  depends_on = [aws_lambda_permission.allow_s3_to_invoke_comprehend]
}

# =============================
# CLOUDWATCH LOG GROUP
# =============================
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/clinica-voice-logs"
  retention_in_days = 7
  tags = {
    Environment = "dev"
    Service     = "ClinicaVoice"
  }
}

# Optional: CloudWatch Alarm for Lambda Errors
resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "LambdaErrorAlarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 60
  statistic           = "Sum"
  threshold           = 1
  alarm_description   = "Triggers if any Lambda function errors occur"
  actions_enabled     = false
}

