import { useSession } from '@/hooks/useSession';
import { useState } from 'react';

export const useWish = (id: number, initialState: boolean) => {
  const [isWishOn, setIsWishOn] = useState<boolean>(initialState);
  const userInfo = useSession();

  const handleClickWish = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userInfo) return;

    const res = await fetch(`/auth/fragrance/${id}/scrap`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userInfo.jwt}` },
    });

    if (res.ok) setIsWishOn(!isWishOn);
  };

  return { isWishOn, handleClickWish };
};
