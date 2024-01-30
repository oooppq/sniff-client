import Link from 'next/link';
import React from 'react';
import AcodeExplain from './AcodeExplainButton';

interface PerfumeDetailElementProps {
  searchParams: {
    category: 'detail' | 'review' | undefined;
    easy: 'on' | 'off' | undefined;
  };
  selectedTab: string;
  id: string;
}

const categories = ['detail', 'review'];
// const initialSearchParams = { category: 'detail' };
const PerfumeDetailElement = ({
  searchParams,
  selectedTab,
  id,
}: PerfumeDetailElementProps) => {
  return (
    <div className="mx-4 mb-[30px] flex flex-row justify-between">
      <div className="flex flex-row gap-x-[13px] pt-[3px]">
        {categories.map((category) => (
          <Link
            key={category}
            href={{
              pathname: `/perfumes/${id}`,
              query: {
                ...searchParams,
                category,
              },
            }}
            className={`text-left h2 leading-[18px] tracking-[-0.18px] h-[25px] px-[2px] block ${
              selectedTab === category
                ? 'text-acodeblack border-b-2 border-acodeblack'
                : 'text-acodegray-200'
            }`}
            scroll={false}
            id={category}
          >
            {category.charAt(0).toUpperCase().concat(category.slice(1))}
          </Link>
        ))}
      </div>
      {selectedTab === 'detail' && (
        <AcodeExplain searchParams={searchParams} id={id} />
      )}
    </div>
  );
};

export default PerfumeDetailElement;
