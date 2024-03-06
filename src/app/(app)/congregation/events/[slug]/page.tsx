'use server';

import { loadEvent } from '~/actions/congregation/events/load';
import EventDrawer from '~/components/congregation/events/drawer';

export default async function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await loadEvent({ id: params.slug });

  return <EventDrawer event={event} eventId={params.slug} />;
}
