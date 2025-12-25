import type { AlarmItem } from "@/types/alarm";

export const alarms: AlarmItem[] = [
  {
    type: "HOST_REQUEST",
    partyId: 1,
    routeType: "ROUND_TRIP",
    guest: {
      memberId: 12,
      nickname: "정상현",
      profileImage: 2,
      role: "PARTICIPANT",
    },
    departure: {
      placeName: "카카오프렌즈 코엑스점",
      addressName: "서울 강남구 삼성동 159",
      roadAddressName: "서울 강남구 영동대로 513",
      latitude: 37.51207,
      longitude: 127.05902,
    },
    arrival: {
      placeName: "고척 스카이돔",
      addressName: "서울 구로구 고척동 63-6",
      roadAddressName: "서울 구로구 경인로 430",
      latitude: 37.49818,
      longitude: 126.86703,
    },
  },

  {
    type: "GUEST_RESULT",
    partyId: 2,
    routeType: "ROUND_TRIP",
    host: {
      memberId: 34,
      nickname: "쥬디무디",
      profileImage: 1,
      role: "HOST",
    },
    departure: {
      placeName: "서울역",
      addressName: "서울 중구 봉래동2가 122",
      roadAddressName: "서울 중구 한강대로 405",
      latitude: 37.55472,
      longitude: 126.97083,
    },
    arrival: {
      placeName: "올림픽공원",
      addressName: "서울 송파구 방이동 88",
      roadAddressName: "서울 송파구 올림픽로 424",
      latitude: 37.51627,
      longitude: 127.12175,
    },
    requestResult: "PENDING",
  },

  {
    type: "MEMBER_REVIEW",
    partyId: 3,
    routeType: "ONE_WAY",
    departure: {
      placeName: "동대문역사문화공원역",
      addressName: "서울 중구 을지로6가 18-177",
      roadAddressName: "서울 중구 청계천로 279",
      latitude: 37.56563,
      longitude: 127.00926,
    },
    arrival: {
      placeName: "서울숲",
      addressName: "서울 성동구 성수동1가 685",
      roadAddressName: "서울 성동구 뚝섬로 273",
      latitude: 37.54479,
      longitude: 127.03738,
    },
  },

  {
    type: "HOST_REQUEST",
    partyId: 4,
    routeType: "ONE_WAY",
    guest: {
      memberId: 45,
      nickname: "김종인",
      profileImage: 4,
      role: "PARTICIPANT",
    },
    departure: {
      placeName: "합정역",
      addressName: "서울 마포구 합정동",
      roadAddressName: "서울 마포구 양화로",
      latitude: 37.54956,
      longitude: 126.91367,
    },
    arrival: {
      placeName: "KSPO DOME",
      addressName: "서울 송파구 방이동",
      roadAddressName: "서울 송파구 올림픽로 424",
      latitude: 37.51588,
      longitude: 127.12139,
    },
  },

  {
    type: "GUEST_RESULT",
    partyId: 5,
    routeType: "ONE_WAY",
    host: {
      memberId: 8,
      nickname: "남우현",
      profileImage: 3,
      role: "HOST",
    },
    departure: {
      placeName: "강남역",
      addressName: "서울 강남구 역삼동",
      roadAddressName: "서울 강남구 강남대로",
      latitude: 37.49794,
      longitude: 127.02762,
    },
    arrival: {
      placeName: "잠실종합운동장",
      addressName: "서울 송파구 잠실동",
      roadAddressName: "서울 송파구 올림픽로",
      latitude: 37.51506,
      longitude: 127.07297,
    },
    requestResult: "ACCEPTED",
  },

  {
    type: "MEMBER_REVIEW",
    partyId: 6,
    routeType: "ROUND_TRIP",
    departure: {
      placeName: "동대문역사문화공원역",
      addressName: "서울 중구 을지로6가 18-177",
      roadAddressName: "서울 중구 청계천로 279",
      latitude: 37.56563,
      longitude: 127.00926,
    },
    arrival: {
      placeName: "서울숲",
      addressName: "서울 성동구 성수동1가 685",
      roadAddressName: "서울 성동구 뚝섬로 273",
      latitude: 37.54479,
      longitude: 127.03738,
    },
  },

  {
    type: "HOST_REQUEST",
    partyId: 7,
    routeType: "ONE_WAY",
    guest: {
      memberId: 51,
      nickname: "김성규",
      profileImage: 2,
      role: "PARTICIPANT",
    },
    departure: {
      placeName: "신촌역",
      addressName: "서울 서대문구 창천동",
      roadAddressName: "서울 서대문구 신촌로",
      latitude: 37.55513,
      longitude: 126.93699,
    },
    arrival: {
      placeName: "홍대입구역",
      addressName: "서울 마포구 동교동",
      roadAddressName: "서울 마포구 양화로",
      latitude: 37.55719,
      longitude: 126.92445,
    },
  },

  {
    type: "GUEST_RESULT",
    partyId: 8,
    routeType: "ONE_WAY",
    host: {
      memberId: 77,
      nickname: "김명수",
      profileImage: 1,
      role: "HOST",
    },
    departure: {
      placeName: "사당역",
      addressName: "서울 동작구 사당동",
      roadAddressName: "서울 동작구 동작대로",
      latitude: 37.47656,
      longitude: 126.98163,
    },
    arrival: {
      placeName: "고척 스카이돔",
      addressName: "서울 구로구 고척동",
      roadAddressName: "서울 구로구 경인로",
      latitude: 37.49818,
      longitude: 126.86703,
    },
    requestResult: "REJECTED",
  },

  {
    type: "MEMBER_REVIEW",
    partyId: 9,
    routeType: "ROUND_TRIP",
    departure: {
      placeName: "동대문역사문화공원역",
      addressName: "서울 중구 을지로6가 18-177",
      roadAddressName: "서울 중구 청계천로 279",
      latitude: 37.56563,
      longitude: 127.00926,
    },
    arrival: {
      placeName: "서울숲",
      addressName: "서울 성동구 성수동1가 685",
      roadAddressName: "서울 성동구 뚝섬로 273",
      latitude: 37.54479,
      longitude: 127.03738,
    },
  },

  {
    type: "HOST_REQUEST",
    partyId: 10,
    routeType: "ONE_WAY",
    guest: {
      memberId: 63,
      nickname: "최민호",
      profileImage: 4,
      role: "PARTICIPANT",
    },
    departure: {
      placeName: "건대입구역",
      addressName: "서울 광진구 화양동",
      roadAddressName: "서울 광진구 아차산로",
      latitude: 37.54005,
      longitude: 127.06957,
    },
    arrival: {
      placeName: "잠실새내역",
      addressName: "서울 송파구 잠실동",
      roadAddressName: "서울 송파구 올림픽로",
      latitude: 37.51129,
      longitude: 127.08641,
    },
  },
];