import type { CoreOptions } from '@tanstack/react-table';

import { useContextTranslation } from '~/global-context/translation';
import { useTranslation } from '~/hooks/use-translation';

import { IndeterminateCheckbox } from './checkbox';

export function selectorForTable<Data>(): CoreOptions<Data>['columns'] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
  ];
}

export function DateCell({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  const { translate } = useTranslation();
  const { defaultLanguage } = useContextTranslation();

  if (!startDate) {
    return translate('common.no-date');
  }

  if (endDate) {
    return `${new Date(startDate).toLocaleDateString(
      defaultLanguage,
    )} - ${new Date(endDate).toLocaleDateString(defaultLanguage)}`;
  }

  return new Date(startDate).toLocaleDateString(defaultLanguage);
}
