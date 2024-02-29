import { w, type W } from 'windstitch';

export const Grid = w.div(
  `
  grid
  grid-cols-1
  gap-4
`,
  {
    variants: {
      cols: {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
      },
    },
    defaultVariants: {
      cols: 1,
    },
  },
);

export const Col = w.div(
  `
  col-span-1
`,
  {
    variants: {
      colSpan: {
        0: '',
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
        4: 'md:col-span-4',
      },
    },
    defaultVariants: {
      colSpan: 0,
    },
  },
);

export type GridProps = W.Infer<typeof Grid>;

export type ColProps = W.Infer<typeof Col>;
