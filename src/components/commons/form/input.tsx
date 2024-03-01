'use client';

import {
  type DetailedHTMLProps,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '~/hooks/use-theme';

import { Icon, type IconProps } from '../icon';
import { FieldArea } from './field-area';
import { inputBaseFactory, InputIconWrapper } from './style-base';
import type { InputType } from './types';

const InputStyled = inputBaseFactory(
  'input',
  '[&::-webkit-calendar-picker-indicator]:opacity-0',
);

const inputTypes: Partial<Record<HTMLInputTypeAttribute, IconProps>> = {
  time: {
    icon: 'watch_later',
    size: 'icon-x-small',
  },
  date: {
    icon: 'calendar_today',
    size: 'icon-x-small',
  },
};

export function Input({
  name,
  label,
  type,
  disabled,
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputType): JSX.Element {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const { theme } = useTheme();
  const icon = type && inputTypes[type];

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <InputStyled
              id={name}
              {...field}
              ref={ref}
              error={Boolean(errors[name])}
              {...props}
              type={type}
              disabled={disabled}
              style={{ colorScheme: theme }}
            />
            {icon && (
              <InputIconWrapper disabled={disabled}>
                <Icon {...icon} />
              </InputIconWrapper>
            )}
          </div>
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
