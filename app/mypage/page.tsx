import DetailCommonNav from '@/components/common/DetailCommonNav';
import LeaveButton from '@/components/mypage/LeaveButton';
import LogoutButton from '@/components/mypage/LogoutButton';
import WishPreviewItem from '@/components/mypage/WishPreviewItem';
import { ArrowRightIcon2, PencilIcon } from '@/public/images';
import { getSession } from '@/utils/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface MyPageProps {
  searchParams: { [key: string]: string | undefined };
}
const page = async ({ searchParams }: MyPageProps) => {
  const userInfo = getSession();
  if (!userInfo) redirect('/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mypage`, {
    cache: 'no-cache',
    headers: {
      AUTHORIZATION: `Bearer ${userInfo.jwt}`,
    },
  });

  if (!res.ok) return null;
  const user = await res.json();

  return (
    <div className="">
      <DetailCommonNav />
      <div className="pt-[70px] mx-4">
        <div className="flex items-center">
          <h1 className="h0 mr-1">
            안녕하세요, {searchParams.nickname || user.nickname}님
          </h1>
          <Link
            href={`/mypage/username?init=false&nickname=${user.nickname}`}
            className=""
          >
            <PencilIcon />
          </Link>
        </div>
        <Link
          href="/mypage/reviews"
          className="bg-acodeblack text-acodewhite flex items-center mt-3 h-[42px] px-[10px] rounded-sm"
        >
          <span className="body1 mr-[9px]">
            {searchParams.nickname || user.nickname}님이 작성한 리뷰
          </span>
          <span className="mr-auto">{user.reviewCnt}</span>
          <ArrowRightIcon2
            className="fill-acodewhite w-6 h-6"
            width={24}
            height={24}
          />
        </Link>
      </div>
      <div className="mt-9 mx-4">
        <div className="flex items-center">
          <h3 className="h2 mr-auto">스크랩</h3>
          <Link href="mypage/wish" className="body2 text-acodegray-500">
            모두 보기
          </Link>
        </div>
        {user.scraps.length ? (
          <ul className="flex mt-5 overflow-auto gap-[14px]">
            {user.scraps.map(
              (perfume: { fragranceId: number; thumbnail: string }) => (
                <WishPreviewItem perfume={perfume} />
              ),
            )}
          </ul>
        ) : (
          <div className="pt-16 pb-[95px] text-center text-acodegray-300 text-[16px] font-medium tracking-[-0.4px]">
            아직 스크랩한 제품이 없어요.
          </div>
        )}
      </div>
      <hr className="mt-9 mb-[34px] border-[3px] border-acodegray-50" />
      <div className="flex flex-col mx-4">
        <Link href="/mypage" className="body1">
          향수 제품 추가 요청
        </Link>
        <hr className="mt-[17px] mb-[18px] border-top-[1.5px] border-acodegray-50" />
        <Link href="/mypage" className="body1">
          광고 제휴 문의
        </Link>
        <div className="flex flex-col mt-[94px] mb-[41px]">
          <LogoutButton />
          <LeaveButton />
        </div>
      </div>
    </div>
  );
};

export default page;
