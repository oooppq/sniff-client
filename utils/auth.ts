import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

export const getSession = () => {
  const cookieStore = cookies();
  const encodedJWT = cookieStore.get('jwt')?.value;
  const exp = Number(cookieStore.get('exp')?.value);

  if (!encodedJWT || !exp) {
    return null;
  }

  if (exp < new Date().getTime()) {
    return null;
  }

  const bytes = CryptoJS.AES.decrypt(
    encodedJWT,
    process.env.NEXT_PUBLIC_SECRET_KEY!,
  );

  let decodedJWT = '';
  try {
    decodedJWT = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    decodedJWT = '';
  }

  if (!decodedJWT) return null;

  return { jwt: decodedJWT, exp };
};

export const getNickname = () => {
  const cookieStore = cookies();
  const nickname = cookieStore.get('nickname')?.value;
  return nickname;
};
