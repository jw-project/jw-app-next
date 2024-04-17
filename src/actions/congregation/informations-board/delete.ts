'use server';

import { revalidatePath } from 'next/cache';

import { BadRequestError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import type { InformationBoardEntity } from '~/entities/information-board';
import { InformationBoardCrud } from '~/services/api/congregation/information-board/information-board.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function deleteInformationsBoard(
  informationsBoard: InformationBoardEntity[],
) {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'informationsBoard').canRead();

    const crud = new InformationBoardCrud(congregationId);
    await Promise.all(informationsBoard.map(({ id }) => crud.delete({ id })));

    return null;
  } catch (error) {
    return new BadRequestError((error as Error).message).toServerAction();
  } finally {
    revalidatePath('/(app)/congregation/informationsBoard');
  }
}
