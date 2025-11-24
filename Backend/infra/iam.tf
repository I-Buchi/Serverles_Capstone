
# IAM role for Lambda functions with necessary permissions
data "aws_iam_policy_document" "lambda_assume" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "cvtes_lambda_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
  tags               = local.common_tags
}

# Lambda comprehensive policy document
data "aws_iam_policy_document" "lambda_policy" {
  # CloudWatch Logs
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }

  # S3 Access for input/output files
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:ListBucket"
    ]
    resources = [
      "${module.s3_bucket.s3_bucket_arn}",
      "${module.s3_bucket.s3_bucket_arn}/*"
    ]
  }

  # KMS Encryption and Decryption
  statement {
    effect = "Allow"
    actions = [
      "kms:Decrypt",
      "kms:Encrypt",
      "kms:GenerateDataKey",
      "kms:DescribeKey"
    ]
    resources = [module.kms.key_arn]
  }

  # DynamoDB Access for metadata storage
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]
    resources = [
      "${module.dynamodb_table.dynamodb_table_arn}",
      "${module.dynamodb_table.dynamodb_table_arn}/*"
    ]
  }
  # Transcribe access (batch, streaming, vocabularies) and secrets access
  statement {
    effect = "Allow"
    actions = [
      "transcribe:StartTranscriptionJob",
      "transcribe:GetTranscriptionJob",
      "transcribe:ListTranscriptionJobs",
      "transcribe:DeleteTranscriptionJob",
      "transcribe:StartMedicalTranscriptionJob",
      "transcribe:GetMedicalTranscriptionJob",
      "transcribe:ListMedicalTranscriptionJobs",
      "transcribe:CreateVocabulary",
      "transcribe:GetVocabulary",
      "transcribe:ListVocabularies",
      "transcribe:UpdateVocabulary",
      "transcribe:DeleteVocabulary",
      "transcribe:StartStreamTranscription"
    ]
    resources = ["*"]
  }
    # Comprehend Medical (text analysis, PHI detection, inference, and async jobs)
    statement {
      effect = "Allow"
      actions = [
        "comprehendmedical:DetectEntitiesV2",
        "comprehendmedical:DetectPHI",
        "comprehendmedical:InferICD10CM",
        "comprehendmedical:InferRxNorm",
        "comprehendmedical:StartEntitiesDetectionV2Job",
        "comprehendmedical:DescribeEntitiesDetectionV2Job",
        "comprehendmedical:ListEntitiesDetectionV2Jobs",
        "comprehendmedical:StopEntitiesDetectionV2Job",
        "comprehendmedical:StartPHIDetectionJob",
        "comprehendmedical:DescribePHIDetectionJob",
        "comprehendmedical:ListPHIDetectionJobs",
        "comprehendmedical:StopPHIDetectionJob"
      ]
      resources = ["*"]
    }
}
 
resource "aws_iam_role_policy" "lambda_role_policy" {
  name   = "cvtes_lambda_role_policy"
  role   = aws_iam_role.lambda_role.id
  policy = data.aws_iam_policy_document.lambda_policy.json
}



data "aws_caller_identity" "current" {}
data "aws_iam_policy_document" "bucket_policy" {
  # Allow lambda role to read objects
  statement {
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/cvtes_lambda_role"]
    }
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]
    resources = [
      "${module.s3_bucket.s3_bucket_arn}",
      "${module.s3_bucket.s3_bucket_arn}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = module.s3_bucket.s3_bucket_id
  policy = data.aws_iam_policy_document.bucket_policy.json
}

