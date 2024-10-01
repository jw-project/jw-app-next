'use server';

import { revalidatePath } from 'next/cache';

import { BadRequestError, HttpSuccess } from '~/actions/http-responses';
import type { ActionResponsePromise } from '~/actions/types';
import { ValidatePermissions } from '~/actions/validate-permissions';
import { validateSchema } from '~/actions/validate-schema';
import type { PublisherRecordsEntity } from '~/entities/publisher';
import { PublisherRecordsCrud } from '~/services/api/publishers/publishers-records.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

import { recordDefaultValues } from './consts';
import { recordFormSchema } from './validations';

export async function saveRecords(
  recordReq: PublisherRecordsEntity,
): ActionResponsePromise<PublisherRecordsEntity> {
  try {
    const { congregationId, permissions, id } = await getAuthenticatedUser();
    const recordsCrud = new PublisherRecordsCrud(congregationId, id);
    const idRecord = recordReq.id || recordsCrud.getNewId();
    const record = recordDefaultValues({ ...recordReq, id: idRecord });

    validateSchema(recordFormSchema, record);

    new ValidatePermissions(permissions, 'publishersRecords').canWrite();

    await recordsCrud.save({
      document: recordDefaultValues(record),
      id: idRecord,
    });

    return new HttpSuccess(
      await recordsCrud.get({ id: idRecord }),
    ).toServerAction();
  } catch (error) {
    return new BadRequestError((error as Error).message).toServerAction();
  } finally {
    revalidatePath('/(app)/people/publishers/[slug]/records', 'page');
  }
}
