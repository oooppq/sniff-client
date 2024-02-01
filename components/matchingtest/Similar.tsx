import Image from 'next/image';
import Link from 'next/link';

interface Fragrance {
  fragranceId: string;
  fragranceName: string;
  brandName: string;
  familyName: string;
  thumbnail: string;
  concentration: string;
}

interface Style {
  style1: string | undefined;
  style2: string | undefined;
}
interface SimilarProps {
  fragrance: Fragrance[];
  style: Style;
}

const Similar = ({ fragrance, style }: SimilarProps) => {
  const perfumes: Fragrance[] = fragrance;
  return (
    <div className="">
      <div className="text-acodeblack h2 mb-5 mx-4">
        <span className="text-acodepoint mr-2">
          {style.style1}, {style.style2}
        </span>
        당신에게 추천해요
      </div>
      <div className="flex px-4 overflow-auto gap-x-[14px]">
        {perfumes.map((perfume: Fragrance, index: number) => (
          <Link
            href={`/perfumes/${perfume.fragranceId}`}
            key={perfume.fragranceName}
            className="w-[138px] shrink-0"
          >
            <Image
              src={perfume.thumbnail}
              alt={`Test Perfume ${index + 1}`}
              width={138}
              height={138}
              priority
              className="w-[138px] h-[138px] rounded-[4px]"
            />
            <div className="w-[134px] h-[35px] flex flex-col justify-center bg-white pl-[2px] mt-[10px]">
              <div className="text-acodegray-500 caption2 mb-1">
                {perfume.brandName} · {perfume.concentration}
              </div>
              <div className="text-acodeblack similar-1 truncate">
                {perfume.fragranceName}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Similar;
