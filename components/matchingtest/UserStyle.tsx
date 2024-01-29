import {
  SpicyGray,
  WoodyGray,
  CitrusGray,
  ChypreGray,
  AldehydeGray,
  AromaticGray,
  FloralGray,
  LeatherGray,
  GreenGray,
  EarthyGray,
  FruityGray,
} from '@/public/images';
import Image from 'next/image';

interface Family {
  familyKorName: string;
  familyEngName: string;
  summary: string;
  icon: string;
  keyword: string[];
}

interface UserStyleProps {
  families: Family[];
}

const UserStyle = ({ families }: UserStyleProps) => {
  const getImageComponent = (familyEngName: string) => {
    let imageSrc: any;
    switch (familyEngName) {
      case 'WOODY':
        imageSrc = WoodyGray;
        break;
      case 'SPICY':
        imageSrc = SpicyGray;
        break;
      case 'CITRUS':
        imageSrc = CitrusGray;
        break;
      case 'CHYPRE':
        imageSrc = ChypreGray;
        break;
      case 'ALDEHYDE':
        imageSrc = AldehydeGray;
        break;
      case 'AROMATIC':
        imageSrc = AromaticGray;
        break;
      case 'FLORAL':
        imageSrc = FloralGray;
        break;
      case 'LEATHER':
        imageSrc = LeatherGray;
        break;
      case 'GREEN':
        imageSrc = GreenGray;
        break;
      case 'EARTHY':
        imageSrc = EarthyGray;
        break;
      case 'FRUITY':
        imageSrc = FruityGray;
        break;
      default:
    }

    return (
      <Image
        src={imageSrc}
        alt={`${familyEngName} badge`}
        width={58}
        height={58}
        className="w-[58px] h-[58px]"
        style={{ objectFit: 'contain' }}
      />
    );
  };
  return (
    <div className="mt-16">
      <div className="flex flex-col mx-4">
        <div className="mb-16">
          <div className="h1 text-center mb-3.5">
            당신에게 어울리는 계열코드
          </div>
          <div className="flex flex-row justify-center gap-x-4">
            {families.map((family) => (
              <div key={`${family.familyKorName}`}>
                <Image
                  src={family.icon}
                  width={52}
                  height={68}
                  alt="badge"
                  priority
                  style={{ objectFit: 'contain' }}
                  className="w-[52px] h-[68px] border-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {families.map((family) => (
          <div key={`${family.familyKorName}-${family.familyEngName}`}>
            <div className="flex flex-row mb-4">
              <div className="mr-7">
                {getImageComponent(family.familyEngName)}
              </div>
              <div className="flex flex-col w-full">
                <div className="h2 text-acodegray-500 mb-2.5">
                  {family.familyKorName}
                  <span className="text-acodeblack ml-2">
                    {family.familyEngName}
                  </span>
                </div>

                <div className="body2 mb-6">{family.summary}</div>
                <div className="flex flex-row">
                  {family.keyword.map((keywords) => (
                    <div key={keywords} className="body2 mr-2.5">
                      <span className="text-acodegray-400">#</span>
                      {keywords}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className="my-11 border-acodegray-50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStyle;
