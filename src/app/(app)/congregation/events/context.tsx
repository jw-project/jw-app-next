'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import type { EventEntity } from '~/entities/event';

type EventPageContextType = {
  events: EventEntity[];
};

export const EventPageContext = createContext<EventPageContextType>({
  events: [],
});

export const EventPageProvider = ({
  children,
  events,
}: PropsWithChildren<EventPageContextType>) => {
  return (
    <EventPageContext.Provider value={{ events }}>
      {children}
    </EventPageContext.Provider>
  );
};

export const useEventPage = () => {
  return useContext(EventPageContext);
};
