'use client';

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { useRouter } from 'next/router';

export const NavigatingContext = createContext<{
  loading: boolean;
}>({
  loading: true,
});

export const NavigatingProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <NavigatingContext.Provider value={{ loading }}>
      {children}
    </NavigatingContext.Provider>
  );
};
