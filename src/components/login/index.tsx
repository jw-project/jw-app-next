'use client';

import { startTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import type { FirebaseOptions } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  type User,
} from 'firebase/auth';

import { handleLogin } from '~/actions/login/login.server';
import { useTranslation } from '~/hooks/use-translation';
import { firebaseClientConnection } from '~/services/firebase-connection.client';

import { LoadingSubtitle, LoadingTitle, Overlay } from './styled';

export function Login({
  firebaseOptions,
}: {
  firebaseOptions: FirebaseOptions;
}) {
  const { translate } = useTranslation('routes.login');
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const redirectToLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).catch(() => {
      signInWithRedirect(auth, provider)
        .then(() => {})
        .catch(() => {});
    });
  };

  const checkUser = () => {
    firebaseClientConnection(firebaseOptions);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          startTransition(() => {
            user.getIdToken().then(() => {
              handleLogin({
                accessToken: (user as User & { accessToken: string })
                  .accessToken,
                redirectUrl: redirect,
              });
            });
          });
        } else {
          redirectToLogin();
        }
      },
      undefined,
      () => {
        unsubscribe();
      },
    );
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Overlay>
      {/* <Spinner /> */}
      <LoadingTitle>{translate('wait')}</LoadingTitle>
      <LoadingSubtitle>{translate('description')}</LoadingSubtitle>
    </Overlay>
  );
}
