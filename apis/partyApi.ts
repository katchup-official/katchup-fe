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

export async function getPartyDetail(partyId: number): Promise<PartyItem> {
  const res = await axiosWithAuthorization.get<ApiResponse<PartyItem>>(
    `/parties/${partyId}`
  );
  return res.data.data;
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

/* -------------------- 파티 확정 + 오픈채팅방 링크 추가 -------------------- */

export type ConfirmPartyRequest = {
  chatUrl: string;
};

export async function confirmParty(
  partyId: number,
  body: ConfirmPartyRequest
): Promise<ApiResponse<null>> {
  try {
    const res = await axiosWithAuthorization.patch<ApiResponse<null>>(
      `/parties/${partyId}`,
      body
    );

    const data = res.data;

    if (data?.success === false) {
      const msg =
        (data as any)?.data?.message ||
        (data as any)?.message ||
        "파티 확정에 실패했어요. 다시 시도해주세요.";

      throw new Error(msg);
    }

    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.warn("[confirmParty] Error:", e.message);
      throw e;
    }

    if (axios.isAxiosError(e)) {
      console.warn("[confirmParty] status:", e.response?.status);
      console.warn("[confirmParty] data:", e.response?.data);

      const serverMsg =
        (e.response?.data as any)?.data?.message ||
        (e.response?.data as any)?.message;

      if (typeof serverMsg === "string" && serverMsg.trim()) {
        throw new Error(serverMsg);
      }
    }

    throw e;
  }
}