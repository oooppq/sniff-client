import BigLinkButton from '@/components/common/BigLinkButton';
import { AcodeLogoBig, KakaoLogo } from '@/public/images';
import { headers } from 'next/headers';

const page = () => {
  const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = headers().get('host');

  const redirectUri = `${protocol}://${host}/login/kakao`;
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;

  return (
    <div className="flex flex-col items-center px-4 w-full h-full">
      <AcodeLogoBig className="mt-[260px] mb-[17px]" />
      <h1 className="mb-auto h1 text-acodeblack">향수에 입문하기</h1>
      <span className="text-acodegray-800 text-sm font-semibold mb-[19px]">
        SNS 계정으로 로그인하기
      </span>

      <BigLinkButton
        to={kakaoLoginLink}
        buttonStyle="bg-[#FEE500] text-black mb-2.5 h-[52px] relative"
      >
        <KakaoLogo className="absolute left-4" />
        <p className="text-black text-[17.5px]">카카오 로그인</p>
      </BigLinkButton>
      <BigLinkButton
        to="/"
        buttonStyle="mb-[29px] bg-acodeblack text-white font-semibold h-[56px]"
      >
        둘러볼래요?
      </BigLinkButton>
    </div>
  );
};

export default page;
