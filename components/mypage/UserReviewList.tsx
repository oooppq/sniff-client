'use client';

import React, { useEffect, useState } from 'react';
import { TUserReview, TReviewData } from '@/types';
import UserReviewItem from '@/components/mypage/UserReviewItem';
import { useInView } from 'react-intersection-observer';
import { useSession } from '@/hooks/useSession';

interface UserReviewListProps {
  initialReviewData: TReviewData;
}

const UserReviewList = ({ initialReviewData }: UserReviewListProps) => {
  const userInfo = useSession();
  const [reviews, setReviews] = useState<TUserReview[]>(initialReviewData.data);
  const [page, setPage] = useState<number>(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (userInfo && inView && page < initialReviewData.totalPages) {
      (async () => {
        const nextPage = page + 1;
        const response = await fetch(`/auth/mypage/review?page=${nextPage}`, {
          cache: `no-cache`,
          headers: {
            AUTHORIZATION: `Bearer ${userInfo.jwt}`,
          },
        });
        if (response.ok) {
          const data: TReviewData = await response.json();
          setPage(nextPage);
          setReviews([...reviews, ...data.data]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <ul className="mt-[70px] mx-4">
      {reviews.map((review: TUserReview, idx: number) => (
        <React.Fragment key={review.reviewId}>
          <UserReviewItem review={review} />
          {idx < reviews.length - 1 ? (
            <hr className="my-5 border-t-[2px] border-[#f5f5f5]" />
          ) : null}
        </React.Fragment>
      ))}
      <div className="h-[50px]" ref={ref} />
    </ul>
  );
};

export default UserReviewList;
