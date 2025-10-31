resource "aws_iam_role" "transcribe_exec_role" {
  name = "clinica_transcribe_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "transcribe_basic_policy" {
  role       = aws_iam_role.transcribe_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "transcribe_full_access" {
  role       = aws_iam_role.transcribe_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonTranscribeFullAccess"
}

resource "aws_iam_role_policy_attachment" "transcribe_s3_access" {
  role       = aws_iam_role.transcribe_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_lambda_function" "clinica_transcribe_lambda" {
  function_name = "clinica-transcribe-medical"
  runtime       = "python3.9"
  role          = aws_iam_role.transcribe_exec_role.arn
  handler       = "lambda_transcribe.lambda_handler"
  filename      = "lambda_transcribe.zip"
  timeout       = 120
}

