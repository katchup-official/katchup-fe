export type SliceResponse<T> = {
  content: T[];
  last: boolean;
  first: boolean;
  empty: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  pageable?: unknown;
  sort?: unknown;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  success: boolean;
  timestamp: string;
};