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
  publishers?: PermissionsEnum;
  publishersRecords?: PermissionsEnum;
};

export type AllPermissions = keyof Omit<Permissions, 'admin'>;
