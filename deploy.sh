#!/bin/bash
# ==========================================
# 🚀 ClinicaVoice Terraform Deployment Script
# ==========================================

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Cleanup function
cleanup() {
    log_info "Cleaning up temporary files..."
    rm -f *.zip
}

# Set trap for cleanup
trap cleanup EXIT

log_info "Starting ClinicaVoice deployment"

# Set directories (running from root)
INFRA_DIR="Backend/infra"

# Navigate to infrastructure directory
cd "$INFRA_DIR"

# Initialize Terraform
log_info "Initializing Terraform..."
terraform init -upgrade

# Validate Terraform configuration
log_info "Validating Terraform configuration..."
terraform validate

# Plan deployment
log_info "Planning deployment..."
terraform plan -out=tfplan

# Apply deployment
log_info "Applying deployment..."
terraform apply tfplan

# Clean up plan file
rm -f tfplan

# Output important information
log_info "Deployment complete!"
log_info "Getting deployment outputs..."
terraform output

log_info "ClinicaVoice stack is now running"