"use server";

import { error, info } from "console";

import { firestore } from "firebase-admin";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { PermissionsEnum } from "~/entities/permissions";
import type { PublisherEntity } from "~/entities/publisher";

// import { PermissionsEnum } from '~/entities/permissions';
// import type { PublisherEntity } from '~/entities/publisher';
// import { cacheUser } from '~/utils/cache.server';

// import { UnauthorizedError } from './api/throws-errors';
// import { commitSession, getSession } from './session.server';

type GetAuthenticatedUserOptions = {
  ignoreCache?: boolean;
};

export async function getAuthenticatedUser() {
  // request: Request,
  // options?: GetAuthenticatedUserOptions,
  // firebaseAdminConnection();
  const cookieStore = cookies();
  const uidUser = cookieStore.get("uidUser")?.value;

  if (!uidUser) {
    // throw new UnauthorizedError('No session');
    throw new Error("No session");
  }

  // const cache = cacheUser?.get<PublisherEntity>(uidUser);
  // if (cache && !options?.ignoreCache) {
  //   info(`Successfully load user data from cache: ${JSON.stringify(cache)}`);

  //   return cache;
  // }

  const userRecord = await getAuth().getUser(uidUser);

  if (!userRecord) {
    info("Error fetching auth user data");
    // throw new UnauthorizedError('No session');
    throw new Error("No session");
  }

  const {
    docs: [result],
  } = await firestore()
    .collectionGroup("publishers")
    .where("email", "==", userRecord.email)
    .get();

  const publisherResult = result?.data() as PublisherEntity;
  const publisher: PublisherEntity = {
    ...publisherResult,
    id: result?.id || "",
    uidUser,
    displayName: userRecord.displayName,
    congregationId: result?.ref.parent.parent?.id || "",
    email: userRecord.email || publisherResult.email,
  };

  if (!publisher.permissions) {
    publisher.permissions = {
      admin: true,
      congregation: PermissionsEnum.EDIT,
    };
  }

  // cacheUser?.set(uidUser, publisher);

  info(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);

  return publisher;
}

// export async function sessionLogin(request: Request) {
//   const formData = await request.formData();
//   const idToken = formData.get('token')?.toString() || '';

//   const decodedToken = await getAuth().verifyIdToken(idToken);

//   const session = await getSession(request.headers.get('Cookie'));
//   session.set('uidUser', decodedToken.uid);

//   return commitSession(session);
// }
