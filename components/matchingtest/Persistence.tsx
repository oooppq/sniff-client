import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';

interface PersistenceProps {
  updateSelection: (selection: string[]) => void;
}

const Persistence = ({ updateSelection }: PersistenceProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    let newSelectedOptions = [...selectedOptions];

    if (event.target.checked) {
      if (newSelectedOptions.length >= 2) {
        return;
      }
      newSelectedOptions.push(value);
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
      id: 'EDC',
      label: '생각날 때마다 가볍게 뿌리고 싶다',
      label2: '1-2시간',
    },
    { id: 'EDT', label: '하루 두 세 번만 뿌리고 싶다', label2: '3-4시간' },
    {
      id: 'EDP',
      label: '한 번 뿌린 향이 하루종일 짙게 남아있으면 좋겠다',
      label2: '5-6시간',
    },
  ];
  const swiper = useSwiper();
  return (
    <div className="mx-4 mt-[25px]">
      <div className="flex flex-col">
        <div className="h0 mb-12 ">
          <div>한 번 뿌릴 때,</div>
          <div>향이 얼마나 지속되면 좋을까요?</div>
        </div>
        <div className="text-gray-300 body2 mb-3">*최대 2개 선택 가능</div>
        <div>
          {options.map((option) => (
            <div key={option.id} className="flex items-center mb-5">
              <input
                id={option.id}
                type="checkbox"
                name="persistence"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <label
                htmlFor={option.id}
                className={`block w-full text-start border transition ${
                  selectedOptions.includes(option.id)
                    ? 'bg-acodegray-50 border-acodegray-100'
                    : 'bg-white border-acodegray-100'
                } rounded cursor-pointer`}
              >
                <div className="flex flex-col body1 py-[13px] px-[20px]">
                  <div className="text-acodeblack">{option.label}</div>
                  <div className="text-acodegray-500">{option.label2}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-[40px] flex justify-center">
          <button
            type="button"
            onClick={() => swiper.slideNext()}
            className={`h2 px-4 rounded h-[56px] w-full inline-flex items-center justify-center transition ${
              selectedOptions.length > 0
                ? 'bg-black text-white'
                : 'bg-gray-300 text-white'
            }`}
            disabled={selectedOptions.length === 0}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Persistence;
