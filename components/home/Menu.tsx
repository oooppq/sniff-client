// import { AcodeLogoMono } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import ad1 from '@/public/images/ad1.png';

const Menu = () => {
  return (
    <div className="mt-9 px-4 flex text-[14px] overflow-auto">
      <Link
        href="/find-taste"
        className="body2 medium shrink-0 w-[198px] h-[95px] pt-[17px] pl-4 pr-[18px] text-acodewhite bg-acodeblack rounded-[4px] flex justify-between"
      >
        <span className="">
          내 취향 향수
          <br />
          확인하기
        </span>

        {/* <AcodeLogoMono className="pt-[5px]" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="60"
          viewBox="0 0 50 60"
          fill="none"
        >
          <path
            d="M15.873 0L18.9332 8.0431H30.9994L34.1034 0H24.6719C24.6689 0.0183518 24.6659 0.0367353 24.6629 0.0551505C24.6595 0.036746 24.6562 0.0183626 24.6528 0H15.873Z"
            fill="#FF2D60"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.9751 9.75195L50 59.0827H38.0497L24.9522 17.7825L14.142 50.6701H30.8787L33.3995 59.0831H9.55942V59.0827H0L18.9293 9.75195H24.9522H30.9751Z"
            fill="white"
          />
        </svg>
      </Link>
      <Link
        href="https://www.instagram.com/p/C2FblOvJIrm/?igsh=MWd6dnJiODBoN2gxbg=="
        className="relative shrink-0 w-[198px] h-[95px] ml-4 pt-[14px] pl-[15px] text-acodewhite rounded-[4px] flex flex-col overflow-hidden"
        target="_blank"
      >
        <Image src={ad1} fill className="object-cover -z-10" alt="ad banner" />
        <span className="body2 font-medium mb-auto">
          지하 주차장 냄새
          <br />
          좋아하는 사람, 손
        </span>
        <span className="caption1 font-medium mb-[11px] flex items-center">
          더 보러 가기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M12.129 8.24952L8.106 4.22652L9.1665 3.16602L15 8.99952L9.1665 14.833L8.106 13.7725L12.129 9.74952H3V8.24952H12.129Z"
              fill="#DBDBDB"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default Menu;
