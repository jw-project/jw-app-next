'use server';

import { redirect } from 'next/navigation';

import EventDrawer from '~/components/congregation/events/drawer';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export default async function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const { congregationId } = await getAuthenticatedUser();
  const crud = new EventCrud(congregationId);

  if (params.slug === 'new') {
    redirect(`/congregation/events/${await crud.getNewId()}`);
  }

  const event = await crud.get({ id: params.slug });

  return <EventDrawer event={event} eventId={params.slug} />;
}
