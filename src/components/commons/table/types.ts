import type {
  ColumnDef,
  Table as ReactTableType,
  Row,
  Table,
} from '@tanstack/react-table';

import type { TailwindCursor } from '~/styles/types';

import type { ButtonGroupProps } from '../button-group';

export type EntityForm<Entity> = {
  id: string;
  data?: Entity;
  disabled?: boolean;
};

type ClearedButtonGroupProps = Omit<ButtonGroupProps, 'disabled' | 'onClick'>;

type ExtraButtonGroupProps<Data extends object> = {
  enabledWhen?: EnabledWhen;
  shouldUnselect?: boolean;
  onClick?: (data: Array<Data>) => void;
};

export type TableContextProps<Data extends object> = {
  table: ReactTableType<Data>;
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
  options?: {
    cursor?: TailwindCursor;
    hasShadow?: boolean;
  };
  onLineDoubleClick?: (data: Row<Data>) => void;
  onLineClick?: (data: Row<Data>) => void;
  lineAsLink?: (data: Row<Data>) => string;
};

type EnabledWhen = 'onlyOneSelected' | 'leastOneSelected' | 'always';

export type TableRefProps<Data extends object> = Table<Data>;

export type TableProps<Data extends object> = {
  columns: ColumnDef<Data, any>[];
  data: Data[];
  buttons?: Array<ClearedButtonGroupProps & ExtraButtonGroupProps<Data>>;
  options?: {
    hasShadow?: boolean;
    cursor?: TailwindCursor;
    minSize?: number;
  };
  onLineDoubleClick?: (data: Row<Data>) => void;
  onLineClick?: (data: Row<Data>) => void;
  lineAsLink?: (data: Row<Data>) => string;
};
