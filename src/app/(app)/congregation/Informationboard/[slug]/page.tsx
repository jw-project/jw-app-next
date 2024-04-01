'use server';

import { loadInformationBoard } from "~/actions/congregation/informationboard/load";
import InformationBoardDrawer from "~/components/congregation/informationboard/drawer";

export default async function EditInformationBoardPage({
  params,
}: {
  params: { slug: string };
}) {
  const informationboard = await loadInformationBoard({ id: params.slug });

  return <InformationBoardDrawer informationboard={informationboard} informationboardId={params.slug}/>;
}
