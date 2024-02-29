'use server';

import { remoteConfig } from 'firebase-admin';
import type { RemoteConfigParameterValue } from 'firebase-admin/remote-config';

import { MenuClient } from './menu.client';

export async function Menu() {
  const {
    parameters: { menu },
  } = await remoteConfig().getTemplate();

  const menuResponse = JSON.parse(
    (menu?.defaultValue as RemoteConfigParameterValue & { value: string })
      .value,
  );

  return <MenuClient menu={menuResponse} />;
}
