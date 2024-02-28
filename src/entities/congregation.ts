import type { Week } from './week';

export type CongregationEntity = {
  name: string;
  address: string;
  number: number;
  midweekMeetingDay: Week;
  weekendMeetingDay: Week;
};
