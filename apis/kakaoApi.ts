import type { KakaoPlace } from "@/types/place";

const KAKAO_REST_API_KEY = (process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? "").trim();

export async function searchKakaoPlaces(query: string): Promise<KakaoPlace[]> {
  if (!query.trim()) return [];

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    const text = await res.text();

    if (!res.ok) {
      console.warn("Kakao local API error:", res.status);
      return [];
    }

    const json = JSON.parse(text);

    return json.documents.map((doc: any) => ({
      kakaoMapId: doc.id,
      placeName: doc.place_name,
      addressName: doc.address_name,
      roadAddressName: doc.road_address_name,
      longitude: String(doc.x),
      latitude: String(doc.y),
      placeUrl: doc.place_url,
      categoryName: doc.category_name,
      phone: doc.phone,
    })) as KakaoPlace[];
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return [];
  }
}