import BigLinkButton from '@/components/common/BigLinkButton';
import { Onboarding } from '@/public/images';
import { getNickname } from '@/utils/auth';
import Link from 'next/link';

const page = () => {
  return (
    <div className="relative h-full pt-[135px] px-5">
      <Onboarding className="absolute right-0 top-0 -z-10" />
      <h1 className="text-acodeblack text-[34px] font-semibold  tracking-[-1px]">
        {getNickname()}
        <span className="ml-2 text-[28px] text-acodegray-500">님,</span>
        <br />
        환영합니다!
      </h1>

      <h3 className="mt-[34px] h1 text-acodegray-600">
        어코드와 함께
        <br />
        향수에 입문해보아요
      </h3>
      <BigLinkButton
        to="/find-taste/test"
        buttonStyle="absolute bg-acodeblack text-white font-semibold h-[56px] bottom-[67px] text-[18px] left-[50%] -translate-x-2/4"
      >
        나에게 어울리는 향수 추천 받기
      </BigLinkButton>
      <Link
        href="/"
        className="text-center absolute bottom-[34px] left-0 right-0 text-acodegray-800 font-semibold text-[14px]"
      >
        넘어가기
      </Link>
    </div>
  );
};

export default page;
