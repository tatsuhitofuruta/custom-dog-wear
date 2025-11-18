import { PartCustomization, Measurement } from '@/types'

const STORAGE_KEYS = {
  CUSTOMIZATIONS: 'customizer_customizations',
  MEASUREMENTS: 'customizer_measurements',
  PRODUCT_ID: 'customizer_product_id',
} as const

export const storage = {
  saveCustomizations: (customizations: Record<string, PartCustomization>) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMIZATIONS, JSON.stringify(customizations))
    } catch (error) {
      console.error('Failed to save customizations:', error)
    }
  },

  loadCustomizations: (): Record<string, PartCustomization> | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOMIZATIONS)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load customizations:', error)
      return null
    }
  },

  saveMeasurements: (measurements: Measurement) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(measurements))
    } catch (error) {
      console.error('Failed to save measurements:', error)
    }
  },

  loadMeasurements: (): Measurement | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load measurements:', error)
      return null
    }
  },

  saveProductId: (productId: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCT_ID, productId)
    } catch (error) {
      console.error('Failed to save product ID:', error)
    }
  },

  loadProductId: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PRODUCT_ID)
    } catch (error) {
      console.error('Failed to load product ID:', error)
      return null
    }
  },

  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  },
}
