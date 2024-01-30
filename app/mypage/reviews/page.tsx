import SimpleNav from '@/components/mypage/SimpleNav';
import { getSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { TReviewData } from '@/types';
import UserReviewList from '@/components/mypage/UserReviewList';

const page = async () => {
  const userInfo = getSession();
  if (!userInfo) redirect('/login');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/mypage/review`,
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
  const reviewData: TReviewData = await res.json();

  return (
    <div>
      <SimpleNav title="작성한 리뷰" />
      <UserReviewList initialReviewData={reviewData} />
    </div>
  );
};

export default page;
