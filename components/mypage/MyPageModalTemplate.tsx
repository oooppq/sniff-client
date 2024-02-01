import BottomModal from '@/components/common/BottomModal';
import React from 'react';

interface MyPageModalTemplateProps {
  closeModal: () => void;
  handleClickOk: () => void;
  title: string;
  children: React.ReactNode;
  height: string;
  titleBodyMargin: string;
}
const MyPageModalTemplate = ({
  closeModal,
  handleClickOk,
  title,
  children,
  height,
  titleBodyMargin,
}: MyPageModalTemplateProps) => {
  return (
    <BottomModal closeModal={closeModal} modalStyle={`${height} relative`}>
      <div className="mt-6 mx-4 mb-5">
        <h3 className="h1 ml-1 text-acodeblack">{title}</h3>
        <p className={`body1 ml-1 ${titleBodyMargin} text-acodegray-600`}>
          {children}
        </p>
        <div className="absolute bottom-5 left-4 right-4 flex justify-between">
          <button
            type="button"
            className="h2 text-acodeblack h-14 flex-1 min-w-[166px] mr-[5.5px] rounded-[4px] bg-acodegray-50"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="button"
            className="h2 text-acodewhite h-14 flex-1 min-w-[166px] ml-[5.5px] rounded-[4px] bg-acodeblack"
            onClick={handleClickOk}
          >
            확인
          </button>
        </div>
      </div>
    </BottomModal>
  );
};

export default MyPageModalTemplate;
