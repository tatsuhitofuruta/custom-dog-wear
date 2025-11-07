'use client'

import { useCustomizer } from '@/contexts/CustomizerContext'
import {
  getMaterialById,
  getColorById,
  getPatternById,
} from '@/data/materials'
import { ChevronLeft, ShoppingCart, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ReviewPanel() {
  const {
    selectedProduct,
    customizations,
    measurements,
    setCurrentStep,
    calculateTotalPrice,
  } = useCustomizer()

  const [orderPlaced, setOrderPlaced] = useState(false)

  if (!selectedProduct || !measurements) {
    return null
  }

  const handleBack = () => {
    setCurrentStep('measurements')
  }

  const handleOrder = () => {
    // 実際のアプリでは、ここでAPIを呼び出して注文を作成
    console.log('Order placed:', {
      product: selectedProduct,
      customizations,
      measurements,
      totalPrice: calculateTotalPrice(),
    })
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">ご注文ありがとうございます！</h2>
          <p className="text-lg text-gray-600 mb-8">
            カスタムオーダーを承りました。
            <br />
            製作完了まで約2-3週間お待ちください。
          </p>
          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = '/')}
              className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              トップページに戻る
            </button>
            <button
              onClick={() => setCurrentStep('product')}
              className="w-full border-2 border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              別の商品をカスタマイズ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">注文内容の確認</h2>
          <p className="text-gray-600">
            ご注文内容をご確認の上、注文を確定してください
          </p>
        </div>

        {/* 商品情報 */}
        <div className="mb-8 pb-8 border-b">
          <h3 className="text-xl font-semibold mb-4">商品</h3>
          <div className="flex items-center gap-4">
            <div className="text-6xl">
              {selectedProduct.id === 'hoodie' && '🧥'}
              {selectedProduct.id === 'tshirt' && '👕'}
              {selectedProduct.id === 'jacket' && '🧥'}
              {selectedProduct.id === 'coat' && '🧥'}
              {selectedProduct.id === 'vest' && '🦺'}
            </div>
            <div>
              <h4 className="text-xl font-bold">{selectedProduct.name}</h4>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <p className="text-lg font-semibold mt-2">
                基本価格: ¥{selectedProduct.basePrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* カスタマイズ詳細 */}
        <div className="mb-8 pb-8 border-b">
          <h3 className="text-xl font-semibold mb-4">カスタマイズ詳細</h3>
          <div className="space-y-4">
            {selectedProduct.availableParts.map((part) => {
              const customization = customizations[part.id]
              if (!customization) return null

              const material = getMaterialById(customization.materialId)
              const color = getColorById(customization.colorId)
              const pattern = getPatternById(customization.patternId)

              return (
                <div
                  key={part.id}
                  className="bg-gray-50 p-4 rounded-lg grid md:grid-cols-4 gap-4"
                >
                  <div>
                    <div className="text-sm text-gray-600">パーツ</div>
                    <div className="font-semibold">{part.displayName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">生地</div>
                    <div className="font-semibold">{material?.name}</div>
                    {material && material.priceModifier > 0 && (
                      <div className="text-sm text-orange-600">
                        +¥{material.priceModifier}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">カラー</div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: color?.hexCode }}
                      />
                      <span className="font-semibold">{color?.name}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">パターン</div>
                    <div className="font-semibold">{pattern?.name}</div>
                    {pattern && pattern.priceModifier > 0 && (
                      <div className="text-sm text-orange-600">
                        +¥{pattern.priceModifier}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 採寸データ */}
        <div className="mb-8 pb-8 border-b">
          <h3 className="text-xl font-semibold mb-4">採寸データ</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">首回り</div>
              <div className="text-xl font-semibold">
                {measurements.neckCircumference} cm
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">胸囲</div>
              <div className="text-xl font-semibold">
                {measurements.chestCircumference} cm
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">着丈</div>
              <div className="text-xl font-semibold">
                {measurements.bodyLength} cm
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">胴回り</div>
              <div className="text-xl font-semibold">
                {measurements.waistCircumference} cm
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">体重</div>
              <div className="text-xl font-semibold">
                {measurements.weight} kg
              </div>
            </div>
          </div>
        </div>

        {/* 合計金額 */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>合計金額</span>
            <span className="text-orange-600">
              ¥{calculateTotalPrice().toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ※送料別途 / 製作期間: 約2-3週間
          </p>
        </div>

        {/* ボタン */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            採寸データに戻る
          </button>
          <button
            onClick={handleOrder}
            className="flex-1 px-6 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            注文を確定する
          </button>
        </div>
      </div>
    </div>
  )
}
