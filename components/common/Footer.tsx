import { AcodeLogoGray } from '@/public/images';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="pt-[25px] pb-10 bg-acodegray-50 pl-4">
      <Link href="/" className="caption1 font-medium block mb-2.5 ml-[1px]">
        향수제품추가요청
      </Link>
      <Link href="/" className="caption1 font-medium block mb-[38px] ml-[1px]">
        광고제휴문의
      </Link>
      <div className="flex mr-[15px] mb-[21px] text-[10px] font-medium text-acodegray-400 leading-[15px]">
        <AcodeLogoGray className="mr-auto" />
        <Link href="/" className="mr-5 mt-1">
          이용약관
        </Link>
        <Link href="/" className="mt-1">
          개인정보처리
        </Link>
      </div>
      <div className="text-[10px] font-medium text-acodegray-400 leading-[15px] grid grid-cols-[61px_188px] gap-x-[17px] mb-[25px]">
        <span className="">ACODE</span>
        <span className="">어코드</span>

        <span className="">대표</span>
        <span className="">안여진</span>

        <span className="">이메일</span>
        <Link href="mailto:sniff.a.code@gmail.com" className="">
          sniff.a.code@gmail.com
        </Link>

        <span className="">인스타그램</span>
        <Link
          href="https://www.instagram.com/acode_officiel?igsh=MTUyeWdrenoycWs3Nw=="
          className=""
          target="_blank"
        >
          @acode_official
        </Link>
      </div>
      <p className="text-[10px] font-medium text-acodegray-400 leading-[15px] mb-10">
        &copy; ACODE. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
