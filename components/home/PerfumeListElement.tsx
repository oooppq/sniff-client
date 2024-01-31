import { TPerfume } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
// import { getPlaiceholder } from 'plaiceholder';

interface PerfumeListElementProps {
  perfume: TPerfume;
}

const PerfumeListElement = async ({ perfume }: PerfumeListElementProps) => {
  // const buffer = await fetch(perfume.poster!).then(async (res) =>
  //   Buffer.from(await res.arrayBuffer()),
  // );

  // const { base64 } = await getPlaiceholder(buffer);

  return (
    <li className="w-full relative mb-[5px]">
      <Image
        src={perfume.poster!}
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
        alt="perfume pg"
        quality={100}
        // placeholder="blur"
        // blurDataURL={base64}
      />
      <Link
        href={`perfumes/${perfume.fragranceId}`}
        className="w-full pt-[27px] px-[26px] text-left h-60 bg-gradient-to-b from-black/80 to-[#292323]/20 inline-flex flex-col"
      >
        <div className="flex">
          <h2 className="h0 text-acodewhite mr-2">{perfume.fragranceName}</h2>
          <span className="body2 font-medium pt-1.5 text-acodegray-300">
            {perfume.brandName}
          </span>
        </div>
        <ul className="flex mt-2">
          {perfume.style!.map((tag) => (
            <li className="body2 mr-[9px] font-medium text-acodewhite">
              <span className="text-acodegray-300 mr-[1px]">#</span>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
};

export default PerfumeListElement;
