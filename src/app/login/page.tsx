'use server';

import { getFirebaseEnvs } from '~/actions/login/login.server';
import { Login } from '~/components/login';

export default async function LoginPage() {
  const firebaseOptions = await getFirebaseEnvs();

  return <Login firebaseOptions={firebaseOptions} />;
}
