'use client';

import { useRef } from 'react';

import type { CoreOptions } from '@tanstack/react-table';

import { AlignRight } from '~/components/align';
import { Card } from '~/components/commons/card';
import { Icon } from '~/components/commons/icon';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { PublisherTabsEnum, type PublisherEntity } from '~/entities/publisher';
import { useTranslation } from '~/hooks/use-translation';

import { usePublisherPage } from './context';

export function PublisherList() {
  const { translate } = useTranslation('routes.people.publisher.table');
  const { publishers, tabSelected } = usePublisherPage();
  const tableRef = useRef<TableRefProps<PublisherEntity>>(null);

  const columns: CoreOptions<PublisherEntity>['columns'] = [
    {
      id: 'name',
      header: () => translate('name'),
      cell: ({ row }) => row.original.name,
      sortingFn: 'alphanumeric',
      accessorKey: 'name',
    },
    {
      id: 'surname',
      header: () => translate('surname'),
      cell: ({ row }) => row.original.surname,
      sortingFn: 'alphanumeric',
      accessorKey: 'name',
    },
    {
      id: 'description',
      header: () => '',
      cell: () => (
        <AlignRight>
          <Icon icon="action_key" />
        </AlignRight>
      ),
    },
  ];

  return (
    <Card
      padded={0}
      className="2xl:col-span-3 xl:col-span-4 lg:col-span-5 hidden lg:block overflow-y-auto card-full-height"
    >
      <Table
        ref={tableRef}
        columns={columns}
        data={publishers}
        lineAsLink={(row) =>
          `/people/publishers/${row.original.id}/${tabSelected || PublisherTabsEnum.Information}`
        }
        options={{
          hasShadow: false,
        }}
      />
    </Card>
  );
}
