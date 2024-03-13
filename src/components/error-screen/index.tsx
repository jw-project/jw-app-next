'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import { w } from 'windstitch';

import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../commons/button';
import deny from './deny.jpg';
import error from './error.jpg';

const ErrorWrapper = w.div(`
  flex
  items-center
  justify-center
  w-auto
`);

const ErrorColumn = w.div(`
  xl:gap-16
  lg:gap-4
  lg:flex
`);

const ErrorColumnText = w.div(`
  flex
  flex-col
  items-center
  justify-center
  py-1
  lg:py-24
`);

const ErrorStatusCode = w.h1(`
  text-7xl
  font-bold
  text-blue-600
  dark:text-blue-400
`);

const ErrorTitle = w.p(`
  mb-2
  text-2xl
  font-bold
  text-center
  text-gray-800
  dark:text-gray-100
`);

const ErrorParagraph = w.p(`
  mb-8
  text-center
  text-lg
  text-gray-500
`);

const images: Record<number, StaticImageData> = {
  400: error,
  401: deny,
  403: deny,
  404: error,
};

export const BaseErrorScreen = ({
  status,
  message,
}: {
  status: number;
  message: string;
}) => {
  const { translate } = useTranslation();
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
      <ErrorWrapper>
        <ErrorColumn>
          <ErrorColumnText>
            <ErrorStatusCode>{status}</ErrorStatusCode>
            <ErrorTitle>
              <span className="text-red-500 dark:text-red-400">
                {translate('common.errors.error-title')}
              </span>{' '}
              {translate(message)}
            </ErrorTitle>
            <ErrorParagraph>
              {translate(`common.errors.${status}-description`)}
            </ErrorParagraph>
            <Button onClick={handleGoBack}>
              {translate('common.go-back')}
            </Button>
          </ErrorColumnText>
          <div className="mt-4">
            <Image
              src={images[status]}
              alt="error-img"
              className="object-cover w-full h-full"
            />
          </div>
        </ErrorColumn>
      </ErrorWrapper>
    </div>
  );
};
