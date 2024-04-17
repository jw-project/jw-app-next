'use client';

import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

import { Drawer } from '~/components/commons/drawer';
import type { DrawerRefProps } from '~/components/commons/drawer/types';
import type { InformationBoardEntity } from '~/entities/information-board';

import { InformationBoardForm } from './form';

export default function InformationBoardDrawer({
  informationBoard,
  informationBoardId,
}: PropsWithChildren<{
  informationBoard: InformationBoardEntity;
  informationBoardId: string;
}>) {
  const formDrawerRef = useRef<DrawerRefProps>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (!formDrawerRef.current?.isOpen) {
      formDrawerRef.current?.openDrawer();
    }
  }, []);

  const onClose = () => {
    push('../informationBoards');
  };

  return (
    <Drawer size="large" ref={formDrawerRef} onClose={onClose}>
      <InformationBoardForm id={informationBoardId} data={informationBoard} />
    </Drawer>
  );
}
