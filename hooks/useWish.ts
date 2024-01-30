import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useWish = (id: number, initialState: boolean) => {
  const [isWishOn, setIsWishOn] = useState<boolean>(initialState);
  const userInfo = useSession();
  const router = useRouter();

  const handleClickWish = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userInfo) {
      router.push('/login');
      return;
    }

    const res = await fetch(`/auth/fragrance/${id}/scrap`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userInfo.jwt}` },
    });
    if (res.ok) setIsWishOn(!isWishOn);
    else if (res.status === 401) {
      await fetch(`/api/initialize`, {
        method: 'POST',
      });
      router.push('/login');
    }
  };

  return { isWishOn, handleClickWish };
};
