import type { Place } from "@/types/place";

export type PartyStatus = 'RECRUITING' | 'RECRUIT_COMPLETED' | 'COMPLETED';
export type PartyType = 'SCHEDULE_AND_TRANSPORT' | 'SCHEDULE_ONLY' | 'TRANSPORT_ONLY';
export type GenderType = 'MALE' | 'FEMALE' | 'ALL';
export type RouteType = 'ONE_WAY' | 'ROUND_TRIP';
export type PartyRole = 'HOST' | 'GUEST' | 'NONE';
export type HostRole = 'HOST' | 'PARTICIPANT';

export type PartyMember = {
  memberId: number;
  nickname: string | null;
  profileImage: number | null;
  role: HostRole;
};

export interface PartyItem {
  partyId: number;
  type: PartyType;
  routeType: RouteType;
  status: PartyStatus;
  gender: GenderType;
  maxBirthYear: string;
  minBirthYear: string;
  startAt: string;
  endAt: string;
  description: string;
  chatUrl: string | null;
  capacity: number;
  currentParticipants: number;
  host: PartyMember;
  departure: Place;
  arrival: Place;
  isLiked: boolean;
  role: PartyRole;
}