// Minimal Firebase wrapper or mock
export const isDemoMode = !import.meta.env.VITE_FIREBASE_API_KEY;

export async function signIn(email?: string, _password?: string) {
  if (isDemoMode) {
    return {
      user: {
        uid: 'demo-123',
        email: email || 'demo@example.com',
        displayName: 'DEMO User'
      }
    };
  }

  // Implement real firebase logic here if needed
  throw new Error("Firebase not configured");
}

export async function signInWithGoogle() {
  if (isDemoMode) {
    return {
      user: {
        uid: 'demo-123',
        email: 'demo@google.com',
        displayName: 'DEMO User'
      }
    };
  }

  throw new Error("Firebase not configured");
}

export async function signOut() {
  if (isDemoMode) return true;
  throw new Error("Firebase not configured");
}

export function onAuthChange(callback: (user: any) => void) {
  if (isDemoMode) {
    callback(null);
    return () => {};
  }

  return () => {};
}