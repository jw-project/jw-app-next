'use server';

import { revalidatePath } from 'next/cache';

import type { Theme } from '~/global-context/theme';
import { saveTheme } from '~/services/api/user/user.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function changeTheme(theme: Theme) {
  const { uidUser } = await getAuthenticatedUser();

  await saveTheme(theme);
  global.cacheUser?.del(uidUser);
  revalidatePath('/(app)', 'layout');

  return 'ok';
}
