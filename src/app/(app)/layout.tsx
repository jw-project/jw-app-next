"use server";

import "~/styles/global.css";
import type { PropsWithChildren } from "react";
import { BaseLayout } from "./components/layout-base";
import { Providers } from "./providers";

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <BaseLayout>{children}</BaseLayout>
    </Providers>
  );
}
