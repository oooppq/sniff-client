import { ArrowDownIcon3, ArrowUpIcon3 } from '@/public/images';
import React, { useState } from 'react';

interface TextReviewProps {
  onChange: (text: string) => void;
}

const TextReview = ({ onChange }: TextReviewProps) => {
  const [text, setText] = useState<string>('');
  const [isSpread, setIsSpread] = useState<boolean>(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onChange(newText);
  };

  return (
    <div className="mx-4">
      <div
        className="review-2 mb-5 h-[30px] flex items-center"
        onClick={() => setIsSpread(!isSpread)}
        aria-hidden
      >
        <span>텍스트 리뷰</span>
        <span className="block text-acodegray-300 ml-3 h-4 text-[16px] font-medium mb-[2px] leading-[16px] mr-auto">
          (선택)
        </span>
        <button type="button">
          {isSpread ? <ArrowUpIcon3 /> : <ArrowDownIcon3 />}
        </button>
      </div>
      {isSpread ? (
        <div className="bg-acodegray-50 rounded justify-center item-center pb-[11px]">
          <textarea
            value={text}
            onChange={handleTextChange}
            maxLength={1000}
            className="w-full body2 bg-acodegray-50 px-[14px] py-[11px] body2 h-40 resize-none outline-none rounded-[8px] placeholder:text-acodegray-300 "
            placeholder="텍스트 리뷰를 작성해주세요"
          />
          <div className="text-right caption1 mr-[14px] text-acodegray-700">
            {text.length}/<span className="text-acodegray-300">1000</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TextReview;
