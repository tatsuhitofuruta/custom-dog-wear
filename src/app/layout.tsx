import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ワンちゃんオーダーメイド - カスタム犬服',
  description: '犬服をパーツごとにカスタマイズできるオーダーメイドEC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
