import { SUCCESS } from '@/constants/statusCodes';
import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

export const POST = async () => {
  cookies().delete('jwt');
  cookies().delete('exp');
  cookies().delete('nickname');

  return new Response(SUCCESS, {
    status: 200,
  });
};
