#!/bin/bash
# ==========================================
# 🚀 ClinicaVoice Terraform Deployment Script
# ==========================================

echo "-----------------------------------"
echo "🚀 Starting ClinicaVoice deployment"
echo "-----------------------------------"

# Navigate to your Terraform project folder
#cd ~/cvts-serverless || exit

# Initialize Terraform (only required first time)
terraform init -upgrade

# Apply all configurations automatically (no manual approval)
terraform apply -auto-approve

echo "-----------------------------------"
echo "✅ Deployment complete! ClinicaVoice stack is now running."
echo "-----------------------------------"

