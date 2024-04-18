'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import type { EventEntity } from '~/entities/event';

type EventPageProviderProps = {
  events: EventEntity[];
};

type EventPageContextType = {
  //
};

export const EventPageContext = createContext<
  EventPageProviderProps & EventPageContextType
>({
  events: [],
});

export const EventPageProvider = ({
  children,
  events,
}: PropsWithChildren<EventPageProviderProps>) => {
  return (
    <EventPageContext.Provider value={{ events }}>
      {children}
    </EventPageContext.Provider>
  );
};

export const useEventPage = () => {
  return useContext(EventPageContext);
};
