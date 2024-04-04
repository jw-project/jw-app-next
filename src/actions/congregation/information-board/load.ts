'use server';

import { redirect } from 'next/navigation';

import { catchError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
// import informationBoard
import {
  InformationBoardType,
  type InformationBoardEntity,
} from '~/entities/information-board';
import { InformationBoardCrud } from '~/services/api/congregation/information-board/information.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadInformationsBoard(): Promise<{
  informationBoard: InformationBoardEntity[];
}> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'informationBoard').canRead();

    const crud = new InformationBoardCrud(congregationId);
    const informationBoard = await crud.list();

    return { informationBoard };
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

    new ValidatePermissions(permissions, 'informationBoard').canRead();

    if (id === 'new') {
      redirect(`/congregation/informationBoard/${crud.getNewId()}`);
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
