import InfinitePerfumeList from '@/components/common/InfinitePerfumeList';
import { TPerfume } from '@/types';
import Image from 'next/image';
// import { getPlaiceholder } from 'plaiceholder';

interface DetailPageTemplateProps {
  sort: string;
  query: string;
  searchParams: string;
  perfumes: TPerfume[];
  totalPages: number;
  children: React.ReactNode;
}

const DetailPageTemplate = async ({
  sort,
  query,
  searchParams,
  perfumes,
  totalPages,
  children,
}: DetailPageTemplateProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/display/${sort}/${query}`,
  );

  if (!res.ok) return null;

  const info = await res.json();

  // const buffer = await fetch(info.background).then(async (bres) =>
  //   Buffer.from(await bres.arrayBuffer()),
  // );

  // const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="text-acodewhite">
      <div className="relative h-[386px] px-4">
        <Image
          // placeholder="blur"
          // blurDataURL={base64}
          src={info.background} // 임시로 지정해둠 변경해야됨
          fill
          style={{ objectFit: 'cover', zIndex: -1 }}
          alt="detail bg"
          quality={100}
        />
        <div className="pt-[104px] flex">
          <div className="mr-auto">
            <h1 className="text-[26px] font-semibold leading-[26px] tracking-[-0.26px] mb-2">
              {info.engName}
            </h1>
            <span className="text-acodegray-100 text-[20px] font-semibold leading-[20px] tracking-[-0.5px] mb-[56px] block">
              {info.korName}
              {info.acode ? (
                <>
                  <span className="font-light mx-[10px]">|</span>
                  <span className="font-medium">{info.acode}</span>
                </>
              ) : null}
            </span>
          </div>

          {info.icon ? (
            <Image
              src={info.icon}
              width={50}
              height={66}
              alt="badge"
              className="w-[50px] h-[66px]"
            />
          ) : null}
        </div>
        {sort !== 'brand' ? (
          <div className="flex text-[14px] font-medium tracking-[-0.14px] gap-[10px] mb-[20px]">
            {info.keyword.map((tag: string) => (
              <span key={tag} className="">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <p className="w-[281px] text-[16px] font-medium leading-[24px] tracking-[-0.4px] break-keep">
          {info.summary}
        </p>
      </div>
      <div className="pt-9 px-4">
        {children}
        <InfinitePerfumeList
          initialPerfumes={perfumes}
          searchParams={searchParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default DetailPageTemplate;
