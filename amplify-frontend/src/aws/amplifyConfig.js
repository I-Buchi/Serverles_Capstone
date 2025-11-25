import { Amplify } from "aws-amplify";

// Get config from environment variables (set by build process)
const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || "us-east-1_PLACEHOLDER",
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || "PLACEHOLDER",
      signUpVerificationMethod: "code",
      loginWith: { 
        email: true 
      },
    },
  },
  API: {
    REST: {
      ClinicaVoiceAPI: {
        endpoint: import.meta.env.VITE_API_ENDPOINT || "https://api.placeholder.com",
        region: import.meta.env.VITE_AWS_REGION || "us-east-1",
      },
    },
  },
  Storage: {
    S3: {
      bucket: import.meta.env.VITE_S3_BUCKET || "placeholder-bucket",
      region: import.meta.env.VITE_AWS_REGION || "us-east-1",
    },
  },
};

Amplify.configure(awsConfig);

console.log("✅ Amplify configured with:", {
  userPoolId: awsConfig.Auth.Cognito.userPoolId,
  clientId: awsConfig.Auth.Cognito.userPoolClientId,
  apiEndpoint: awsConfig.API.REST.ClinicaVoiceAPI.endpoint
});

export default awsConfig;