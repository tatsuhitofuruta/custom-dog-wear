'use client'

import { useState } from 'react'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { getColorById } from '@/data/materials'
import ThreeDPreview from './DynamicThreeDPreview'
import { Box, Maximize2 } from 'lucide-react'

export default function PreviewPanel() {
  const { selectedProduct, customizations } = useCustomizer()
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d')

  if (!selectedProduct) return null

  // 各パーツのカラーを取得
  const getPartColor = (partId: string): string => {
    const customization = customizations[partId]
    if (!customization) return '#E5E7EB' // デフォルトグレー

    const color = getColorById(customization.colorId)
    return color?.hexCode || '#E5E7EB'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">プレビュー</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === '2d'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === '3d'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Box className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-6">
        選択した内容がリアルタイムで反映されます
      </p>

      {/* プレビュー */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
        {viewMode === '3d' ? (
          <ThreeDPreview />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="relative w-3/4 h-3/4">
          {selectedProduct.id === 'hoodie' && (
            <HoodiePreview
              neckColor={getPartColor('neck')}
              bodyColor={getPartColor('body')}
              sleeveColor={getPartColor('sleeve')}
              hemColor={getPartColor('hem')}
              pocketColor={getPartColor('pocket')}
            />
          )}
          {selectedProduct.id === 'tshirt' && (
            <TShirtPreview
              neckColor={getPartColor('neck')}
              bodyColor={getPartColor('body')}
              sleeveColor={getPartColor('sleeve')}
            />
          )}
          {selectedProduct.id === 'jacket' && (
            <JacketPreview
              neckColor={getPartColor('neck')}
              bodyColor={getPartColor('body')}
              sleeveColor={getPartColor('sleeve')}
              hemColor={getPartColor('hem')}
            />
          )}
          {selectedProduct.id === 'coat' && (
            <CoatPreview
              neckColor={getPartColor('neck')}
              bodyColor={getPartColor('body')}
              sleeveColor={getPartColor('sleeve')}
              hemColor={getPartColor('hem')}
            />
          )}
          {selectedProduct.id === 'vest' && (
            <VestPreview
              neckColor={getPartColor('neck')}
              bodyColor={getPartColor('body')}
              hemColor={getPartColor('hem')}
            />
          )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">選択中のパーツ</h3>
        <div className="space-y-2">
          {selectedProduct.availableParts.map((part) => {
            const customization = customizations[part.id]
            const color = customization
              ? getColorById(customization.colorId)
              : null

            return (
              <div
                key={part.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">{part.displayName}</span>
                <div className="flex items-center gap-2">
                  {color && (
                    <>
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <span className="font-medium">{color.name}</span>
                    </>
                  )}
                  {!color && <span className="text-gray-400">未選択</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 簡易的な2Dプレビューコンポーネント
function HoodiePreview({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
  pocketColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
  pocketColor: string
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* 袖 */}
      <rect x="20" y="60" width="40" height="80" fill={sleeveColor} stroke="#333" strokeWidth="2" />
      <rect x="140" y="60" width="40" height="80" fill={sleeveColor} stroke="#333" strokeWidth="2" />

      {/* ボディ */}
      <rect x="60" y="60" width="80" height="100" fill={bodyColor} stroke="#333" strokeWidth="2" />

      {/* ネック */}
      <ellipse cx="100" cy="60" rx="25" ry="15" fill={neckColor} stroke="#333" strokeWidth="2" />

      {/* 裾 */}
      <rect x="60" y="150" width="80" height="10" fill={hemColor} stroke="#333" strokeWidth="2" />

      {/* ポケット */}
      <rect x="75" y="100" width="20" height="20" fill={pocketColor} stroke="#333" strokeWidth="1.5" />
      <rect x="105" y="100" width="20" height="20" fill={pocketColor} stroke="#333" strokeWidth="1.5" />
    </svg>
  )
}

function TShirtPreview({
  neckColor,
  bodyColor,
  sleeveColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* 袖 */}
      <rect x="30" y="70" width="30" height="50" fill={sleeveColor} stroke="#333" strokeWidth="2" />
      <rect x="140" y="70" width="30" height="50" fill={sleeveColor} stroke="#333" strokeWidth="2" />

      {/* ボディ */}
      <rect x="60" y="70" width="80" height="90" fill={bodyColor} stroke="#333" strokeWidth="2" />

      {/* ネック */}
      <ellipse cx="100" cy="70" rx="20" ry="12" fill={neckColor} stroke="#333" strokeWidth="2" />
    </svg>
  )
}

function JacketPreview({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* 袖 */}
      <rect x="25" y="65" width="35" height="85" fill={sleeveColor} stroke="#333" strokeWidth="2" />
      <rect x="140" y="65" width="35" height="85" fill={sleeveColor} stroke="#333" strokeWidth="2" />

      {/* ボディ */}
      <rect x="60" y="65" width="80" height="100" fill={bodyColor} stroke="#333" strokeWidth="2" />

      {/* 襟 */}
      <polygon points="80,65 100,50 120,65" fill={neckColor} stroke="#333" strokeWidth="2" />

      {/* 裾 */}
      <rect x="60" y="155" width="80" height="10" fill={hemColor} stroke="#333" strokeWidth="2" />
    </svg>
  )
}

function CoatPreview({
  neckColor,
  bodyColor,
  sleeveColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  sleeveColor: string
  hemColor: string
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* 袖 */}
      <rect x="20" y="60" width="40" height="90" fill={sleeveColor} stroke="#333" strokeWidth="2" />
      <rect x="140" y="60" width="40" height="90" fill={sleeveColor} stroke="#333" strokeWidth="2" />

      {/* ボディ */}
      <rect x="60" y="60" width="80" height="110" fill={bodyColor} stroke="#333" strokeWidth="2" />

      {/* 襟 */}
      <rect x="70" y="55" width="60" height="15" fill={neckColor} stroke="#333" strokeWidth="2" />

      {/* 裾 */}
      <rect x="60" y="160" width="80" height="10" fill={hemColor} stroke="#333" strokeWidth="2" />
    </svg>
  )
}

function VestPreview({
  neckColor,
  bodyColor,
  hemColor,
}: {
  neckColor: string
  bodyColor: string
  hemColor: string
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ボディ */}
      <rect x="60" y="70" width="80" height="90" fill={bodyColor} stroke="#333" strokeWidth="2" />

      {/* ネック */}
      <ellipse cx="100" cy="70" rx="25" ry="12" fill={neckColor} stroke="#333" strokeWidth="2" />

      {/* 裾 */}
      <rect x="60" y="150" width="80" height="10" fill={hemColor} stroke="#333" strokeWidth="2" />
    </svg>
  )
}
