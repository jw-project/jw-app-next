'use client';

// import react
import { startTransition, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import next
import { useRouter } from 'next/navigation';

import type { CoreOptions } from '@tanstack/react-table';
import toast from 'react-hot-toast';

import { deleteInformationsBoard } from '~/actions/congregation/informations-board/delete';
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

export function InformationsBoardTable({
  informationsBoard,
}: {
  informationsBoard: InformationBoardEntity[];
}) {
  const tableRef = useRef<TableRefProps<InformationBoardEntity>>(null);
  const deleteModalRef = useRef<ModalRefProps>(null);
  const [informationsBoardState, setInformationsBoardState] =
    useState<InformationBoardEntity[]>(informationsBoard);
  const { translate } = useTranslation();
  const { push } = useRouter();

  useEffect(() => {
    setInformationsBoardState(informationsBoard);
  }, [informationsBoard]);

  const columns: CoreOptions<InformationBoardEntity>['columns'] = [
    ...selectorForTable<InformationBoardEntity>(),
    {
      id: 'title',
      header: () =>
        translate(
          'routes.congregation.informationsBoard.table.informationBoard',
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
        translate('routes.congregation.informationsBoard.table.date'),
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;

        return <DateCell startDate={startDate} endDate={endDate} />;
      },
    },
    {
      id: 'edit',
      header: () => (
        <AlignRight>
          {translate('routes.congregation.informationsBoard.table.actions')}
        </AlignRight>
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link href={`./informationsBoard/${id}`}>
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
        data={informationsBoardState}
        onLineAction={({ original }) => {
          push(`./informationsBoard/${original.id}`);
        }}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              push('./informationsBoard/new');
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              push(`./informationsBoard/${data[0].id}`);
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
          translate('routes.congregation.informationsBoard.delete-modal', {
            length: Number(tableRef.current?.getSelectedRowModel().rows.length),
          }),
        )}
        onConfirm={async () => {
          const selectedRows = refGuard(tableRef)
            ?.getSelectedRowModel()
            .rows.map((row) => row.original);

          setInformationsBoardState(
            informationsBoardState.filter(
              (informationBoard) => !selectedRows.includes(informationBoard),
            ),
          );

          startTransition(() => {
            deleteInformationsBoard(selectedRows).then(
              (e) => e && toast.error(e.message),
            );
          });
          refGuard(tableRef).resetRowSelection();
        }}
      />
    </>
  );
}
