"use client";

import { Inter } from "next/font/google";
import { useContextTranslation } from "~/global-context/translation";

const inter = Inter({ subsets: ["latin"] });

export function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { defaultLanguage } = useContextTranslation();

  return (
    <html lang={defaultLanguage}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,1,200&display=block"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
