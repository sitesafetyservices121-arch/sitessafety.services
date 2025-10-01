import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Helper function to initialize Firebase Admin
function initializeFirebaseAdmin() {
  // Skip initialization if already done
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  try {
    // Method 1: Using service account key file (development/local)
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
    
    if (serviceAccountPath) {
      const fullPath = path.resolve(process.cwd(), serviceAccountPath);
      
      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Service account file not found at: ${fullPath}`);
      }

      const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      
      // Validate required fields
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Invalid service account file. Missing required fields.');
      }

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Optional: specify database URL if using Realtime Database
        // databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`
      });
    }

    // Method 2: Using environment variables (production/Vercel/etc.)
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (serviceAccountKey) {
      let serviceAccount;
      
      try {
        // Parse the service account from environment variable
        serviceAccount = JSON.parse(serviceAccountKey);
      } catch (parseError) {
        throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it\'s valid JSON.');
      }

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId || serviceAccount.project_id,
      });
    }

    // Method 3: Using individual environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const finalProjectId = projectId || process.env.FIREBASE_PROJECT_ID;

    if (privateKey && clientEmail && finalProjectId) {
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId: finalProjectId,
          clientEmail: clientEmail,
          // Replace escaped newlines in private key
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
        projectId: finalProjectId,
      });
    }

    // Method 4: Default credentials (Google Cloud environments)
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GCLOUD_PROJECT) {
      return admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.GCLOUD_PROJECT,
      });
    }

    return null;
  } catch (error) {
    // In a build environment, we don't want to throw an error, but log it
    console.error('Firebase Admin initialization error:', error);
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
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
  return admin.apps.length > 0;
}

// Helper to get current project ID
export function getProjectId(): string | undefined {
  const app = admin.apps[0];
  return app?.options?.projectId;
}
