import { PartyMember, Place, RouteType } from "./party";
export type PartyRequestResult = 'ACCEPTED' | 'REJECTED' | 'PENDING';

export interface HostAlarmItem {
  partyId: number;
  routeType: RouteType;
  guest: PartyMember;
  departure: Place;
  arrival: Place;
}

export interface GuestAlarmItem {
  partyId: number;
  routeType: RouteType;
  host: PartyMember;
  departure: Place;
  arrival: Place;
  requestResult: PartyRequestResult;
}

export interface MemberReviewAlarmItem {
  partyId: number;
  routeType: RouteType;
  departure: Place;
  arrival: Place;
}

export type AlarmType =
  | "HOST_REQUEST"
  | "GUEST_RESULT"
  | "MEMBER_REVIEW";

export type AlarmItem =
  | (HostAlarmItem & { type: "HOST_REQUEST" })
  | (GuestAlarmItem & { type: "GUEST_RESULT" })
  | (MemberReviewAlarmItem & { type: "MEMBER_REVIEW" });

