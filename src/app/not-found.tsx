import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold text-orange-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ページが見つかりません
        </h1>
        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            ホームに戻る
          </Link>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            <Search className="w-5 h-5" />
            カスタマイズページ
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>問題が解決しない場合は、お問い合わせください。</p>
        </div>
      </div>
    </div>
  )
}
