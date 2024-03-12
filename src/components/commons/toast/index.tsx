'use client';

import { ToastBar, Toaster, type ToastType } from 'react-hot-toast';

import { useTranslation } from '~/hooks/use-translation';

import { Icon, type IconProps } from '../icon';

export const Toast = () => {
  const { translate } = useTranslation();
  const iconType: Partial<Record<ToastType, IconProps>> = {
    success: {
      icon: 'check_circle',
      className: 'text-green-500 dark:text-green-400',
    },
    error: {
      icon: 'highlight_off',
      className: 'text-red-500 dark:text-red-400',
    },
    loading: {
      icon: 'autorenew',
    },
  };

  return (
    <Toaster
      toastOptions={{
        className:
          'text-gray-500 bg-gray-200 dark:text-gray-200 dark:bg-gray-700',
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {() => {
            const icon = t.type && iconType[t.type];

            return (
              <>
                {icon && <Icon {...icon} />}
                <div className="my-1 mx-2.5">
                  {translate(String(t.message))}
                </div>
              </>
            );
          }}
        </ToastBar>
      )}
    </Toaster>
  );
};
