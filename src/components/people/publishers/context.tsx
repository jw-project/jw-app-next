'use client';

import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useParams, usePathname } from 'next/navigation';

import { PublisherTabsEnum, type PublisherEntity } from '~/entities/publisher';

type PublishersPageProviderProps = {
  publishers: PublisherEntity[];
};

type PublishersPageContextType = {
  selectedPublisher: PublisherEntity | undefined;
  tabSelected: PublisherTabsEnum;
};

export const PublishersPageContext = createContext<
  PublishersPageProviderProps & PublishersPageContextType
>({} as PublishersPageProviderProps & PublishersPageContextType);

export const PublishersPageProvider = ({
  children,
  publishers,
}: PropsWithChildren<PublishersPageProviderProps>) => {
  const { slug } = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const selectedPublisher = useMemo(
    () => publishers.find((publisher) => publisher.id === slug),
    [slug],
  );
  const tabSelected = useMemo(
    () =>
      Object.values(PublisherTabsEnum).find((tab) => pathname.includes(tab)) ||
      PublisherTabsEnum.Information,
    [pathname],
  );

  return (
    <PublishersPageContext.Provider
      value={{ publishers, selectedPublisher, tabSelected }}
    >
      {children}
    </PublishersPageContext.Provider>
  );
};

export const usePublisherPage = () => {
  return useContext(PublishersPageContext);
};
