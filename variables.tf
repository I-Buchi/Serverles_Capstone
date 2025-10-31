# -------------------------------
# Variables for AWS Region and Environment
# -------------------------------

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "stage_name" {
  description = "Deployment stage name for API Gateway"
  type        = string
  default     = "prod"
}

