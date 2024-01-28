import { ArrowRightIcon } from '@/public/images';
import Link from 'next/link';

const spiceColorMapping: {
  [key: string]: {
    start: string;
    end: string;
  };
} = {
  샌달우드: { start: 'from-[#705D5D]', end: 'to-[#E7DADA]' },
  카다멈: { start: 'from-[#705D5D]', end: 'to-[#899D93]' },
  통카빈: { start: 'from-[#916349]', end: 'to-[#FFEEB1]' },
  투베로즈: { start: 'from-[#E8F5ED]', end: 'to-[#FFF6FB]' },
  '주니퍼 베리': { start: 'from-[#5D7166]', end: 'to-[#A3CAAF]' },
};

const SpiceRecommendation = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/recommend`,
    { cache: 'no-cache' },
  );
  if (!res.ok) return null;
  const spiceInfo = await res.json();

  const textColor =
    spiceInfo.ingredientName === '투베로즈'
      ? 'text-acodegray-700'
      : 'text-acodewhite';
  const arrowColor =
    spiceInfo.ingredientName === '투베로즈'
      ? 'fill-acodegray-700'
      : 'fill-acodewhite';

  return (
    <div className="mt-[76px] ml-4">
      <h1 className="h0 text-acodeblack">
        오늘의 추천 향료는 <br />
        <Link
          href={`spices/${encodeURIComponent(spiceInfo.ingredientName)}`}
          className={`${textColor} h-11 mt-1.5 px-2.5 py-1 bg-gradient-to-r ${
            spiceColorMapping[spiceInfo.ingredientName]?.start ||
            'from-acodeblack'
          } ${
            spiceColorMapping[spiceInfo.ingredientName]?.end ||
            'from-acodeblack'
          }  rounded-[4px] justify-center items-center gap-2.5 inline-flex`}
        >
          <span className="">{spiceInfo.acode}</span>
          <ArrowRightIcon className={`${arrowColor}`} />
        </Link>
      </h1>
    </div>
  );
};

export default SpiceRecommendation;
