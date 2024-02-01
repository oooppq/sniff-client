import { STYLEOPTIONS } from '@/constants/styles';
import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
  onReturn: (value: any) => void;
}

function Modal({ onReturn }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const removeOption = (option: string) => {
    const newOptions = selectedOptions.filter((o) => o !== option);
    setSelectedOptions(newOptions);
    onReturn(newOptions);
  };

  const completeSelection = () => {
    onReturn(selectedOptions);
    handleModalClose();
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isOpen && !modalRef?.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen]);

  return (
    <div>
      <div className="flex mx-4">
        <div className="flex w-[71px] shrink-0 items-center justify-start review-3">
          스타일
        </div>
        <div className="flex w-full overflow-x-auto">
          <div className="flex whitespace-nowrap h-[30px]">
            {selectedOptions.map((option) => (
              <div
                key={option}
                className="body2 text-acodewhite bg-black border-black flex items-center justify-center rounded-[50px] mr-1 px-[10px]"
              >
                <span className="">{option}</span>
                <button
                  type="button"
                  className="ml-[2px]"
                  onClick={() => removeOption(option)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.52451 3.13867L2.64062 4.02256L6.61829 8.00022L2.6409 11.9776L3.52479 12.8615L7.50217 8.8841L11.4795 12.8614L12.3633 11.9775L8.38605 8.00022L12.3636 4.02265L11.4797 3.13877L7.50217 7.11633L3.52451 3.13867Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {}
          {selectedOptions.length < 3 && (
            <button
              type="button"
              onClick={handleModalOpen}
              className="h-[30px] body2 text-acodegray-400 rounded-full border flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-[3px]"
              >
                <path
                  d="M11.2857 11.2857V7H12.7143V11.2857H17V12.7143H12.7143V17H11.2857V12.7143H7V11.2857H11.2857Z"
                  fill="#292323"
                />
              </svg>
              {selectedOptions.length === 0 && (
                <span className="mr-[10px]">어떤 스타일과 어울릴까요?</span>
              )}
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
          <div
            className="bg-white shadow-lg mx-auto w-[430px] h-[560px]"
            ref={modalRef}
          >
            <div className="flex flex-col justify-center items-center mt-[30px] w-full">
              <div className="h1 text-acodblack mb-[10px]">스타일</div>
              <div className="caption2 text-acodegray-300">
                *최대 3개까지 고를 수 있습니다
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-x-2.5 gap-y-3 mt-6 mb-[48px] mx-[34px]">
              {STYLEOPTIONS.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`h-8 px-[9px] py-[2px] border-[1.5px] ${
                    selectedOptions.includes(option)
                      ? 'bg-acodeblack text-white border-acodeblack'
                      : 'text-acodegray-400 border-acodegray-100'
                  } rounded-[50px] transition`}
                  onClick={() => toggleOption(option)}
                >
                  <span className="text-[18px] font-semibold leading-[27px] tracking-[-0.45px]">
                    {option}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex justify-center pb-[18px]">
              <button
                type="button"
                className={`${
                  selectedOptions.length > 0
                    ? 'bg-acodeblack'
                    : 'bg-acodegray-300'
                } w-full mx-4 h-[56px] text-white py-3 px-4 rounded transition`}
                onClick={completeSelection}
                disabled={selectedOptions.length === 0}
              >
                선택완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
