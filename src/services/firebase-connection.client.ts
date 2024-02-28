"use client";

import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";

export function firebaseClientConnection(firebaseConfig: FirebaseOptions) {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    console.info("Firebase client connected");
  } catch (e) {
    console.error("Firebase client connect error:", e);
  }
}
