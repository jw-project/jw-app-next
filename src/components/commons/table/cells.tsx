'use client';

import { useEffect, useState } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

export const TextDescriptionCell = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <>
      <div className="text-base font-semibold text-gray-950 dark:text-gray-500">
        {text}
      </div>
      <div className="font-normal text-gray-500">{description}</div>
    </>
  );
};

export function gridEditableColumn<T>(): Partial<ColumnDef<T>> {
  return {
    cell: ({ getValue }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);

      const onChange = (e: string) => {
        setValue(e);
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <input
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      );
    },
  };
}
