'use server';

import type { PropsWithChildren } from 'react';

import { MenuProvider } from '~/global-context/menu';
import { SavingProvider } from '~/global-context/saving';
import { TransitionProvider } from '~/global-context/transition';
import { UserProvider } from '~/global-context/user';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function Providers({ children }: PropsWithChildren) {
  const user = await getAuthenticatedUser();

  return (
    <TransitionProvider>
      <SavingProvider>
        <MenuProvider>
          <UserProvider user={user}>{children}</UserProvider>
        </MenuProvider>
      </SavingProvider>
    </TransitionProvider>
  );
}
