'use client';

import {
  useEffect,
  useMemo,
  type FormEvent,
  type PropsWithChildren,
} from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type FormState,
  type Path,
} from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import type { ZodType, ZodTypeDef } from 'zod';

import type { ActionResponse } from '~/actions/types';
import type { ErrorsApiListType } from '~/global-context/saving';
import { useSave } from '~/hooks/use-save';

import { FormBuilder, type FormBuilderProps } from './form-builder';

export function Form<
  TOutputField = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TFieldValues extends FieldValues = FieldValues,
>({
  children,
  schema,
  defaultValues,
  serverAction,
  mode = 'onChange',
  builder,
  disabled,
  onFormStatusChange,
  onFormApiSuccess,
  onFormApiErrors,
}: PropsWithChildren<{
  schema: ZodType<TOutputField, TDef, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  serverAction: (data: object) => ActionResponse<object>;
  mode?: 'onChange' | 'onSubmit';
  builder?: FormBuilderProps;
  disabled?: boolean;
  onFormStatusChange?: (formState: FormState<TFieldValues>) => void;
  onFormApiSuccess?: (success: any) => void;
  onFormApiErrors?: (errors: ErrorsApiListType) => void;
}>) {
  const idInstance = useMemo(() => uuid(), []);
  const {
    addSavingData,
    errorsList,
    removeErrorsApi,
    successApiList,
    removeSuccessApi,
  } = useSave();

  const methods = useForm({
    mode,
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data: TFieldValues): void => {
    // debugger;
    addSavingData({
      serverAction,
      formData: data,
      id: idInstance,
    });
  };

  useEffect(() => {
    const success = successApiList.find(
      (success) => success.formIntanceId === idInstance,
    );
    if (success) {
      onFormApiSuccess?.(success);
    }
    removeSuccessApi(idInstance);
  }, [successApiList.length]);

  useEffect(() => {
    const error = errorsList.find(
      (error) => error.formIntanceId === idInstance,
    );
    if (error) {
      onFormApiErrors?.(error);
      methods.setError(
        error.field as Path<TFieldValues>,
        {
          type: 'api',
          message: error.message,
        },
        { shouldFocus: true },
      );
    }
  }, [errorsList.length]);

  useEffect(() => {
    onFormStatusChange?.(methods.formState);
  }, [methods.formState]);

  useEffect(() => {
    const subscription = methods.watch(() => {
      removeErrorsApi(idInstance);
      if (mode === 'onChange') {
        methods.handleSubmit(onSubmit)();
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'onSubmit') {
      methods.handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <form id="form-context" onSubmit={submitForm}>
        {builder && <FormBuilder {...builder} disabled={disabled} />}
        {children}
      </form>
    </FormProvider>
  );
}
