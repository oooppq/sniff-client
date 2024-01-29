'use client';

import { PreviousIcon } from '@/public/images';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 flex items-center w-full max-w-[430px] h-[54px] pt-[13px] pl-[10px] pr-[13px] pb-[11px] bg-acodewhite z-30">
      <button type="button" className="mr-auto" onClick={handleClick}>
        <PreviousIcon className="" />
      </button>
    </div>
  );
};

export default Header;
