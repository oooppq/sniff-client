import UserStyle from '@/components/matchingtest/UserStyle';
import Similar from '@/components/matchingtest/Similar';
import ResultNav from '@/components/matchingtest/ResultNav';
import Link from 'next/link';
// import ResultModal from '@/components/matchingtest/ResultModal';
import ShareButton from '@/components/matchingtest/ShareButton';
import { headers } from 'next/headers';

interface ResultPageProps {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: ResultPageProps) => {
  const styles = {
    style1: searchParams.vibe ? searchParams.vibe[0] : '',
    style2: searchParams.vibe ? searchParams.vibe[1] : '',
  };
  const payload = {
    concentration: Array.isArray(searchParams.persistence)
      ? searchParams.persistence
      : [searchParams.persistence],

    season: Array.isArray(searchParams.season)
      ? searchParams.season
      : [searchParams.season],

    mainFamily: Array.isArray(searchParams.main)
      ? searchParams.main
      : [searchParams.main],

    scent: searchParams.individuality,
    style: searchParams.vibe,
  };

  const protocol = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = headers().get('host');

  const res = await fetch(`${protocol}://${host}/api/extract`, {
    method: 'POST',
    body: JSON.stringify({ payload }),
  });

  if (!res.ok) return null;

  const responseData = await res.json();

  return (
    <div>
      <ResultNav />
      <UserStyle families={responseData.families} />
      <Similar fragrance={responseData.fragrances} style={styles} />
      <div className="flex flex-row mt-[79px] justify-center mx-4 gap-x-[11px] pb-[28px]">
        <ShareButton />
        <Link href="/">
          <button
            type="button"
            className="h2 rounded bg-black text-white w-[166px] h-[56px] inline-flex items-center justify-center"
          >
            홈으로
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
