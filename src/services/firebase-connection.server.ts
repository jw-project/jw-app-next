'use server';

import { cookies } from 'next/headers';

import { firestore } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import { UnauthorizedError } from '~/actions/http-responses';
import { PermissionsEnum } from '~/entities/permissions';
import type { PublisherEntity } from '~/entities/publisher';

type GetAuthenticatedUserOptions = {
  ignoreCache?: boolean;
};

export async function getAuthenticatedUser(
  options?: GetAuthenticatedUserOptions,
) {
  const cookieStore = cookies();
  const uidUser = cookieStore.get('uidUser')?.value;

  if (!uidUser) {
    throw new UnauthorizedError('No session');
  }

  const cache = cacheUser.get<PublisherEntity>(uidUser);
  if (cache && !options?.ignoreCache) {
    console.info(
      `Successfully load user data from cache: ${JSON.stringify(cache)}`,
    );

    return cache;
  }

  const userRecord = await getAuth().getUser(uidUser);

  if (!userRecord) {
    console.info('Error fetching auth user data');
    throw new UnauthorizedError('No session');
  }

  const {
    docs: [result],
  } = await firestore()
    .collectionGroup('publishers')
    .where('email', '==', userRecord.email)
    .get();

  const publisherResult = result?.data() as PublisherEntity;
  const publisher: PublisherEntity = {
    ...publisherResult,
    id: result?.id || '',
    uidUser,
    displayName: userRecord.displayName,
    congregationId: result?.ref.parent.parent?.id || '',
    email: userRecord.email || publisherResult.email,
  };

  if (!publisher.permissions) {
    publisher.permissions = {
      admin: true,
      congregation: PermissionsEnum.EDIT,
    };
  }

  global.cacheUser.set(uidUser, publisher);

  console.info(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);

  return publisher;
}
