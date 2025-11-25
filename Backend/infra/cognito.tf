resource "random_id" "user_id" {
  byte_length = 4
}

module "cognito_user_pool" {
  source = "lgallard/cognito-user-pool/aws"

  user_pool_name = "cvtes-user-pool"
  deletion_protection = "INACTIVE"

  mfa_configuration        = "OPTIONAL"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  
  # Allow self-registration
  admin_create_user_config = {
    allow_admin_create_user_only = false
  }
  
  password_policy = {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
    password_history_size = 24
    temporary_password_validity_days = 7
  }

  domain = "cvtes-${random_id.user_id.hex}"

  clients = [
    {
      name = "cvtes-app-client"
      explicit_auth_flows = [
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_SRP_AUTH"
      ]
      prevent_user_existence_errors = "ENABLED"
      refresh_token_validity        = 30
      access_token_validity         = 24
      id_token_validity             = 24
      
      # Allow signup
      generate_secret = false
      
      # Write attributes during signup
      write_attributes = ["email"]
      read_attributes  = ["email"]
    }
  ]

  lambda_config = {
    post_confirmation = module.lambda_function["post_confirmation"].lambda_function_arn
  }

  tags = local.common_tags
}

# Lambda permission for Cognito trigger
resource "aws_lambda_permission" "cognito_post_confirmation" {
  statement_id  = "AllowExecutionFromCognito"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function["post_confirmation"].lambda_function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = module.cognito_user_pool.arn
}

# User groups
resource "aws_cognito_user_group" "user_groups" {
  for_each = local.user_groups

  user_pool_id = module.cognito_user_pool.id
  name         = each.key
  description  = each.value.description
}