
# ==================================================
# DynamoDB Table for ClinicaVoice Metadata
# ==================================================
resource "aws_dynamodb_table" "clinica_metadata_table" {
  name         = "clinica-metadata-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "record_id"

  attribute {
    name = "record_id"
    type = "S"
  }

  # --- Encryption using the CMK (Custom Managed Key) ---
  server_side_encryption {
    enabled     = true
    kms_key_arn = aws_kms_key.clinica_key.arn
  }

  # Optional: Add tags for organization and cost tracking
  tags = {
    Name        = "ClinicaVoiceMetadata"
    Environment = "prod"
    Project     = "ClinicaVoice"
  }
}

