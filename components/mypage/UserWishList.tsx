'use client';

import WishItem from '@/components/mypage/WishItem';
import { useSession } from '@/hooks/useSession';
import { TWish, TWishData } from '@/types';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UserWishListProps {
  initialWishData: TWishData;
}

const UserWishList = ({ initialWishData }: UserWishListProps) => {
  const userInfo = useSession();
  const [wishes, setWishes] = useState<TWish[]>(initialWishData.data);
  const [page, setPage] = useState<number>(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && page < initialWishData.totalPages) {
      (async () => {
        const nextPage = page + 1;
        const response = await fetch(`/auth/mypage/scrap?page=${nextPage}`, {
          cache: `no-cache`,
          headers: {
            Authorization: `Bearer ${userInfo?.jwt}`,
          },
        });
        if (response.ok) {
          const data: TWishData = await response.json();
          setPage(nextPage);
          setWishes([...wishes, ...data.data]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <ul className="mt-[70px] mx-4">
      {wishes.map((perfume, idx) => (
        <React.Fragment key={perfume.fragranceId}>
          <WishItem perfume={perfume} />
          {idx !== wishes.length - 1 ? (
            <hr className="my-5 border-t-[2px] border-[#f5f5f5]" />
          ) : null}
        </React.Fragment>
      ))}
      <div className="h-[50px]" ref={ref} />
    </ul>
  );
};

export default UserWishList;
