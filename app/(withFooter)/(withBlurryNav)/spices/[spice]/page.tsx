import DetailPageTemplate from '@/components/common/DetailPageTemplate';
import { TPerfume } from '@/types';
import { redirect } from 'next/navigation';

interface CategoryPageProps {
  params: {
    spice: string;
  };
}

const page = async ({ params }: CategoryPageProps) => {
  if (!params || !params.spice) redirect('/');
  const query = params.spice;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/display?ingredient=${query}`,
  );

  if (!res.ok) return null;

  const info: {
    data: TPerfume[];
    totalPages: number;
    totalElements: number;
  } = await res.json();

  return (
    <DetailPageTemplate sort="ingredient" query={query} perfumes={info.data}>
      <div className="mb-5 flex items-center">
        <h3 className="h2 text-acodegray-500 mr-auto">
          <span className="text-acodered">{`${decodeURIComponent(
            query,
          )} `}</span>
          베이스 향수
        </h3>
        <span className="body1 text-[#9ea0a3]">
          총 <span className="text-acodeblack">{info.totalElements}</span>건
        </span>
      </div>
    </DetailPageTemplate>
  );
};

export default page;
