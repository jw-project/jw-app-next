"use server";

import type { PropsWithChildren } from "react";
import { UserProvider } from "~/global-context/user";
import { getAuthenticatedUser } from "~/services/firebase-connection.server";

export async function Providers({ children }: PropsWithChildren) {
  const user = await getAuthenticatedUser();

  return (
    //  <LanguageProvider {...locale}>
    // <ThemeProvider defaultTheme={"light"}>
    //   <NavigatingProvider>
    //      <TransitionProvider>
    //      <SavingProvider>
    //      <MenuProvider>
    <UserProvider user={user}>{children}</UserProvider>
    //      </MenuProvider>
    //      </SavingProvider>
    //      </TransitionProvider>
    //    </NavigatingProvider>
    // </ThemeProvider>
    //  </LanguageProvider>
  );
}
