#!/bin/bash

FILE_ID="$1"
API_URL="https://cjbcsf8tu9.execute-api.us-east-1.amazonaws.com"

if [ -z "$FILE_ID" ]; then
  echo "Usage: ./get-results.sh <file_id>"
  echo "Example: ./get-results.sh be0701da-c0e0-438a-b450-cfc60c2836ac"
  exit 1
fi

echo "📋 Getting results for: $FILE_ID"

RESULT=$(curl -s "$API_URL/results/$FILE_ID")

echo "$RESULT" | sed 's/&quot;/"/g' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print('Status:', data.get('status'))
    if 'transcript' in data:
        print('\nTranscript:')
        print(data['transcript'])
    if 'medicalEntities' in data:
        print('\nMedical Entities Found:')
        entities = data['medicalEntities']['Entities']
        for entity in entities:
            print(f'- {entity[\"Text\"]} ({entity[\"Category\"]})')
except Exception as e:
    print('Raw response:', data if 'data' in locals() else 'Failed to parse')
"