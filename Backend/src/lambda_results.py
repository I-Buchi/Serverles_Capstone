import json
import boto3
import os
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMO_TABLE = os.environ['DYNAMO_TABLE']
BUCKET_NAME = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        # Get user info from Cognito
        user_id = event['requestContext']['authorizer']['claims']['sub']
        
        # Get file_id from path parameters
        file_id = event['pathParameters']['id']
        
        if not file_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'file_id is required'})
            }
        
        # Get record from DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        response = table.get_item(Key={'file_id': file_id})
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'File not found'})
            }
        
        item = response['Item']
        
        # Check if user owns this file (optional security check)
        if item.get('user_id') != user_id:
            return {
                'statusCode': 403,
                'body': json.dumps({'error': 'Access denied'})
            }
        
        # Prepare response data
        result = {
            'file_id': file_id,
            'filename': item.get('filename'),
            'status': item.get('status'),
            'created_at': item.get('created_at'),
            'updated_at': item.get('updated_at')
        }
        
        # Add transcription if available
        if 'transcription' in item:
            result['transcription'] = item['transcription']
        
        # Add medical analysis if available
        if 'medical_entities' in item:
            result['medical_analysis'] = {
                'entities': item['medical_entities'],
                'conditions': item.get('medical_conditions', []),
                'medications': item.get('medical_medications', []),
                'procedures': item.get('medical_procedures', [])
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps(result)
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }