#!/bin/bash
# ==========================================
# 🧹 ClinicaVoice Terraform Teardown Script
# ==========================================

echo "-----------------------------------"
echo "🧹 Destroying ClinicaVoice AWS stack..."
echo "-----------------------------------"

# Navigate to your Terraform project folder
cd ~/cvts-serverless || exit

# Destroy all Terraform-managed resources
terraform destroy -auto-approve

echo "-----------------------------------"
echo "✅ All AWS resources destroyed. No running costs now!"
echo "-----------------------------------"

