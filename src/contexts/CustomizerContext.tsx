'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  Product,
  PartCustomization,
  Measurement,
  CustomizerState,
} from '@/types'
import { MATERIALS, COLORS, PATTERNS } from '@/data/materials'

interface CustomizerContextType extends CustomizerState {
  setSelectedProduct: (product: Product | null) => void
  updatePartCustomization: (partId: string, customization: Partial<PartCustomization>) => void
  setMeasurements: (measurements: Measurement) => void
  setCurrentStep: (step: CustomizerState['currentStep']) => void
  calculateTotalPrice: () => number
  resetCustomizer: () => void
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(
  undefined
)

export function CustomizerProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [customizations, setCustomizations] = useState<
    Record<string, PartCustomization>
  >({})
  const [measurements, setMeasurements] = useState<Measurement | null>(null)
  const [currentStep, setCurrentStep] =
    useState<CustomizerState['currentStep']>('product')

  const updatePartCustomization = (
    partId: string,
    customization: Partial<PartCustomization>
  ) => {
    setCustomizations((prev) => ({
      ...prev,
      [partId]: {
        partId,
        materialId: customization.materialId || prev[partId]?.materialId || MATERIALS[0].id,
        colorId: customization.colorId || prev[partId]?.colorId || COLORS[0].id,
        patternId: customization.patternId || prev[partId]?.patternId || PATTERNS[0].id,
      },
    }))
  }

  const calculateTotalPrice = (): number => {
    if (!selectedProduct) return 0

    let total = selectedProduct.basePrice

    Object.values(customizations).forEach((custom) => {
      const material = MATERIALS.find((m) => m.id === custom.materialId)
      const pattern = PATTERNS.find((p) => p.id === custom.patternId)

      if (material) total += material.priceModifier
      if (pattern) total += pattern.priceModifier
    })

    return total
  }

  const resetCustomizer = () => {
    setSelectedProduct(null)
    setCustomizations({})
    setMeasurements(null)
    setCurrentStep('product')
  }

  return (
    <CustomizerContext.Provider
      value={{
        selectedProduct,
        customizations,
        measurements,
        currentStep,
        setSelectedProduct,
        updatePartCustomization,
        setMeasurements,
        setCurrentStep,
        calculateTotalPrice,
        resetCustomizer,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  )
}

export function useCustomizer() {
  const context = useContext(CustomizerContext)
  if (context === undefined) {
    throw new Error('useCustomizer must be used within a CustomizerProvider')
  }
  return context
}
