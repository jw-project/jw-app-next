'use client';

import { createContext, useState, type PropsWithChildren } from 'react';

import axios, { type AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// import { useRevalidator } from '~/hooks/use-revalidate';
// import type { HttpError, InputError } from '~/services/api/throws-errors';

type SavingDataType = {
  url: string;
  formData: object;
  id: string;
};

type SavingDataTypeInternal = SavingDataType & {
  timeout: NodeJS.Timeout;
};

type FormInstance = {
  formIntanceId: string;
};

export type ErrorsApiListType = InputError & FormInstance;

type SavingContextType = {
  savingData: Array<SavingDataTypeInternal>;
  isSaving: boolean;
  addSavingData: (newData: SavingDataType) => void;
  removeSavingData: (removeData: SavingDataType) => void;
  // success control
  successApiList: Array<any>;
  removeSuccessApi: (id: string) => void;
  addSuccessApi: (obj: any) => void;
  // errors control
  errorsList: Array<ErrorsApiListType>;
  removeErrorsApi: (id: string) => void;
  // force revalidate
  forceRevalidate: () => void;
};

//

export const SavingContext = createContext({} as SavingContextType);

export const SavingProvider = ({ children }: PropsWithChildren) => {
  const [savingData, setSavingData] = useState<Array<SavingDataTypeInternal>>(
    [],
  );
  const [mustRevalidate, setMustRevalidate] = useState(false);
  // const { revalidate } = useRevalidator();
  const isSaving = Boolean(savingData.length);

  const forceRevalidate = () => setMustRevalidate(true);

  function instanceOfInputError(object: any): object is InputError {
    return 'message' in object && 'field' in object;
  }

  const instanceTimeout = (newData: SavingDataType) => {
    return setTimeout(async () => {
      try {
        const response = await axios.post(
          `/${newData.url}`.replace(/^\/{2,}/, '/'),
          newData.formData,
        );
        addSuccessApi({ ...response.data, formIntanceId: newData.id });
      } catch (e) {
        const axiosError = e as AxiosError<HttpError>;

        if (
          axiosError.response &&
          instanceOfInputError(axiosError.response.data)
        ) {
          const responseError = axiosError.response.data;
          addErrorsApi({
            formIntanceId: newData.id,
            field: responseError.field,
            message: responseError.message,
          });
        }

        if (axiosError.response?.data.feedback) {
          toast.error(axiosError.response?.data.message);
        }

        console.error('Error saving data:', axiosError.message);
      } finally {
        removeSavingData(newData);
      }
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
      const newSavingData = current.filter(({ id }) => id !== removeData.id);
      if (newSavingData.length === 0 && mustRevalidate) {
        // revalidate();
        setMustRevalidate(false);
      }

      return newSavingData;
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
        //
        forceRevalidate,
      }}
    >
      {children}
    </SavingContext.Provider>
  );
};
