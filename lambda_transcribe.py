import json
import boto3
import os
from datetime import datetime

s3 = boto3.client('s3')
transcribe = boto3.client('transcribe')
dynamodb = boto3.resource('dynamodb')

# Environment variable to hold the DynamoDB table name
DYNAMO_TABLE = 'clinica-metadata-table'

def lambda_handler(event, context):
    try:
        # Extract bucket and object name from the event
        record = event['Records'][0]
        bucket_name = record['s3']['bucket']['name']
        file_name = record['s3']['object']['key']

        # Generate a unique Transcribe job name
        job_name = file_name.split('/')[-1].replace('.', '-') + '-' + datetime.now().strftime("%Y%m%d%H%M%S")

        file_uri = f"s3://{bucket_name}/{file_name}"

        # Start Transcribe job
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': file_uri},
            MediaFormat='wav',
            LanguageCode='en-US',
            OutputBucketName=bucket_name
        )

        # Log the job into DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'file_id': file_name,
                'timestamp': datetime.utcnow().isoformat(),
                'status': 'IN_PROGRESS',
                'job_name': job_name,
                'file_uri': file_uri
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps(f"Transcription job started for {file_name}")
        }

    except Exception as e:
        print(f"Error: {e}")
        raise e

