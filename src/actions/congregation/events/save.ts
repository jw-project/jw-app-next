'use server';

import { revalidatePath } from 'next/cache';

import {
  BadRequestError,
  HttpSuccess,
  NotFoundError,
} from '~/actions/http-responses';
import type { ActionResponsePromise } from '~/actions/types';
import { ValidatePermissions } from '~/actions/validate-permissions';
import { validateSchema } from '~/actions/validate-schema';
import type { EventEntity } from '~/entities/event';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { eventFormSchema } from './validations';

export async function saveEvent(
  eventReq: EventEntity,
): ActionResponsePromise<EventEntity> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    validateSchema(eventFormSchema, eventReq);

    new ValidatePermissions(permissions, 'events').canWrite();

    if (!eventReq.id) {
      throw new NotFoundError();
    }

    const crud = new EventCrud(congregationId);

    await crud.save({
      document: eventReq,
      id: eventReq.id,
    });

    return new HttpSuccess(
      await crud.get({ id: eventReq.id }),
    ).toServerAction();
  } catch (error) {
    return new BadRequestError((error as Error).message).toServerAction();
  } finally {
    revalidatePath('/(app)/congregation/events', 'layout');
  }
}
