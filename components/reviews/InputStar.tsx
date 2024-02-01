import React, { useState } from 'react';
import { RedFullStar, RedEmptyStar } from '@/public/images';

type InputStarProps = {
  maxRating?: number;
  onRatingChange: (rating: number) => void;
};

const InputStar = ({ maxRating = 5, onRatingChange }: InputStarProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRatingChange(rate);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-acodeblack review-1 mb-[6px]">별점 남기기</div>
        <div className="flex space-x-0.5">
          {Array.from({ length: maxRating }, (_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleRating(i + 1)}
              className="cursor-pointer"
            >
              {i < rating ? (
                <RedFullStar className="text-red-500" />
              ) : (
                <RedEmptyStar className="text-gray-300 w-6" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputStar;
