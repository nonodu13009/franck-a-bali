import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  type AuthError
} from 'firebase/auth';
import { auth } from './config';

export async function signIn(email: string, password: string): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Erreur lors de la connexion');
  }
}

export async function signOut(): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    await firebaseSignOut(auth);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Erreur lors de la déconnexion');
  }
}

export function getCurrentUser(): User | null {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
}

export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  if (!auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
