'use client';

import { useRef } from 'react';
import Link from 'next/link';

import type { CoreOptions } from '@tanstack/react-table';

import { AlignRight } from '~/components/align';
import { Card } from '~/components/commons/card';
import { Icon } from '~/components/commons/icon';
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
      cell: ({ row }) => row.original.name,
    },
    {
      id: 'surname',
      header: () => translate('surname'),
      cell: ({ row }) => row.original.surname,
    },
    {
      id: 'edit',
      header: () => <AlignRight>{translate('action')}</AlignRight>,
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link
            href={`/people/publishers/${id}/${tabSelected || PublisherTabsEnum.Information}`}
          >
            <Icon
              icon="navigate_next"
              size="icon-large"
              className="dark:text-white"
            />
          </Link>
        </AlignRight>
      ),
    },
  ];

  return (
    <Card padded={0} className="col-span-1">
      <Table ref={tableRef} columns={columns} data={publishers} />
    </Card>
  );
}
