'use client';

import type { PropsWithChildren } from 'react';

import { Transition as TransitionHeadless } from '@headlessui/react';

import { BodyMargin } from '~/components/body/body-margin';

export function Transition({ children }: PropsWithChildren) {
  const { show } = { show: true }; //useTransition();

  return (
    <TransitionHeadless
      as={BodyMargin}
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </TransitionHeadless>
  );
}
