import type {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase-admin/firestore';

import { NotFoundError } from '~/actions/http-responses';

export abstract class CrudClass<Entity extends DocumentData> {
  abstract collection: CollectionReference<DocumentData, DocumentData>;

  protected getAllData<T>(
    snap: QuerySnapshot<DocumentData>,
    { includeId }: { includeId: boolean } | undefined = { includeId: true },
  ) {
    return snap.docs.map((e) => {
      const obj = e.data();
      if (includeId) {
        obj.id = e.id;
      }

      return obj;
    }) as T;
  }

  private getData<T>(snap: DocumentSnapshot<DocumentData>) {
    return { ...snap.data(), id: snap.id } as T;
  }

  private isValidId(id: string) {
    return /^[0-9a-zA-Z]{20}$/.test(id);
  }

  getNewId(): string {
    const newDocument = this.collection.doc();

    return newDocument.id;
  }

  async list(): Promise<Array<Entity>> {
    const list = await this.collection.get();

    return this.getAllData(list, { includeId: true });
  }

  async get({ id }: { id: string }): Promise<Entity> {
    const document = await this.collection.doc(id).get();

    if (!document.exists && !this.isValidId(id)) {
      throw new NotFoundError();
    }

    return this.getData(document);
  }

  async save({ document, id }: { document: Entity; id: string }) {
    return this.collection.doc(id).set(document);
  }

  async delete({ id }: { id: string }) {
    return this.collection.doc(id).delete();
  }
}
