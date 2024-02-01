'use client';

import UserStyle from '@/components/matchingtest/UserStyle';
import Similar from '@/components/matchingtest/Similar';
import ResultNav from '@/components/matchingtest/ResultNav';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResultModal from '@/components/matchingtest/ResultModal';

interface ResultPageProps {
  searchParams: { [key: string]: string | undefined };
}

interface Family {
  familyKorName: string;
  familyEngName: string;
  summary: string;
  icon: string;
  keyword: string[];
}

interface Fragrance {
  fragranceId: string;
  fragranceName: string;
  brandName: string;
  familyName: string;
  thumbnail: string;
}

const Page = ({ searchParams }: ResultPageProps) => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);

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
  const datafetch = async () => {
    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        body: JSON.stringify({ payload }),
      });

      if (!res.ok) {
        throw new Error(`Failed to send request: ${res.status}`);
      }

      const responseData = await res.json();
      setFamilies(responseData.families);
      setFragrances(responseData.fragrances);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    datafetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleShareClick = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <ResultNav />
      <UserStyle families={families} />
      <Similar fragrance={fragrances} style={styles} />
      <div className="flex flex-row mt-[79px] justify-center mx-4 gap-x-[11px] pb-[28px]">
        <button
          type="button"
          className="h2 rounded bg-acodegray-50 text-black w-[166px] h-[56px] inline-flex items-center justify-center"
          onClick={handleShareClick}
        >
          공유하기
        </button>

        <Link href="/">
          <button
            type="button"
            className="h2 rounded bg-black text-white w-[166px] h-[56px] inline-flex items-center justify-center"
          >
            홈으로
          </button>
        </Link>
      </div>

      {isModalOpen && <ResultModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Page;
