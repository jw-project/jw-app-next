'use server';

import type { PropsWithChildren } from 'react';

import { loadInformationBoard } from '~/actions/congregation/information-board/load';
import { InformationBoardTable } from '~/components/congregation/information-board/table';

export default async function InformationBoardLayout({
  children,
}: PropsWithChildren) {
  const { informationBoard } = await loadInformationBoard();

  return (
    <>
      <InformationBoardTable informationBoard={informationBoard} />
      {children}
    </>
  );
}
