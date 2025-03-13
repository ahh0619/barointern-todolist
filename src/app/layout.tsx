import type { Metadata } from 'next';
import localFont from 'next/font/local';

import TodoQueryProvider from '@/provides/TodoQueryProvider';
import './globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = {
  title: '투두리스트',
  description: '할 일을 기록 할 수 있는 투두리스트 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        <TodoQueryProvider>{children}</TodoQueryProvider>
      </body>
    </html>
  );
}
