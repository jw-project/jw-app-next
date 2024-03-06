import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';
import type { Permissions } from '~/entities/permissions';
import { CrudClass } from '~/services/crud-class';

const error = 'Method not implemented.';

export class CongregationCrud extends CrudClass<CongregationEntity> {
  constructor() {
    super();
  }

  collection = firestore().collection('congregation');

  list(): Promise<CongregationEntity[]> {
    throw new Error(error);
  }

  getNewId(): string {
    throw new Error(error);
  }

  delete({ id: _ }: { id: string }): Promise<firestore.WriteResult> {
    throw new Error(error);
  }

  async findCongregationByNumber({ number }: { number: number }) {
    const {
      empty,
      docs: [findedCongregation],
    } = await this.collection.where('number', '==', number).get();

    return !empty && findedCongregation;
  }

  async newCongregation({
    congregation,
    displayName,
    email,
    permissions,
  }: {
    congregation: CongregationEntity;
    displayName?: string;
    email: string;
    permissions: Permissions;
  }) {
    const congregationSaved = await this.collection.add(congregation);

    await congregationSaved.collection('publishers').add({
      name: displayName,
      displayName,
      permissions,
      email,
    });

    return congregationSaved.get();
  }
}
