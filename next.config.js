/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],

  // 静的エクスポート設定（S3 + CloudFront用）
  output: 'export',

  // 画像最適化（静的エクスポートではunoptimizedが必要）
  images: {
    unoptimized: true,
  },

  // トレーリングスラッシュ
  trailingSlash: true,

  // パフォーマンス最適化
  swcMinify: true,

  // 本番環境でのソースマップ無効化
  productionBrowserSourceMaps: false,

  // 環境変数
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'ワンちゃんオーダーメイド',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
  },
}

module.exports = nextConfig
