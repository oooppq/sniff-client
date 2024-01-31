import ImageSlider from '@/components/detail/PerfumeImageSlider';
import PerfumeInfo from '@/components/detail/PerfumeInfo';
import SimilarPerfume from '@/components/detail/SimilarPerfume';
import HereTobuy from '@/components/detail/HereToBuy';
import AddReview from '@/components/detail/AddReviewButton';
import Navbar from '@/components/detail/NavBar';
import PerfumeDetailList from '@/components/detail/PerfumeDetailList';
import { redirect } from 'next/navigation';
import { getSession } from '@/utils/auth';

interface DetailPageProps {
  params: { id: string };
  searchParams: {
    category: 'detail' | 'review' | undefined;
    easy: 'on' | 'off' | undefined;
  };
}

const page = async ({ params, searchParams }: DetailPageProps) => {
  const userInfo = getSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${params.id}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${userInfo?.jwt}`,
      },
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/login?invalid=true');
    }
    redirect('/');
  }

  const {
    thumbnail,
    brandName,
    fragranceName,
    concentration,
    familyList,
    style,
    capacityList,
    image1,
    image2,
    scraped,
  } = await res.json();

  const images = [thumbnail, image1, image2].filter((image) => image);
  return (
    <section className="mb-[186px]">
      <Navbar id={params.id} initialWishState={scraped} />
      <ImageSlider images={images} />
      <PerfumeInfo
        brandName={brandName}
        fragranceName={fragranceName}
        concentration={concentration}
        familyList={familyList}
        styleList={style}
        capacityList={capacityList}
      />
      <hr className="my-11 border-t-[6px] border-[#FBFBFB]" />
      <PerfumeDetailList searchParams={searchParams} searchId={params} />
      <hr className="my-11 border-t-[6px] border-[#FBFBFB]" />
      <SimilarPerfume id={params.id} />
      <HereTobuy id={params.id} />
      <div className="flex justify-center item-center">
        <AddReview id={params.id} />
      </div>
    </section>
  );
};
export default page;
