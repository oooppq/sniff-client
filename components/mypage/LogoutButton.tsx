'use client';

import MyPageModalTemplate from '@/components/mypage/MyPageModalTemplate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen ? (
        <MyPageModalTemplate
          closeModal={() => setIsModalOpen(false)}
          handleClickOk={async () => {
            const res = await fetch('/api/logout', {
              method: 'POST',
              cache: 'no-cache',
            });
            if (res.ok) {
              router.refresh();
              router.replace('/');
            } else if (res.status === 401) {
              fetch('/api/initialize', {
                method: 'POST',
              });
            }
            router.push('/login?invalid=true');
          }}
          title="로그아웃"
          height="h-[176px]"
          titleBodyMargin="mt-1"
        >
          로그아웃 하시겠습니까?
        </MyPageModalTemplate>
      ) : null}
      <button
        type="button"
        className="caption1 text-left text-acodegray-500"
        onClick={() => setIsModalOpen(true)}
      >
        로그아웃
      </button>
    </>
  );
};

export default LogoutButton;
