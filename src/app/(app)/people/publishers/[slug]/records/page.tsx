'use server';

import {
  getCurrentYearsRegister,
  loadRecords,
} from '~/actions/people/publishers/records/load';
import { RecordsGrid } from '~/components/people/publishers/records/grid';
import type { PageProps } from '~/next-types';

export default async function PublisherRecordsPage({
  params,
  searchParams,
}: PageProps<{ slug: string }>) {
  const { records } = await loadRecords({
    year: searchParams?.year,
    publisherId: params.slug,
  });

  const yearsOptions = await getCurrentYearsRegister();

  return <RecordsGrid records={records} yearOptions={yearsOptions} />;
}
