'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import type { InformationBoardEntity } from '~/entities/information-board';

type InformationBoardPageProviderProps = {
  informationsBoard: InformationBoardEntity[];
};

type InformationBoardContextType = {
  //
};

export const InformationBoardPageContext = createContext<
  InformationBoardPageProviderProps & InformationBoardContextType
>({
  informationsBoard: [],
});

export const InformationBoardPageProvider = ({
  children,
  informationsBoard,
}: PropsWithChildren<InformationBoardPageProviderProps>) => {
  return (
    <InformationBoardPageContext.Provider value={{ informationsBoard }}>
      {children}
    </InformationBoardPageContext.Provider>
  );
};

export const useInformationBoardPage = () => {
  return useContext(InformationBoardPageContext);
};
