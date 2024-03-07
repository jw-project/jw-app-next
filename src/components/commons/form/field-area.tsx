'use client';

import type { PropsWithChildren } from 'react';

import type { convertHtmlToReact } from '@hedgedoc/html-to-react';
import { useFormContext } from 'react-hook-form';
import { w } from 'windstitch';

import { ErrorLabel } from './error-label';
import { Label } from './style-base';

const FieldAreaWrapper = w.div(`
  w-full
`);

export const FieldArea = ({
  children,
  label,
  error,
  name,
}: PropsWithChildren<{
  name: string;
  label: ReturnType<typeof convertHtmlToReact>;
  error?: string;
}>) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FieldAreaWrapper>
      <Label htmlFor={name}>{label}</Label>
      {children}
      <ErrorLabel>{error || errors[name]?.message?.toString()}</ErrorLabel>
    </FieldAreaWrapper>
  );
};
