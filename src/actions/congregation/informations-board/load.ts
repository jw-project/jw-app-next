'use server';

import { redirect } from 'next/navigation';

import { catchError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import {
  InformationBoardType,
  type InformationBoardEntity,
} from '~/entities/information-board';
import { InformationBoardCrud } from '~/services/api/congregation/information-board/information-board.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadInformationsBoard(): Promise<{
  informationsBoard: InformationBoardEntity[];
}> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'informationsBoard').canRead();

    const crud = new InformationBoardCrud(congregationId);
    const informationsBoard = await crud.list();

    return { informationsBoard };
  } catch (error) {
    return catchError(error);
  }
}

export async function loadInformationBoard({
  id,
}: {
  id: string;
}): Promise<InformationBoardEntity> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();
    const crud = new InformationBoardCrud(congregationId);

    new ValidatePermissions(permissions, 'informationsBoard').canRead();

    if (id === 'new') {
      redirect(`/congregation/informations-board/${crud.getNewId()}`);
    }

    const informationBoard = await crud.get({ id });

    return {
      ...{ type: InformationBoardType.INFORMATION },
      ...informationBoard,
    };
  } catch (error) {
    return catchError(error);
  }
}
