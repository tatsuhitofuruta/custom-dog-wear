import type { Metadata, Viewport } from 'next'
import './globals.css'

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'ワンちゃんオーダーメイド'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''

export const metadata: Metadata = {
  metadataBase: appUrl ? new URL(appUrl) : null,
  title: {
    default: `${appName} - カスタム犬服`,
    template: `%s | ${appName}`,
  },
  description: '犬服をパーツごとにカスタマイズできるオーダーメイドEC。袖・ネック・胴など各パーツの生地とカラーを自由に選択して、世界に一つだけのオリジナル犬服を作成。',
  keywords: ['犬服', 'カスタム', 'オーダーメイド', 'ペット', 'ドッグウェア', 'カスタマイズ', '愛犬', 'オリジナル'],
  authors: [{ name: appName }],
  creator: appName,
  publisher: appName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: appUrl,
    title: `${appName} - カスタム犬服`,
    description: '犬服をパーツごとにカスタマイズできるオーダーメイドEC',
    siteName: appName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName} - カスタム犬服`,
    description: '犬服をパーツごとにカスタマイズできるオーダーメイドEC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f97316',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
