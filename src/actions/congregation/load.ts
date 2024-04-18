'use server';

import type { CongregationEntity } from '~/entities/congregation';
import { CongregationCrud } from '~/services/api/congregation/congregation.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { catchError } from '../http-responses';
import { ValidatePermissions } from '../validate-permissions';

export async function loadCongregation() {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();
    const congregationCrud = new CongregationCrud();

    let congregation = {} as CongregationEntity;
    if (congregationId) {
      new ValidatePermissions(permissions, 'congregation').canRead();
      congregation = await congregationCrud.get({ id: congregationId });
    }

    return congregation;
  } catch (error) {
    return catchError(error);
  }
}
