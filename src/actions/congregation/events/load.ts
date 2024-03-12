'use server';

import { redirect } from 'next/navigation';

import { catchError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import { EventType, type EventEntity } from '~/entities/event';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadEvents(): Promise<{
  events: EventEntity[];
}> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'events').canRead();

    const crud = new EventCrud(congregationId);
    const events = await crud.list();

    return { events };
  } catch (error) {
    return catchError(error);
  }
}

export async function loadEvent({ id }: { id: string }): Promise<EventEntity> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();
    const crud = new EventCrud(congregationId);

    new ValidatePermissions(permissions, 'events').canRead();

    if (id === 'new') {
      redirect(`/congregation/events/${crud.getNewId()}`);
    }

    const event = await crud.get({ id });

    return { ...{ type: EventType.CIRCUIT_ASSEMBLY }, ...event };
  } catch (error) {
    return catchError(error);
  }
}
