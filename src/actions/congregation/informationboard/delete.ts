'use server';

import { revalidatePath } from "next/cache";

import { BadRequestError } from "~/actions/http-responses";
import { ValidatePermissions } from "~/actions/validate-permissions";
import { getAuthenticatedUser } from "~/services/firebase-connection.server";
// import informationboard
import type { InformationBoardEntity } from "~/entities/informationboard";
import { InformationBoardCrud } from "~/services/api/congregation/informationboard/information.server";


export async function deleteInformationBoard(informationboard: InformationBoardEntity[]) {
   try {
      const { congregationId, permissions } = await getAuthenticatedUser();

      new ValidatePermissions(permissions, 'informationboard').canRead();

      const crud = new InformationBoardCrud(congregationId);
      await Promise.all(informationboard.map(({ id }) => crud.delete({ id })));

      return null;
   }  catch (error) {
      return new BadRequestError((error as Error).message).toServerAction();
   }  finally {
      revalidatePath('/(app)/congregation/informationboard');
   }
}