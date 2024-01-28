import { AcodeLogoSmallBlack, RealArrow } from '@/public/images';
import Link from 'next/link';

const Test = () => {
  return (
    <div className="w-full h-[500px] bg-black rounded-sm">
      <div className="ml-7 pt-9">
        <div className="mb-[25px]">
          <AcodeLogoSmallBlack />
        </div>
        <div className="text-white h0">
          <div>향 노트 & 키워드 기반</div> <div>매칭테스트</div>
        </div>
      </div>
      <Link href="/find-taste/test">
        <div className="text-white place-items-end mt-[272px] ml-[200px] ">
          <div className="flex flex-col h2">
            테스트시작
            <RealArrow />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Test;
