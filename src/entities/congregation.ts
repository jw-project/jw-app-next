import type { Week } from './week';

export type CongregationEntity = {
  name: string;
  number: number;
  address?: string;
  midweekMeetingDay?: Week;
  weekendMeetingDay?: Week;
  midweekMeetingTime?: string;
  weekendMeetingTime?: string;
  onlineMeetingSoftware?: string;
  onlineMeetingId?: string;
  onlineMeetingDialNumber?: string;
  onlineMeetingPassword?: string;
  onlineMeetingLink?: string;
  circuitName?: string;
  circuitOverseerName?: string;
  circuitOverseerContact?: string;
};
