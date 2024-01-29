'use client';

import BottomModal from '@/components/common/BottomModal';
import { CATEGORIES } from '@/constants/categories';
import { GrayArrowDownIcon } from '@/public/images';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const CategoryDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialCategories = searchParams
    .getAll('category')
    .map((cateogry) => decodeURIComponent(cateogry));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(initialCategories);
  const isChanged =
    initialCategories.toString() !== selectedCategory.toString();

  return (
    <>
      {isModalOpen ? (
        <BottomModal
          modalStyle="h-[362px] text-acodeblack py-[18px] px-[27px] flex flex-col"
          closeModal={() => setIsModalOpen(false)}
        >
          <h3 className="w-full text-center text-[#191f28] text-[20px] font-semibold leading-[28px]">
            계열 선택
          </h3>
          <div className="grid grid-cols-3 mt-8 gap-x-[27px] gap-y-[10px]">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                className={`body1 h-9 rounded-[2px] transition ${
                  selectedCategory.includes(category)
                    ? 'text-acodewhite bg-acodeblack'
                    : 'bg-acodegray-50'
                }`}
                onClick={() => {
                  if (selectedCategory.includes(category)) {
                    setSelectedCategory((categories) =>
                      categories.filter((elem) => elem !== category),
                    );
                  } else
                    setSelectedCategory((categories) => [
                      ...categories,
                      category,
                    ]);
                }}
              >
                {category}
              </button>
            ))}
            <button
              type="button"
              className="body1 text-acodegray-300 h-9 rounded-sm"
              onClick={() => {
                setSelectedCategory([]);
              }}
            >
              초기화
            </button>
          </div>

          <button
            type="button"
            className={`rounded mt-[28px] h2 text-acodewhite w-full h-14 transition ${
              isChanged ? 'bg-acodeblack' : 'bg-acodegray-300'
            }`}
            disabled={!isChanged}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('category');
              selectedCategory.forEach((category) => {
                params.append('category', category);
              });
              router.push(`${pathname}?${params.toString()}`);
              setIsModalOpen(false);
            }}
          >
            선택 완료
          </button>
        </BottomModal>
      ) : null}
      <button
        type="button"
        className="text-acodeblack font-medium leading-[16px] tracking-[-0.4px] w-[70px] pl-3 h-8 rounded-[50px] border border-gray-200 justify-start items-center inline-flex"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="">계열</span>
        <GrayArrowDownIcon className="" />
      </button>
    </>
  );
};

export default CategoryDropdown;
