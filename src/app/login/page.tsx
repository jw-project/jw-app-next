'use server';

import { Login } from './components';
import { getFirebaseEnvs } from './login.server';

export default async function LoginPage() {
  const firebaseOptions = await getFirebaseEnvs();

  return <Login firebaseOptions={firebaseOptions} />;
}
