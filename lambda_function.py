def lambda_handler(event, context):
    # This function just confirms the Lambda is working
    return {
        "statusCode": 200,
        "body": "Clinica Voice Processor Lambda executed successfully!"
    }

