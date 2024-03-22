import type { IconOpts } from '../icon';

export type TabProp = {
  title: string;
  icon?: IconOpts;
  to: string;
  selected: boolean;
  disabled?: boolean;
};
