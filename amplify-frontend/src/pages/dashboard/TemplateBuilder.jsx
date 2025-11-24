import React, { useState } from "react";
import {
  Box, Container, Typography, Button, TextField,
  Select, MenuItem, Card, CardContent, Grid
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

// Sample data
const sampleTemplates = [
  { id: 1, name: "SOAP Note", content: "Subjective:\nObjective:\nAssessment:\nPlan:\nPatient: {{PatientName}}\nDate: {{Date}}" },
  { id: 2, name: "Progress Note", content: "Patient presents with {{Diagnosis}}. Medications: {{Medications}}" },
];

const samplePatient = {
  PatientName: "John Doe",
  Date: new Date().toLocaleDateString(),
  Diagnosis: "Hypertension",
  Medications: "Lisinopril 10mg daily",
};

export default function TemplateBuilder() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState(sampleTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(sampleTemplates[0].id);
  const [editorContent, setEditorContent] = useState(sampleTemplates[0].content);
  const [templateName, setTemplateName] = useState(sampleTemplates[0].name);

  const handleTemplateChange = (id) => {
    const temp = templates.find(t => t.id === id);
    setSelectedTemplate(id);
    setEditorContent(temp.content);
    setTemplateName(temp.name);
  };

  const handleSave = () => {
    setTemplates(prev =>
      prev.map(t => t.id === selectedTemplate ? { ...t, content: editorContent, name: templateName } : t)
    );
    alert(t("template_save"));
  };

  const handleNew = () => {
    const newTemplate = { id: Date.now(), name: "New Template", content: "" };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate.id);
    setEditorContent("");
    setTemplateName("New Template");
  };

  const handleDelete = () => {
    setTemplates(prev => prev.filter(t => t.id !== selectedTemplate));
    const first = templates[0];
    setSelectedTemplate(first.id);
    setEditorContent(first.content);
    setTemplateName(first.name);
  };

  const insertPlaceholder = (ph) => {
    setEditorContent(editorContent + `{{${ph}}}`);
  };

  const getPreviewContent = () => {
    let content = editorContent;
    Object.keys(samplePatient).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, "g");
      content = content.replace(regex, samplePatient[key]);
    });
    return content.replace(/\n/g, "<br/>");
  };

  return (
    <Box sx={{ py: 4, backgroundColor: "#F9FAFB", minHeight: "90vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>{t("template_title")}</Typography>

        <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Select fullWidth value={selectedTemplate} onChange={(e) => handleTemplateChange(e.target.value)}>
              {templates.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
            </Select>
          </Grid>
          <Grid item xs={12} sm={8} display="flex" gap={1}>
            <Button variant="contained" color="primary" onClick={handleNew}>{t("template_new")}</Button>
            <Button variant="contained" color="success" onClick={handleSave}>{t("template_save")}</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>{t("template_delete")}</Button>
          </Grid>
        </Grid>

        <TextField
          label={t("template_name")}
          fullWidth
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              {["PatientName", "Date", "Diagnosis", "Medications"].map(ph => (
                <Grid item key={ph}>
                  <Button size="small" variant="outlined" onClick={() => insertPlaceholder(ph)}>
                    {t(`ph_${ph.toLowerCase()}`)}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} />
          </CardContent>
        </Card>

        <Box mt={2}>
          <Typography variant="h6">{t("template_preview")}</Typography>
          <Card sx={{ p: 2, mt: 1, minHeight: 150 }}>
            <div dangerouslySetInnerHTML={{ __html: getPreviewContent() }} />
          </Card>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">{t("template_placeholder_tip")}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
