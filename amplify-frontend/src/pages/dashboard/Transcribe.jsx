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
import { uploadData } from "aws-amplify/storage";
import { post } from "aws-amplify/api";
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
    setStatusMessage(t("transcribing"));

    try {
      // Step 1️⃣ Upload file to S3
      const uploadResult = await uploadData({
        key: `audio/${Date.now()}_${audioFile.name}`,
        data: audioFile,
        options: { contentType: audioFile.type },
      }).result;

      // Step 2️⃣ Trigger transcription through API Gateway
      const response = await post({
        apiName: "ClinicaVoiceAPI",
        path: "/transcribe",
        options: { body: { fileKey: uploadResult.key } },
      }).response;

      const data = await response.body.json();
      setTranscript(data.transcript || "Transcription completed successfully.");
      setStatusMessage(t("transcript_saved"));
    } catch (error) {
      console.error("Transcription failed:", error);
      setStatusMessage(t("save_failed"));
    } finally {
      setLoading(false);
    }
  };

  // 💾 Save transcript to cloud (optional extension)
  const saveTranscript = async () => {
    try {
      setLoading(true);
      const response = await post({
        apiName: "ClinicaVoiceAPI",
        path: "/save-transcript",
        options: { body: { transcript } },
      }).response;
      const data = await response.body.json();
      setStatusMessage(data.message || t("transcript_saved"));
    } catch (error) {
      console.error("Save failed:", error);
      setStatusMessage(t("save_failed"));
    } finally {
      setLoading(false);
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
