'use client';

import Category from '@/components/home/Category';
import { AcodeLogoSmall, SearchIcon, UserIcon } from '@/public/images';
import Link from 'next/link';
import React, { useState } from 'react';

const ResultNav = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 flex items-center w-full max-w-[430px] h-[54px] pt-[13px] pl-[10px] pr-[13px] pb-[11px] bg-acodewhite z-30">
        {/* Removed MenuIcon button */}
        <Link
          href="/"
          className="fixed top-[13px] left-1/2 -translate-x-2/4 h-[30px] flex items-center"
        >
          <AcodeLogoSmall />
        </Link>
        <Link href="/search" className="ml-auto mr-[11px]">
          <SearchIcon className="fill-acodeblack" />
        </Link>
        <Link href="/mypage" className="">
          <UserIcon className="fill-acodeblack" />
        </Link>
      </div>
      {isCategoryOpen ? (
        <Category handleClickXButton={() => setIsCategoryOpen(false)} />
      ) : null}
    </>
  );
};

export default ResultNav;
