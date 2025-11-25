import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import { I18nextProvider } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      nav_home: "Home",
      nav_about: "About",
      nav_contact: "Contact",
      nav_dashboard: "Dashboard",
      nav_signin: "Sign In",
      nav_getstarted: "Get Started",
      nav_logout: "Log Out",

      // Sidebar
      sidebar_overview: "Overview",
      sidebar_patients: "Patients",
      sidebar_transcriptions: "Transcriptions",
      sidebar_reports: "Reports",
      sidebar_settings: "Settings",

     //DashboardCard
      dashboard_activePatients: "Active Patients",
      dashboard_recentTranscriptions: "Recent Transcriptions",
      dashboard_pendingReviews: "Pending Reviews",

      // Hero Section
      hero_title: "ClinicaVoice",
      hero_tagline: "Dictate. Transcribe. Care.",
      hero_description:
        "AI-powered clinical transcription built for Canadian healthcare professionals. Focus on patient care — let ClinicaVoice handle your notes, summaries, and documentation.",
      hero_cta1: "Get Started",
      hero_cta2: "Learn More",

      // Why Section
      why_title: "Why ClinicaVoice?",
      why_sub:
        "We designed ClinicaVoice to make clinical documentation faster, safer, and more human-centered.",
      why_1_title: "🗣️ Real-Time Voice Capture",
      why_1_text:
        "Dictate patient notes hands-free. Our AI transcribes with medical-grade accuracy and privacy.",
      why_2_title: "🧩 Smart Templates",
      why_2_text:
        "Create and reuse SOAP, HPI, and EMR-ready templates — tailored to your workflow.",
      why_3_title: "🔐 Security & Compliance",
      why_3_text:
        "Built to meet Canadian privacy standards with encrypted storage and role-based access.",

      // How Section
      how_title: "How It Works",
      how_sub:
        "Simple, efficient, and built for clinicians — your voice becomes structured data in seconds.",
      how_1_title: "1️⃣ Record",
      how_1_text:
        "Use your browser or mobile device to securely capture patient dictations.",
      how_2_title: "2️⃣ Transcribe",
      how_2_text:
        "Our AI engine converts your recordings into accurate, structured notes.",
      how_3_title: "3️⃣ Export",
      how_3_text:
        "Instantly export notes to EMR systems, PDFs, or share securely with your team.",

      // Trusted Section
      trusted_title: "Trusted by Clinics Across Canada 🇨🇦",

      // About Page
        about_title: "About ClinicaVoice",
        about_description:
        "ClinicaVoice is built by clinicians and engineers to streamline clinical documentation. Our mission is to reduce administrative burden and improve patient care.",
        about_team: "Our Team",
        about_faculty: "Faculty Advisor",
        role_pm: "Project Manager / Liaison",
        role_frontend: "Frontend Developer",
        role_ai: "AI Specialist",
        role_backend: "Backend Developer",
        role_devops: "DevOps Engineer",
        role_qa: "QA & Documentation",
        role_faculty: "Faculty Advisor",

        features_title: "Product Features",
        features_description: "Explore ClinicaVoice modules and capabilities.",
        features_voice: "Voice Capture",
        features_voice_text: "High-accuracy models, speaker diarization, offline mode.",
        features_template: "Template Builder",
        features_template_text: "Customize templates, quick insert fields, and export options.",
        features_analytics: "Analytics",
        features_analytics_text: "Usage dashboards, transcription accuracy metrics, and exportable reports.",

        // Contact Page
        contact_title: "Contact & Support",
        contact_name: "Name",
        contact_email: "Email",
        contact_message: "Message",
        contact_send: "Send Message",
        contact_success: "Thanks — your message has been received!",
         
        // Dashboard Page
        dashboard_title: "Dashboard Overview",
        dashboard_patients: "Active Patients",
        dashboard_transcriptions: "Recent Transcriptions",
        dashboard_reviews: "Pending Reviews",
        dashboard_activity: "Activity (Last 30 Days)",
        dashboard_actions: "Quick Actions",
        dashboard_notes: "Recent Notes",
        dashboard_new: "New Transcription",
        dashboard_upload: "Upload Audio",
        dashboard_export: "Export Report",
        dashboard_note1: "John Doe — 2025-09-30 — Transcribed (reviewed)",
        dashboard_note2: "Jane Roe — 2025-09-29 — Transcribed",
        dashboard_note3: "Samuel K — 2025-09-28 — Pending review",

        //login page
        signin_title: "Welcome Back",
        signin_email: "Email Address",
        signin_password: "Password",
        signin_button: "Sign In",
        signin_error: "Invalid credentials. Please try again.",
        signin_noaccount: "Don't have an account?",
        signin_signup: "Create one",

        register_title: "Create an Account",
        register_name: "Full Name",
        register_email: "Email Address",
        register_password: "Password",
        register_button: "Sign Up",
        register_success: "Account created successfully! Redirecting...",
        register_haveaccount: "Already have an account?",
        register_signin: "Sign In",
       
        signin_title: "Welcome Back",
  signin_email: "Email Address",
  signin_password: "Password",
  signin_button: "Sign In",
  signin_error: "Invalid credentials. Please try again.",
  signin_noaccount: "Don't have an account?",
  signin_signup: "Create one",

  register_title: "Create an Account",
  register_name: "Full Name",
  register_email: "Email Address",
  register_password: "Password",
  register_button: "Sign Up",
  register_success: "Account created successfully! Redirecting...",
  register_haveaccount: "Already have an account?",
  register_signin: "Sign In",

  signup_title: "Sign Up",
  signup_name: "Name ",
  signup_email: "Email ",
  signup_password: "Password",
  signup_button: "Register",
  signup_success: "Registration successful!",
  signup_error: "Registration failed. Please try again.",
  register_error: "Could not register user.",

  sidebar_overview: "Overview",
  sidebar_patients: "Patients",
  sidebar_transcribe: "Transcribe",
  sidebar_reports: "Reports",
  sidebar_settings: "Settings",

  dashboard_transcribe: "Transcribe",
  transcribe_description: "Record or upload your clinical notes and get automatic transcription powered by AWS.",
  start_recording: "Start Recording",
  stop_recording: "Stop Recording",
  upload_audio: "Upload File",
  upload_and_transcribe: "Upload & Transcribe",
  upload_success: "Audio uploaded successfully.",
  transcribing: "Transcribing...",
  transcription_done: "Transcription completed successfully.",
  transcription_failed: "Transcription failed. Please try again.",
  transcription_error: "An error occurred during transcription",
  transcript: "Transcript",
  save_transcript: "Save Transcript",
  transcript_saved: "Transcript saved to cloud.",
  save_failed: "Save failed",
  microphone_denied: "Microphone access denied",
  recording_started: "Recording...",
  recording_stopped: "Recording stopped.",
  no_audio_uploaded: "Please record or upload an audio file first.",

  dashboard_settings: "Settings",
  account_settings: "Account Settings",
  display_name: "Display Name",
  email_address: "Email Address",
  save_changes: "Save Changes",
  preferences: "Preferences",
  enable_notifications: "Enable Notifications",
  dark_mode: "Enable Dark Mode",

  contact_title: "Get in Touch",
  contact_subtitle:
    "We’re here to help you with ClinicaVoice. Reach out to us for inquiries, support, or partnerships.",
  contact_getintouch: "Our Location",
  contact_formtitle: "Send Us a Message",
  contact_name: "Full Name",
  contact_email_label: "Email Address",
  contact_message: "Message",
  contact_send: "Send Message",
  contact_success: "Your message has been sent successfully!",
  
  footer_product: "Product",
  footer_product_items: "Transcription • Templates • Integrations",
  footer_company: "Company",
  footer_company_items: "About • Careers • Contact",
  footer_support: "Support",
  footer_support_items: "Help Center • Privacy • Terms",
  footer_disclaimer:
    "Built with care at Fanshawe College – London South Campus • Prioritizing accessibility, privacy, and innovation for Canadian healthcare." ,  

  sidebar_templates: "Template Builder",
  load_template: "Load Template",
  choose_template: "Choose a template",
  save_template: "Save Template",
  template_saved: "Template saved successfully!",
  features_voice: "Voice Transcription",
  features_voice_text: "Record or upload clinical notes to get automatic transcription.",
  features_template: "Template Builder",
  features_template_text: "Create and use standardized medical note templates.",
  features_analytics: "Analytics",
  features_analytics_text: "View transcription reports and trends.",


  sidebar_overview: "Overview",
  dashboard_transcribe: "Transcribe",
  dashboard_reports: "Reports",
  dashboard_settings: "Settings",
  dashboard_templates: "Template Builder",

  template_builder_title: "Template Builder",
  templates_label: "Templates",
  edit_mode: "Edit Mode",
  preview_mode: "Preview Mode",
  export_pdf: "Export PDF",

  template_title: "Template Builder",
template_new: "New Template",
template_save: "Save Template",
template_delete: "Delete Template",
template_preview: "Preview",
template_name: "Template Name",
template_placeholder_tip: "Click buttons to insert placeholders: {{PatientName}}, {{Date}}, {{Diagnosis}}, {{Medications}}",
ph_patientname: "Patient",
ph_date: "Date",
ph_diagnosis: "Diagnosis",
ph_medications: "Medications",

reports_title: "Reports",
reports_total_transcriptions: "Total Transcriptions",
reports_templates_used: "Templates Used",
reports_time_saved: "Time Saved",
reports_transcription_trends: "Transcription Trends",
reports_daily: "Daily",
reports_weekly: "Weekly",
reports_monthly: "Monthly",
reports_export_csv: "Export CSV",
reports_export_pdf: "Export PDF",

dashboard_overview: "Overview",
dashboard_patients: "Active Patients",
dashboard_transcriptions: "Recent Transcriptions",
dashboard_reviews: "Pending Reviews",
dashboard_activity: "Activity",
dashboard_recentNotes: "Recent Notes",
dashboard_quickActions: "Quick Actions",
action_newTranscription: "New Transcription",
action_uploadAudio: "Upload Audio",
action_exportReport: "Export Report",
action_editTemplates: "Edit Templates",
transcribed: "Transcribed",
pendingReview: "Pending Review",
reviewed: "Reviewed",
loading: "Loading",

action_editTemplates: "Edit Templates",
cancel: "Cancel",
upload: "Upload",
     },
  },
  fr: {
    translation: {
      // Navigation
      nav_home: "Accueil",
      nav_about: "À propos",
      nav_contact: "Contact",
      nav_dashboard: "Tableau de bord",
      nav_signin: "Connexion",
      nav_getstarted: "Commencer",
      nav_logout: "Déconnexion",

      // Sidebar
      sidebar_overview: "Aperçu",
      sidebar_patients: "Patients",
      sidebar_transcriptions: "Transcriptions",
      sidebar_reports: "Rapports",
      sidebar_settings: "Paramètres",

      //DashboardCard
      dashboard_patients: "Patients actifs",
      dashboard_transcriptions: "Transcriptions récentes",
      dashboard_reviews: "Révisions en attente",




      // Hero Section
      hero_title: "ClinicaVoice",
      hero_tagline: "Dictez. Transcrivez. Prenez soin.",
      hero_description:
        "Transcription clinique alimentée par l'IA pour les professionnels de la santé canadiens. Concentrez-vous sur les soins aux patients — laissez ClinicaVoice gérer vos notes et vos résumés.",
      hero_cta1: "Commencer",
      hero_cta2: "En savoir plus",

      // Why Section
      why_title: "Pourquoi ClinicaVoice?",
      why_sub:
        "Nous avons conçu ClinicaVoice pour rendre la documentation clinique plus rapide, plus sûre et plus humaine.",
      why_1_title: "🗣️ Capture vocale en temps réel",
      why_1_text:
        "Dictez les notes des patients sans les mains. Notre IA transcrit avec une précision et une confidentialité de niveau médical.",
      why_2_title: "🧩 Modèles intelligents",
      why_2_text:
        "Créez et réutilisez des modèles SOAP, HPI et compatibles DME — adaptés à votre flux de travail.",
      why_3_title: "🔐 Sécurité et conformité",
      why_3_text:
        "Conçu pour respecter les normes canadiennes de confidentialité avec stockage chiffré et accès basé sur les rôles.",

      // How Section
      how_title: "Comment ça fonctionne",
      how_sub:
        "Simple, efficace et conçu pour les cliniciens — votre voix devient des données structurées en quelques secondes.",
      how_1_title: "1️⃣ Enregistrer",
      how_1_text:
        "Utilisez votre navigateur ou appareil mobile pour capturer en toute sécurité les dictées des patients.",
      how_2_title: "2️⃣ Transcrire",
      how_2_text:
        "Notre moteur d'IA convertit vos enregistrements en notes précises et structurées.",
      how_3_title: "3️⃣ Exporter",
      how_3_text:
        "Exportez instantanément les notes vers les systèmes DME, en PDF, ou partagez-les en toute sécurité avec votre équipe.",

      // Trusted Section
      trusted_title: "Fiable pour les cliniques à travers le Canada 🇨🇦",

      // About Page
        about_title: "À propos de ClinicaVoice",
        about_description:
        "ClinicaVoice est conçu par des cliniciens et des ingénieurs pour simplifier la documentation clinique. Notre mission est de réduire la charge administrative et d'améliorer les soins aux patients.",
        about_team: "Notre équipe",
        about_faculty: "Conseiller pédagogique",
        role_pm: "Chef de projet / Liaison",
        role_frontend: "Développeuse Frontend",
        role_ai: "Spécialiste IA",
        role_backend: "Développeur Backend",
        role_devops: "Ingénieur DevOps",
        role_qa: "Assurance qualité et documentation",
        role_faculty: "Conseiller pédagogique",

        features_title: "Fonctionnalités du produit",
        features_description: "Découvrez les modules et capacités de ClinicaVoice.",
        features_voice: "Capture vocale",
        features_voice_text: "Modèles de haute précision, séparation des locuteurs, mode hors ligne.",
        features_template: "Générateur de modèles",
        features_template_text: "Personnalisez vos modèles, champs rapides et options d'exportation.",
        features_analytics: "Analytique",
        features_analytics_text: "Tableaux de bord d'utilisation, précision des transcriptions et rapports exportables.",

        
        // Contact Page
        contact_title: "Contact et assistance",
        contact_name: "Nom",
        contact_email: "Courriel",
        contact_message: "Message",
        contact_send: "Envoyer le message",
        contact_success: "Merci — votre message a été reçu !",

        // Dashboard Page
        dashboard_title: "Vue d'ensemble du tableau de bord",
        dashboard_patients: "Patients actifs",
        dashboard_transcriptions: "Transcriptions récentes",
        dashboard_reviews: "En attente de révision",
        dashboard_activity: "Activité (30 derniers jours)",
        dashboard_notes: "Notes récentes",
        dashboard_actions: "Actions rapides",
        dashboard_new: "Nouvelle transcription",
        dashboard_upload: "Téléverser un audio",
        dashboard_export: "Exporter le rapport",
        dashboard_note1: "John Doe — 2025-09-30 — Transcrit (vérifié)",
        dashboard_note2: "Jane Roe — 2025-09-29 — Transcrit",
        dashboard_note3: "Samuel K — 2025-09-28 — En attente de vérification",

        //login page
        signin_title: "Bienvenue à nouveau",
        signin_email: "Adresse e-mail",
        signin_password: "Mot de passe",
        signin_button: "Se connecter",
        signin_error: "Identifiants invalides. Veuillez réessayer.",
        signin_noaccount: "Vous n'avez pas de compte ?",
        signin_signup: "Créer un compte",

        register_title: "Créer un compte",
        register_name: "Nom complet",
        register_email: "Adresse e-mail",
        register_password: "Mot de passe",
        register_button: "S'inscrire",
        register_success: "Compte créé avec succès ! Redirection...",
        register_haveaccount: "Vous avez déjà un compte ?",
        register_signin: "Se connecter",


      signin_title: "Bienvenue",
  signin_email: "Adresse e-mail",
  signin_password: "Mot de passe",
  signin_button: "Se connecter",
  signin_error: "Identifiants invalides. Veuillez réessayer.",
  signin_noaccount: "Vous n'avez pas de compte ?",
  signin_signup: "Créer un compte",

  register_title: "Créer un compte",
  register_name: "Nom complet",
  register_email: "Adresse e-mail",
  register_password: "Mot de passe",
  register_button: "S'inscrire",
  register_success: "Compte créé avec succès ! Redirection...",
  register_haveaccount: "Vous avez déjà un compte ?",
  register_signin: "Se connecter",

  signup_title: "Inscription",
  signup_name: "Nom ",
  signup_email: "E-mail ",
  signup_password: "Mot de passe ",
  signup_button: "S'inscrire",
  signup_success: "Inscription réussie !",
  signup_error: "Échec de l'inscription. Veuillez réessayer.",
  register_error: "Impossible d'enregistrer l'utilisateur.",

  sidebar_overview: "Aperçu",
  sidebar_patients: "Patients",
  sidebar_transcribe: "Transcrire",
  sidebar_reports: "Rapports",
  sidebar_settings: "Paramètres",

  dashboard_transcribe: "Transcrire",
  transcribe_description: "Enregistrez ou téléchargez vos notes cliniques et obtenez une transcription automatique via AWS.",
  start_recording: "Commencer l'enregistrement",
  stop_recording: "Arrêter l'enregistrement",
  upload_audio: "Téléverser un fichier",
  upload_and_transcribe: "Téléverser & Transcrire",
  upload_success: "Audio téléversé avec succès.",
  transcribing: "Transcription en cours...",
  transcription_done: "Transcription terminée avec succès.",
  transcription_failed: "La transcription a échoué. Veuillez réessayer.",
  transcription_error: "Une erreur est survenue lors de la transcription",
  transcript: "Transcription",
  save_transcript: "Enregistrer la transcription",
  transcript_saved: "Transcription enregistrée dans le cloud.",
  save_failed: "Échec de l'enregistrement",
  microphone_denied: "Accès au microphone refusé",
  recording_started: "Enregistrement...",
  recording_stopped: "Enregistrement arrêté.",
  no_audio_uploaded: "Veuillez enregistrer ou téléverser un fichier audio d'abord.",

  dashboard_settings: "Paramètres",
  account_settings: "Paramètres du compte",
  display_name: "Nom affiché",
  email_address: "Adresse e-mail",
  save_changes: "Enregistrer les modifications",
  preferences: "Préférences",
  enable_notifications: "Activer les notifications",
  dark_mode: "Activer le mode sombre",

  contact_title: "Nous contacter",
  contact_subtitle:
    "Nous sommes là pour vous aider avec ClinicaVoice. Contactez-nous pour toute demande, assistance ou partenariat.",
  contact_getintouch: "Notre emplacement",
  contact_formtitle: "Envoyez-nous un message",
  contact_name: "Nom complet",
  contact_email_label: "Adresse courriel",
  contact_message: "Message",
  contact_send: "Envoyer le message",
  contact_success: "Votre message a été envoyé avec succès !",

  footer_product: "Produit",
  footer_product_items: "Transcription • Modèles • Intégrations",
  footer_company: "Entreprise",
  footer_company_items: "À propos • Carrières • Contact",
  footer_support: "Support",
  footer_support_items: "Centre d’aide • Confidentialité • Conditions",
  footer_disclaimer:
    "Conçu avec soin au Fanshawe College – Campus sud de London • Priorité à l’accessibilité, à la confidentialité et à l’innovation dans les soins de santé canadiens.",

  sidebar_templates: "Constructeur de Modèles",
  load_template: "Charger le modèle",
  choose_template: "Choisir un modèle",
  save_template: "Enregistrer le modèle",
  template_saved: "Modèle enregistré avec succès !",
  features_voice: "Transcription vocale",
  features_voice_text: "Enregistrez ou téléchargez des notes cliniques pour obtenir une transcription automatique.",
  features_template: "Constructeur de Modèles",
  features_template_text: "Créez et utilisez des modèles de notes médicales standardisées.",
  features_analytics: "Analyses",
  features_analytics_text: "Consultez les rapports et tendances de transcription.",

  sidebar_overview: "Aperçu",
  dashboard_transcribe: "Transcrire",
  dashboard_reports: "Rapports",
  dashboard_settings: "Paramètres",
  dashboard_templates: "Créateur de Modèles",

  template_builder_title: "Créateur de Modèles",
  templates_label: "Modèles",
  edit_mode: "Mode Édition",
  preview_mode: "Mode Aperçu",
  export_pdf: "Exporter PDF",

  template_title: "Créateur de Modèles",
template_new: "Nouveau Modèle",
template_save: "Enregistrer le Modèle",
template_delete: "Supprimer le Modèle",
template_preview: "Aperçu",
template_name: "Nom du Modèle",
template_placeholder_tip: "Cliquez sur les boutons pour insérer des espaces réservés: {{PatientName}}, {{Date}}, {{Diagnosis}}, {{Medications}}",
ph_patientname: "Patient",
ph_date: "Date",
ph_diagnosis: "Diagnostic",
ph_medications: "Médicaments",

reports_title: "Rapports",
reports_total_transcriptions: "Total des transcriptions",
reports_templates_used: "Modèles utilisés",
reports_time_saved: "Temps économisé",
reports_transcription_trends: "Tendances des transcriptions",
reports_daily: "Quotidien",
reports_weekly: "Hebdomadaire",
reports_monthly: "Mensuel",
reports_export_csv: "Exporter CSV",
reports_export_pdf: "Exporter PDF",

dashboard_overview: "Aperçu",
dashboard_patients: "Patients Actifs",
dashboard_transcriptions: "Transcriptions Récentes",
dashboard_reviews: "Examens en Attente",
dashboard_activity: "Activité",
dashboard_recentNotes: "Notes Récentes",
dashboard_quickActions: "Actions Rapides",
action_newTranscription: "Nouvelle Transcription",
action_uploadAudio: "Téléverser Audio",
action_exportReport: "Exporter Rapport",
action_editTemplates: "Modifier Modèles",
transcribed: "Transcrit",
pendingReview: "En Attente d'Évaluation",
reviewed: "Évalué",
loading: "Chargement",

action_editTemplates: "Modifier Modèles",
cancel: "Annuler",
upload: "Téléverser",
  },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
