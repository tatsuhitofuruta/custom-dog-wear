'use client'

import { useState } from 'react'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { Measurement } from '@/types'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'

export default function MeasurementForm() {
  const { setMeasurements, setCurrentStep } = useCustomizer()

  const [formData, setFormData] = useState<Measurement>({
    neckCircumference: 0,
    chestCircumference: 0,
    bodyLength: 0,
    waistCircumference: 0,
    weight: 0,
  })

  const [showGuide, setShowGuide] = useState(false)

  const handleChange = (field: keyof Measurement, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMeasurements(formData)
    setCurrentStep('review')
  }

  const handleBack = () => {
    setCurrentStep('customize')
  }

  const isValid =
    formData.neckCircumference > 0 &&
    formData.chestCircumference > 0 &&
    formData.bodyLength > 0 &&
    formData.waistCircumference > 0 &&
    formData.weight > 0

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">採寸データ入力</h2>
          <p className="text-gray-600">
            ワンちゃんの正確なサイズを入力してください
          </p>
        </div>

        {/* サイズガイドボタン */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <Info className="w-5 h-5" />
          採寸方法ガイド
        </button>

        {/* サイズガイド */}
        {showGuide && (
          <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-4 text-lg">採寸方法</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>首回り:</strong> 首の最も太い部分を測定。指2本入る程度の余裕を持たせてください。
              </div>
              <div>
                <strong>胸囲:</strong> 前足の付け根の後ろ、胴体の最も太い部分を測定。
              </div>
              <div>
                <strong>着丈:</strong> 首の付け根から尻尾の付け根まで測定。
              </div>
              <div>
                <strong>胴回り:</strong> 後ろ足の付け根付近の胴回りを測定。
              </div>
              <div>
                <strong>体重:</strong> 最新の体重を入力してください。
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded border border-gray-200">
              <div className="text-center text-6xl mb-2">🐕</div>
              <p className="text-xs text-gray-600 text-center">
                メジャーを使って、ワンちゃんがリラックスした状態で測定してください
              </p>
            </div>
          </div>
        )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              首回り (cm) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.neckCircumference || ''}
              onChange={(e) =>
                handleChange('neckCircumference', e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="例: 25.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              胸囲 (cm) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.chestCircumference || ''}
              onChange={(e) =>
                handleChange('chestCircumference', e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="例: 45.0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              着丈 (cm) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.bodyLength || ''}
              onChange={(e) => handleChange('bodyLength', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="例: 30.0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              胴回り (cm) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.waistCircumference || ''}
              onChange={(e) =>
                handleChange('waistCircumference', e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="例: 40.0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              体重 (kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.weight || ''}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="例: 5.5"
              required
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              カスタマイズに戻る
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                isValid
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              確認画面へ
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
