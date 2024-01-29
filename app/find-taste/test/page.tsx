'use client';

import React, { useState, useRef, useEffect } from 'react';
import Slider from '@/components/matchingtest/Slider';
import Vibe from '@/components/matchingtest/Vibe';
import Individuality from '@/components/matchingtest/Individuality';
import Main from '@/components/matchingtest/Main';
import Persistence from '@/components/matchingtest/Persistence';
import Season from '@/components/matchingtest/Season';
import SwiperHeader from '@/components/matchingtest/SwiperHeader';
import Loading from '@/components/matchingtest/Loading';
import { useRouter } from 'next/navigation';

interface Family {
  familyKorName: string;
  familyEngName: string;
  summary: string;
  icon: string;
  keyword: string[];
}

interface Fragrance {
  fragranceId: number;
  fragranceName: string;
  brandName: string;
  familyName: string;
  thumbnail: string;
}

interface SelectionsState {
  persistence: string[];
  season: string[];
  main: string[];
  vibe: string[];
  individuality: string[];
}

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>('');
  const [selections, setSelections] = useState<SelectionsState>({
    persistence: [],
    season: [],
    main: [],
    vibe: [],
    individuality: [],
  });
  const router = useRouter();
  const queryParams = new URLSearchParams();

  const updateSelections = (
    category: keyof SelectionsState,
    selection: string | string[],
  ) => {
    setSelections((prev) => ({ ...prev, [category]: selection }));
  };

  const handleSubmit = async () => {
    const payload = {
      concentration: selections.persistence,
      season: selections.season,
      mainFamily: selections.main,
      scent: selections.individuality,
      style: selections.vibe,
    };

    try {
      const res = await fetch(`/api/extract`, {
        method: 'POST',
        body: JSON.stringify({ payload }),
      });

      if (!res.ok) {
        throw new Error(`Failed to send request: ${res.status}`);
      }

      const responseData = await res.json();

      responseData.families.forEach((family: Family, familyIndex: number) => {
        Object.entries(family).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) =>
              queryParams.append(`${key}[${familyIndex}]`, val),
            );
          } else {
            queryParams.append(`${key}[${familyIndex}]`, value);
          }
        });
      });
      responseData.fragrances.forEach(
        (fragrance: Fragrance, fragranceIndex: number) => {
          Object.entries(fragrance).forEach(([key, value]) => {
            queryParams.append(`${key}[${fragranceIndex}]`, value.toString());
          });
        },
      );

      queryParams.append(`style1`, selections.vibe[0]);
      queryParams.append(`style2`, selections.vibe[1]);
      // window.location.replace(`/loading/?${queryParams}`);
      setQueryString(queryParams.toString());
      setIsLoading(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending data:', error);
    }
  };
  const slides = [
    {
      name: 'persistence',
      component: (
        <Persistence
          updateSelection={(selection: string[]) =>
            updateSelections('persistence', selection)
          }
        />
      ),
    },
    {
      name: 'season',
      component: (
        <Season
          updateSelection={(selection: string[]) =>
            updateSelections('season', selection)
          }
        />
      ),
    },
    {
      name: 'main',
      component: (
        <Main
          updateSelection={(selection: string[]) =>
            updateSelections('main', selection)
          }
        />
      ),
    },
    {
      name: 'individuality',
      component: (
        <Individuality
          updateSelection={(selection: string[]) =>
            updateSelections('individuality', selection)
          }
        />
      ),
    },
    {
      name: 'vibe',
      component: (
        <Vibe
          updateSelection={(selection: string[]) =>
            updateSelections('vibe', selection)
          }
          handleSubmit={handleSubmit}
        />
      ),
    },
  ];
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isDone) router.push(`/find-taste/result?${queryString}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  return isLoading ? (
    <Loading setIsDone={setIsDone} />
  ) : (
    <>
      <SwiperHeader swiperRef={swiperRef} />
      <Slider
        slides={slides.map((slide) => slide.component)}
        keys={slides.map((slide) => slide.name)}
        swiperRef={swiperRef}
      />
    </>
  );
};

export default Page;
