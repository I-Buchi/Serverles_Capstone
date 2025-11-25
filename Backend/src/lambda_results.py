import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMO_TABLE = os.environ['DYNAMO_TABLE']
BUCKET_NAME = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        # Get file_id from path parameters
        file_id = None
        if event.get('pathParameters') and event['pathParameters'].get('id'):
            file_id = event['pathParameters']['id']
        
        if not file_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,POST'
                },
                'body': json.dumps({'error': 'file_id is required'})
            }
        
        # Try to get record from DynamoDB using file_id
        table = dynamodb.Table(DYNAMO_TABLE)
        response = table.get_item(Key={'record_id': file_id})
        
        result = {'fileId': file_id, 'status': 'processing'}
        
        if 'Item' in response:
            item = response['Item']
            result['status'] = item.get('status', 'processing')
            
            # If completed, try to get transcript and entities
            if item.get('status') == 'COMPLETED':
                transcript_text = None
                entities_data = None
                
                # Try to get transcript from S3
                try:
                    transcript_key = f"transcripts/{file_id}.json"
                    transcript_obj = s3.get_object(Bucket=BUCKET_NAME, Key=transcript_key)
                    transcript_data = json.loads(transcript_obj['Body'].read().decode('utf-8'))
                    
                    if 'results' in transcript_data and 'transcripts' in transcript_data['results']:
                        transcript_text = transcript_data['results']['transcripts'][0]['transcript']
                except Exception as e:
                    print(f"Could not get transcript: {e}")
                
                # Try to get entities from S3
                try:
                    entities_key = f"comprehend/{file_id}-entities.json"
                    entities_obj = s3.get_object(Bucket=BUCKET_NAME, Key=entities_key)
                    entities_data = json.loads(entities_obj['Body'].read().decode('utf-8'))
                except Exception as e:
                    print(f"Could not get entities: {e}")
                
                if transcript_text:
                    result['transcript'] = transcript_text
                if entities_data:
                    result['medicalEntities'] = entities_data
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,POST'
            },
            'body': json.dumps(result)
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,POST'
            },
            'body': json.dumps({'error': str(e)})
        }