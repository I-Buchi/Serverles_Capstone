# -------------------------------
# AWS Lambda Role
# -------------------------------
resource "aws_iam_role" "lambda_exec_role" {
  name = "clinica_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      }
    ]
  })
}

# This data block helps reference your AWS Account ID dynamically
data "aws_caller_identity" "current" {}

# -------------------------------
# Attach policy for CloudWatch and S3 access
# -------------------------------
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_s3_access" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_policy_attachment" "comprehend_basic_policy" {
  name       = "comprehend-basic-policy"
  roles      = [aws_iam_role.lambda_exec_role.name]
  policy_arn = "arn:aws:iam::aws:policy/ComprehendFullAccess"
}

resource "aws_iam_policy_attachment" "comprehend_s3_policy" {
  name       = "comprehend-s3-policy"
  roles      = [aws_iam_role.lambda_exec_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}
