export type EventStatus = "공연중" | "공연예정" | "종료" | string;

export interface EventItem {
  id: number;
  eventId: string;
  eventName: string;
  startDate: string;
  endDate: string;
  facilityName: string;
  posterUrl: string;
  genreName: string;
  eventStatus: EventStatus;
  isOpenRun: boolean;
}