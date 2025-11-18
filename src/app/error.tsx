'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // ログ送信などのエラー処理
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          エラーが発生しました
        </h1>

        <p className="text-gray-600 mb-2">
          申し訳ございません。予期しないエラーが発生しました。
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            再試行
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            <Home className="w-5 h-5" />
            ホームに戻る
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>問題が継続する場合は、お手数ですがサポートまでご連絡ください。</p>
        </div>
      </div>
    </div>
  )
}
