import json
import boto3
import os
from datetime import datetime

comprehend = boto3.client('comprehendmedical')
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMO_TABLE = os.environ['DYNAMO_TABLE']
BUCKET_NAME = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        # Handle S3 event or direct invocation
        if 'Records' in event:
            # S3 event
            record = event['Records'][0]
            bucket_name = record['s3']['bucket']['name']
            file_name = record['s3']['object']['key']
        else:
            # Direct invocation - expect bucket and key in event
            bucket_name = event.get('bucket')
            file_name = event.get('key')
            if not bucket_name or not file_name:
                raise ValueError("Missing 'bucket' or 'key' in event for direct invocation")

        # Extract file_id from transcript file name (format: transcripts/{file_id}.json)
        file_id = file_name.split('/')[-1].replace('.json', '')
        
        # Read transcript content from S3
        transcript_obj = s3.get_object(Bucket=bucket_name, Key=file_name)
        transcript_data = json.loads(transcript_obj['Body'].read().decode('utf-8'))
        
        # Extract transcript text from AWS Transcribe output
        transcript_text = ''
        if 'results' in transcript_data and 'transcripts' in transcript_data['results']:
            transcript_text = transcript_data['results']['transcripts'][0]['transcript']
        
        if not transcript_text:
            raise ValueError('No transcript text found in file')

        # Run Comprehend Medical
        result = comprehend.detect_entities_v2(Text=transcript_text)

        # Save structured data to comprehend folder
        output_key = f"comprehend/{file_id}-entities.json"
        s3.put_object(
            Bucket=bucket_name,
            Key=output_key,
            Body=json.dumps(result)
        )

        # Update DynamoDB record status to COMPLETED
        table = dynamodb.Table(DYNAMO_TABLE)
        table.update_item(
            Key={'record_id': file_id},
            UpdateExpression='SET #status = :status, entities_output = :entities_output, updated_at = :updated_at',
            ExpressionAttributeNames={'#status': 'status'},
            ExpressionAttributeValues={
                ':status': 'COMPLETED',
                ':entities_output': output_key,
                ':updated_at': datetime.utcnow().isoformat()
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps(f"Comprehend Medical analysis completed for {file_name}")
        }

    except Exception as e:
        print(f"Error: {e}")
        raise e

