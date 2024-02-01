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

  const handleSubmit = () => {
    Object.entries(selections).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => queryParams.append(`${key}`, val));
      } else {
        queryParams.append(`${key}`, value);
      }
    });

    setQueryString(queryParams.toString());
    setIsLoading(true);
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
