import { Product, CustomizablePart } from '@/types'

// カスタマイズ可能パーツの定義
export const PARTS: CustomizablePart[] = [
  {
    id: 'neck',
    name: 'ネック',
    partType: 'neck',
    displayName: '襟・首回り',
  },
  {
    id: 'body',
    name: 'ボディ',
    partType: 'body',
    displayName: '胴体',
  },
  {
    id: 'sleeve',
    name: 'スリーブ',
    partType: 'sleeve',
    displayName: '袖',
  },
  {
    id: 'hem',
    name: 'ヘム',
    partType: 'hem',
    displayName: '裾',
  },
  {
    id: 'pocket',
    name: 'ポケット',
    partType: 'pocket',
    displayName: 'ポケット（オプション）',
  },
]

// 商品データ
export const PRODUCTS: Product[] = [
  {
    id: 'hoodie',
    name: 'パーカー',
    description: 'フード付きの暖かいパーカー。秋冬におすすめ。',
    basePrice: 5800,
    imageUrl: '/images/hoodie.png',
    availableParts: [
      PARTS[0], // neck
      PARTS[1], // body
      PARTS[2], // sleeve
      PARTS[3], // hem
      PARTS[4], // pocket
    ],
  },
  {
    id: 'tshirt',
    name: 'Tシャツ',
    description: 'シンプルで着やすいTシャツ。オールシーズン対応。',
    basePrice: 3800,
    imageUrl: '/images/tshirt.png',
    availableParts: [
      PARTS[0], // neck
      PARTS[1], // body
      PARTS[2], // sleeve
    ],
  },
  {
    id: 'jacket',
    name: 'ジャケット',
    description: 'スタイリッシュなジャケット。お出かけにぴったり。',
    basePrice: 6800,
    imageUrl: '/images/jacket.png',
    availableParts: [
      PARTS[0], // neck
      PARTS[1], // body
      PARTS[2], // sleeve
      PARTS[3], // hem
      PARTS[4], // pocket
    ],
  },
  {
    id: 'coat',
    name: 'コート',
    description: '防寒性に優れた冬用コート。',
    basePrice: 7800,
    imageUrl: '/images/coat.png',
    availableParts: [
      PARTS[0], // neck
      PARTS[1], // body
      PARTS[2], // sleeve
      PARTS[3], // hem
    ],
  },
  {
    id: 'vest',
    name: 'ベスト',
    description: '袖なしで動きやすいベスト。春秋におすすめ。',
    basePrice: 4200,
    imageUrl: '/images/vest.png',
    availableParts: [
      PARTS[0], // neck
      PARTS[1], // body
      PARTS[3], // hem
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
