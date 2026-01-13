export type KakaoPlace = {
  kakaoMapId: string;
  placeName: string;
  addressName: string;
  roadAddressName: string;
  longitude: string;
  latitude: string;
  placeUrl: string;
  categoryName: string;
  phone: string;
};

export type Place = {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
};

export type MyLocation = {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
};