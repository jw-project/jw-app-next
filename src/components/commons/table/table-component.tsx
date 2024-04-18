'use client';

import { flexRender } from '@tanstack/react-table';

import {
  SelectedIndicatorStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
  TableStyled,
} from './styled';
import { useTableContext } from './table';

export function TableComponent<Data extends object>() {
  const { table, grid, onLineClick, onLineDoubleClick } =
    useTableContext<Data>();

  return (
    <TableStyled>
      <TableHeadStyled>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-6 py-3">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </TableHeadStyled>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRowStyled
            key={row.id}
            onClick={() => onLineClick?.(row)}
            onDoubleClick={() => onLineDoubleClick?.(row)}
            selected={row.getIsSelected()}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCellStyled key={cell.id} grid={Boolean(grid)}>
                {row.getIsSelected() && cell.column.getIsFirstColumn() && (
                  <SelectedIndicatorStyled />
                )}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCellStyled>
            ))}
          </TableRowStyled>
        ))}
      </tbody>
      <tfoot className="min-h-[6px]">
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </TableStyled>
  );
}
