import { SceneIcon, Testing } from '@/public/images';

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
  return (
    <div>
      <div className="flex flex-col mx-4">
        <div className="mb-16">
          <div className="h1 text-center mb-3.5">
            당신에게 어울리는 계절코드
          </div>
          <div className="flex flex-row justify-center gap-x-4">
            {families.map((family) => (
              <div key={`${family.familyKorName}`}>
                <SceneIcon className="w-[52px] h-[68px]" />
              </div>
            ))}
          </div>
        </div>

        {families.map((family) => (
          <div key={`${family.familyKorName}-${family.familyEngName}`}>
            <div className="flex flex-row mb-4">
              <div>
                <Testing className="mr-7" />
              </div>
              <div className="flex flex-col w-full">
                <div className="h2 text-acodegray-500 mb-2.5">
                  {family.familyKorName}
                  <span className="text-acodeblack ml-2">
                    {family.familyEngName}
                  </span>
                </div>

                <div className="body1 mb-6">{family.summary}</div>
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
