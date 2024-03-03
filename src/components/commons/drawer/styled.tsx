import { w } from 'windstitch';

export const DrawerWrapperStyled = w.div(
  `
    fixed
    flex
    flex-col
    top-0
    right-0
    z-50
    h-screen
    transition-transform
    bg-white
    dark:bg-gray-800
`,
  {
    variants: {
      open: (open: boolean) => (open ? '' : 'translate-x-full'),
      size: {
        small: 'w-1/4',
        medium: 'w-1/3',
        large: 'w-1/2',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const DrawerHeaderStyled = w.div(`
    flex
    items-center
    justify-between
    px-4
    py-2
    max-h-[53px]
    min-h-[53px]
    border-b
    dark:border-gray-700
`);

export const DrawerCloseButtonStyled = w.button(`
    text-gray-400
    bg-transparent
    hover:bg-gray-200
    hover:text-gray-900
    rounded-lg
    text-sm
    w-8
    h-8
    absolute
    top-2.5
    right-2.5
    inline-flex
    items-center
    justify-center
    dark:hover:bg-gray-600
    dark:hover:text-white
`);

export const DrawerContentStyled = w.div(`
    flex-1
    h-fit
    overflow-y-auto
    p-4
`);

export const DrawerFooterStyled = w.div(`
    flex
    items-center
    justify-between
    px-4
    py-2
    border-t
    dark:border-gray-700
`);
