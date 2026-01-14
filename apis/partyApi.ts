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

/* -------------------- 파티 목록 조회 -------------------- */

// host : 내가 생성한 파티 목록 조회
// participant : 내가 참여한 파티 조회
export type PartyListType = "host" | "participant";

export const PARTIES_SLICE_SIZE = 6;

export type GetPartiesParams = {
  lastParticipantId?: number;
  size?: number;
};

export async function getPartyList(
  type: PartyListType,
  params: GetPartiesParams = {}
): Promise<SliceResponse<PartyItem>> {
  const { lastParticipantId, size = PARTIES_SLICE_SIZE } = params;

  const res = await axiosWithAuthorization.get<
    ApiResponse<SliceResponse<PartyItem>>
  >(`/parties/list/${type}`, {
    params: {
      ...(lastParticipantId != null ? { lastParticipantId } : {}),
      size,
    },
  });

  return res.data.data;
}

/* -------------------- 관심 파티 -------------------- */

export async function togglePartyLike(
  partyId: number
): Promise<ApiResponse<null>> {
  const res = await axiosWithAuthorization.post<ApiResponse<null>>(
    `/parties/${partyId}/like`
  );
  return res.data;
}

export type GetLikedPartiesParams = {
  lastLikeId?: number;
  size?: number;
};

export async function getLikedPartyList(
  params: GetLikedPartiesParams = {}
): Promise<SliceResponse<PartyItem>> {
  const { lastLikeId, size = PARTIES_SLICE_SIZE } = params;

  const res = await axiosWithAuthorization.get<
    ApiResponse<SliceResponse<PartyItem>>
  >("/parties/list/liked", {
    params: {
      ...(lastLikeId != null ? { lastLikeId } : {}),
      size,
    },
  });

  return res.data.data;
}