#!/bin/bash

API_URL="https://cjbcsf8tu9.execute-api.us-east-1.amazonaws.com"
AUDIO_FILE="medical_consultation.mp3"

echo "🧪 Testing Complete Backend Workflow..."

# Step 1: Get upload URL
echo "📤 Getting upload URL..."
RESPONSE=$(curl -s -X POST "$API_URL/upload" \
  -H "Content-Type: application/json" \
  -d '{"filename": "'$AUDIO_FILE'", "content_type": "audio/mpeg"}')

echo "Response: $RESPONSE"

# Parse JSON properly
FILE_ID=$(echo "$RESPONSE" | sed 's/&quot;/"/g' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data['file_id'])
except:
    pass
" 2>/dev/null)

UPLOAD_URL=$(echo "$RESPONSE" | sed 's/&quot;/"/g' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data['upload_url'])
except:
    pass
" 2>/dev/null)

if [ -z "$FILE_ID" ]; then
  echo "❌ Failed to get file_id"
  exit 1
fi

echo "✅ File ID: $FILE_ID"
echo "✅ Upload URL obtained"

# Step 2: Upload file (if exists)
if [ -f "$AUDIO_FILE" ]; then
  echo "📁 Uploading $AUDIO_FILE..."
  curl -s -X PUT "$UPLOAD_URL" \
    -H "Content-Type: audio/mpeg" \
    --data-binary @"$AUDIO_FILE"
  echo ""
  echo "✅ File uploaded to S3"
else
  echo "⚠️  Audio file $AUDIO_FILE not found"
  echo "📝 You can test upload manually with:"
  echo "curl -X PUT '$UPLOAD_URL' -H 'Content-Type: audio/mpeg' --data-binary @your_audio_file.mp3"
fi

# Step 3: Check initial status
echo "🔄 Checking status..."
RESULT=$(curl -s "$API_URL/results/$FILE_ID")
echo "Initial Status: $RESULT"

# Step 4: Wait and check for processing
echo "⏳ Waiting for processing (this may take a few minutes)..."
for i in {1..20}; do
  sleep 15
  echo "Checking attempt $i/20..."
  RESULT=$(curl -s "$API_URL/results/$FILE_ID")
  
  STATUS=$(echo "$RESULT" | sed 's/&quot;/"/g' | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('status', 'unknown'))
except:
    print('error')
" 2>/dev/null)
  
  echo "Status: $STATUS"
  
  if [ "$STATUS" = "COMPLETED" ]; then
    echo "🎉 Processing completed!"
    echo "Final Result: $RESULT"
    break
  elif [ "$STATUS" = "TRANSCRIBING" ]; then
    echo "🎙️  Transcription in progress..."
  elif [ "$STATUS" = "PENDING_UPLOAD" ]; then
    echo "📤 Still pending upload..."
  fi
done

echo "🏁 Test completed"