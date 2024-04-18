import Link from 'next/link';

import { w } from 'windstitch';

import { Icon } from '../icon';

export const TabsWrapper = w.div(`
    flex
    flex-col
    h-full
`);

export const TabsCard = w.ul(`
    rounded-b-lg
    bg-white
    shadow
    p-4
`);

export const TabsStyled = w.ul(`
    flex
    text-sm
    font-medium
    text-center
    text-gray-500
    overflow-x-auto
    rounded-t-lg
    bg-gray-100
    shadow
    scrollbar
    scrollbar-h-[2px]
    scrollbar-thumb-rounded-full
    scrollbar-thumb-slate-300
    scrollbar-track-white
`);

export const TabStyled = w.li(`
    mr-2
`);

export const TabLinkStyled = w(Link, {
  className: `
    inline-flex
    whitespace-nowrap
    p-4
    rounded-t-lg
    group
    border-r
    border-t
    border-l
`,
  variants: {
    selected: (selected: boolean) =>
      selected
        ? 'bg-white hover:bg-white text-gray-600'
        : 'enabled:hover:text-gray-600 enabled:hover:bg-gray-200',
    disabled: (disabled: boolean) =>
      disabled
        ? 'cursor-not-allowed text-gray-300 border-dashed border-gray-200'
        : 'border-transparent',
  },
  transient: ['disabled', 'selected'],
});

export const TabIconStyled = w(Icon, {
  className: `mr-2`,
  variants: {
    selected: (selected: boolean) =>
      selected ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
    disabled: (disabled: boolean) =>
      disabled ? 'hover:text-gray-400 group-hover:text-gray-400' : '',
  },
  transient: ['disabled', 'selected'],
});
