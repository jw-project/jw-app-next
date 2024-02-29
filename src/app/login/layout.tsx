'use server';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Create Next App',
    description: 'Generated by create next app',
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
