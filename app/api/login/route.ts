import {
  AUTHORIZED,
  LOGIN_FAILED,
  USERNAME_SETTING_REQUIRED,
} from '@/constants/statusCodes';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const EXP_LIMIT = 1000 * 60 * 60 * 24;

export const POST = async (request: Request) => {
  const body = await request.json();
  const isDev = process.env.NODE_ENV === 'development';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/${body.provider}${
      isDev ? '/developer' : ''
    }?code=${body.code}`,
    {
      cache: 'no-cache',
    },
  );

  if (res.ok) {
    const jwt = await res.json();

    const encodedJWT = CryptoJS.AES.encrypt(
      JSON.stringify(jwt.accessToken),
      process.env.NEXT_PUBLIC_SECRET_KEY!,
    ).toString();

    cookies().set('jwt', encodedJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: EXP_LIMIT,
      path: '/',
    });
    cookies().set('exp', String(new Date().getTime() + EXP_LIMIT), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: EXP_LIMIT,
      path: '/',
    });

    if (res.status === 201)
      return new Response(USERNAME_SETTING_REQUIRED, {
        status: 201,
      });

    return new Response(AUTHORIZED, {
      status: 200,
    });
  }

  return new Response(LOGIN_FAILED, {
    status: 401,
  });
};
