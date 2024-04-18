'use client';

import { Inter } from 'next/font/google';

import { useContextTranslation } from '~/global-context/translation';
import { useTheme } from '~/hooks/use-theme';

import { Backdrop } from '../commons/backdrop';
import { Toast } from '../commons/toast';

const inter = Inter({ subsets: ['latin'] });

export function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { defaultLanguage } = useContextTranslation();
  const { theme, backdropIsShow } = useTheme();

  return (
    <html lang={defaultLanguage} className={theme}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body
        className={inter.className}
        style={{ overflow: backdropIsShow ? 'hidden' : 'auto' }}
      >
        <Backdrop />
        {children}
        <Toast />
      </body>
    </html>
  );
}
