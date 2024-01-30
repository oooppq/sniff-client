import {
  CURRENT_NICKNAME,
  FAILED,
  NICKNAME_DUPLICATED,
  SUCCESS,
} from '@/constants/statusCodes';
import { getSession } from '@/utils/auth';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const EXP_LIMIT = 1000 * 60 * 60 * 24;

export async function PUT(request: NextRequest) {
  const userInfo = getSession();

  if (!userInfo) {
    cookies().delete('jwt');
    cookies().delete('exp');
    cookies().delete('nickname');
    if (!userInfo)
      return new Response(FAILED, {
        status: 400,
      });
  }

  const body = await request.json();
  const { username, currentNickname } = body;

  if (currentNickname === username)
    return new Response(CURRENT_NICKNAME, {
      status: 410,
    });

  const dupCheckRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/nickname`,
    {
      headers: {
        AUTHORIZATION: `Bearer ${userInfo.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: username }),
      method: 'POST',
      cache: 'no-cache',
    },
  );

  if (dupCheckRes.ok) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/nickname`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${userInfo.jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: username }),
        method: 'PUT',
        cache: 'no-cache',
      },
    );

    if (res.ok) {
      cookies().set('nickname', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: EXP_LIMIT,
        path: '/',
      });

      return new Response(SUCCESS, {
        status: 200,
      });
    }
    return new Response(FAILED, {
      status: res.status,
    });
  }

  if (dupCheckRes.status === 409)
    return new Response(NICKNAME_DUPLICATED, {
      status: 409,
    });

  return new Response(FAILED, {
    status: dupCheckRes.status,
  });
}
