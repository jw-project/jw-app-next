import { firestore } from 'firebase-admin';

import type { PublisherEntity } from '~/entities/publisher';
import { CrudClass } from '~/services/crud-class';

export class PublisherCrud extends CrudClass<PublisherEntity> {
  constructor(private readonly congregationId: string) {
    super();
  }

  collection = firestore()
    .collection('congregation')
    .doc(this.congregationId)
    .collection('publishers');
}
