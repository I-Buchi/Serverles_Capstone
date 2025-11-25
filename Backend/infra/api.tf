# -------------------------------
# Modular API Gateway
# -------------------------------
module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"

  name          = "clinica-voice-api-${var.aws_region}"
  protocol_type = "HTTP"

  # JWT Authorizer for Cognito
  authorizers = {
    "cognito-jwt" = {
      authorizer_type  = "JWT"
      identity_sources = ["$request.header.Authorization"]
      name             = "cognito-jwt-authorizer"
      jwt_configuration = {
        audience = [module.cognito_user_pool.client_ids[0]]
        issuer   = "https://cognito-idp.${var.aws_region}.amazonaws.com/${module.cognito_user_pool.id}"
      }
    }
  }

  # Routes configuration
  routes = {
    for route_key, config in local.api_routes : route_key => {
      integration = {
        uri    = module.lambda_function[config.lambda_key].lambda_function_invoke_arn
        type   = "AWS_PROXY"
        method = "POST"
      }
    }
  }

  create_domain_name = false
  
  # CORS configuration
  cors_configuration = {
    allow_credentials = false
    allow_headers     = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods     = ["*"]
    allow_origins     = ["*"]
    expose_headers    = ["date", "keep-alive"]
    max_age          = 86400
  }
  
  tags = local.common_tags
}

# -------------------------------
# Lambda Permissions for API Gateway
# -------------------------------
resource "aws_lambda_permission" "api_gateway_permissions" {
  for_each = local.api_routes

  statement_id  = "AllowAPIGatewayInvoke_${each.value.lambda_key}_${replace(replace(replace(replace(each.key, "/", "_"), " ", "_"), "{", ""), "}", "")}"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function[each.value.lambda_key].lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.api_execution_arn}/*/*"
}

# -------------------------------
# Output
# -------------------------------
