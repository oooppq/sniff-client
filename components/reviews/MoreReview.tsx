'use client';

import { BlackEmptyStar, BlackFullStar } from '@/public/images';
import Image from 'next/image';
import {
  intensityMapping,
  longevityMapping,
  seasonMapping,
  styleMapping,
} from '@/constants/stats';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MoreReviewTop from '@/components/reviews/MoreReviewTop';

interface TReview {
  [key: string]: any;
}

interface TReviewResponse {
  fragranceId: number;
  rateSum: number;
  reviewCnt: number;
  totalPages: number;
  totalElements: number;
  reviewInfoList: TReview[];
}
interface PerfumeReviewProps {
  id: string;
  initialReviewData: TReviewResponse;
}

const keyMapping: { [key: string]: string } = {
  계절감: 'season',
  '향의 세기': 'intensity',
  지속성: 'longevity',
};

const engToKor = (key: string, value: string) => {
  if (key === 'season') {
    return seasonMapping[value];
  }
  if (key === 'intensity') {
    return intensityMapping[value];
  }
  return longevityMapping[value];
};

const MoreReview = ({ id, initialReviewData }: PerfumeReviewProps) => {
  const [reviews, setReviews] = useState<TReview[]>(
    initialReviewData.reviewInfoList,
  );
  const [page, setPage] = useState<number>(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && page < initialReviewData.totalPages) {
      (async () => {
        const nextPage = page + 1;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${id}/review?page=${nextPage}`,
          { cache: `no-cache` },
        );
        if (response.ok) {
          const data: TReviewResponse = await response.json();
          setPage(nextPage);
          setReviews([...reviews, ...data.reviewInfoList]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="mx-4 mt-[64px]">
      <MoreReviewTop
        reviewCnt={initialReviewData.reviewCnt}
        rateSum={initialReviewData.rateSum}
      />
      {reviews.map((review: TReview, index: number) => (
        <div key={review.reviewId} className="body2 flex flex-col">
          <div className="flex flex-row gap-x-[14px]">
            {[review.thumbnail, review.image1, review.image2]
              .filter((photo) => photo)
              .map((photo, photoIndex) => (
                <div key={photo} className="item-center mb-5">
                  <div className="relative w-[115px] h-[115px]  overflow-hidden rounded-[4px]">
                    <Image
                      src={photo}
                      alt={`Review Image ${photoIndex}`}
                      className="rounded-md object-cover"
                      fill
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="justify-between flex flex-row">
            <div className="flex flex-col">
              <div className="flex flex-row items-center text-center mb-5">
                <div className="flex ">
                  {Array.from({ length: review.rate }, (_, i) => (
                    <BlackFullStar key={`full-${i}`} />
                  ))}
                  {Array.from({ length: 5 - review.rate }, (_, i) => (
                    <BlackEmptyStar key={`empty-${i}`} />
                  ))}
                </div>

                <div className="text-acodegray-400 caption2 ml-[10px]">
                  {review.nickname}
                </div>
              </div>
              <div className="text-[16px] font-semibold leading-[18px] tracking-[-0.4px] text-acodeblack mb-2.5">
                {review.comment}
              </div>
              <div className="mb-5">{review.textReview}</div>
              <div className="body2 font-medium grid grid-cols-[95px_128px] gap-x-[42px]">
                {Object.entries(keyMapping).map(([key, value], idx) => (
                  <div key={key} className="flex">
                    <span
                      className={`${
                        idx % 2 ? 'w-[63px]' : 'w-12'
                      } mr-3 text-acodegray-500 shrink-0`}
                    >
                      {key}
                    </span>
                    <span className="shrink-0 text-acodeblack">
                      {engToKor(value, review[value])}
                    </span>
                  </div>
                ))}
                <div className="flex">
                  <span className="w-[63px] mr-3 text-acodegray-500 shrink-0">
                    스타일
                  </span>
                  <div className="text-acodeblack shrink-0 flex flex-wrap w-[128px]">
                    {review.style.map((style: string, idx: number) => (
                      <span key={style} className="">
                        <span className="">{styleMapping[style]}</span>
                        {idx < review.style.length - 1 && (
                          <span className="text-acodegray-200 mx-1">|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {index !== initialReviewData.reviewCnt - 1 && (
            <hr className="my-11 border-t-[2px] border-acodegray-50" />
          )}
        </div>
      ))}
      <div className="h-20" ref={ref} />
    </div>
  );
};

export default MoreReview;
