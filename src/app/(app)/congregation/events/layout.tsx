'use server';

import type { PropsWithChildren } from 'react';

import { loadEvents } from '~/actions/congregation/events/load';
import { EventPageProvider } from '~/components/congregation/events/context';
import { DrawerWrapper } from '~/components/congregation/events/drawer-wrapper';
import { EventsTable } from '~/components/congregation/events/table';

export default async function EventLayout({ children }: PropsWithChildren) {
  const { events } = await loadEvents();

  return (
    <EventPageProvider events={events}>
      <EventsTable />
      <DrawerWrapper>{children}</DrawerWrapper>
    </EventPageProvider>
  );
}
