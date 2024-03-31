'use server';

import type { PropsWithChildren } from "react";

import { loadInformationBoard } from "~/actions/congregation/informationboard/load";
import { InformationBoardTable };

export default async function InformationBoardLayout ({ children }: PropsWithChildren) {
    const { informationboard } = await loadInformationBoard();

    return (
        <>
            <InformationBoardTable informationboard={informationboard} />
            {children}
        </>
    );
}