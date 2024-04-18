'use client';

import { useRef } from 'react';

import type { CoreOptions } from '@tanstack/react-table';
import { FormProvider, useForm } from 'react-hook-form';

import { Select } from '~/components/commons/form/select';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import type { PublisherRecordsEntity } from '~/entities/publisher';
import { useTranslation } from '~/hooks/use-translation';

export function RecordsGrid({
  yearOptions,
  records,
}: {
  yearOptions: { selected: number; years: Array<number> };
  records: Array<PublisherRecordsEntity>;
}) {
  const { translate } = useTranslation('routes.people.publisher.records.table');
  const tableRef = useRef<TableRefProps<PublisherRecordsEntity>>(null);
  const methods = useForm({
    defaultValues: { year: String(yearOptions.selected) },
  });

  const columns: CoreOptions<PublisherRecordsEntity>['columns'] = [
    {
      id: 'month-indicative',
      header: () => (
        <>
          <Select
            label={translate('year')}
            name="year"
            options={yearOptions.years.map((year) => ({
              label: String(year),
              value: String(year),
            }))}
          />
        </>
      ),
      cell: ({ row }) => row.original.month,
    },
    {
      id: 'month',
      accessorKey: 'month',
      header: () => translate('surname'),
    },
  ];

  return (
    <FormProvider {...methods}>
      <Table grid ref={tableRef} columns={columns} data={records} />
    </FormProvider>
  );
}
