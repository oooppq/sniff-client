'use client';

import MyPageModalTemplate from '@/components/mypage/MyPageModalTemplate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LeaveButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {isModalOpen ? (
        <MyPageModalTemplate
          closeModal={() => setIsModalOpen(false)}
          handleClickOk={async () => {
            const res = await fetch('/api/leave', {
              method: 'DELETE',
              cache: 'no-cache',
            });
            if (res.ok) router.push('/');
            else if (res.status === 401) {
              fetch('/api/initialize', {
                method: 'POST',
              });
            }
            router.push('/login?invalid=true');
          }}
          title="정말 탈퇴하시겠어요?"
          height="h-[210px]"
          titleBodyMargin="mt-[6px]"
        >
          탈퇴버튼 선택 시,
          <br />
          계정은 삭제되며 복구되지 않습니다.
        </MyPageModalTemplate>
      ) : null}
      <button
        type="button"
        className="caption1 text-left text-acodegray-500 mt-3"
        onClick={() => setIsModalOpen(true)}
      >
        회원탈퇴
      </button>
    </>
  );
};

export default LeaveButton;
