'use server';

import type { PropsWithChildren } from 'react';

import { loadEvents } from '~/actions/congregation/events/load';
import { EventsTable } from '~/components/congregation/events/table';

export default async function EventLayout({ children }: PropsWithChildren) {
  const { events } = await loadEvents();

  return (
    <>
      <EventsTable events={events} />
      {children}
    </>
  );
}
