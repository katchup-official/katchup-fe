export type Member = {
  memberId: number;
  nickname: string | null;
  gender: "MALE" | "FEMALE";
  birthYear: string;
  profileImage: number | null;
  style: MemberStyle | null;
};

export type MemberStyle = {
  artistScore: number;
  genreScore: number;
  recordScore: number;
  immerseScore: number;
  frontScore: number;
  backScore: number;
  iScore: number;
  eScore: number;
};
