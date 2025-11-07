import Link from 'next/link'
import { ArrowRight, Sparkles, Ruler, Palette } from 'lucide-react'

export default function Home() {
  const products = [
    { id: 'hoodie', name: 'パーカー', image: '🧥' },
    { id: 'tshirt', name: 'Tシャツ', image: '👕' },
    { id: 'jacket', name: 'ジャケット', image: '🧥' },
    { id: 'coat', name: 'コート', image: '🧥' },
    { id: 'vest', name: 'ベスト', image: '🦺' },
  ]

  const features = [
    {
      icon: Palette,
      title: 'パーツごとにカスタマイズ',
      description: '袖・ネック・胴など、各パーツの生地とカラーを自由に選択',
    },
    {
      icon: Ruler,
      title: '正確な採寸',
      description: 'ワンちゃんのサイズに合わせた完璧なフィット感',
    },
    {
      icon: Sparkles,
      title: '3Dプレビュー',
      description: 'リアルタイムで完成イメージを確認',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-orange-600">
              🐕 ワンちゃんオーダーメイド
            </h1>
            <nav className="flex gap-6">
              <Link href="#products" className="text-gray-600 hover:text-orange-600">
                商品一覧
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-orange-600">
                使い方
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          世界に一つだけの<br />
          <span className="text-orange-600">カスタム犬服</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          パーツごとに生地とカラーを選んで、あなたのワンちゃんにぴったりの服を作りましょう
        </p>
        <Link
          href="/customize"
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          今すぐカスタマイズ
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">3つの特徴</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">商品ラインアップ</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/customize?product=${product.id}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {product.image}
              </div>
              <h4 className="font-semibold text-lg">{product.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 ワンちゃんオーダーメイド. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
