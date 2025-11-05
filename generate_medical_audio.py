#!/usr/bin/env python3
import boto3
import os

# Sample medical consultation text
medical_text = """
Patient presents with chest pain and shortness of breath. 
Blood pressure is 140 over 90. Heart rate is 85 beats per minute.
Patient reports taking Lisinopril 10 milligrams daily for hypertension.
Recommending chest X-ray and EKG. 
Patient has history of diabetes mellitus type 2.
Prescribing Metformin 500 milligrams twice daily.
Follow up in two weeks.
"""

def generate_audio():
    polly = boto3.client('polly', region_name='us-east-1')
    
    response = polly.synthesize_speech(
        Text=medical_text,
        OutputFormat='mp3',
        VoiceId='Joanna'
    )
    
    # Save as MP3 file
    with open('medical_consultation.mp3', 'wb') as file:
        file.write(response['AudioStream'].read())
    
    print("Generated medical_consultation.mp3")
    
    # Convert to WAV using ffmpeg if available
    try:
        import subprocess
        subprocess.run(['ffmpeg', '-i', 'medical_consultation.mp3', '-ar', '16000', '-ac', '1', 'medical_consultation.wav'], check=True)
        print("Converted to medical_consultation.wav")
    except:
        print("ffmpeg not available, using MP3 format")

if __name__ == "__main__":
    generate_audio()