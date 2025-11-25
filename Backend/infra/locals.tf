locals {
    common_tags = {
    Project = "cvtes"
    
  }

  lambda_functions = {
    lambda_comprehend = {
      handler = "lambda_comprehend.lambda_handler"
      timeout = 30
      environment = {
        DYNAMO_TABLE = module.dynamodb_table.dynamodb_table_id
        BUCKET_NAME  = module.s3_bucket.s3_bucket_id
      }
    }
    lambda_transcribe = {
      handler = "lambda_transcribe.lambda_handler"
      timeout = 30
      environment = {
        DYNAMO_TABLE = module.dynamodb_table.dynamodb_table_id
        BUCKET_NAME  = module.s3_bucket.s3_bucket_id
      }
    }
    lambda_upload = {
      handler = "lambda_upload.lambda_handler"
      timeout = 30
      environment = {
        DYNAMO_TABLE = module.dynamodb_table.dynamodb_table_id
        BUCKET_NAME  = module.s3_bucket.s3_bucket_id
      }
    }
    lambda_results = {
      handler = "lambda_results.lambda_handler"
      timeout = 30
      environment = {
        DYNAMO_TABLE = module.dynamodb_table.dynamodb_table_id
        BUCKET_NAME  = module.s3_bucket.s3_bucket_id
      }
    }
    post_confirmation = {
      handler = "post_confirmation.lambda_handler"
      timeout = 30
      environment = {
        DYNAMO_TABLE = module.dynamodb_table.dynamodb_table_id
      }
    }
  }
  user_groups = {
    patients = {
      description = "Patient users"
    }
    clinicians = {
      description = "Clinician users"
    }
  }

  api_routes = {
    "POST /upload" = {
      lambda_key = "lambda_upload"
    }
    "GET /results/{id}" = {
      lambda_key = "lambda_results"
    }
  }
}
