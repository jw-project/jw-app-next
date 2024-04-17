export enum PermissionsEnum {
  EDIT = 'EDIT',
  READ = 'READ',
  NOT = 'NOT',
}

export type Permissions = {
  admin: boolean;
  congregation: PermissionsEnum;
  groups?: PermissionsEnum;
  events?: PermissionsEnum;
  informationsBoard?: PermissionsEnum;
  publishers?: PermissionsEnum;
};

export type AllPermissions = keyof Omit<Permissions, 'admin'>;
