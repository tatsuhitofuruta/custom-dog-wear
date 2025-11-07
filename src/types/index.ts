// パーツタイプ
export type PartType = 'neck' | 'body' | 'sleeve' | 'hem' | 'pocket' | 'fastener'

// カラー
export interface Color {
  id: string
  name: string
  hexCode: string
  rgbCode: string
}

// パターン
export interface Pattern {
  id: string
  name: string
  textureUrl?: string
  priceModifier: number
}

// 生地
export interface Material {
  id: string
  name: string
  type: string
  description: string
  priceModifier: number
  colors: Color[]
  patterns: Pattern[]
}

// カスタマイズ可能パーツ
export interface CustomizablePart {
  id: string
  name: string
  partType: PartType
  displayName: string
}

// 商品
export interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  imageUrl: string
  availableParts: CustomizablePart[]
}

// 採寸データ
export interface Measurement {
  neckCircumference: number // 首回り
  chestCircumference: number // 胸囲
  bodyLength: number // 着丈
  waistCircumference: number // 胴回り
  weight: number // 体重
}

// パーツのカスタマイズ設定
export interface PartCustomization {
  partId: string
  materialId: string
  colorId: string
  patternId: string
}

// カスタム注文
export interface CustomOrder {
  id: string
  productId: string
  customizations: PartCustomization[]
  measurements: Measurement
  totalPrice: number
  createdAt: Date
  status: 'draft' | 'ordered' | 'in_production' | 'shipped' | 'delivered'
}

// カスタマイザーの状態
export interface CustomizerState {
  selectedProduct: Product | null
  customizations: Record<string, PartCustomization>
  measurements: Measurement | null
  currentStep: 'product' | 'customize' | 'measurements' | 'review'
}
