import { w } from 'windstitch';

export const TableWrapperStyled = w.div(``, {
  variants: {
    grid: (grid: boolean) => (grid ? '' : 'shadow-md rounded-md pb-2'),
  },
});

export const TableStyled = w.table(`
  w-full
  text-sm
  text-left
  text-gray-500
  dark:text-gray-400
`);

export const TableHeadStyled = w.thead(`
  text-xs
  text-gray-700
  uppercase
  bg-gray-50
  dark:bg-gray-700
  dark:text-gray-400
`);

export const TableRowStyled = w.tr(
  `
  border-b
  dark:border-gray-700
  relative
`,
  {
    variants: {
      selected: (selected: boolean) =>
        selected
          ? 'bg-gray-100 dark:bg-gray-700'
          : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600',
    },
  },
);

export const TableCellStyled = w.td(``, {
  variants: {
    grid: (grid: boolean) => (grid ? 'p-2' : 'px-6 py-4'),
  },
});

export const SelectedIndicatorStyled = w.div(
  `
  w-1
  h-full
  absolute
  top-0
  left-0
  bg-blue-500
  dark:bg-blue-400
`,
);
