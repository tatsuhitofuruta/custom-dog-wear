'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCustomizer } from '@/contexts/CustomizerContext'
import { getProductById } from '@/data/products'
import ProductSelector from '@/components/ProductSelector'
import CustomizationPanel from '@/components/CustomizationPanel'
import PreviewPanel from '@/components/PreviewPanel'
import MeasurementForm from '@/components/MeasurementForm'
import ReviewPanel from '@/components/ReviewPanel'
import Header from '@/components/Header'

function CustomizeContent() {
  const searchParams = useSearchParams()
  const { selectedProduct, setSelectedProduct, currentStep } = useCustomizer()

  useEffect(() => {
    const productId = searchParams.get('product')
    if (productId && !selectedProduct) {
      const product = getProductById(productId)
      if (product) {
        setSelectedProduct(product)
      }
    }
  }, [searchParams, selectedProduct, setSelectedProduct])

  return (
    <>
      {currentStep === 'product' && <ProductSelector />}

      {currentStep === 'customize' && selectedProduct && (
        <div className="grid lg:grid-cols-2 gap-8">
          <PreviewPanel />
          <CustomizationPanel />
        </div>
      )}

      {currentStep === 'measurements' && <MeasurementForm />}

      {currentStep === 'review' && <ReviewPanel />}
    </>
  )
}

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-20">読み込み中...</div>}>
          <CustomizeContent />
        </Suspense>
      </main>
    </div>
  )
}
