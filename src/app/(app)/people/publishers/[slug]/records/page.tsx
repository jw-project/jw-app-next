import { loadRecords } from '~/actions/people/publishers/records/load';
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

  return (
    <RecordsGrid
      records={records}
      yearOptions={{ selected: 2024, years: [2023, 2024, 2025] }}
    />
  );
}
