'use client';

import { flexRender } from '@tanstack/react-table';
import { w } from 'windstitch';

import { useTableContext } from './table';

const TableStyled = w.table(`
  w-full
  text-sm
  text-left
  text-gray-500
  dark:text-gray-400
`);

const TableHeadStyled = w.thead(`
  text-xs
  text-gray-700
  uppercase
  bg-gray-50
  dark:bg-gray-700
  dark:text-gray-400
`);

const TableRowStyled = w.tr(`
  bg-white
  border-b
  dark:bg-gray-800
  dark:border-gray-700
  hover:bg-gray-50
  dark:hover:bg-gray-600
`);

export function TableComponent<Data extends object>() {
  const { table, onLineAction } = useTableContext<Data>();

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
            onDoubleClick={() => onLineAction?.(row)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-6 py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
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
