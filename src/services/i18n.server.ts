import { remoteConfig } from 'firebase-admin';
import type {
  RemoteConfigParameter,
  RemoteConfigParameterValue,
} from 'firebase-admin/remote-config';

import type { Translations } from '../hooks/use-translation';

function remoteConfigToI18nResources(
  parameters: Record<string, RemoteConfigParameter>,
): Translations {
  const resources: Translations = {};
  Object.keys(parameters).forEach((lng) => {
    const language = lng.replace('_', '-');
    resources[language] = JSON.parse(
      (
        parameters[lng]?.defaultValue as RemoteConfigParameterValue & {
          value: string;
        }
      )?.value,
    );
  });

  return resources;
}

export async function getTranslateResources() {
  const {
    parameterGroups: { localization },
  } = await remoteConfig().getTemplate();

  return remoteConfigToI18nResources(localization?.parameters || {});
}
