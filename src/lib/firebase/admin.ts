
import * as admin from 'firebase-admin';

// Helper function to initialize Firebase Admin
function initializeFirebaseAdmin() {
  // Skip initialization if already done
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  try {
    // Priority 1: Use service account from environment variable (recommended for production)
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      let serviceAccount;
      try {
        serviceAccount = JSON.parse(serviceAccountKey);
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id,
        });
      } catch (e) {
        throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it is valid JSON.');
      }
    }

    // Priority 2: Use individual environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (privateKey && clientEmail && projectId) {
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: formattedPrivateKey,
        }),
        projectId: projectId,
      });
    }

    // Priority 3: Default credentials for Google Cloud environments
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GCLOUD_PROJECT) {
      return admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.GCLOUD_PROJECT,
      });
    }

    // If no credentials found, return null to avoid crashing the server
    return null;
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    // In a build environment, log the error but don't crash the server.
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    // For local development, it's better to fail fast.
    throw error;
  }
}

// Initialize Firebase Admin
const app = initializeFirebaseAdmin();

// Export the services, handling the possibility of null initialization
export const adminAuth = app ? admin.auth(app) : null;
export const adminDb = app ? admin.firestore(app) : null;

// Export admin for additional usage
export { admin };

// Helper function to verify initialization
export function isAdminInitialized(): boolean {
  return admin.apps.length > 0 && !!app;
}

// Helper to get current project ID
export function getProjectId(): string | undefined {
  const app = admin.apps[0];
  return app?.options?.projectId;
}
