'use client';

import React, { useState } from 'react';

interface VibeProps {
  updateSelection: (selection: string[]) => void;
  handleSubmit: () => void;
}

const Vibe = ({ updateSelection, handleSubmit }: VibeProps) => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let newSelectedVibes = selectedVibes;

    if (event.target.checked) {
      if (newSelectedVibes.length < 2) {
        newSelectedVibes = [...newSelectedVibes, value];
      } else {
        return;
      }
    } else {
      newSelectedVibes = newSelectedVibes.filter((vibe) => vibe !== value);
    }

    setSelectedVibes(newSelectedVibes);
    updateSelection(newSelectedVibes);
  };

  const vibeOptions = [
    { id: '시크한', label: '시크한' },
    { id: '성숙한', label: '성숙한' },
    { id: '고급스러운', label: '고급스러운' },
    { id: '우아한', label: '우아한' },
    { id: '남성적인', label: '남성적인' },
    { id: '편안한', label: '편안한' },
    { id: '차분한', label: '차분한' },
    { id: '중성적인', label: '중성적인' },
    { id: '친근한', label: '친근한' },
    { id: '깨끗한', label: '깨끗한' },
    { id: '사랑스러운', label: '사랑스러운' },
    { id: '관능적인', label: '관능적인' },
    { id: '은은한', label: '은은한' },
    { id: '활기찬', label: '활기찬' },
    { id: '밝은', label: '밝은' },
    { id: '화사한', label: '화사한' },
    { id: '여성스러운', label: '여성스러운' },
    { id: '청순한', label: '청순한' },
    { id: '무게감있는', label: '무게감있는' },
    { id: '부드러운', label: '부드러운' },
    { id: '포근한', label: '포근한' },
    { id: '가벼운', label: '가벼운' },
  ];
  return (
    <div className="mx-4 mt-[25px]">
      <div className="flex flex-col">
        <div className="h0 mb-[49px]">
          향수로 어떤 분위기를
          <br />
          내고 싶으신가요?
        </div>
        <div className="text-gray-300 body2 mb-3">*2개 선택 필수</div>
        <div className="flex flex-wrap h1 gap-x-3 gap-y-[18px]">
          {vibeOptions.map((option) => (
            <div key={option.id} className="">
              <input
                id={`vibe-option-${option.id}`}
                type="checkbox"
                value={option.id}
                checked={selectedVibes.includes(option.id)}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <label
                htmlFor={`vibe-option-${option.id}`}
                className={`h-[34px] w-full flex items-center justify-center px-[14px] rounded-sm transition ${
                  selectedVibes.includes(option.id)
                    ? 'bg-acodeblack border-acodegray-100 '
                    : 'bg-acodegray-50 border-acodegray-100'
                } cursor-pointer flex flex-col items-center justify-center`}
              >
                <div
                  className={`transition ${
                    selectedVibes.includes(option.id)
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
        <div className="mt-[40px] left-0 right-0 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className={`h2 px-4 rounded h-[56px] w-full inline-flex items-center justify-center transition ${
              selectedVibes.length === 2
                ? 'bg-black text-white'
                : 'bg-acodegray-300 text-white'
            }`}
            disabled={selectedVibes.length !== 2}
          >
            {selectedVibes.length === 2 ? '완료' : '2가지 선택해주세요'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vibe;
