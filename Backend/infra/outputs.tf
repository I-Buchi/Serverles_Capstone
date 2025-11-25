# -------------------------------
# Outputs for Frontend Integration
# -------------------------------

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID for frontend authentication"
  value       = module.cognito_user_pool.id
}

output "cognito_user_pool_client_id" {
  description = "Cognito User Pool Client ID for frontend authentication"
  value       = module.cognito_user_pool.client_ids[0]
}

output "api_gateway_url" {
  description = "API Gateway endpoint URL"
  value       = module.api_gateway.api_endpoint
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

output "s3_bucket_name" {
  description = "S3 bucket for file uploads"
  value       = module.s3_bucket.s3_bucket_id
}

# Generate .env file for frontend
resource "local_file" "frontend_env" {
  content = <<-EOT
VITE_COGNITO_USER_POOL_ID=${module.cognito_user_pool.id}
VITE_COGNITO_CLIENT_ID=${module.cognito_user_pool.client_ids[0]}
VITE_API_ENDPOINT=${module.api_gateway.api_endpoint}
VITE_AWS_REGION=${var.aws_region}
VITE_S3_BUCKET=${module.s3_bucket.s3_bucket_id}
EOT
  filename = "../../ClinicaVoice-Frontend/.env"
}