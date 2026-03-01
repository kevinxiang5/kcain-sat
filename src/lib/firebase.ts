/** Firebase is optional. Use dynamic imports so the app builds without it (e.g. on Vercel without Firebase). */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedApp: unknown = null;

async function getFirebaseApp(): Promise<unknown> {
  if (typeof window === "undefined") return null;
  if (cachedApp) return cachedApp;
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) return null;
  try {
    const { getApps, initializeApp } = await import("firebase/app");
    const apps = getApps();
    if (apps.length > 0) {
      cachedApp = apps[0];
      return cachedApp;
    }
    cachedApp = initializeApp(firebaseConfig);
    return cachedApp;
  } catch {
    return null;
  }
}

/** Client-side Firebase app (async). Only initialized in the browser when env vars are set. */
export function getApp(): Promise<unknown> {
  return getFirebaseApp();
}

/** Client-side Firestore (async). Use for reading questions in the browser. */
export async function getDb(): Promise<unknown> {
  const app = await getFirebaseApp();
  if (!app) return null;
  try {
    const { getFirestore } = await import("firebase/firestore");
    return getFirestore(app as import("firebase/app").FirebaseApp);
  } catch {
    return null;
  }
}

export function isFirebaseConfigured(): boolean {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}
