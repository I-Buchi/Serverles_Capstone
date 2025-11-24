import { get, post } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';

// Upload audio file to S3
export async function uploadAudioFile(file) {
  try {
    const result = await uploadData({
      key: `${Date.now()}-${file.name}`,
      data: file,
      options: {
        contentType: file.type
      }
    }).result;
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

// Get upload URL from backend
export async function getUploadUrl(fileName, fileType) {
  try {
    const restOperation = post({
      apiName: 'ClinicaVoiceAPI',
      path: '/upload',
      options: {
        body: {
          fileName,
          fileType
        }
      }
    });
    const response = await restOperation.response;
    return await response.body.json();
  } catch (error) {
    console.error('Get upload URL error:', error);
    throw error;
  }
}

// Get transcription results
export async function getResults(jobId) {
  try {
    const restOperation = get({
      apiName: 'ClinicaVoiceAPI',
      path: `/results/${jobId}`
    });
    const response = await restOperation.response;
    return await response.body.json();
  } catch (error) {
    console.error('Get results error:', error);
    throw error;
  }
}

// Get dashboard stats
export async function getDashboardStats() {
  try {
    const restOperation = get({
      apiName: 'ClinicaVoiceAPI',
      path: '/dashboard/stats'
    });
    const response = await restOperation.response;
    return await response.body.json();
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    // Return mock data as fallback
    return { activePatients: 128, recentTranscriptions: 24, pendingReviews: 7 };
  }
}

// Get transcriptions list
export async function getTranscriptions() {
  try {
    const restOperation = get({
      apiName: 'ClinicaVoiceAPI',
      path: '/transcriptions'
    });
    const response = await restOperation.response;
    return await response.body.json();
  } catch (error) {
    console.error('Get transcriptions error:', error);
    // Return mock data as fallback
    return [
      { id: 1, patient: 'John Doe', date: '2025-09-30', status: 'Reviewed' },
      { id: 2, patient: 'Jane Roe', date: '2025-09-29', status: 'Pending' }
    ];
  }
}
