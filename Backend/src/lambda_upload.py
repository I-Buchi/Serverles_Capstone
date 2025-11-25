import json
import boto3
import os
from datetime import datetime
import uuid

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

BUCKET_NAME = os.environ['BUCKET_NAME']
DYNAMO_TABLE = os.environ['DYNAMO_TABLE']

def lambda_handler(event, context):
    try:
        # Get user info from Cognito (handle both authenticated and unauthenticated requests)
        user_id = 'anonymous'
        if event.get('requestContext', {}).get('authorizer', {}).get('claims'):
            user_id = event['requestContext']['authorizer']['claims']['sub']
        
        # Parse request body
        body = json.loads(event['body'])
        filename = body.get('filename')
        content_type = body.get('content_type', 'audio/wav')
        
        if not filename:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'filename is required'})
            }
        
        # Generate unique file key
        file_id = str(uuid.uuid4())
        file_key = f"audio/{file_id}_{filename}"
        
        # Generate presigned URL for upload
        presigned_url = s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': file_key,
                'ContentType': content_type
            },
            ExpiresIn=3600  # 1 hour
        )
        
        # Store metadata in DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'record_id': file_id,
                'user_id': user_id,
                'filename': filename,
                'file_key': file_key,
                'status': 'PENDING_UPLOAD',
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat()
            }
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({
                'file_id': file_id,
                'upload_url': presigned_url,
                'message': 'Upload URL generated successfully'
            })
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }