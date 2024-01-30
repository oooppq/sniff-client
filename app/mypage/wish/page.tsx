import SimpleNav from '@/components/mypage/SimpleNav';
import UserWishList from '@/components/mypage/UserWishList';
import { TWishData } from '@/types';
import { getSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const userInfo = getSession();
  if (!userInfo) redirect('/login');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/mypage/scrap`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    },
  );
  if (!res.ok) {
    if (res.status === 401) {
      redirect('/login?invalid=true');
    }
    return null;
  }
  const wishData: TWishData = await res.json();

  return (
    <div>
      <SimpleNav title="스크랩" />
      <UserWishList initialWishData={wishData} />
    </div>
  );
};

export default page;
