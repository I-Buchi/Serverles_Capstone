import json
import boto3
import os
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

DYNAMO_TABLE = os.environ['DYNAMO_TABLE']

def lambda_handler(event, context):
    try:
        # Extract user information from Cognito event
        user_id = event['request']['userAttributes']['sub']
        email = event['request']['userAttributes']['email']
        
        # Determine user type based on email domain or custom attribute
        user_type = 'patient'  # default
        if 'custom:user_type' in event['request']['userAttributes']:
            user_type = event['request']['userAttributes']['custom:user_type']
        elif email.endswith('@clinic.com') or email.endswith('@hospital.com'):
            user_type = 'clinician'
        
        # Store user profile in DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'user_id': user_id,
                'email': email,
                'user_type': user_type,
                'status': 'ACTIVE',
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat()
            }
        )
        
        print(f"User profile created: {user_id} ({user_type})")
        
        # Return the event unchanged (required for Cognito triggers)
        return event
        
    except Exception as e:
        print(f"Error in post_confirmation: {e}")
        # Don't raise exception - this would block user registration
        return event