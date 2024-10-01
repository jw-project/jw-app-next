import type { CoreOptions, SortDirection } from '@tanstack/react-table';

import { useContextTranslation } from '~/global-context/translation';
import { useTranslation } from '~/hooks/use-translation';

import { Icon } from '../icon';
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
      size: 65,
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

export const SortArrows = ({
  sortDirection,
}: {
  sortDirection: false | SortDirection;
}) => {
  if (!sortDirection) {
    return null;
  }

  return {
    asc: <Icon icon="keyboard_arrow_down" size="icon-xxx-small" />,
    desc: <Icon icon="keyboard_arrow_up" size="icon-xxx-small" />,
  }[sortDirection];
};
