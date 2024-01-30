import Image from 'next/image';
import { SmallCircleIcon } from '@/public/images';

const ReviewHeader = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${id}`,
    { cache: 'no-cache' },
  );

  if (!response.ok) {
    return null;
  }

  const { brandName, fragranceName, thumbnail, concentration } =
    await response.json();

  return (
    <div className="mx-4 mt-[64px] flex items-center bg-white">
      <div className="relative w-[50px] h-[50px] mr-3">
        <Image
          src={thumbnail}
          alt="test"
          layout="fill"
          objectFit="cover"
          className="rounded-sm h-[50px] w-[50px]"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-acodegray-200 caption2 mb-[9px]">
          {brandName}
        </span>
        <div className="flex items-center">
          <span className="text-acodeblack review-1">{fragranceName}</span>
          <SmallCircleIcon className="mx-[6px] fill-acodegray-700" />
          <span className="text-acodegray-500 similar-1">{concentration}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
