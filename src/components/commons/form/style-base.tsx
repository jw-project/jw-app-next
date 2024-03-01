import { w } from 'windstitch';
import type { Component } from 'windstitch/dist/types';

export const Label = w.label(`
  block
  uppercase
  tracking-wide
  transition-colors
  text-gray-600
  dark:text-gray-200
  text-xs
  font-bold
  mb-2
`);

export const InputIconWrapper = w.div(
  `
  pointer-events-none
  absolute
  inset-y-0
  right-0
  flex
  items-center
  px-2
  transition-colors
  dark:text-gray-300
`,
  {
    variants: {
      disabled: (disabled?: boolean) => (disabled ? 'text-gray-500' : ''),
    },
    defaultVariants: {
      disabled: false,
    },
    transient: ['disabled'],
  },
);

type InputType = 'input' | 'select' | 'textarea';

type ComponentReturn<Type extends InputType> = Component<
  Type,
  {
    error: (error?: boolean) => string;
  },
  {
    error: boolean;
  }
>;

export function inputBaseFactory(
  inputType: 'input',
  className?: string,
): ComponentReturn<'input'>;

export function inputBaseFactory(
  inputType: 'select',
  className?: string,
): ComponentReturn<'select'>;

export function inputBaseFactory(
  inputType: 'textarea',
  className?: string,
): ComponentReturn<'textarea'>;

export function inputBaseFactory(inputType: InputType, className = '') {
  return w[inputType](
    `
    block
    disabled:bg-gray-200
    disabled:cursor-not-allowed
    disabled:text-gray-500
    w-full
    transition-colors
    bg-gray-50
    dark:bg-slate-800
    text-gray-700
    dark:text-white
    border
    dark:border-gray-700
    rounded
    py-3
    pl-4
    pr-2
    mb-3
    ${className}
  `,
    {
      variants: {
        error: (error?: boolean) => (error ? 'border-red-500' : ''),
      },
      defaultVariants: {
        error: false,
      },
      transient: ['error'],
    },
  );
}
