'use server';

import { catchError } from '~/actions/http-responses';
import { ValidatePermissions } from '~/actions/validate-permissions';
import type { PublisherRecordsEntity } from '~/entities/publisher';
import { PublisherRecordsCrud } from '~/services/api/publishers/publishers-records.server';
import { getAuthenticatedUser } from '~/services/firebase-connection.server';

const getParamYear = (year?: string | Array<string>) => {
  const paramYear = typeof year === 'string' ? year : undefined;

  const currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  if (currentMonth >= 9 && !paramYear) {
    currentYear++;
  }

  return paramYear ? Number(paramYear) : currentYear;
};

const completeData = (
  data: Array<PublisherRecordsEntity>,
  year: number,
): Array<PublisherRecordsEntity> => {
  const months = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

  return months.map<PublisherRecordsEntity>((month) => {
    const record = data.find((record) => record.month === month);

    return (
      record ||
      ({
        id: '',
        year: month > 8 ? year - 1 : year,
        month,
        participatedInMinistry: false,
        auxiliaryPioneer: false,
        late: false,
      } satisfies PublisherRecordsEntity)
    );
  });
};

export async function loadRecords({
  year,
  publisherId,
}: {
  year?: string | Array<string>;
  publisherId: string;
}): Promise<{
  records: Array<PublisherRecordsEntity>;
}> {
  try {
    const { congregationId, permissions } = await getAuthenticatedUser();

    new ValidatePermissions(permissions, 'publishersRecords').canRead();

    const yearNumber = getParamYear(year);
    const crud = new PublisherRecordsCrud(congregationId, publisherId);
    const records = await crud.listRecordsByYear(yearNumber);

    return { records: completeData(records, yearNumber) };
  } catch (error) {
    return catchError(error);
  }
}

// export async function loadEvent({ id }: { id: string }): Promise<EventEntity> {
//   try {
//     const { congregationId, permissions } = await getAuthenticatedUser();
//     const crud = new EventCrud(congregationId);

//     new ValidatePermissions(permissions, 'events').canRead();

//     if (id === 'new') {
//       redirect(`/congregation/events/${crud.getNewId()}`);
//     }

//     const event = await crud.get({ id });

//     return { ...{ type: EventType.CIRCUIT_ASSEMBLY }, ...event };
//   } catch (error) {
//     return catchError(error);
//   }
// }
