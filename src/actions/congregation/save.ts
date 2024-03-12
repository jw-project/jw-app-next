'use server';

import type { CongregationEntity } from '~/entities/congregation';
import { PermissionsEnum, type Permissions } from '~/entities/permissions';
import { CongregationCrud } from '~/services/api/congregation/congregation.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { BadRequestError, HttpSuccess, InputError } from '../http-responses';
import type { ActionResponsePromise } from '../types';
import { ValidatePermissions } from '../validate-permissions';
import { validateSchema } from '../validate-schema';
import { congregationFormSchema } from './validations';

export async function saveCongregation(
  congregationReq: CongregationEntity,
): ActionResponsePromise<CongregationEntity> {
  try {
    const { congregationId, permissions, displayName, email } =
      await getAuthenticatedUser();

    validateSchema(congregationFormSchema, congregationReq);

    const congregationCrud = new CongregationCrud();

    const findedCongregation = await congregationCrud.findCongregationByNumber({
      number: congregationReq.number,
    });
    if (findedCongregation && findedCongregation.id !== congregationId) {
      return new InputError(
        'number',
        'routes.congregation.errors.congregation-already-exists',
      ).toServerAction();
    }
    if (!congregationId) {
      const fullPermission: Permissions = {
        admin: true,
        congregation: PermissionsEnum.EDIT,
        events: PermissionsEnum.EDIT,
        groups: PermissionsEnum.EDIT,
        publishers: PermissionsEnum.EDIT,
      };

      const savedCongregation = await congregationCrud.newCongregation({
        congregation: congregationReq,
        displayName,
        email,
        permissions: fullPermission,
      });

      await getAuthenticatedUser({ ignoreCache: true });

      return new HttpSuccess(
        await congregationCrud.get({
          id: savedCongregation.id,
        }),
      ).toServerAction();
    }

    new ValidatePermissions(permissions, 'congregation').canRead();

    await congregationCrud.save({
      document: congregationReq,
      id: congregationId,
    });

    return new HttpSuccess(
      await congregationCrud.get({
        id: congregationId,
      }),
    ).toServerAction();
  } catch (error) {
    return new BadRequestError((error as Error).message).toServerAction();
  }
}
