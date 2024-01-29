export interface TUserInfo {
  jwt: string;
  exp: number;
}

export interface TPerfume {
  // 정리 필요
  fragranceId?: number;
  fragranceName?: string;
  thumbnail?: string;
  brandName?: string;
  korBrand?: string;
  style?: string[];
  poster?: string;
  id?: number;
  perfumeName?: string;
  category?: string;
  imageUrl?: string;
  option?: string;
  price?: number;
  capacity?: string;
  scraped?: boolean;
}

export interface TBrand {
  brandId: number;
  brandName: string;
  roundImg: string | null;
}

export interface TUserReview {
  reviewId: number;
  fragranceId: number;
  fragranceName: string;
  brandName: string;
  comment: string;
  rate: number;
  thumbnail: string;
}

export interface TReviewData {
  totalPages: number;
  totalElements: number;
  data: TUserReview[];
}

export interface TWish {
  fragranceId: number;
  fragranceName: string;
  brandName: string;
  concentration: string;
  thumbnail: string;
}

export interface TWishData {
  totalPages: number;
  totalElements: number;
  data: TWish[];
}
