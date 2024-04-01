import type { SelectOptionsType } from '~/components/commons/form/select';
import { useTranslation as translation } from '~/hooks/use-translation';

export enum InformationBoardType {
  INFORMATION = 'INFORMATION',
}

export const informationboardOptions = (): SelectOptionsType[] => {
  const { translate } = translation('enum.informationboard-type');

  return Object.values(InformationBoardType).map((day) => ({
    label: translate(day).toString(),
    value: day,
  }));
};

export type InformationBoardEntity = {
  id: string;
  type: InformationBoardType;
  title: string;
  description?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
};
