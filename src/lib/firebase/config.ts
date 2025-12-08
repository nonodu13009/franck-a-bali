import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Vérifier si toutes les variables Firebase sont définies
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  val => val && val !== 'undefined' && val !== ''
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let auth: Auth | null = null;

// Initialiser Firebase
if (isFirebaseConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    if (app) {
      db = getFirestore(app);
      storage = getStorage(app);
      auth = getAuth(app);
    }
  } catch (error) {
    console.error('[Firebase] Erreur lors de l\'initialisation:', error);
  }
} else {
  console.warn('[Firebase] Configuration incomplète - Vérifiez vos variables d\'environnement');
  console.warn('[Firebase] Variables manquantes:', Object.entries(firebaseConfig)
    .filter(([_, val]) => !val || val === 'undefined' || val === '')
    .map(([key]) => key)
  );
}

export { db, storage, auth };

