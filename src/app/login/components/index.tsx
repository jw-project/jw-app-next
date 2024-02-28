"use client";

import { LoadingSubtitle, LoadingTitle, Overlay } from "./styled";
import { startTransition, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  type User,
} from "firebase/auth";
import { firebaseClientConnection } from "~/services/firebase-connection.client";
import type { FirebaseOptions } from "firebase/app";
import { handleLogin } from "../login.server";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "~/hooks/use-translation";

export function Login({
  firebaseOptions,
}: {
  firebaseOptions: FirebaseOptions;
}) {
  const { translate } = useTranslation("routes.login");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

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
      <LoadingTitle>{translate("wait")}</LoadingTitle>
      <LoadingSubtitle>{translate("description")}</LoadingSubtitle>
    </Overlay>
  );
}
