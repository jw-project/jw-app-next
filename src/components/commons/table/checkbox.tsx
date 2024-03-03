'use client';

import { useEffect, useRef, type HTMLProps } from 'react';

import { w } from 'windstitch';

const CheckboxStyled = w.input(`
  relative
  w-4
  h-4
  text-blue-600
  bg-gray-100
  border-gray-300
  rounded
  dark:bg-gray-700
  dark:border-gray-600
  after:content-['']
  after:absolute
  after:-top-4
  after:-left-5
  after:-bottom-4
  after:-right-5

`);

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  as: _as,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <CheckboxStyled type="checkbox" ref={ref} className={className} {...rest} />
  );
}
