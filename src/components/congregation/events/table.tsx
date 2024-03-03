'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { CoreOptions } from '@tanstack/react-table';

import { deleteEvents } from '~/actions/congregation/events/delete';
import { AlignRight } from '~/components/align';
import { Modal } from '~/components/commons/modal';
import type { ModalRefProps } from '~/components/commons/modal/types';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { DateCell, selectorForTable } from '~/components/commons/table/utils';
import { refGuard } from '~/components/commons/utils/ref-guard';
import type { EventEntity } from '~/entities/event';
import { useTranslation } from '~/hooks/use-translation';

export function EventsTable({ events }: { events: EventEntity[] }) {
  const tableRef = useRef<TableRefProps<EventEntity>>(null);
  const deleteModalRef = useRef<ModalRefProps>(null);
  const [eventsState, setEventsState] = useState<EventEntity[]>(events);
  const { translate } = useTranslation();
  const { push } = useRouter();

  useEffect(() => {
    setEventsState(events);
  }, [events]);

  const columns: CoreOptions<EventEntity>['columns'] = [
    ...selectorForTable<EventEntity>(),
    {
      id: 'title',
      header: () => translate('routes.congregation.events.table.event'),
      cell: ({ row }) => {
        const { name, type } = row.original;

        return (
          <TextDescriptionCell
            text={name}
            description={String(translate(`enum.event-type.${type}`))}
          />
        );
      },
    },
    {
      id: 'date',
      header: () => translate('routes.congregation.events.table.date'),
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;

        return <DateCell startDate={startDate} endDate={endDate} />;
      },
    },
    {
      id: 'edit',
      header: () => (
        <AlignRight>
          {translate('routes.congregation.events.table.actions')}
        </AlignRight>
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link href={`./events/${id}`}>{translate('common.edit')}</Link>
        </AlignRight>
      ),
    },
  ];

  return (
    <>
      <Table
        ref={tableRef}
        columns={columns}
        data={eventsState}
        onLineAction={({ original }) => {
          push(`./events/${original.id}`);
        }}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              push('./events/new');
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              push(`./events/${data[0].id}`);
            },
          },
          {
            tooltip: String(translate('common.delete')),
            icon: 'delete',
            enabledWhen: 'leastOneSelected',
            onClick: () => {
              refGuard(deleteModalRef).openModal();
            },
          },
        ]}
      />
      <Modal
        ref={deleteModalRef}
        severity="question-warning"
        text={String(
          translate('routes.congregation.events.delete-modal', {
            length: Number(tableRef.current?.getSelectedRowModel().rows.length),
          }),
        )}
        onConfirm={async () => {
          const selectedRows = refGuard(tableRef)
            ?.getSelectedRowModel()
            .rows.map((row) => row.original);

          setEventsState(
            eventsState.filter((event) => !selectedRows.includes(event)),
          );

          startTransition(() => {
            deleteEvents(selectedRows);
          });
          refGuard(tableRef).resetRowSelection();
        }}
      />
    </>
  );
}
