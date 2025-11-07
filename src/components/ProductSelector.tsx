'use client'

import { PRODUCTS } from '@/data/products'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { Product } from '@/types'

export default function ProductSelector() {
  const { setSelectedProduct, setCurrentStep } = useCustomizer()

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentStep('customize')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          商品を選択してください
        </h1>
        <p className="text-lg text-gray-600">
          お好みのスタイルを選んでカスタマイズを始めましょう
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelectProduct(product)}
            className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all text-left group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform text-center">
              {product.id === 'hoodie' && '🧥'}
              {product.id === 'tshirt' && '👕'}
              {product.id === 'jacket' && '🧥'}
              {product.id === 'coat' && '🧥'}
              {product.id === 'vest' && '🦺'}
            </div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-orange-600">
                ¥{product.basePrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">
                から
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
