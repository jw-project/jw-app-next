'use client';

import { flexRender } from '@tanstack/react-table';

import {
  SelectedIndicatorStyled,
  TableCellStyled,
  TableHeadCellStyled,
  TableHeadStyled,
  TableRowDivStyled,
  TableRowLinkStyled,
  TableStyled,
} from './styled';
import { useTableContext } from './table';
import { SortArrows } from './utils';

export function TableComponent<Data extends object>() {
  const { table, options, lineAsLink, onLineClick, onLineDoubleClick } =
    useTableContext<Data>();
  const TableRow = lineAsLink ? TableRowLinkStyled : TableRowDivStyled;

  return (
    <TableStyled>
      <TableHeadStyled>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex justify-between">
            {headerGroup.headers.map((header) => (
              <TableHeadCellStyled
                key={header.id}
                flex={!header.column.getSize()}
                style={{
                  width: header.column.getSize(),
                }}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </div>
                <SortArrows sortDirection={header.column.getIsSorted()} />
              </TableHeadCellStyled>
            ))}
          </div>
        ))}
      </TableHeadStyled>
      <div>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => onLineClick?.(row)}
            onDoubleClick={() => onLineDoubleClick?.(row)}
            selected={row.getIsSelected()}
            cursor={options?.cursor}
            href={String(lineAsLink?.(row))}
            className="flex justify-between"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCellStyled
                key={cell.id}
                flex={!cell.column.getSize()}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {row.getIsSelected() && cell.column.getIsFirstColumn() && (
                  <SelectedIndicatorStyled />
                )}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCellStyled>
            ))}
          </TableRow>
        ))}
      </div>
      <div className="min-h-[6px]">
        {table.getFooterGroups().map((footerGroup) => (
          <div key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <div key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </TableStyled>
  );
}
