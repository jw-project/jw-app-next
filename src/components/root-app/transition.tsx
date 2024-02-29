'use client';

import type { PropsWithChildren } from 'react';

import { Transition as TransitionHeadless } from '@headlessui/react';

import { BodyMargin } from '~/components/body/body-margin';
import { useTransition } from '~/hooks/use-transition';

export function Transition({ children }: PropsWithChildren) {
  const { transitioning } = useTransition();

  return (
    <TransitionHeadless
      as={BodyMargin}
      show={!transitioning}
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
