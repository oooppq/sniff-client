import {
  Loading1,
  Loading2,
  Loading3,
  Loading4,
  Orange,
} from '@/public/images';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/matchingtest/Header';
import Image from 'next/image';
import Link from 'next/link';

interface LoadingPageProps {
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loading = ({ setIsDone }: LoadingPageProps) => {
  const router = useRouter();

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = [<Loading1 />, <Loading2 />, <Loading3 />, <Loading4 />];
  const lastIconIndex = icons.length - 1;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentIconIndex === lastIconIndex) {
      timer = setTimeout(() => {
        setIsDone(true);
      }, 1500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router, currentIconIndex, lastIconIndex, setIsDone]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIconIndex < lastIconIndex) {
        setCurrentIconIndex((prevIndex) => prevIndex + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentIconIndex, lastIconIndex]);

  return (
    <div>
      <Header />
      <div className="h0 mt-[54px] mx-4">
        <div>당신에게 딱 어울리는 향을 </div>
        <div>추출하고 있어요!</div>
      </div>
      <div className="flex justify-center items-center mt-[126px] mb-[110px]">
        {icons[currentIconIndex]}
      </div>
      <Link
        href="https://www.instagram.com/p/C2ubAbGvtYB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        className="relative shrink-0 w-full h-[106px] text-acodewhite flex flex-col overflow-hidden"
        target="_blank"
      >
        <Image
          src={Orange}
          className="h-[106px] w-full"
          alt="loading ad"
          height={106}
          quality={50}
        />
        <span className="absolute font-bold w-full h-full h2 mt-[26px] pl-[16px]">
          하늘 아래
          <br />
          같은 오렌지는 없다
        </span>
        <span className="absolute caption1 text-[#DBDBDB] w-full h-full flex mt-[26px] pr-[16px] justify-end items-cencter">
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
export default Loading;
