'use client';

import ResultModal from '@/components/matchingtest/ResultModal';
import React, { useState } from 'react';

const ShareButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleShareClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      {isModalOpen ? <ResultModal onClose={() => setModalOpen(false)} /> : null}
      <button
        type="button"
        className="h2 rounded bg-acodegray-50 text-black w-[166px] h-[56px] inline-flex items-center justify-center"
        onClick={handleShareClick}
      >
        공유하기
      </button>
    </>
  );
};

export default ShareButton;
