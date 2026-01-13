import axiosWithAuthorization from "./auth/axiosWithAuthorization";
import type { EventItem } from "@/types/event";
import type { SliceResponse, ApiResponse } from "@/types/response";

export const EVENTS_SLICE_SIZE = 6;

export type GetEventsParams = {
  lastEventId?: number;
  size?: number;
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
