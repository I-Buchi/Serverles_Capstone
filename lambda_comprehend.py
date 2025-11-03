import json
import boto3
import os
from datetime import datetime

comprehend = boto3.client('comprehendmedical')
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMO_TABLE = 'clinica-metadata-table'

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

        # Read transcript content
        transcript_obj = s3.get_object(Bucket=bucket_name, Key=file_name)
        transcript_text = transcript_obj['Body'].read().decode('utf-8')

        # Run Comprehend Medical
        result = comprehend.detect_entities_v2(Text=transcript_text)

        # Save structured data to comprehend folder
        base_name = file_name.split('/')[-1].replace('.json', '')
        output_key = f"comprehend/{base_name}-entities.json"
        s3.put_object(
            Bucket=bucket_name,
            Key=output_key,
            Body=json.dumps(result)
        )

        # Log result to DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'record_id': base_name,
                'file_name': file_name,
                'timestamp': datetime.utcnow().isoformat(),
                'status': 'COMPLETED',
                'entities_output': output_key
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps(f"Comprehend Medical analysis completed for {file_name}")
        }

    except Exception as e:
        print(f"Error: {e}")
        raise e

