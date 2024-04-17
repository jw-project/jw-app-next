'use server';

import type { PropsWithChildren } from 'react';

import { loadInformationsBoard } from '~/actions/congregation/informations-board/load';
import { InformationsBoardTable } from '~/components/congregation/informations-board/table';

export default async function InformationBoardLayout({
  children,
}: PropsWithChildren) {
  const { informationsBoard } = await loadInformationsBoard();

  return (
    <>
      <InformationsBoardTable informationsBoard={informationsBoard} />
      {children}
    </>
  );
}
