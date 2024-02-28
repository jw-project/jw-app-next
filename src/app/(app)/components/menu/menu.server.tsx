"use server";

import { remoteConfig } from "firebase-admin";
import { MenuClient } from "./menu.client";
import type { RemoteConfigParameterValue } from "firebase-admin/remote-config";

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
