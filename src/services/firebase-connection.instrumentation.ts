import { cert, getApps, initializeApp } from "firebase-admin/app";

export function firebaseAdminConnection() {
  try {
    if (!process.env.FIREBASE_AUTH) {
      throw new Error("Não foi possível conectar no Firebase");
    }

    const buff = Buffer.from(process.env.FIREBASE_AUTH, "base64");
    const text = buff.toString("ascii");
    if (!getApps().length) {
      initializeApp({
        credential: cert(JSON.parse(text)),
        databaseURL: "https://jw-project-dev.firebaseio.com",
        storageBucket: "gs://jw-project-dev.appspot.com",
      });
      console.info("Firebase admin connected", getApps());
    }

    console.info("Firebase admin connected");
  } catch (e) {
    console.error("Firebase admin connect error:", e);
  }
}
