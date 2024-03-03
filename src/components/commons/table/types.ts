import type {
  ColumnDef,
  Table as ReactTableType,
  Row,
  Table,
} from '@tanstack/react-table';

import type { ButtonGroupProps } from '../button-group';

export type EntityForm<Entity> = {
  id: string;
  data?: Entity;
  disabled?: boolean;
};

export type ClearedButtonGroupProps = Omit<
  ButtonGroupProps,
  'disabled' | 'onClick'
>;

export type ExtraButtonGroupProps<Data extends object> = {
  enabledWhen?: EnabledWhen;
  shouldUnselect?: boolean;
  onClick?: (data: Array<Data>) => void;
};

export type TableContextProps<Data extends object> = {
  table: ReactTableType<Data>;
  onLineAction?: (data: Row<Data>) => void;
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
};

export type EnabledWhen = 'onlyOneSelected' | 'leastOneSelected' | 'always';

export type TableRefProps<Data extends object> = Table<Data>;

export type TableProps<Data extends object> = {
  columns: ColumnDef<Data, any>[];
  data: Data[];
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
  onLineAction?: (data: Row<Data>) => void;
};
