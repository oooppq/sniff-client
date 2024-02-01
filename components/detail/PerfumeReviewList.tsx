import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SmallRedHalfStar,
  SmallRedFullStar,
  SmallRedEmptyStar,
  BlackEmptyStar,
  BlackFullStar,
  NoReview,
} from '@/public/images';

interface Review {
  comment: string;
  rate: number;
  nickname: string;
  thumbnail: string;
}
interface PerfumeReviewProps {
  id: string;
}

export async function getPreReviewList(params: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${params.id}/review/preview`,
    { cache: `no-cache` },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

const ReviewContent = async ({ id }: PerfumeReviewProps) => {
  const data = await getPreReviewList({ id });
  if (!data) return null;

  const photos: string[] = data.reviewPreviewList
    .filter((review: Review) => review.thumbnail)
    .map((review: Review) => review.thumbnail)
    .slice(0, 3);
  if (data.reviewCnt === 0) {
    return (
      <div className="flex justify-center items-center h-full mx-4">
        <NoReview />
      </div>
    );
  }
  const averageRating = data.rateSum / data.reviewCnt;

  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const reviewsToShow = data.reviewPreviewList.slice(0, 3);
  return (
    <div className="mx-4">
      <div>
        <div className="flex justify-between mb-[30px]">
          <div className="flex">
            {Array.from({ length: fullStars }, (_, i) => (
              <SmallRedFullStar key={i} className="mt-[1px] " />
            ))}
            {halfStar > 0 && <SmallRedHalfStar className="mt-[1px] " />}
            {Array.from({ length: emptyStars }, (_, i) => (
              <SmallRedEmptyStar key={i} className="mt-[1px]" />
            ))}
            <div className="text-acodegray-400 ml-2 mb-[3px]">
              {data.reviewCnt}건
            </div>
          </div>
          <Link
            href={`/perfumes/${data.fragranceId}/reviews`}
            className="caption2 text-acodegray-300 text-right flex items-center mb-[3px]"
          >
            <span className="">리뷰 더보기</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_1793_22309)">
                <path
                  d="M10.9766 10.0006L6.85156 5.8756L8.0299 4.69727L13.3332 10.0006L8.0299 15.3039L6.85156 14.1256L10.9766 10.0006Z"
                  fill="#C0BEBB"
                />
              </g>
              <defs>
                <clipPath id="clip0_1793_22309">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>

        <div className="flex gap-[14px] w-full">
          {photos.map((photo, index: number) => (
            <div key={photo} className="relative w-1/3 pb-[30.7%] mb-5">
              <Image
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-[4px]"
                fill
              />
            </div>
          ))}
        </div>
        <div className="pb-[30px]">
          {reviewsToShow.map((review: Review, index: number) => (
            <div
              key={`${review.comment}${review.thumbnail}`}
              className="body2 font-medium flex flex-col"
            >
              <div className="justify-between flex flex-row">
                <div className="flex flex-col">
                  <div className=" text-acodeblack mb-[6px]">
                    {review.comment}
                  </div>

                  <div className="flex items-center mb-3">
                    {Array.from({ length: review.rate }, (_, i) => (
                      <BlackFullStar key={`full-${i}`} />
                    ))}
                    {Array.from({ length: 5 - review.rate }, (_, i) => (
                      <BlackEmptyStar key={`empty-${i}`} />
                    ))}
                  </div>

                  <div className="text-acodegray-400 caption2 font-medium">
                    {review.nickname}
                  </div>
                </div>
                {review.thumbnail && (
                  <div className="item-center">
                    <div className="relative w-[71px] h-[71px]">
                      <Image
                        src={review.thumbnail}
                        alt="review thumbnail"
                        className="rounded-sm"
                        fill
                      />
                    </div>
                  </div>
                )}
              </div>
              {index !== reviewsToShow.length - 1 && (
                <hr className="my-5 mborder-t-[2px] border-acodegray-50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;
