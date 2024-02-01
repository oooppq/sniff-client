'use client';

import { useWish } from '@/hooks/useWish';
import { BookMarkOffIcon, BookMarkOnIcon } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';

interface WishPreviewItemProps {
  perfume: {
    fragranceId: number;
    thumbnail: string;
  };
}

const WishPreviewItem = ({ perfume }: WishPreviewItemProps) => {
  const { isWishOn, handleClickWish } = useWish(perfume.fragranceId, true);
  return (
    <li className="relative h-[158px] w-[138px] border-[1.5px] border-acodegray-50 shrink-0 flex items-center justify-center rounded overflow-hidden">
      <Link href={`/perfumes/${perfume.fragranceId}`} className="">
        <Image
          src={perfume.thumbnail}
          className="object-cover"
          fill
          alt="perfume"
        />
        <button
          type="button"
          className="absolute top-[10px] right-[10px]"
          onClick={handleClickWish}
        >
          {isWishOn ? <BookMarkOnIcon className="" /> : <BookMarkOffIcon />}
        </button>
      </Link>
    </li>
  );
};

export default WishPreviewItem;
