import React, { useState, useMemo, useRef, useEffect } from "react";
import { View, TextInput, } from "react-native";
import { getDateRange, toKSTIsoString } from "@/utils/dateTime";
import { PartyType, RouteType, GenderType } from "@/types/party";
import type { KakaoPlace } from "@/types/kakao-place";
import { searchKakaoPlaces } from "@/apis/kakaoApi";

import Label from "./create-party/InputLabel";
import SegmentGroup from "./create-party/SegmentGroup";
import PartyDateSection from "./create-party/PartyDateSection";
import LocationSection from "./create-party/LocationSection";
import TimeSection from "./create-party/TimeSection";
import CapacitySection from "./create-party/CapacitySection";
import AgeLimitSection from "./create-party/AgeLimitSection";
import EtcSection from "./create-party/EtcSection";

import CreatePartyButton from "../buttons/CreatePartyButton";
import KakaoPlaceSearchModal from "../modals/KakaoPlaceSearchModal";

interface CreatePartyInputProps {
  eventId: string;
  facilityName: string;
  startDate: string;
  endDate: string;
  onCreateSuccess?: () => void;
  onEtcFocus?: () => void; 
}

export default function CreatePartyInput({
  eventId,
  facilityName,
  startDate,
  endDate,
  onCreateSuccess,
  onEtcFocus,
}: CreatePartyInputProps) {
  
  const [partyDate, setPartyDate] = useState(startDate);

  const dateOptions = useMemo(
    () => getDateRange(startDate, endDate),
    [startDate, endDate]
  );

  const [partyType, setPartyType] = useState<PartyType>("SCHEDULE_AND_TRANSPORT");

  const partyTypeOptions: { label: string; value: PartyType }[] = [
    { label: "교통만", value: "TRANSPORT_ONLY" },
    { label: "일정만", value: "SCHEDULE_ONLY" },
    { label: "교통&일정", value: "SCHEDULE_AND_TRANSPORT" },
  ];

  const [routeType, setRouteType] = useState<RouteType>("ROUND_TRIP");

  const routeTypeOptions: { label: string; value: RouteType }[] = [
    { label: "편도", value: "ONE_WAY" },
    { label: "왕복", value: "ROUND_TRIP" },
  ];

  const [departure, setDeparture] = useState("");
  const [departurePlace, setDeparturePlace] = useState<KakaoPlace | null>(null);

  const [isDepartureSearchOpen, setIsDepartureSearchOpen] = useState(false);

  const handleSelectDeparturePlace = (place: KakaoPlace) => {
    setDeparture(place.roadAddressName || place.addressName || place.placeName);
    setDeparturePlace(place);
  };

  const arrivalLabel = facilityName; 
  const [arrivalPlace, setArrivalPlace] = useState<KakaoPlace | null>(null);

  // facilityName 기반으로 도착지 위치 검색
  useEffect(() => {
    let isMounted = true;

    const fetchArrivalPlace = async () => {
      if (!facilityName) return;

      try {
        const results = await searchKakaoPlaces(facilityName);

        if (!isMounted) return;

        if (results.length > 0) {
          setArrivalPlace(results[0]);
        } else {
          setArrivalPlace(null);
        }
      } catch (e) {
        console.warn("arrival 검색 실패:", e);
        if (isMounted) setArrivalPlace(null);
      }
    };

    fetchArrivalPlace();

    return () => {
      isMounted = false;
    };
  }, [facilityName]);

  const [startAt, setStartAt] = useState("");
  const [returnAt, setReturnAt] = useState(""); 

  const [capacity, setCapacity] = useState("");
  const capacityInputRef = useRef<TextInput | null>(null);

  const [genderLimit, setGenderLimit] = useState<GenderType>("ALL");

  const genderOptions: { label: string; value: GenderType }[] = [
    { label: "남자만", value: "MALE" },
    { label: "여자만", value: "FEMALE" },
    { label: "성별 상관없음", value: "ALL" },
  ];

  const [hasAgeLimit, setHasAgeLimit] = useState(false);
  const [minBirthYear, setMinBirthYear] = useState("");
  const [maxBirthYear, setMaxBirthYear] = useState("");

  const [etc, setEtc] = useState("");

  // 입력폼 유효성 확인
  const isRoundTrip = routeType === "ROUND_TRIP";

  const isTimeValid =
    !!startAt && (!isRoundTrip || !!returnAt);

  const isAgeValid =
    !hasAgeLimit || (!!minBirthYear && !!maxBirthYear);

  const isBasicFilled =
    !!eventId &&
    !!partyDate &&
    !!partyType &&
    !!routeType &&
    !!departurePlace &&
    !!arrivalPlace &&
    !!capacity &&
    !!genderLimit;

  const isFormValid = isBasicFilled && isTimeValid && isAgeValid;

  const handleCreateParty = () => {
    if (!isFormValid) {
      console.log("필수 항목이 모두 채워지지 않았습니다.");
      return;
    }

    const startAtIso = toKSTIsoString(partyDate, startAt);
    const endAtIso =
    routeType === "ROUND_TRIP" && returnAt
      ? toKSTIsoString(partyDate, returnAt)
      : null;

    const body = {
      eventId: eventId,
      type: partyType,
      routeType: routeType,
      gender: genderLimit,
      capacity: Number(capacity),
      maxBirthYear: hasAgeLimit && maxBirthYear ? Number(maxBirthYear) : null,
      minBirthYear: hasAgeLimit && minBirthYear ? Number(minBirthYear) : null,
      startAt: startAtIso,
      endAt: endAtIso,
      description: etc,
      departure: departurePlace,
      arrival: arrivalPlace,
    };
    console.log(body);
    onCreateSuccess?.(); 
  };

  return (
    <>
      <View className="px-5 mt-6 mb-10">
        <View className="mb-5">
          <Label>날짜</Label>
          <PartyDateSection
            options={dateOptions}
            value={partyDate}
            onChange={setPartyDate}
          />
        </View>

        <View className="mb-5">
          <Label>파티 유형</Label>
          <SegmentGroup<PartyType>
            options={partyTypeOptions}
            value={partyType}
            onChange={setPartyType}
          />
        </View>

        <View className="mb-5">
          <Label>이동 형태</Label>
          <SegmentGroup<RouteType>
            options={routeTypeOptions}
            value={routeType}
            onChange={setRouteType}
          />
        </View>

        <View className="mb-5">
          <Label>장소</Label>
          <LocationSection
            departure={departure}
            arrivalLabel={arrivalLabel}
            onChangeDeparture={setDeparture}
            onPressSearchDeparture={() => setIsDepartureSearchOpen(true)}
          />
        </View>

        <View className="mb-5">
          <Label>집합 시간</Label>
          <TimeSection
            routeType={routeType}
            startAt={startAt}
            returnAt={returnAt}
            onChangeStartAt={setStartAt}
            onChangeReturnAt={setReturnAt}
          />
        </View>

        <View className="mb-5">
          <CapacitySection
            capacity={capacity}
            onChangeCapacity={setCapacity}
            inputRef={capacityInputRef}
          />
        </View>

        <View className="mb-5">
          <Label>성별 제한</Label>
          <SegmentGroup
            options={genderOptions}
            value={genderLimit}
            onChange={setGenderLimit}
          />
        </View>

        <View className="mb-5">
          <Label>나이 제한</Label>
          <AgeLimitSection
            hasAgeLimit={hasAgeLimit}
            onChangeHasAgeLimit={setHasAgeLimit}
            minBirthYear={minBirthYear}
            maxBirthYear={maxBirthYear}
            onChangeMinBirthYear={setMinBirthYear}
            onChangeMaxBirthYear={setMaxBirthYear}
          />
        </View>

        <View className="mb-8">
          <Label>기타</Label>
          <EtcSection 
            value={etc} 
            onChange={setEtc}
            onFocus={onEtcFocus}
          />
        </View>

        <CreatePartyButton
          onPress={handleCreateParty}
          disabled={!isFormValid}
        />
      </View>

      <KakaoPlaceSearchModal
        visible={isDepartureSearchOpen}
        onClose={() => setIsDepartureSearchOpen(false)}
        onSelect={handleSelectDeparturePlace}
        title="출발지 검색"
      />
    </>
  );
}