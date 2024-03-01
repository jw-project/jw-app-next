'use client';

import { type DetailedHTMLProps, type SelectHTMLAttributes } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { useTheme } from '~/hooks/use-theme';

import { Icon } from '../icon';
import { FieldArea } from './field-area';
import { inputBaseFactory, InputIconWrapper } from './style-base';
import type { InputType } from './types';

export type SelectOptionsType = {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
};

const SelectStyled = inputBaseFactory('select', 'appearance-none opacity-100');

export function Select({
  name,
  label,
  options,
  disabled,
  ...props
}: DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  InputType & { options: SelectOptionsType[] }): JSX.Element {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const { theme } = useTheme();

  return (
    <FieldArea name={name} label={label}>
      <Controller
        render={({ field: { ref, ...field } }) => (
          <div className="relative">
            <SelectStyled
              id={name}
              {...field}
              ref={ref}
              error={Boolean(errors[name])}
              {...props}
              style={{ colorScheme: theme }}
              disabled={disabled}
            >
              {options.map(({ label: labelOpt, value, disabled, selected }) => (
                <option
                  key={value}
                  value={value}
                  disabled={disabled}
                  selected={selected}
                >
                  {labelOpt}
                </option>
              ))}
            </SelectStyled>
            <InputIconWrapper disabled={disabled}>
              <Icon icon="expand_more" />
            </InputIconWrapper>
          </div>
        )}
        control={control}
        name={name}
      />
    </FieldArea>
  );
}
