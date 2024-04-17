'use server';

import { loadInformationBoard } from '~/actions/congregation/informations-board/load';
import InformationBoardDrawer from '~/components/congregation/informations-board/drawer';

export default async function EditInformationBoardPage({
  params,
}: {
  params: { slug: string };
}) {
  const informationBoard = await loadInformationBoard({ id: params.slug });

  return (
    <InformationBoardDrawer
      informationBoard={informationBoard}
      informationBoardId={params.slug}
    />
  );
}
