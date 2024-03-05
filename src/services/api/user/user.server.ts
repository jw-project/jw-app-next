import { firestore } from 'firebase-admin';

import type { Theme } from '~/global-context/theme';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export const saveTheme = async (theme: Theme) => {
  const { congregationId, id } = await getAuthenticatedUser();

  await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('publishers')
    .doc(id)
    .update({ theme });
};
