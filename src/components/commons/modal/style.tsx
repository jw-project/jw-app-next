import { w } from 'windstitch';

export const ModalFullWrapperStyled = w.div(
  `
    overflow-hidden
    fixed
    top-0
    right-0
    left-0
    z-50
    flex
    justify-center
    items-center
    md:inset-0
    h-[calc(100%-1rem)]
    max-h-full
    pointer-events-none
`,
  {
    variants: {
      leftmargin: (e: boolean) => (e ? 'ml-60' : 'ml-0'),
    },
    defaultVariants: {
      leftmargin: false,
    },
  },
);

export const ModalBodyWrapperStyled = w.div(
  `
    relative
    p-4
    w-full
    max-w-md
    max-h-full
    
`,
  {
    variants: {
      visible: (e: boolean) =>
        e ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const ModalStyled = w.div(`
    relative
    bg-white
    rounded-lg
    shadow
    dark:bg-gray-700
`);

export const ModalAlertCloseButtonStyled = w.button(`
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

export const ModalContentStyled = w.div(`
    p-4
    md:p-5
    text-center
`);

export const ModalAlertTextStyled = w.h3(`
    mb-5
    text-lg
    font-normal
    text-gray-500
    dark:text-gray-400
`);

export const ModalAlertWrapperButtonStyled = w.div(`
    flex
    justify-center
    space-x-2
`);
