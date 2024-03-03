'use server';

import { revalidatePath } from 'next/cache';

import {
  BadRequestError,
  HttpSuccess,
  NotFoundError,
} from '~/actions/http-responses';
import type { ActionResponse } from '~/actions/types';
import { ValidatePermissions } from '~/actions/validate-permissions';
import { validateSchema } from '~/actions/validate-schema';
import type { EventEntity } from '~/entities/event';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { eventFormSchema } from './validations';

export async function saveEvent(
  eventId: string,
  eventReq: EventEntity,
): ActionResponse<EventEntity> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    validateSchema(eventFormSchema, eventReq);

    new ValidatePermissions(permissions, 'events').canWrite();

    if (!eventId) {
      throw new NotFoundError();
    }

    const crud = new EventCrud(congregationId);

    await crud.save({
      document: eventReq,
      id: eventId,
    });

    revalidatePath('/congregation/events');

    return new HttpSuccess(await crud.get({ id: eventId })).toServerAction();
  } catch (error) {
    return new BadRequestError(String(error)).toServerAction();
  }
}
