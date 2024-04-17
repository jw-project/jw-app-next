'use server';

import { redirect } from 'next/navigation';

import { catchError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import type { PublisherEntity } from '~/entities/publisher';
import { PublisherCrud } from '~/services/api/publishers/publishers.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadPublishers(): Promise<{
  publishers: Array<PublisherEntity>;
}> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'publishers').canRead();

    const crud = new PublisherCrud(congregationId);
    const publishers = await crud.list();

    //TODO limpar os dados com base nas permissões do usuário

    return { publishers };
  } catch (error) {
    return catchError(error);
  }
}

// export async function loadEvent({ id }: { id: string }): Promise<EventEntity> {
//   try {
//     const { congregationId, permissions } = await getAuthenticatedUser();
//     const crud = new EventCrud(congregationId);

//     new ValidatePermissions(permissions, 'events').canRead();

//     if (id === 'new') {
//       redirect(`/congregation/events/${crud.getNewId()}`);
//     }

//     const event = await crud.get({ id });

//     return { ...{ type: EventType.CIRCUIT_ASSEMBLY }, ...event };
//   } catch (error) {
//     return catchError(error);
//   }
// }
