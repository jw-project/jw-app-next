'use server';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import '~/styles/global.css';

import { Body } from '~/components/body/body';
import { ThemeProvider, type Theme } from '~/global-context/theme';
import { LanguageProvider } from '~/global-context/translation';
import type { Translations } from '~/hooks/use-translation';
import { getTranslateResources } from '~/utils/i18n.server';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Create Next App',
    description: 'Generated by create next app',
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  let resources = global.cacheConfigs.get<Translations>('resources');
  if (!resources) {
    resources = await getTranslateResources();
    cacheConfigs.set('resources', resources);
  }
  const language =
    cookies().get('language')?.value ||
    headers().get('accept-language')?.split(',')[0] ||
    'en';
  const theme = (cookies().get('theme')?.value || 'light') as Theme;

  return (
    <LanguageProvider translations={resources} defaultLanguage={language}>
      <ThemeProvider defaultTheme={theme}>
        <Body>{children}</Body>
      </ThemeProvider>
    </LanguageProvider>
  );
}
