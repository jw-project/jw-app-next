import { w } from 'windstitch';

export const NavbarBase = w.nav(`
    top-0
    left-0
    right-0
    fixed
    flex
    transition-colors
    bg-white
    dark:bg-slate-800
    h-14
    border-b
    border-gray-200
    dark:border-gray-700
    z-10
    lg:pl-60
    w-auto
`);

export const NavbarStart = w.div(`
    flex-1
    items-stretch
    flex
    h-14
`);

export const NavbarItem = w.div(
  `
    flex
    justify-center
    items-center
    py-2
    px-3
    w-16
`,
  {
    variants: {
      divider: (divider: boolean) =>
        divider ? 'border-r border-gray-100 dark:border-gray-700' : '',
    },
    defaultVariants: { divider: false },
    transient: ['divider'],
  },
);

export const NavbarEnd = w.div(`
    flex
    items-stretch
`);
