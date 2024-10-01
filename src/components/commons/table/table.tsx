'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  type Context,
  type ReactElement,
  type Ref,
  type RefObject,
} from 'react';

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as ReactTableType,
} from '@tanstack/react-table';

import { EmptyState } from '../empty-state';
import { TableWrapperStyled } from './styled';
import { TableButtonGroup } from './table-button-group';
import { TableComponent } from './table-component';
import type { TableContextProps, TableProps, TableRefProps } from './types';

const TableContext = createContext<TableContextProps<object>>({
  table: {} as ReactTableType<object>,
  onLineDoubleClick: () => {},
});

const TableProvider = forwardRef(
  <Data extends object>(
    {
      columns,
      data,
      buttons,
      options,
      lineAsLink,
      onLineClick,
      onLineDoubleClick,
    }: TableProps<Data>,
    ref: Ref<TableRefProps<Data>>,
  ) => {
    const table = useReactTable<Data>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      defaultColumn: {
        size: 0,
        minSize: 0,
      },
    });

    useImperativeHandle(ref, () => table, [table]);

    return (
      <TableContext.Provider
        value={
          {
            table,
            buttons,
            options,
            lineAsLink,
            onLineClick,
            onLineDoubleClick,
          } as unknown as TableContextProps<object>
        }
      >
        {!Boolean(data.length) && <EmptyState />}
        {Boolean(data.length) && (
          <TableWrapperStyled
            shadow={options?.hasShadow === undefined || options.hasShadow}
            style={{ minWidth: `${options?.minSize}px` }}
          >
            <TableButtonGroup />
            <TableComponent />
          </TableWrapperStyled>
        )}
      </TableContext.Provider>
    );
  },
);

TableProvider.displayName = 'Table';

export const useTableContext = <Data extends object>() =>
  useContext<TableContextProps<Data>>(
    TableContext as unknown as Context<TableContextProps<Data>>,
  );

export const Table = TableProvider as <Data extends object>(
  p: TableProps<Data> & { ref?: RefObject<TableRefProps<Data>> },
) => ReactElement;
