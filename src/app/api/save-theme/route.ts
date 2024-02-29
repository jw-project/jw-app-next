import { saveTheme } from '~/services/api/user/user.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';
import { cacheUser } from '~/utils/cache.server';

export async function POST(request: Request) {
  const { uidUser } = await getAuthenticatedUser();
  const { theme } = await request.json();

  await saveTheme(theme);
  cacheUser?.del(uidUser);

  return Response.json('ok');
}
