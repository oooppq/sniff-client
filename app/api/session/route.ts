import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export async function GET() {
  const cookieStore = cookies();
  const encodedJWT = cookieStore.get('jwt')?.value;
  const exp = Number(cookieStore.get('exp')?.value);

  if (!encodedJWT || !exp) {
    return NextResponse.json(null);
  }

  const bytes = CryptoJS.AES.decrypt(
    encodedJWT,
    process.env.NEXT_PUBLIC_SECRET_KEY!,
  );

  const decodedJWT = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  if (exp < new Date().getTime()) {
    cookieStore.delete('jwt');
    cookieStore.delete('exp');
    cookieStore.delete('nickname');
    return NextResponse.json(null);
  }
  return NextResponse.json({ jwt: decodedJWT, exp });
}
