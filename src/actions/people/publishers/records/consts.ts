import type { PublisherRecordsEntity } from '~/entities/publisher';

export const recordDefaultValues = (
  over?: Partial<PublisherRecordsEntity>,
): PublisherRecordsEntity => ({
  id: '',
  year: 1,
  month: 1,
  shared: false,
  auxiliaryPioneer: false,
  late: false,
  ...over,
});
