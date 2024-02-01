import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';
import KakaoScript from '@/components/matchingtest/KakaoScript';

export const metadata: Metadata = {
  title: '어코드 | 프레그런스 큐레이션 플랫폼',
  description: '향을 떠올리며, 취향에 맞는 향수를 발견해보세요',
  viewport: {
    width: 'device-width',
    maximumScale: 1,
    initialScale: 1,
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

const myFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  style: 'normal',
  weight: '45 920',
  display: 'block',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
      <KakaoScript />
    </html>
  );
}
