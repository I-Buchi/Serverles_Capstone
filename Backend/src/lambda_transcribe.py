import json
import boto3
import os
from datetime import datetime

s3 = boto3.client('s3')
transcribe = boto3.client('transcribe')
dynamodb = boto3.resource('dynamodb')

DYNAMO_TABLE = os.environ['DYNAMO_TABLE']
BUCKET_NAME = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        # Extract bucket and object name from the event
        record = event['Records'][0]
        bucket_name = record['s3']['bucket']['name']
        file_name = record['s3']['object']['key']

        # Extract file_id from the file name (format: audio/{file_id}_{filename})
        file_id = file_name.split('/')[-1].split('_')[0] if '/' in file_name else file_name.split('_')[0]
        
        # Generate a unique Transcribe job name using file_id
        job_name = f"{file_id}-{datetime.now().strftime('%Y%m%d%H%M%S')}"

        file_uri = f"s3://{bucket_name}/{file_name}"

        # Start Transcribe job with output to transcripts folder
        media_format = 'mp3' if file_name.lower().endswith('.mp3') else 'wav'
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': file_uri},
            MediaFormat=media_format,
            LanguageCode='en-US',
            OutputBucketName=bucket_name,
            OutputKey=f"transcripts/{file_id}.json"
        )

        # Update the record in DynamoDB with transcription job info
        table = dynamodb.Table(DYNAMO_TABLE)
        table.update_item(
            Key={'record_id': file_id},
            UpdateExpression='SET #status = :status, transcription_job_name = :job_name, updated_at = :updated_at',
            ExpressionAttributeNames={'#status': 'status'},
            ExpressionAttributeValues={
                ':status': 'TRANSCRIBING',
                ':job_name': job_name,
                ':updated_at': datetime.utcnow().isoformat()
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps(f"Transcription job {job_name} started for {file_name}")
        }

    except Exception as e:
        print(f"Error: {e}")
        raise e

