# -------------------------------
# API Gateway REST API
# -------------------------------
resource "aws_api_gateway_rest_api" "clinica_api" {
  name        = "clinica-voice-api"
  description = "API Gateway for ClinicaVoice Lambda integration"
}

# -------------------------------
# API Resource (path)
# -------------------------------
resource "aws_api_gateway_resource" "process_resource" {
  rest_api_id = aws_api_gateway_rest_api.clinica_api.id
  parent_id   = aws_api_gateway_rest_api.clinica_api.root_resource_id
  path_part   = "process"
}

# -------------------------------
# API Method (POST)
# -------------------------------
resource "aws_api_gateway_method" "post_method" {
  rest_api_id   = aws_api_gateway_rest_api.clinica_api.id
  resource_id   = aws_api_gateway_resource.process_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# -------------------------------
# Lambda Integration
# -------------------------------
resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.clinica_api.id
  resource_id = aws_api_gateway_resource.process_resource.id
  http_method = aws_api_gateway_method.post_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.clinica_lambda.invoke_arn
}

# -------------------------------
# API Deployment
# -------------------------------
resource "aws_api_gateway_deployment" "clinica_api_deploy" {
  rest_api_id = aws_api_gateway_rest_api.clinica_api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_integration.lambda_integration))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# -------------------------------
# API Stage
# -------------------------------
resource "aws_api_gateway_stage" "clinica_stage" {
  rest_api_id   = aws_api_gateway_rest_api.clinica_api.id
  deployment_id = aws_api_gateway_deployment.clinica_api_deploy.id
  stage_name    = "prod"
}

# -------------------------------
# Permission for API Gateway to invoke Lambda
# -------------------------------
resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.clinica_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.clinica_api.execution_arn}/*/*"
}

# -------------------------------
# Output
# -------------------------------
output "clinica_api_url" {
  value = "https://${aws_api_gateway_rest_api.clinica_api.id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_stage.clinica_stage.stage_name}"
}

