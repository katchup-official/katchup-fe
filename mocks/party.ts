import type { PartyItem } from "@/types/party"; 

export const party: PartyItem[] = [
    {
    "partyId": 1,
    "type": "TRANSPORT_ONLY",
    "routeType": "ONE_WAY",
    "status": "RECRUITING",
    "gender": "FEMALE",
    "maxBirthYear": "95",
    "minBirthYear": "00",
    "startAt": "2025-11-05T05:26:32.286",
    "endAt": "",
    "description": "콘서트 전 팝업 방문할 사람!!",
    "chatUrl": null,
    "capacity": 4,
    "currentParticipants": 1,
    "host": {
      "memberId": 34,
      "nickname": "쥬디무디",
      "profileImage": 1,
      "role": "HOST"
    },
    "departure": {
      "placeName": "카카오프렌즈 코엑스점",
      "addressName": "서울 강남구 삼성동 159",
      "roadAddressName": "서울 강남구 영동대로 513",
      "latitude": 37.51207412593136,
      "longitude": 127.05902969025047
    },
    "arrival": {
      "placeName": "고척 스카이돔",
      "addressName": "서울 강남구 삼성동 159",
      "roadAddressName": "서울 강남구 영동대로 513",
      "latitude": 37.51207412593136,
      "longitude": 127.05902969025047
    },
    "isLiked": true,
    "role": "GUEST"
  },
];