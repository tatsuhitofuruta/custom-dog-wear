import { Material, Color, Pattern } from '@/types'

// カラーデータ
export const COLORS: Color[] = [
  { id: 'white', name: 'ホワイト', hexCode: '#FFFFFF', rgbCode: 'rgb(255, 255, 255)' },
  { id: 'black', name: 'ブラック', hexCode: '#000000', rgbCode: 'rgb(0, 0, 0)' },
  { id: 'red', name: 'レッド', hexCode: '#EF4444', rgbCode: 'rgb(239, 68, 68)' },
  { id: 'blue', name: 'ブルー', hexCode: '#3B82F6', rgbCode: 'rgb(59, 130, 246)' },
  { id: 'green', name: 'グリーン', hexCode: '#10B981', rgbCode: 'rgb(16, 185, 129)' },
  { id: 'yellow', name: 'イエロー', hexCode: '#F59E0B', rgbCode: 'rgb(245, 158, 11)' },
  { id: 'pink', name: 'ピンク', hexCode: '#EC4899', rgbCode: 'rgb(236, 72, 153)' },
  { id: 'purple', name: 'パープル', hexCode: '#A855F7', rgbCode: 'rgb(168, 85, 247)' },
  { id: 'orange', name: 'オレンジ', hexCode: '#F97316', rgbCode: 'rgb(249, 115, 22)' },
  { id: 'gray', name: 'グレー', hexCode: '#6B7280', rgbCode: 'rgb(107, 114, 128)' },
  { id: 'navy', name: 'ネイビー', hexCode: '#1E3A8A', rgbCode: 'rgb(30, 58, 138)' },
  { id: 'brown', name: 'ブラウン', hexCode: '#92400E', rgbCode: 'rgb(146, 64, 14)' },
]

// パターンデータ
export const PATTERNS: Pattern[] = [
  { id: 'solid', name: '無地', priceModifier: 0 },
  { id: 'stripe', name: 'ストライプ', priceModifier: 300 },
  { id: 'dot', name: 'ドット', priceModifier: 300 },
  { id: 'check', name: 'チェック', priceModifier: 400 },
  { id: 'camouflage', name: '迷彩', priceModifier: 500 },
  { id: 'floral', name: '花柄', priceModifier: 500 },
]

// 生地データ
export const MATERIALS: Material[] = [
  {
    id: 'cotton',
    name: 'コットン',
    type: '天然繊維',
    description: '肌触りが良く通気性に優れた素材',
    priceModifier: 0,
    colors: COLORS,
    patterns: PATTERNS,
  },
  {
    id: 'polyester',
    name: 'ポリエステル',
    type: '化学繊維',
    description: '耐久性が高く乾きやすい素材',
    priceModifier: 200,
    colors: COLORS,
    patterns: PATTERNS,
  },
  {
    id: 'fleece',
    name: 'フリース',
    type: '起毛素材',
    description: '保温性に優れた暖かい素材',
    priceModifier: 500,
    colors: COLORS.filter((c) =>
      ['white', 'black', 'gray', 'navy', 'brown', 'pink'].includes(c.id)
    ),
    patterns: [PATTERNS[0]], // 無地のみ
  },
  {
    id: 'denim',
    name: 'デニム',
    type: 'ツイル織り',
    description: '丈夫でカジュアルな素材',
    priceModifier: 600,
    colors: COLORS.filter((c) =>
      ['blue', 'navy', 'black', 'white'].includes(c.id)
    ),
    patterns: [PATTERNS[0]], // 無地のみ
  },
  {
    id: 'nylon',
    name: 'ナイロン',
    type: '化学繊維',
    description: '軽量で撥水性のある素材',
    priceModifier: 400,
    colors: COLORS,
    patterns: PATTERNS.slice(0, 3), // 無地、ストライプ、ドット
  },
]

export function getMaterialById(id: string): Material | undefined {
  return MATERIALS.find((m) => m.id === id)
}

export function getColorById(id: string): Color | undefined {
  return COLORS.find((c) => c.id === id)
}

export function getPatternById(id: string): Pattern | undefined {
  return PATTERNS.find((p) => p.id === id)
}
