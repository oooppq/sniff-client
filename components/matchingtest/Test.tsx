import { AcodeLogoSmallBlack, RealArrow } from '@/public/images';
import Link from 'next/link';

const Test = () => {
  return (
    <div className="mt-[56px] mr-[16px] ml-[16px] max-w-[430px] h-[500px] bg-black rounded-lg relative">
      <div className="ml-7 pt-9">
        <div className="mb-[25px]">
          <AcodeLogoSmallBlack />
        </div>
        <div className="text-white h0">
          <div>향 노트 & 키워드 기반</div> <div>매칭테스트</div>
        </div>
      </div>
      <Link href="/find-taste/test">
        <div className="text-white absolute bottom-6 right-6">
          <div className="flex items-center h2">
            <div className="flex flex-col">
              <span>테스트시작</span>
              <RealArrow />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Test;
