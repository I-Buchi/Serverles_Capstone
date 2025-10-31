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
        # Get S3 file info
        record = event['Records'][0]
        bucket_name = record['s3']['bucket']['name']
        file_name = record['s3']['object']['key']

        # Read transcript content
        transcript_obj = s3.get_object(Bucket=bucket_name, Key=file_name)
        transcript_text = transcript_obj['Body'].read().decode('utf-8')

        # Run Comprehend Medical
        result = comprehend.detect_entities_v2(Text=transcript_text)

        # Save structured data back to S3
        output_key = file_name.replace('.json', '-entities.json')
        s3.put_object(
            Bucket=bucket_name,
            Key=output_key,
            Body=json.dumps(result)
        )

        # Log result to DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'file_id': file_name,
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

