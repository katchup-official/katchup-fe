import { colors } from "@/constants/colors";
import type { PartyStatus, PartyType, RouteType, GenderType } from "@/types/party";

export const formatPartyStatus = (status: PartyStatus) => {
  switch (status) {
    case "RECRUITING":
      return { label: "진행중", color: colors.orange };
    case "FULL":
      return { label: "모집마감", color: colors.black };
    case "CLOSED":
      return { label: "파티완료", color: colors.darkGray };
    default:
      return { label: "", color: colors.orange };
  }
};

export const formatPartyType = (type: PartyType) => {
  switch (type) {
    case "SCHEDULE_AND_TRANSPORT":
      return "교통&일정";
    case "SCHEDULE_ONLY":
      return "일정만";
    case "TRANSPORT_ONLY":
      return "교통만";
    default:
      return "";
  }
};

export const formatRoute = (route: RouteType) => {
  switch (route) {
    case "ONE_WAY":
      return { label: "편도", arrow: "→" };
    case "ROUND_TRIP":
      return { label: "왕복", arrow: "↔" };
    default:
      return { label: "", arrow: "→" };
  }
};

export const formatGender = (gender: GenderType) => {
  switch (gender) {
    case "FEMALE":
      return "여자만";
    case "MALE":
      return "남자만";
    case "ALL":
      return "성별무관";
    default:
      return "";
  }
};