'use server';

import { loadInformationBoard } from '~/actions/congregation/informations-board/load';
import { InformationBoardForm } from '~/components/congregation/informations-board/form';

export default async function EditInformationBoardPage({
  params,
}: {
  params: { slug: string };
}) {
  const informationBoard = await loadInformationBoard({ id: params.slug });

  return <InformationBoardForm data={informationBoard} id={params.slug} />;
}
