'use server';

import type { PropsWithChildren } from 'react';

import { loadInformationsBoard } from '~/actions/congregation/informations-board/load';
import { InformationBoardPageProvider } from '~/components/congregation/informations-board/context';
import { DrawerWrapper } from '~/components/congregation/informations-board/drawer-wrapper';
import { InformationsBoardTable } from '~/components/congregation/informations-board/table';

export default async function InformationBoardLayout({
  children,
}: PropsWithChildren) {
  const { informationsBoard } = await loadInformationsBoard();

  return (
    <InformationBoardPageProvider informationsBoard={informationsBoard}>
      <InformationsBoardTable />
      <DrawerWrapper>{children}</DrawerWrapper>
    </InformationBoardPageProvider>
  );
}
