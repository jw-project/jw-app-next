'use server';

import { loadEvent } from '~/actions/congregation/events/load';
import { EventForm } from '~/components/congregation/events/form';

export default async function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await loadEvent({ id: params.slug });

  return <EventForm data={event} id={params.slug} />;
}
