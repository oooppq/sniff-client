'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchIcon, XCircleIcon, ArrowLeftIcon } from '@/public/images';

interface SearchBarProps {
  initialQuery: string;
}

const SearchBar = ({ initialQuery }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(initialQuery);

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === '') {
      setQuery('');
      return;
    }
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="flex items-center h-10 ml-[10px] mr-[21px] mt-[7px] mb-4">
      <button type="button" className="mr-1" onClick={() => router.back()}>
        <ArrowLeftIcon className="fill-acodeblack" />
      </button>
      <form
        action=""
        className="flex bg-acodegray-50 flex-1 h-10 px-[11px] items-center rounded-sm"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="body2 text-acodeblack font-medium h-10 flex-1 bg-transparent placeholder:text-acodegray-300"
          placeholder="검색어를 입력하세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          value={query}
        />
        {query !== '' ? (
          <button type="button" className="mr-2" onClick={() => setQuery('')}>
            <XCircleIcon />
          </button>
        ) : null}
        <button type="submit" className="">
          <SearchIcon className="fill-acodeblack" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
