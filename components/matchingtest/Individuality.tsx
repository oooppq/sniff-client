import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';

interface IndividualProps {
  updateSelection: (selection: string[]) => void;
}

const Individuality = ({ updateSelection }: IndividualProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let newSelectedOptions = selectedOptions;

    if (event.target.checked) {
      if (newSelectedOptions.length < 2) {
        newSelectedOptions = [...newSelectedOptions, value];
      } else {
        return;
      }
    } else {
      newSelectedOptions = newSelectedOptions.filter(
        (option) => option !== value,
      );
    }

    setSelectedOptions(newSelectedOptions);
    updateSelection(newSelectedOptions);
  };

  const options = [
    {
      id: '스모키한',
      label: '스모키한',
    },
    {
      id: '상큼한',
      label: '상큼한',
    },
    {
      id: '달콤한',
      label: '달콤한',
    },
    {
      id: '과일향 나는',
      label: '과일향 나는',
    },
    {
      id: '상쾌한',
      label: '상쾌한',
    },
    {
      id: '청량한',
      label: '청량한',
    },
    {
      id: '촉촉한',
      label: '촉촉한',
    },
    {
      id: '시원한',
      label: '시원한',
    },
    {
      id: '쌉싸름한',
      label: '쌉싸름한',
    },
    {
      id: '포근한',
      label: '포근한',
    },
    {
      id: '스파이시한',
      label: '스파이시한',
    },
    {
      id: '부드러운',
      label: '부드러운',
    },
    {
      id: '플로럴한',
      label: '플로럴한',
    },
    {
      id: '싱그러운',
      label: '싱그러운',
    },
    {
      id: '향긋한',
      label: '향긋한',
    },
    {
      id: '풍부한',
      label: '풍부한',
    },
    {
      id: '자연그대로의',
      label: '자연그대로의',
    },
  ];

  const swiper = useSwiper();
  return (
    <div className="mx-4 mt-[22px]">
      <div className="flex flex-col">
        <div className="h0 mb-[49px]">
          <div className="flex items-center">
            어떤
            <span className="h1 h-[34px]  bg-black ml-[8px] mr-[8px] text-white px-[14px] pt-[2px] rounded-sm">
              개성적인 향
            </span>
            을
          </div>
          <div>원하시나요?</div>
        </div>
        <div className="text-gray-300 body2 mb-3">*2개 선택 필수</div>
        <div className="flex flex-wrap h1 gap-x-3 gap-y-[18px]">
          {options.map((option) => (
            <div key={option.id}>
              <input
                id={option.id}
                type="checkbox"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <label
                htmlFor={option.id}
                className={`block h-[34px] w-full text-center justify-center px-[14px] rounded-sm transition ${
                  selectedOptions.includes(option.id)
                    ? 'bg-acodeblack border-acodegray-100 '
                    : 'bg-acodegray-50 border-acodegray-100'
                } cursor-pointer flex flex-col items-center justify-center`}
              >
                <div
                  className={`transition ${
                    selectedOptions.includes(option.id)
                      ? 'text-white'
                      : 'text-acodeblack'
                  }`}
                >
                  {option.label}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[40px] left-0 right-0 flex justify-center ">
        <button
          type="button"
          onClick={() => swiper.slideNext()}
          className={`h2 rounded h-[56px] w-full inline-flex items-center justify-center transition ${
            selectedOptions.length === 2
              ? 'bg-black text-white'
              : 'bg-acodegray-300 text-white'
          }`}
          disabled={selectedOptions.length !== 2}
        >
          {selectedOptions.length === 2 ? '완료' : '2가지 선택해주세요'}
        </button>
      </div>
    </div>
  );
};
export default Individuality;
