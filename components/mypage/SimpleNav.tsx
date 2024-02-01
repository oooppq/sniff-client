'use client';

import { ArrowLeftIcon } from '@/public/images';
import { useRouter } from 'next/navigation';

interface SimpleNavProps {
  title: string;
}

const SimpleNav = ({ title }: SimpleNavProps) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 flex items-center w-full max-w-[430px] h-[54px] pt-[13px] pl-[10px] pr-[13px] pb-[11px] bg-acodewhite z-20">
      <button type="button" className="mr-auto" onClick={() => router.back()}>
        <ArrowLeftIcon className="fill-acodeblack" />
      </button>
      <h3 className="h1 h-[30px] absolute top-[13px] left-1/2 -translate-x-2/4 text-acodeblack">
        {title}
      </h3>
    </div>
  );
};

export default SimpleNav;
