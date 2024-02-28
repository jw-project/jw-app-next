"use server";

import { getFirebaseEnvs } from "./login.server";
import { Login } from "./components";

export default async function LoginPage() {
  const firebaseOptions = await getFirebaseEnvs();

  return <Login firebaseOptions={firebaseOptions} />;
}
