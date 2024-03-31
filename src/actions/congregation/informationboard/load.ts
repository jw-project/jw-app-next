'use server';

import { redirect } from "next/navigation";

import { catchError } from "~/actions/http-responses";
import { ValidatePermissions } from "~/actions/validate-permissions";
import type { InformationBoardEntity} from "~/entities/informationboard";
import { InformationBoardType } from "~/entities/informationboard";
import { EventCrud } from "~/services/api/congregation/informationboard/information.server";
import { getAuthenticatedUser } from "~/services/firebase-connection.server";

export async function loadInformationBoard(): Promise <{
    informationboard: InformationBoardEntity[];
}> {
    try {
        const { congregationId, permissions } = await getAuthenticatedUser();
    
        new ValidatePermissions(permissions, 'informationboard').canRead();
    
        const crud = new EventCrud(congregationId);
        const informationboard = await crud.list();
    
        return { informationboard };
      } catch (error) {
        return catchError(error);
    }
}

export async function loadInformationBoard({ id }: { id: string }): Promise<InformationBoardEntity> {
    try {
      const { congregationId, permissions } = await getAuthenticatedUser();
      const crud = new EventCrud(congregationId);
  
      new ValidatePermissions(permissions, 'informationboard').canRead();
  
      if (id === 'new') {
        redirect(`/congregation/informationboard/${crud.getNewId()}`);
      }
  
      const informationboard = await crud.get({ id });
  
      return { ...{ type: InformationBoardType.INFORMATION }, ...informationboard };
    } catch (error) {
      return catchError(error);
    }
  }