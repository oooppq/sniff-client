'use client';

import { useEffect, useRef } from 'react';

interface BottomModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  modalStyle: string;
}

const BottomModal = ({
  children,
  closeModal,
  modalStyle,
}: BottomModalProps) => {
  const modalOutsideRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');

    return () => document.body.setAttribute('style', 'overflow: auto');
  }, []);

  return (
    <div
      className="fixed max-w-[430px] mx-auto left-0 right-0 top-0 bottom-0 z-50 flex flex-col bg-[#1c1818]/[0.7] justify-end items-center"
      ref={modalOutsideRef}
      onClick={(e) => {
        if (e.target === modalOutsideRef.current) closeModal();
      }}
      aria-hidden
    >
      <div
        className={`${modalStyle} bg-acodewhite w-full max-w-[430px]`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomModal;
