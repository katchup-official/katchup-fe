export type PartyStatus = 'RECRUITING' | 'RECRUIT_COMPLETED' | 'COMPLETED';
export type PartyType = 'SCHEDULE_AND_TRANSPORT' | 'SCHEDULE_ONLY' | 'TRANSPORT_ONLY';
export type GenderType = 'MALE' | 'FEMALE' | 'ALL';
export type RouteType = 'ONE_WAY' | 'ROUND_TRIP';
export type PartyRole = 'HOST' | 'GUEST' | 'NONE';
export type HostRole = 'HOST' | 'PARTICIPANT';

export type Place = {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
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
  host: {
    memberId: number;
    nickname: string | null;
    profileImage: number;
    role: HostRole;
  };
  departure: Place;
  arrival: Place;
  isLiked: boolean;
  role: PartyRole;
}