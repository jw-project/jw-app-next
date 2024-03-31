'use server';

import { revalidatePath } from "next/cache";

import { BadRequestError, HttpSuccess, NotFoundError } from "~/actions/http-responses";
import type { ActionResponsePromise } from "~/actions/types";
import { ValidatePermissions } from "~/actions/validate-permissions";
import { validateSchema } from "~/actions/validate-schema";
import { InformationBoardEntity } from "~/entities/informationboard";
import { InformationBoardCrud } from "~/services/api/congregation/informationboard/information.server";
import { getAuthenticatedUser } from "~/services/firebase-connection.server";

import { informationboardFormSchema } from "./validations";

export async function saveInformationBorad(
   informationBoardReq: InformationBoardEntity,
): ActionResponsePromise<InformationBoardEntity> {
   try {
      const { congregationId, permissions } = await getAuthenticatedUser();

      validateSchema(informationboardFormSchema, informationBoardReq);

      new ValidatePermissions(permissions, 'informationboard').canWrite();

      if (!informationBoardReq.id) {
         throw new NotFoundError();
      }

      const crud = new InformationBoardCrud(congregationId);

      await crud.save({
      document: informationBoardReq,
      id: informationBoardReq.id,
      });

      return new HttpSuccess(
         await crud.get({ id: informationBoardReq.id }),
      ).toServerAction();
   } catch (error) {
      return new BadRequestError((error as Error).message).toServerAction();
   } finally {
      revalidatePath('/(app)/congregation/informationboard');
   }
}