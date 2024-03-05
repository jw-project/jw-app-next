import { useContext } from 'react';

import type { FieldValues } from 'react-hook-form';

import { SavingContext, type SavingContextType } from '~/global-context/saving';

export const useSave = <T extends FieldValues>() =>
  useContext(SavingContext) as unknown as SavingContextType<T>;
