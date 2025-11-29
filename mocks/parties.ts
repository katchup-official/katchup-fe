export type PartyStatus = 'RECRUITING' | 'FULL' | 'CLOSED';
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

export const events: PartyItem[] = [
    {
        "partyId": 1,
        "type": "TRANSPORT_ONLY",
        "routeType": "ONE_WAY",
        "status": "RECRUITING",
        "gender": "FEMALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": "쥬디무디",
          "profileImageUrl": 1,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척스카이돔돔돔돔"
        },
        "isLiked": true
      },
      {
        "partyId": 2,
        "type": "SCHEDULE_AND_TRANSPORT",
        "routeType": "ROUND_TRIP",
        "status": "CLOSED",
        "gender": "ALL",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 3,
        "host": {
          "memberId": 1,
          "nickname": "민듀",
          "profileImageUrl": 2,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔"
        },
        "isLiked": false
      },
      {
        "partyId": 3,
        "type": "TRANSPORT_ONLY",
        "routeType": "ONE_WAY",
        "status": "FULL",
        "gender": "MALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T03:00:00.000",
        "endAt": "2025-11-05T21:00:00.000",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": "채민주채민주채민",
          "profileImageUrl": 4,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔돔돔돔"
        },
        "isLiked": false
      },
      {
        "partyId": 4,
        "type": "TRANSPORT_ONLY",
        "routeType": "ROUND_TRIP",
        "status": "RECRUITING",
        "gender": "MALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": "minjuchai",
          "profileImageUrl": 3,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔"
        },
        "isLiked": false
      },
      {
        "partyId": 5,
        "type": "TRANSPORT_ONLY",
        "routeType": "ROUND_TRIP",
        "status": "RECRUITING",
        "gender": "FEMALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": null,
          "profileImageUrl": 4,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔"
        },
        "isLiked": false
      },
      {
        "partyId": 6,
        "type": "TRANSPORT_ONLY",
        "routeType": "ROUND_TRIP",
        "status": "RECRUITING",
        "gender": "FEMALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": null,
          "profileImageUrl": 1,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔"
        },
        "isLiked": false
      },
      {
        "partyId": 7,
        "type": "TRANSPORT_ONLY",
        "routeType": "ROUND_TRIP",
        "status": "RECRUITING",
        "gender": "FEMALE",
        "maxBirthYear": "95",
        "minBirthYear": "00",
        "startAt": "2025-11-05T05:26:32.286",
        "endAt": "2025-11-05T05:26:32.286",
        "description": "콘서트 전 팝업 방문할 사람!!",
        "chatUrl": null,
        "capacity": 4,
        "currentParticipants": 1,
        "host": {
          "memberId": 1,
          "nickname": null,
          "profileImageUrl": 3,
          "role": "HOST"
        },
        "location": {
          "placeName": "카카오프렌즈 코엑스점",
          "addressName": "서울 강남구 삼성동 159",
          "roadAddressName": "서울 강남구 영동대로 513",
          "latitude": 37.51207412593136,
          "longitude": 127.05902969025047,
          "startLocation": "고척 스카이돔"
        },
        "isLiked": false
      }
    ];