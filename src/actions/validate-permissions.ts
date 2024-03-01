import {
  PermissionsEnum,
  type AllPermissions,
  type Permissions,
} from '~/entities/permissions';

import { ForbiddenError } from './http-responses';

export class ValidatePermissions {
  protected permissions: Permissions;

  protected permission: AllPermissions;

  constructor(permissions: Permissions, permission: AllPermissions) {
    this.permissions = permissions;
    this.permission = permission;
  }

  private returnValidate() {
    throw new ForbiddenError();
  }

  private findPermission() {
    return this.permissions[this.permission] || PermissionsEnum.NOT;
  }

  canRead() {
    const permissionFinded = this.findPermission();
    if (
      ![PermissionsEnum.READ, PermissionsEnum.EDIT].includes(permissionFinded)
    ) {
      return this.returnValidate();
    }

    return true;
  }

  canWrite() {
    const permissionFinded = this.findPermission();

    if (PermissionsEnum.EDIT !== permissionFinded) {
      return this.returnValidate();
    }

    return true;
  }
}
