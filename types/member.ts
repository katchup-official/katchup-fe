export type Member = {
  memberId: number;
  nickname: string;
  gender: "MALE" | "FEMALE";
  birthYear: string;
  profileImage: number;
  style: MemberStyle;
};

export type MemberStyle = {
  artistScore: number;
  genreScore: number;
  recordScore: number;
  immerseScore: number;
  frontScore: number;
  backScore: number;
  iscore: number;
  escore: number;
};
