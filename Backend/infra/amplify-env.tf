# Output environment variables for Amplify Console
output "amplify_environment_variables" {
  description = "Environment variables for Amplify Console"
  value = {
    VITE_COGNITO_USER_POOL_ID = module.cognito_user_pool.id
    VITE_COGNITO_CLIENT_ID    = module.cognito_user_pool.client_ids[0]
    VITE_API_ENDPOINT         = module.api_gateway.api_endpoint
    VITE_AWS_REGION          = var.aws_region
    VITE_S3_BUCKET           = module.s3_bucket.s3_bucket_id
  }
}

# Create a JSON file with environment variables for easy copying
resource "local_file" "amplify_env_json" {
  content = jsonencode({
    VITE_COGNITO_USER_POOL_ID = module.cognito_user_pool.id
    VITE_COGNITO_CLIENT_ID    = module.cognito_user_pool.client_ids[0]
    VITE_API_ENDPOINT         = module.api_gateway.api_endpoint
    VITE_AWS_REGION          = var.aws_region
    VITE_S3_BUCKET           = module.s3_bucket.s3_bucket_id
  })
  filename = "amplify-env-vars.json"
}