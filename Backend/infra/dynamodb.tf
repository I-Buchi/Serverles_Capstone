
# ==================================================
# DynamoDB Table for ClinicaVoice Metadata
# ==================================================

module "dynamodb_table" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name         = "clinica-metadata-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "record_id"

  attributes = [
    {
      name = "record_id"
      type = "S"
    }
  ]

  point_in_time_recovery_enabled = true

  tags = local.common_tags
}
