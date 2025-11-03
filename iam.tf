# -------------------------------
# AWS Lambda Role
# -------------------------------
resource "aws_iam_role" "lambda_exec_role" {
  name = "clinica_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Effect = "Allow"
    }]
  })
}

data "aws_caller_identity" "current" {}

# -------------------------------
# Lambda Role Policy Attachments
# -------------------------------
locals {
  lambda_policies = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
    "arn:aws:iam::aws:policy/ComprehendFullAccess",
    "arn:aws:iam::aws:policy/ComprehendMedicalFullAccess",
    "arn:aws:iam::aws:policy/AmazonTranscribeFullAccess"
  ]
}

resource "aws_iam_policy" "lambda_kms_policy" {
  name = "lambda-kms-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "kms:Decrypt",
        "kms:GenerateDataKey"
      ]
      Resource = aws_kms_key.clinica_key.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policies" {
  count      = length(local.lambda_policies)
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = local.lambda_policies[count.index]
}

resource "aws_iam_role_policy_attachment" "lambda_kms_policy" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_kms_policy.arn
}
