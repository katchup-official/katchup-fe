export type PartyStatus = 'RECRUITING' | 'RECRUIT_COMPLETED' | 'COMPLETED';
export type PartyType = 'SCHEDULE_AND_TRANSPORT' | 'SCHEDULE_ONLY' | 'TRANSPORT_ONLY';
export type GenderType = 'MALE' | 'FEMALE' | 'ALL';
export type RouteType = 'ONE_WAY' | 'ROUND_TRIP';

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
    profileImageUrl: number;
    role: 'HOST' | 'PARTICIPANT';
  };
  location: {
    placeName: string;
    addressName: string;
    roadAddressName: string;
    latitude: number;
    longitude: number;
    startLocation: string;
  };
  isLiked: boolean;
}