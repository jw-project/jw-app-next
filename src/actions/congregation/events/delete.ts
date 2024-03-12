'use server';

import { revalidatePath } from 'next/cache';

import { BadRequestError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import type { EventEntity } from '~/entities/event';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function deleteEvents(events: EventEntity[]) {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'events').canRead();

    const crud = new EventCrud(congregationId);
    await Promise.all(events.map(({ id }) => crud.delete({ id })));

    return null;
  } catch (error) {
    return new BadRequestError((error as Error).message).toServerAction();
  } finally {
    revalidatePath('/(app)/congregation/events');
  }
}
