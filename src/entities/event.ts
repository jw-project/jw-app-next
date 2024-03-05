import type { SelectOptionsType } from '~/components/commons/form/select';
import { useTranslation as translation } from '~/hooks/use-translation';

export enum EventType {
  CIRCUIT_OVERSEER = 'CIRCUIT_OVERSEER',
  CIRCUIT_ASSEMBLY = 'CIRCUIT_ASSEMBLY',
  CONVENTION = 'CONVENTION',
  MEMORIAL = 'MEMORIAL',
  MEETING_DAY_CHANGE = 'MEETING_DAY_CHANGE',
  NO_MEETING = 'NO_MEETING',
  SERVICE_OVERSEER_VISIT = 'SERVICE_OVERSEER_VISIT',
  OTHER = 'OTHER',
}

export const eventOptions = (): SelectOptionsType[] => {
  const { translate } = translation('enum.event-type');

  return Object.values(EventType).map((day) => ({
    label: translate(day).toString(),
    value: day,
  }));
};

export type EventEntity = {
  id: string;
  type: EventType;
  name: string;
  description?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
};
