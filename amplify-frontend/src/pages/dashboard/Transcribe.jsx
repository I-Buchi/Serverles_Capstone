import React, { useState, useRef, useEffect} from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  TextField,
  Stack,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

import { post, get } from "aws-amplify/api";
import { useParams } from "react-router-dom";

export default function Transcribe() {
  const { t } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { id } = useParams();

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioFile(new File([blob], `recording_${Date.now()}.webm`, { type: "audio/webm" }));
      };

      mediaRecorder.start();
      setRecording(true);
      setStatusMessage(t("recording_started"));
    } catch (error) {
      console.error(error);
      setStatusMessage(t("microphone_denied"));
    }
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setStatusMessage(t("recording_stopped"));
    }
  };

  // 📤 Upload & Transcribe
  const handleTranscription = async () => {
    if (!audioFile) {
      setStatusMessage(t("no_audio_uploaded"));
      return;
    }

    setLoading(true);
    setStatusMessage(t("uploading_audio"));

    try {
      // Step 1: Get presigned URL from backend
      const uploadResponse = await post({
        apiName: "ClinicaVoiceAPI",
        path: "/upload",
        options: {
          body: {
            filename: audioFile.name,
            content_type: audioFile.type || 'audio/mpeg'
          }
        }
      }).response;
      
      const uploadData = await uploadResponse.body.json();
      
      if (!uploadData.upload_url) {
        throw new Error('Failed to get upload URL');
      }

      // Step 2: Upload file using presigned URL
      const uploadResult = await fetch(uploadData.upload_url, {
        method: 'PUT',
        body: audioFile,
        headers: {
          'Content-Type': audioFile.type || 'audio/mpeg'
        }
      });

      if (!uploadResult.ok) {
        throw new Error('Upload failed');
      }

      setStatusMessage(t("transcription_started"));
      
      // Step 3: Poll for results using file_id
      pollForResults(uploadData.file_id);
      
    } catch (error) {
      console.error("Upload failed:", error);
      setStatusMessage(t("upload_failed"));
      setLoading(false);
    }
  };

  // Poll for transcription results
  const pollForResults = async (fileId) => {
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes max
    
    const poll = async () => {
      try {
        attempts++;
        setStatusMessage(`Checking results... (${attempts}/${maxAttempts})`);
        
        // Check if transcript file exists in S3
        const transcriptKey = `transcripts/${jobId}.json`;
        
        // Get results via API using file_id
        const response = await get({
          apiName: "ClinicaVoiceAPI",
          path: `/results/${fileId}`
        }).response;
        
        const data = await response.body.json();
        
        if (data.transcript) {
          setTranscript(data.transcript);
          setStatusMessage(t("transcription_completed"));
          setLoading(false);
        } else if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Check every 10 seconds
        } else {
          setStatusMessage(t("transcription_timeout"));
          setLoading(false);
        }
      } catch (error) {
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        } else {
          setStatusMessage(t("transcription_failed"));
          setLoading(false);
        }
      }
    };
    
    // Start polling after 5 seconds
    setTimeout(poll, 5000);
  };

  // 💾 Save transcript locally or to cloud
  const saveTranscript = async () => {
    try {
      // Create downloadable file
      const blob = new Blob([transcript], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcript_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setStatusMessage(t("transcript_downloaded"));
    } catch (error) {
      console.error("Save failed:", error);
      setStatusMessage(t("save_failed"));
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Load transcription for report:", id);
      // Fetch or highlight the transcription here
    }
  }, [id]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
        {t("dashboard_transcribe")}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        {t("transcribe_description")}
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              🎙️ {statusMessage}
            </Typography>

            {/* Recording Buttons */}
            <Stack direction="row" spacing={2}>
              {!recording ? (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<MicIcon />}
                  onClick={startRecording}
                >
                  {t("start_recording")}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<StopIcon />}
                  onClick={stopRecording}
                >
                  {t("stop_recording")}
                </Button>
              )}
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                {t("upload_audio")}
                <input
                  hidden
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                />
              </Button>
            </Stack>

            {/* Upload & Transcribe */}
            <Button
              variant="contained"
              color="primary"
              disabled={!audioFile || loading}
              onClick={handleTranscription}
            >
              {loading ? t("transcribing") : t("upload_and_transcribe")}
            </Button>

            {loading && <LinearProgress sx={{ width: "100%" }} />}
          </Stack>
        </CardContent>
      </Card>

      {/* Transcript Section */}
      {transcript && (
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" mb={2}>
              {t("transcript")}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={8}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={saveTranscript}
              sx={{ mt: 2 }}
            >
              {t("save_transcript")}
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
