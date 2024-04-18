'use server';

import type { PropsWithChildren } from 'react';

import { loadPublishers } from '~/actions/people/publishers/load';
import { PublishersPageProvider } from '~/components/people/publishers/context';
import { PublisherList } from '~/components/people/publishers/list';
import { PublisherWrapper } from '~/components/people/publishers/styles';
import { PublisherTabs } from '~/components/people/publishers/tabs';

export default async function PublisherPage({ children }: PropsWithChildren) {
  const { publishers } = await loadPublishers();

  return (
    <PublishersPageProvider publishers={publishers}>
      <PublisherWrapper>
        <PublisherList />
        <PublisherTabs>{children}</PublisherTabs>
      </PublisherWrapper>
    </PublishersPageProvider>
  );
}
