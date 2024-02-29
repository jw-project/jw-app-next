'use client';

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { usePathname } from 'next/navigation';

export const TransitionContext = createContext<{
  transitioning: boolean;
  setTransition: () => void;
}>({
  transitioning: true,
  setTransition: () => {},
});

export const TransitionProvider = ({ children }: PropsWithChildren) => {
  const [transitioning, setTransitioning] = useState(false);
  const router = usePathname();

  useEffect(() => {
    setTransitioning(false);
  }, [router]);

  const setTransition = () => {
    setTransitioning(true);
  };

  return (
    <TransitionContext.Provider value={{ transitioning, setTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
