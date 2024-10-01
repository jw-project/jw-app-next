import Link from 'next/link';

import { w } from 'windstitch';

import type { TailwindCursor } from '~/styles/types';

export const TableWrapperStyled = w.div(
  `
  rounded-md
  pb-2
  `,
  {
    variants: {
      shadow: (shadow: boolean) => (shadow ? 'shadow-md' : ''),
    },
  },
);

export const TableStyled = w.div(`
  w-full
  text-sm
  text-left
  text-gray-500
  dark:text-gray-400
`);

export const TableHeadStyled = w.div(`
  text-xs
  text-gray-700
  uppercase
  bg-gray-50
  dark:bg-gray-700
  dark:text-gray-400
`);

export const TableRowDivStyled = w.div(
  `
  border-b
  dark:border-gray-700
  relative
`,
  {
    variants: {
      href: (_value: string) => '',
      cursor: (cursor: TailwindCursor) => cursor,
      selected: (selected: boolean) =>
        selected
          ? 'bg-gray-100 dark:bg-gray-700'
          : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600',
    },
    defaultVariants: {
      href: '',
      cursor: 'default',
    },
  },
);

export const TableRowLinkStyled = w(Link, {
  className: `
  border-b
  dark:border-gray-700
  relative
`,
  variants: {
    cursor: (cursor: TailwindCursor) => cursor,
    selected: (selected: boolean) =>
      selected
        ? 'bg-gray-100 dark:bg-gray-700'
        : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600',
  },
  defaultVariants: {
    cursor: 'default',
  },
});

export const TableCellStyled = w.div(
  `
  px-6
  py-4`,
  {
    variants: {
      flex: (flex: boolean) => (flex ? 'flex-1' : ''),
    },
  },
);

export const TableHeadCellStyled = w.div(
  `
  flex
  items-center
  gap-2
  px-6
  py-3
  font-bold
`,
  {
    variants: {
      flex: (flex: boolean) => (flex ? 'flex-1' : ''),
    },
  },
);

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
