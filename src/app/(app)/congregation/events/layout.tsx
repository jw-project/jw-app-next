'use server';

import type { PropsWithChildren } from 'react';

import { loadEvents } from '~/actions/congregation/events/load';
import { EventsTable } from '~/components/congregation/events/table';

import { EventPageProvider } from './context';

export default async function EventLayout({ children }: PropsWithChildren) {
  const { events } = await loadEvents();

  return (
    <EventPageProvider events={events}>
      <EventsTable />
      {children}
    </EventPageProvider>
  );
}
