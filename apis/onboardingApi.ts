import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";
import type { StylesQuestionList } from "@/types/styles";

export async function checkNicknameTaken(nickname: string): Promise<boolean> {
  const res = await axiosWithAuthorization.get("/members/nickname/check", {
    params: { nickname },
    timeout: 5000,
  });

  return res.data.data;
}

export type StylesQuestionsResponse = {
  success: boolean;
  status: number;
  data: {
    content: StylesQuestionList;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
  };
  timestamp: string;
};

export async function getStylesQuestionList(
  page = 0,
  size = 16
): Promise<StylesQuestionsResponse["data"]> {
  const res = await axiosWithAuthorization.get<StylesQuestionsResponse>(
    "/styles/list",
    {
      params: { page, size },
      timeout: 5000,
    }
  );

  return res.data.data;
}
