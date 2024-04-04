'use client';

// import react
import { startTransition, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import next
import { useRouter } from 'next/navigation';

import type { CoreOptions } from '@tanstack/react-table';
import toast from 'react-hot-toast';

import { deleteInformationBoard } from '~/actions/congregation/information-board/delete';
//import commons and hooks
import { AlignRight } from '~/components/align';
import { Modal } from '~/components/commons/modal';
import type { ModalRefProps } from '~/components/commons/modal/types';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { DateCell, selectorForTable } from '~/components/commons/table/utils';
import { refGuard } from '~/components/commons/utils/ref-guard';
// import InformationBoard
import type { InformationBoardEntity } from '~/entities/information-board';
import { useTranslation } from '~/hooks/use-translation';

export function InformationBoardTable({
  informationBoard,
}: {
  informationBoard: InformationBoardEntity[];
}) {
  const tableRef = useRef<TableRefProps<InformationBoardEntity>>(null);
  const deleteModalRef = useRef<ModalRefProps>(null);
  const [informationBoardState, setInformationBoardState] =
    useState<InformationBoardEntity[]>(informationBoard);
  const { translate } = useTranslation();
  const { push } = useRouter();

  useEffect(() => {
    setInformationBoardState(informationBoard);
  }, [informationBoard]);

  const columns: CoreOptions<InformationBoardEntity>['columns'] = [
    ...selectorForTable<InformationBoardEntity>(),
    {
      id: 'title',
      header: () =>
        translate(
          'routes.congregation.informationBoard.table.informationBoard',
        ),
      cell: ({ row }) => {
        const { title, type } = row.original;

        return (
          <TextDescriptionCell
            text={title}
            description={String(
              translate(`enum.informationBoard-type.${type}`),
            )}
          />
        );
      },
    },
    {
      id: 'date',
      header: () =>
        translate('routes.congregation.informationBoard.table.date'),
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;

        return <DateCell startDate={startDate} endDate={endDate} />;
      },
    },
    {
      id: 'edit',
      header: () => (
        <AlignRight>
          {translate('routes.congregation.informationBoard.table.actions')}
        </AlignRight>
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link href={`./informationBoard/${id}`}>
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
        data={informationBoardState}
        onLineAction={({ original }) => {
          push(`./informationBoard/${original.id}`);
        }}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              push('./informationBoard/new');
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              push(`./informationBoard/${data[0].id}`);
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
          translate('routes.congregation.informationBoard.delete-modal', {
            length: Number(tableRef.current?.getSelectedRowModel().rows.length),
          }),
        )}
        onConfirm={async () => {
          const selectedRows = refGuard(tableRef)
            ?.getSelectedRowModel()
            .rows.map((row) => row.original);

          setInformationBoardState(
            informationBoardState.filter(
              (informationBoard) => !selectedRows.includes(informationBoard),
            ),
          );

          startTransition(() => {
            deleteInformationBoard(selectedRows).then(
              (e) => e && toast.error(e.message),
            );
          });
          refGuard(tableRef).resetRowSelection();
        }}
      />
    </>
  );
}
