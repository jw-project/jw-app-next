'use client';

import { useRef } from 'react';
import Link from 'next/link';

import type { CoreOptions } from '@tanstack/react-table';

import { Card } from '~/components/commons/card';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { selectorForTable } from '~/components/commons/table/utils';
import { PublisherTabsEnum, type PublisherEntity } from '~/entities/publisher';
import { useTranslation } from '~/hooks/use-translation';

import { usePublisherPage } from './context';

export function PublisherList() {
  const { translate } = useTranslation('routes.people.publisher.table');
  const { publishers, tabSelected } = usePublisherPage();
  const tableRef = useRef<TableRefProps<PublisherEntity>>(null);

  const columns: CoreOptions<PublisherEntity>['columns'] = [
    ...selectorForTable<PublisherEntity>(),
    {
      id: 'name',
      header: () => translate('name'),
      cell: ({ row }) => {
        const { name } = row.original;

        return name;
      },
    },
    {
      id: 'surname',
      header: () => translate('surname'),
      cell: ({ row }) => {
        const { surname } = row.original;

        return surname;
      },
    },
    // {
    //   id: 'edit',
    //   header: () => (
    //     <AlignRight>
    //       {translate('routes.congregation.events.table.actions')}
    //     </AlignRight>
    //   ),
    //   cell: ({
    //     row: {
    //       original: { id },
    //     },
    //   }) => (
    //     <AlignRight>
    //       <Link href={`./events/${id}`}>{translate('common.edit')}</Link>
    //     </AlignRight>
    //   ),
    // },
  ];

  return (
    <Card padded={0} className="col-span-1">
      {publishers.map((publisher) => (
        <Link
          key={publisher.id}
          href={`/people/publishers/${publisher.id}/${tabSelected || PublisherTabsEnum.Information}`}
        >
          {publisher.name}
        </Link>
      ))}
      <Table ref={tableRef} columns={columns} data={publishers} />
    </Card>
  );
}
