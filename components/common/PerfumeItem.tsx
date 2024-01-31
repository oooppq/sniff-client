import { TPerfume } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PerfumeItemProps {
  perfume: TPerfume;
}

const PerfumeItem = ({ perfume }: PerfumeItemProps) => {
  return (
    <Link href={`/perfumes/${perfume.fragranceId}`} className="h-[187px]">
      <div className="relative h-[140px]">
        <Image
          src={perfume.thumbnail!}
          alt="perfume"
          style={{ objectFit: 'cover' }}
          className="!h-[140px] rounded-[4px]"
          fill
        />
      </div>

      <span className="block mt-3 text-[12px] font-medium leading-[16.8px] tracking-[-0.3px] text-acodegray-500 text-ellipsis whitespace-nowrap overflow-hidden">
        {perfume.brandName}
      </span>
      <h3 className="mt-1 text-[14px] font-medium leading-[14px] tracking-[-0.35px] text-acodeblack text-ellipsis whitespace-nowrap overflow-hidden">
        {perfume.fragranceName}
      </h3>
    </Link>
  );
};

export default PerfumeItem;
