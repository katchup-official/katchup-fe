import axiosWithAuthorization from "./auth/axiosWithAuthorization";
import type { EventItem } from "@/types/event";

export const EVENTS_SLICE_SIZE = 6;

export type GetEventsParams = {
  lastEventId?: number;
  size?: number;
};

export type SliceResponse<T> = {
  content: T[];
  last: boolean;
  first: boolean;
  empty: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  pageable?: unknown;
  sort?: unknown;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  success: boolean;
  timestamp: string;
};

export type EventsData = {
  events: SliceResponse<EventItem>;
  totalCount: number;
};

export async function getEventList(params: GetEventsParams = {}) {
  const { lastEventId, size = EVENTS_SLICE_SIZE } = params;

  const res = await axiosWithAuthorization.get<ApiResponse<EventsData>>(
    "/events",
    {
      params: {
        ...(lastEventId != null ? { lastEventId } : {}),
        size,
      },
    }
  );

  return res.data.data;
}

export type SearchEventsParams = {
  eventName: string;
  lastEventId?: number;
  size?: number;
};

export async function searchEventList(params: SearchEventsParams) {
  const { eventName, lastEventId, size = EVENTS_SLICE_SIZE } = params;

  const res = await axiosWithAuthorization.get<ApiResponse<EventsData>>(
    "/events/search",
    {
      params: {
        eventName,
        ...(lastEventId != null ? { lastEventId } : {}),
        size,
      },
    }
  );


  return res.data.data;
}
