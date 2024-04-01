'use client';
// import react
import { startTransition, useEffect, useRef, useState } from 'react';
import type { CoreOptions } from '@tanstack/react-table';
import toast from 'react-hot-toast';
// import next
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//import commons and hooks
import { AlignRight } from '~/components/align';
import { Modal } from '~/components/commons/modal';
import type { ModalRefProps } from '~/components/commons/modal/types';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { DateCell, selectorForTable } from '~/components/commons/table/utils';
import { refGuard } from '~/components/commons/utils/ref-guard';
import { useTranslation } from '~/hooks/use-translation';
// import InformationBoard
import type { InformationBoardEntity } from '~/entities/informationboard';
import { deleteInformationBoard } from '~/actions/congregation/informationboard/delete';

export function InformationBoardTable({
  informationboard,
}: {
  informationboard: InformationBoardEntity[];
}) {
  const tableRef = useRef<TableRefProps<InformationBoardEntity>>(null);
  const deleteModalRef = useRef<ModalRefProps>(null);
  const [informationboardState, setInformationBoardState] =
    useState<InformationBoardEntity[]>(informationboard);
  const { translate } = useTranslation();
  const { push } = useRouter();

  useEffect(() => {
    setInformationBoardState(informationboard);
  }, [informationboard]);

  const columns: CoreOptions<InformationBoardEntity>['columns'] = [
    ...selectorForTable<InformationBoardEntity>(),
    {
      id: 'title',
      header: () =>
        translate(
          'routes.congregation.informationboard.table.informationboard',
        ),
      cell: ({ row }) => {
        const { title, type } = row.original;

        return (
          <TextDescriptionCell
            text={title}
            description={String(
              translate(`enum.informationboard-type.${type}`),
            )}
          />
        );
      },
    },
    {
      id: 'date',
      header: () =>
        translate('routes.congregation.informationboard.table.date'),
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;

        return <DateCell startDate={startDate} endDate={endDate} />;
      },
    },
    {
      id: 'edit',
      header: () => (
        <AlignRight>
          {translate('routes.congregation.informationboard.table.actions')}
        </AlignRight>
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link href={`./informationboard/${id}`}>
            {translate('common.edit')}
          </Link>
        </AlignRight>
      ),
    },
  ];

  return (
    <>
      <Table
        ref={tableRef}
        columns={columns}
        data={informationboardState}
        onLineAction={({ original }) => {
          push(`./informationboard/${original.id}`);
        }}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              push('./informationboard/new');
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              push(`./informationboard/${data[0].id}`);
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
          translate('routes.congregation.informationboard.delete-modal', {
            length: Number(tableRef.current?.getSelectedRowModel().rows.length),
          }),
        )}
        onConfirm={async () => {
          const selectedRows = refGuard(tableRef)
            ?.getSelectedRowModel()
            .rows.map((row) => row.original);

          setInformationBoardState(
            informationboardState.filter(
              (informationboard) => !selectedRows.includes(informationboard),
            ),
          );

          startTransition(() => {
            deleteInformationBoard(selectedRows).then((e) => e && toast.error(e.message));
          });
          refGuard(tableRef).resetRowSelection();
        }}
      />
    </>
  );
}
