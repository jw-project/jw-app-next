'use client';

import { useMemo } from 'react';

import { ButtonGroup, type ButtonGroupProps } from '../button-group';
import { useTableContext } from './table';

export const TableButtonGroup = () => {
  const { buttons, table } = useTableContext();

  if (!buttons) {
    return null;
  }

  const buttonPrepare: Array<ButtonGroupProps> = useMemo(() => {
    return buttons.map(
      ({
        shouldUnselect = false,
        enabledWhen = 'always',
        onClick,
        ...button
      }) => {
        let internalOnClick = onClick;
        if (onClick) {
          internalOnClick = () => {
            onClick(
              table.getSelectedRowModel().rows.map((row) => row.original),
            );
            shouldUnselect && table.resetRowSelection();
          };
        }

        let disabled = false;
        if (enabledWhen === 'onlyOneSelected') {
          disabled = table.getSelectedRowModel().rows.length !== 1;
        } else if (enabledWhen === 'leastOneSelected') {
          disabled = table.getSelectedRowModel().rows.length === 0;
        }

        return {
          ...button,
          disabled,
          onClick: internalOnClick,
        } as ButtonGroupProps;
      },
    );
  }, [buttons, table.getSelectedRowModel().rows.length]);

  return (
    <div className="p-4 flex items-center justify-between pb-4 bg-white dark:bg-gray-900 rounded-t-md">
      <ButtonGroup buttons={buttonPrepare} />
    </div>
  );
};
