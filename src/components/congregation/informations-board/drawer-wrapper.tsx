'use client';

import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Drawer } from '~/components/commons/drawer';
import { DrawerFooterNavigate } from '~/components/commons/drawer/drawer-footer-navigate';
import type { DrawerRefProps } from '~/components/commons/drawer/types';

import { useInformationBoardPage } from './context';

export function DrawerWrapper({ children }: PropsWithChildren) {
  const formDrawerRef = useRef<DrawerRefProps>(null);
  const { push } = useRouter();
  const { slug } = useParams();
  const { informationsBoard } = useInformationBoardPage();

  useEffect(() => {
    if (slug && !formDrawerRef.current?.isOpen) {
      formDrawerRef.current?.openDrawer();
    }
  }, [slug]);

  const onClose = () => {
    push('../informations-board');
  };

  return (
    <Drawer
      size="large"
      ref={formDrawerRef}
      onClose={onClose}
      footer={() => (
        <DrawerFooterNavigate
          baseUrl="/congregation/informations-board"
          navigatorData={informationsBoard}
          paramKey="slug"
        />
      )}
    >
      {children}
    </Drawer>
  );
}
