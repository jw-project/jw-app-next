import type { Theme } from '~/global-context/theme';

import type { Permissions } from './permissions';

export enum PublisherTabsEnum {
  Information = 'information',
  Spiritual = 'spiritual',
  Assignments = 'assign',
  Records = 'records',
  Emergency = 'emergency',
}

export type PublisherEntity = {
  id: string;
  uidUser: string;
  congregationId: string;
  email: string;
  name: string;
  displayName?: string; // used by firebase
  permissions: Permissions;
  theme: Theme;
  language: string;
};
