import axiosWithAuthorization from "./auth/axiosWithAuthorization";
import type { PartyItem } from "@/types/party";
import type { KakaoPlace } from "@/types/place";
import type { PartyType, RouteType, GenderType } from "@/types/party";
import type { SliceResponse, ApiResponse } from "@/types/response";
import axios from "axios";

export type CreatePartyRequest = {
  eventId: number;
  type: PartyType;
  routeType: RouteType | null;
  gender: GenderType;
  capacity: number;
  maxBirthYear: number | null;
  minBirthYear: number | null;
  startAt: string;
  endAt: string | null;
  description: string;
  departure?: KakaoPlace;
  arrival: KakaoPlace;
};


export async function createParty(body: CreatePartyRequest): Promise<ApiResponse<null>> {
  const res = await axiosWithAuthorization.post<ApiResponse<null>>(
    "/parties/create",
    body
  );
  return res.data;
}

