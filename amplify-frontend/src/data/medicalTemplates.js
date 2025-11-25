// src/data/medicalTemplates.js
export const medicalTemplates = [
  {
    name: "General Consultation",
    fields: [
      { label: "Patient Name", placeholder: "Enter patient full name" },
      { label: "Date of Visit", placeholder: "MM/DD/YYYY" },
      { label: "Symptoms", placeholder: "Describe symptoms" },
      { label: "Diagnosis", placeholder: "Enter diagnosis" },
      { label: "Notes", placeholder: "Additional notes" },
    ],
  },
  {
    name: "Patient History",
    fields: [
      { label: "Patient Name", placeholder: "Enter patient full name" },
      { label: "Medical History", placeholder: "Past medical conditions" },
      { label: "Family History", placeholder: "Relevant family history" },
      { label: "Medications", placeholder: "Current medications" },
    ],
  },
  {
    name: "Follow-up Visit",
    fields: [
      { label: "Patient Name", placeholder: "Enter patient full name" },
      { label: "Date of Visit", placeholder: "MM/DD/YYYY" },
      { label: "Progress Notes", placeholder: "Describe patient progress" },
      { label: "Follow-up Actions", placeholder: "Recommended follow-up" },
    ],
  },
  {
    name: "Prescription Note",
    fields: [
      { label: "Patient Name", placeholder: "Enter patient full name" },
      { label: "Medication", placeholder: "Prescribed medication" },
      { label: "Dosage", placeholder: "Enter dosage instructions" },
      { label: "Duration", placeholder: "Number of days" },
      { label: "Notes", placeholder: "Additional instructions" },
    ],
  },
];
