'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            🐕 ワンちゃんオーダーメイド
          </Link>
          <nav className="flex gap-6 items-center">
            <Link
              href="/customize"
              className="text-gray-600 hover:text-orange-600"
            >
              カスタマイズ
            </Link>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
