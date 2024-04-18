import { firestore } from 'firebase-admin';
import { Filter } from 'firebase-admin/firestore';

import type { PublisherRecordsEntity } from '~/entities/publisher';
import { CrudClass } from '~/services/crud-class';

export class PublisherRecordsCrud extends CrudClass<PublisherRecordsEntity> {
  constructor(
    private readonly congregationId: string,
    private readonly publisherId: string,
  ) {
    super();
  }

  collection = firestore()
    .collection('congregation')
    .doc(this.congregationId)
    .collection('publishers')
    .doc(this.publisherId)
    .collection('records');

  async listRecordsByYear(
    year: number,
  ): Promise<Array<PublisherRecordsEntity>> {
    const records = await this.collection
      .where(
        Filter.or(
          Filter.and(
            Filter.where('year', '==', year - 1),
            Filter.where('month', '>=', 9),
          ),
          Filter.and(
            Filter.where('year', '==', year),
            Filter.where('month', '<=', 8),
          ),
        ),
      )
      .get();

    return this.getAllData(records, { includeId: true });
  }
}
