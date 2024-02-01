import { ArrowDownIcon3, ArrowUpIcon3 } from '@/public/images';
import Image from 'next/image';
import React, { useState, ChangeEvent, useRef } from 'react';

const InputPhoto = ({ onChange }: { onChange: (photos: File[]) => void }) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newPhoto = event.target.files[0];

      if (photos.length < 3) {
        const updatedPhotos = [...photos, newPhoto];
        setPhotos(updatedPhotos);
        onChange(updatedPhotos);
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter(
      (_, photoIndex) => photoIndex !== index,
    );
    setPhotos(updatedPhotos);
    onChange(updatedPhotos);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-4 mb-[52px]">
      <div
        className="review-2 mb-5 h-[30px] flex items-center"
        onClick={() => setIsSpread(!isSpread)}
        aria-hidden
      >
        <span>사진 첨부</span>
        <span className="block text-acodegray-400 ml-3 h-4 text-[16px] font-medium mb-[2px] leading-[16px] mr-[14px]">
          (선택)
        </span>
        <span className="text-acodegray-300 caption2 mr-auto">
          *최대 3장까지 가능합니다
        </span>

        <button type="button">
          {isSpread ? <ArrowUpIcon3 /> : <ArrowDownIcon3 />}
        </button>
      </div>
      {isSpread ? (
        <div className="flex flex-row items-center space-x-2">
          {photos.map((photo, index) => (
            <div
              key={photo.name}
              className="relative w-24 h-24 overflow-hidden rounded"
            >
              <Image
                src={URL.createObjectURL(photo)}
                alt={`Preview ${index + 1}`}
                width={96}
                height={96}
                className="w-24 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-[6px] right-[6px] rounded-full w-5 h-5 flex items-center justify-center"
                style={{ fontSize: '12px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0003 18.3307C5.39783 18.3307 1.66699 14.5999 1.66699 9.9974C1.66699 5.3949 5.39783 1.66406 10.0003 1.66406C14.6028 1.66406 18.3337 5.3949 18.3337 9.9974C18.3337 14.5999 14.6028 18.3307 10.0003 18.3307ZM10.0003 8.81906L7.64366 6.46156L6.46449 7.64073L8.82199 9.9974L6.46449 12.3541L7.64366 13.5332L10.0003 11.1757L12.357 13.5332L13.5362 12.3541L11.1787 9.9974L13.5362 7.64073L12.357 6.46156L10.0003 8.81906Z"
                    fill="#ECEBEA"
                  />
                </svg>
              </button>
            </div>
          ))}
          {photos.length < 3 && (
            <button
              type="button"
              onClick={handleClick}
              className="w-24 h-24 bg-acodegray-50 rounded flex items-center justify-center border border-acodegray-50"
            >
              <span className="text-2xl text-acodegray-400">+</span>
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default InputPhoto;
