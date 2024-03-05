'use client';

import {
  createContext,
  startTransition,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import type { FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { ActionResponsePromise } from '~/actions/types';

type SavingDataType<TFieldValues extends FieldValues = object> = {
  serverAction: (data: TFieldValues) => ActionResponsePromise<TFieldValues>;
  formData: TFieldValues;
  id: string;
};

type SavingDataTypeInternal<TFieldValues extends FieldValues = object> =
  SavingDataType<TFieldValues> & {
    timeout: NodeJS.Timeout;
  };

type FormInstance = {
  formIntanceId: string;
};

export type ErrorsApiListType = {
  field: string;
  message: string;
} & FormInstance;

export type SavingContextType<TFieldValues extends FieldValues = object> = {
  savingData: Array<SavingDataTypeInternal<TFieldValues>>;
  isSaving: boolean;
  addSavingData: (newData: SavingDataType<TFieldValues>) => void;
  removeSavingData: (removeData: SavingDataType<TFieldValues>) => void;
  // success control
  successApiList: Array<any>;
  removeSuccessApi: (id: string) => void;
  addSuccessApi: (obj: any) => void;
  // errors control
  errorsList: Array<ErrorsApiListType>;
  removeErrorsApi: (id: string) => void;
};

//

export const SavingContext = createContext({} as SavingContextType);

export const SavingProvider = ({ children }: PropsWithChildren) => {
  const [savingData, setSavingData] = useState<Array<SavingDataTypeInternal>>(
    [],
  );
  const isSaving = useMemo(() => Boolean(savingData.length), [savingData]);

  const instanceTimeout = (newData: SavingDataType) => {
    return setTimeout(() => {
      startTransition(() => {
        newData
          .serverAction(newData.formData)
          .then((response) => {
            if (response.success) {
              addSuccessApi({ ...response, formIntanceId: newData.id });
            } else {
              if (response.field) {
                addErrorsApi({
                  formIntanceId: newData.id,
                  field: response.field,
                  message: response.message,
                });

                return;
              }

              if (response.message) {
                toast.error(response.message);
              }

              console.error('Error saving data:', response.message);
            }
          })
          .finally(() => {
            removeSavingData(newData);
          });
      });
    }, 2000);
  };

  const addSavingData = (newData: SavingDataType) => {
    setSavingData((current) => {
      const currentData = current.find(({ id }) => id === newData.id);

      if (currentData) {
        clearTimeout(currentData.timeout);

        return current.map((data) =>
          data.id === newData.id
            ? {
                ...data,
                formData: newData.formData,
                timeout: instanceTimeout(newData),
              }
            : data,
        );
      } else {
        return [...current, { ...newData, timeout: instanceTimeout(newData) }];
      }
    });
  };

  const removeSavingData = (removeData: SavingDataType) => {
    setSavingData((current) => {
      return current.filter(({ id }) => id !== removeData.id);
    });
  };

  //

  // success control
  const [successApiList, setSuccessApiList] = useState<Array<any>>([]);
  const removeSuccessApi = (id: string) =>
    setSuccessApiList((current) =>
      current.filter((c) => c.formIntanceId !== id),
    );
  const addSuccessApi = (obj: any) =>
    setSuccessApiList((current) => [...current, obj]);

  //

  // errors control
  const [errorsList, setErrorsList] = useState<Array<ErrorsApiListType>>([]);
  const removeErrorsApi = (idToRemove: string) =>
    setErrorsList((current) =>
      current.filter((c) => c.formIntanceId !== idToRemove),
    );
  const addErrorsApi = (obj: ErrorsApiListType) =>
    setErrorsList((current) => [...current, obj]);

  return (
    <SavingContext.Provider
      value={{
        savingData,
        isSaving,
        addSavingData,
        removeSavingData,
        //
        successApiList,
        addSuccessApi,
        removeSuccessApi,
        //
        errorsList,
        removeErrorsApi,
      }}
    >
      {children}
    </SavingContext.Provider>
  );
};
