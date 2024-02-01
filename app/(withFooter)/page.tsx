import Menu from '@/components/home/Menu';
import PerfumeList from '@/components/home/PerfumeList';
import SpiceRecommendation from '@/components/home/SpiceRecommendation';
import HomeNav from '@/components/home/HomeNav';
import { ArrowRightIcon } from '@/public/images';
import Link from 'next/link';

interface HomePageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Home({ searchParams }: HomePageProps) {
  const category = searchParams.category || '우디';

  return (
    <div className="pb-[68px]">
      <HomeNav />
      <SpiceRecommendation />
      <Menu />
      <PerfumeList searchParams={searchParams} />
      <div className="w-full mt-9 pl-4">
        <h3 className="text-[16px] font-semibold tracking-[-0.4px] text-acodegray-500">
          <span className="text-acodeblack mr-[5px]">{category}</span>
          계열의 향수
        </h3>
        <Link
          href={`/categories/${encodeURIComponent(category)}`}
          className="px-3 mt-3.5 w-[125px] h-9 bg-acodeblack rounded-[4px] text-acodewhite flex items-center"
        >
          <span className="body1 mr-1 font-semibold shrink-0">
            더 보러 가기
          </span>
          <ArrowRightIcon className="fill-acodewhite" />
        </Link>
      </div>
    </div>
  );
}
