import type { IconOpts } from '~/components/commons/icon';
import type { AllPermissions } from '~/entities/permissions';

export type MenuListType = {
  label: string;
  icon: IconOpts;
  to: string;
  permissionKey: AllPermissions;
};

export type MenuType = {
  label: string;
  list: MenuListType[];
};
