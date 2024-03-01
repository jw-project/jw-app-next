'use server';

import type { CongregationEntity } from '~/entities/congregation';
import { CongregationCrud } from '~/services/api/congregation/congregation.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

export async function loadCongregation() {
  const { congregationId } = await getAuthenticatedUser();
  const congregationCrud = new CongregationCrud();

  let congregation = {} as CongregationEntity;
  if (congregationId) {
    congregation = await congregationCrud.get({ id: congregationId });
  }

  return congregation;
}
