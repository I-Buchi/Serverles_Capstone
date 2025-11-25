#!/bin/bash
# ==========================================
# 🧹 ClinicaVoice Terraform Teardown Script
# ==========================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

log_info "Starting ClinicaVoice infrastructure destruction"

# Set directories
INFRA_DIR="Backend/infra"

# Navigate to infrastructure directory
cd "$INFRA_DIR"

# Get S3 bucket name from Terraform state
log_info "Getting S3 bucket name..."
BUCKET_NAME=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")

if [[ -n "$BUCKET_NAME" ]]; then
    log_info "Emptying S3 bucket: $BUCKET_NAME"
    
    # Remove all objects including versions
    aws s3api list-object-versions --bucket "$BUCKET_NAME" --query 'Versions[].{Key:Key,VersionId:VersionId}' --output text | while read key version; do
        if [[ -n "$key" && -n "$version" ]]; then
            aws s3api delete-object --bucket "$BUCKET_NAME" --key "$key" --version-id "$version"
        fi
    done
    
    # Remove delete markers
    aws s3api list-object-versions --bucket "$BUCKET_NAME" --query 'DeleteMarkers[].{Key:Key,VersionId:VersionId}' --output text | while read key version; do
        if [[ -n "$key" && -n "$version" ]]; then
            aws s3api delete-object --bucket "$BUCKET_NAME" --key "$key" --version-id "$version"
        fi
    done
    
    log_info "S3 bucket emptied successfully"
else
    log_warn "Could not retrieve S3 bucket name, skipping bucket cleanup"
fi

# Destroy Terraform infrastructure
log_info "Destroying Terraform infrastructure..."
terraform destroy -auto-approve

# Clean up local files
log_info "Cleaning up local files..."
rm -f *.zip
rm -f tfplan

log_info "ClinicaVoice infrastructure destroyed successfully!"
log_info "All AWS resources removed - no running costs!"