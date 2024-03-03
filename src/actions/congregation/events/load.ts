import { BadRequestError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import { EventCrud } from '~/services/api/congregation/event/event.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadEvents() {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'events').canRead();

    const crud = new EventCrud(congregationId);
    const events = await crud.list();

    return { events };
  } catch (error) {
    throw new BadRequestError();
  }
}
