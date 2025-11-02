# --------------------------------------------------
# S3 Bucket for ClinicaVoice Audio Files
# --------------------------------------------------

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "clinica_voice_bucket" {
  bucket        = "clinica-voice-audio-${random_id.bucket_suffix.hex}"
  force_destroy = true

  tags = {
    Name        = "ClinicaVoiceAudio"
    Environment = "Dev"
    Project     = "ClinicaVoice"
  }

  # --- Enable server-side encryption using our CMK ---
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.clinica_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

# Block all public access for security
resource "aws_s3_bucket_public_access_block" "clinica_voice_block" {
  bucket = aws_s3_bucket.clinica_voice_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Add an IAM policy to allow Lambda to access the S3 bucket
resource "aws_iam_policy" "lambda_s3_policy" {
  name        = "lambda-s3-access-policy"
  description = "Allow Lambda function to read/write from the ClinicaVoice S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ]
        Resource = [
          aws_s3_bucket.clinica_voice_bucket.arn,
          "${aws_s3_bucket.clinica_voice_bucket.arn}/*"
        ]
      }
    ]
  })
}

# Attach the new policy to the Lambda execution role
resource "aws_iam_role_policy_attachment" "attach_lambda_s3_policy" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_s3_policy.arn
}

# Output the S3 bucket name
output "clinica_voice_s3_bucket_name" {
  description = "S3 bucket for storing ClinicaVoice audio files"
  value       = aws_s3_bucket.clinica_voice_bucket.bucket
}

resource "aws_s3_bucket_notification" "audio_upload_trigger" {
  bucket = aws_s3_bucket.clinica_voice_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.transcribe_lambda_function.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = ""
    filter_suffix       = ".wav" # or ".mp3" if your audio format is mp3
  }

  depends_on = [aws_lambda_permission.allow_s3_trigger]
}

resource "aws_lambda_permission" "allow_s3_trigger" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.transcribe_lambda_function.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.clinica_voice_bucket.arn
}

# ======================================================
# Enable Server-Side Encryption using our KMS key
# ======================================================
resource "aws_s3_bucket_server_side_encryption_configuration" "s3_encryption" {
  bucket = aws_s3_bucket.clinica_voice_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.clinica_key.arn
    }
  }
}


