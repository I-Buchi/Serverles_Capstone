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

        # Start Transcribe job with output to transcripts folder
        media_format = 'mp3' if file_name.endswith('.mp3') else 'wav'
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': file_uri},
            MediaFormat=media_format,
            LanguageCode='en-US',
            OutputBucketName=bucket_name,
            OutputKey=f"transcripts/{job_name}.json"
        )

        # Log the job into DynamoDB
        table = dynamodb.Table(DYNAMO_TABLE)
        table.put_item(
            Item={
                'record_id': job_name,
                'file_name': file_name,
                'timestamp': datetime.utcnow().isoformat(),
                'status': 'IN_PROGRESS',
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

