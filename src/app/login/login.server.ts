'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getAuth } from 'firebase-admin/auth';
import type { FirebaseOptions } from 'firebase/app';

export async function getFirebaseEnvs(): Promise<FirebaseOptions> {
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
}

export async function handleLogin({
  accessToken,
  redirectUrl,
}: {
  accessToken: string;
  redirectUrl: string | null;
}) {
  const decodedToken = await getAuth().verifyIdToken(accessToken);

  cookies().set('fb:token', accessToken);
  cookies().set('uidUser', decodedToken.uid);

  redirect(redirectUrl || '/');
}
