import type { Metadata } from 'next';
import '../styles/GPACalculator.css';
import '../styles/UploadPage.css';
import '../styles/PrivacyPolicy.css';
import '../styles/components.css';

export const metadata: Metadata = {
  title: '政大 GPA 計算器',
  description: '上傳您的成績 HTML 檔案，立即查看詳細 GPA 分析',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}