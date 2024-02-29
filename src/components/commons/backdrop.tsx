import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { w, type W } from 'windstitch';

import { useTheme } from '~/hooks/use-theme';

const BackdropStyled = w.div(
  `
  fixed
  inset-0
  bg-black/60
  dark:bg-white/20
`,
  {
    variants: {
      zindex: {
        0: 'z-0',
        10: 'z-10',
        20: 'z-20',
        30: 'z-30',
        40: 'z-40',
        50: 'z-50',
      },
    },
    defaultVariants: {
      zindex: 40,
    },
    transient: ['zindex'],
  },
);

export type ZIndex = W.Infer<typeof BackdropStyled>['zindex'];

export function Backdrop() {
  const { backdropIsShow, backdropZIndex } = useTheme();

  return (
    <Transition
      as={Fragment}
      show={backdropIsShow}
      enter="transform transition duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <BackdropStyled zindex={backdropZIndex} />
    </Transition>
  );
}
