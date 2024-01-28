import React from 'react';
import { Onboarding3 } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';

const Slide3 = () => {
  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="h0 mt-12 px-4 mb-auto">
        <div>어코드에서</div>
        <div>나만의 향수 코드를 찾아보세요</div>
      </div>
      <Image
        src={Onboarding3}
        fill
        priority
        alt="Onboarding3"
        style={{ objectFit: 'contain' }}
        className="mt-[149px]"
      />

      <div className="px-4 z-50 mb-8">
        <Link
          href="/login"
          className="h2 bg-black text-white w-full rounded h-[56px] inline-flex items-center justify-center"
        >
          어코드 시작하기
        </Link>
      </div>
    </div>
  );
};

export default Slide3;
