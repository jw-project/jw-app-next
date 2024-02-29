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

// TODO remover não usado
// export const saveLanguage = async (request: Request) => {
//   const { language } = await request.json();
//   const { congregationId, id, uidUser } = await getAuthenticatedUser(request);

//   await firestore()
//     .collection('congregation')
//     .doc(congregationId)
//     .collection('publishers')
//     .doc(id)
//     .update({ language });

//   cacheUser?.del(uidUser);
// };
