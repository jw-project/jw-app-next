import { firestore } from 'firebase-admin';

import type { InformationBoardEntity } from '~/entities/informationboard';
import { CrudClass } from '~/services/crud-class';

export class InformationBoardCrud extends CrudClass<InformationBoardEntity> {
  constructor(private readonly congregationId: string) {
    super();
  }

  collection = firestore()
    .collection('congregation')
    .doc(this.congregationId)
    .collection('informationboard');
}
