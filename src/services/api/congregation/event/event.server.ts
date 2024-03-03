import { firestore } from 'firebase-admin';

import type { EventEntity } from '~/entities/event';
import { CrudClass } from '~/services/crud-class';

export class EventCrud extends CrudClass<EventEntity> {
  constructor(private readonly congregationId: string) {
    super();
  }

  collection = firestore()
    .collection('congregation')
    .doc(this.congregationId)
    .collection('events');
}
