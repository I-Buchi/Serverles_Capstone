#!/bin/bash

echo "🚀 Deploying ClinicaVoice Backend for Amplify Frontend"

# Deploy backend infrastructure
cd Backend/infra
echo "📦 Deploying backend infrastructure..."
terraform init
terraform apply -auto-approve

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully"
    
    echo "📋 Environment variables for Amplify Console:"
    echo "==========================================="
    terraform output amplify_environment_variables
    
    echo ""
    echo "📝 Copy these environment variables to your Amplify Console:"
    echo "1. Go to AWS Amplify Console"
    echo "2. Select your app"
    echo "3. Go to App settings > Environment variables"
    echo "4. Add the variables shown above"
    echo "5. Redeploy your app"
    
    echo ""
    echo "📄 Environment variables also saved to: amplify-env-vars.json"
else
    echo "❌ Backend deployment failed"
    exit 1
fi