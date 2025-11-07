'use client'

import { useState } from 'react'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { MATERIALS, COLORS, PATTERNS } from '@/data/materials'
import { ChevronRight, Check } from 'lucide-react'

export default function CustomizationPanel() {
  const {
    selectedProduct,
    customizations,
    updatePartCustomization,
    setCurrentStep,
    calculateTotalPrice,
  } = useCustomizer()

  const [selectedPartId, setSelectedPartId] = useState<string | null>(
    selectedProduct?.availableParts[0]?.id || null
  )

  if (!selectedProduct) return null

  const selectedPart = selectedProduct.availableParts.find(
    (p) => p.id === selectedPartId
  )
  const currentCustomization = selectedPartId
    ? customizations[selectedPartId]
    : null

  const selectedMaterial = currentCustomization
    ? MATERIALS.find((m) => m.id === currentCustomization.materialId)
    : null

  const availableColors =
    selectedMaterial?.colors || COLORS

  const availablePatterns =
    selectedMaterial?.patterns || PATTERNS

  const handleNextStep = () => {
    setCurrentStep('measurements')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">カスタマイズ</h2>
        <p className="text-gray-600">各パーツの生地とカラーを選択してください</p>
      </div>

      {/* パーツ選択 */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase">
          パーツを選択
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {selectedProduct.availableParts.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPartId(part.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedPartId === part.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{part.displayName}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedPart && selectedPartId && (
        <>
          {/* 生地選択 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase">
              生地
            </h3>
            <div className="space-y-2">
              {MATERIALS.map((material) => (
                <button
                  key={material.id}
                  onClick={() =>
                    updatePartCustomization(selectedPartId, {
                      materialId: material.id,
                    })
                  }
                  className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                    currentCustomization?.materialId === material.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium">{material.name}</div>
                    <div className="text-xs text-gray-500">
                      {material.description}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {material.priceModifier > 0 && `+¥${material.priceModifier}`}
                    {currentCustomization?.materialId === material.id && (
                      <Check className="w-5 h-5 text-orange-600 ml-2 inline" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* カラー選択 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase">
              カラー
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() =>
                    updatePartCustomization(selectedPartId, {
                      colorId: color.id,
                    })
                  }
                  className={`aspect-square rounded-lg border-2 transition-all relative ${
                    currentCustomization?.colorId === color.id
                      ? 'border-orange-500 scale-110'
                      : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                >
                  {currentCustomization?.colorId === color.id && (
                    <Check
                      className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        color:
                          color.id === 'white' || color.id === 'yellow'
                            ? '#000'
                            : '#fff',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* パターン選択 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-sm text-gray-700 uppercase">
              パターン
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availablePatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() =>
                    updatePartCustomization(selectedPartId, {
                      patternId: pattern.id,
                    })
                  }
                  className={`p-3 rounded-lg border-2 transition-all ${
                    currentCustomization?.patternId === pattern.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{pattern.name}</div>
                  {pattern.priceModifier > 0 && (
                    <div className="text-xs text-gray-500">
                      +¥{pattern.priceModifier}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 価格と次へボタン */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">合計金額</span>
          <span className="text-3xl font-bold text-orange-600">
            ¥{calculateTotalPrice().toLocaleString()}
          </span>
        </div>
        <button
          onClick={handleNextStep}
          className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          採寸データ入力へ
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
