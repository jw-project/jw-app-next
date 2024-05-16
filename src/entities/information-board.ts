import type { SelectOptionsType } from '~/components/commons/form/select';
import { useTranslation as translation } from '~/hooks/use-translation';

export enum InformationBoardType {
  ACCOUNTS = 'ACCOUNTS',
  DESIGNATIONS = 'DESIGNATIONS',
  INFORMATION = 'INFORMATION',
  TERRITORY = 'TERRITORY',
  WITNESSING = 'WITNESSING',
  OTHERS = 'OTHERS',
}

export const informationBoardOptions = (): SelectOptionsType[] => {
  const { translate } = translation('enum.informationBoard-type');

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
