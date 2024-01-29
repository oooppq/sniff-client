'use client';

import MyPageModalTemplate from '@/components/mypage/MyPageModalTemplate';
import { useSession } from '@/hooks/useSession';
import { EmptyStarIcon, FullStarIcon, SmallCircleIcon } from '@/public/images';
import { TUserReview } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface UserReviewItemProps {
  review: TUserReview;
}

export const rateStarHandler = (rating: number) => {
  const stars = [];

  for (let i = 0; i < 5; i += 1) {
    if (i < rating) {
      stars.push(<FullStarIcon key={i} />);
    } else {
      stars.push(<EmptyStarIcon key={i} />);
    }
  }
  return stars;
};

const UserReviewItem = ({ review }: UserReviewItemProps) => {
  const userInfo = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickDeleteButton = async () => {
    const res = await fetch(`/auth/review/review/${review.reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo?.jwt}`,
      },
    });
    if (res.ok) {
      setIsModalOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      {isModalOpen ? (
        <MyPageModalTemplate
          closeModal={() => setIsModalOpen(false)}
          handleClickOk={handleClickDeleteButton}
          title="리뷰를 삭제할까요?"
          height="h-[176px]"
          titleBodyMargin="mt-1"
        >
          삭제된 리뷰는 복구되지 않습니다.
        </MyPageModalTemplate>
      ) : null}
      <li className="h-[101px] w-full relative">
        <Link href={`/perfumes/${review.fragranceId}`} className="">
          <button
            type="button"
            className="absolute top-0 right-[2px]"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.75824 3.4082L2.81543 4.35101L7.05827 8.59385L2.81572 12.8364L3.75853 13.7792L8.00108 9.53666L12.2435 13.7791L13.1863 12.8363L8.94389 8.59385L13.1866 4.35111L12.2438 3.4083L8.00108 7.65104L3.75824 3.4082Z"
                fill="#A6A49F"
              />
            </svg>
          </button>
          <div className="body2 text-acodegray-500 flex items-center gap-[5px]">
            <button
              type="button"
              // href={`/brands/${encodeURIComponent(review.brandName)}`}
              className=""
            >
              {review.brandName}
            </button>
            <SmallCircleIcon className=" fill-acodegray-500" />
            <span className="">{review.fragranceName}</span>
          </div>
          <div className="mt-2 flex pr-[9px]">
            <div className="mr-auto">
              <p className="body1 font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-[248px]">
                {review.comment}
              </p>
              <div className="flex mt-3">{rateStarHandler(review.rate)}</div>
            </div>

            {review.thumbnail ? (
              <Image
                src={review.thumbnail}
                alt="perfume"
                width={72}
                height={72}
                className="w-[72px] h-[72px]"
              />
            ) : null}
          </div>
        </Link>
      </li>
    </>
  );
};

export default UserReviewItem;
