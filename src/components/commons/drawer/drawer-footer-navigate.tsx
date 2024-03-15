'use client';

import { startTransition, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';

export type DrawerFooterGenericExtends = Array<
  {
    id: string;
  } & object
>;

export type DrawerFooterProps<T extends DrawerFooterGenericExtends> = {
  navigatorData: T;
  paramKey: string;
  baseUrl: string;
};

export function DrawerFooterNavigate<
  T extends DrawerFooterGenericExtends = Array<any>,
>({ navigatorData, paramKey, baseUrl }: DrawerFooterProps<T>) {
  const router = useRouter();
  const params = useParams();
  const { translate } = useTranslation('common');

  if (!navigatorData) {
    return null;
  }

  const backClick = useCallback(() => {
    const currentIndex = navigatorData.findIndex(
      (obj) => obj.id === params[paramKey],
    );
    const previousId =
      currentIndex !== -1 && currentIndex !== 0
        ? navigatorData[currentIndex - 1]?.id
        : null;

    if (previousId) {
      startTransition(() => {
        router.push(`${baseUrl}/${previousId}`);
      });
    }
  }, [navigatorData, params]);

  const nextClick = useCallback(() => {
    const currentIndex = navigatorData.findIndex(
      (obj) => obj.id === params[paramKey],
    );
    const nextId =
      currentIndex !== -1 && currentIndex !== navigatorData.length - 1
        ? navigatorData[currentIndex + 1]?.id
        : null;

    if (nextId) {
      router.push(`${baseUrl}/${nextId}`);
    }
  }, [navigatorData, params]);

  const isFirst = useMemo(() => {
    return navigatorData[0]?.id === params[paramKey];
  }, [navigatorData, params]);

  const isLast = useMemo(() => {
    return navigatorData[navigatorData.length - 1]?.id === params[paramKey];
  }, [navigatorData, params]);

  const notFound = useMemo(() => {
    return navigatorData.findIndex((obj) => obj.id === params[paramKey]) === -1;
  }, [navigatorData, params]);

  return (
    <>
      <Button onClick={backClick} disabled={notFound || isFirst}>
        {translate('navegation-back-button')}
      </Button>
      <Button onClick={nextClick} disabled={notFound || isLast}>
        {translate('navegation-next-button')}
      </Button>
    </>
  );
}
