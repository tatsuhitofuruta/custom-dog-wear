# 犬服カスタムオーダーメイドEC - システム設計書

## プロジェクト概要
犬服をパーツごとに生地やカラーを選択できるオーダーメイドECサイト

## ベンチマーク
Bullfeet（カスタムスニーカー）: https://bullfeet.com/products/rodin-shoes

## 主要機能

### 1. 商品ラインアップ選択
- 4-5種類の犬服テンプレート（パーカー、Tシャツ、ジャケット、コート、ベスト）
- 各テンプレートに異なるカスタマイズ可能パーツ

### 2. パーツカスタマイズ
- **カスタマイズ可能パーツ**:
  - ネック（襟）
  - 胴体（ボディ）
  - 袖
  - 裾
  - ポケット（オプション）
  - ボタン/ファスナー（オプション）

- **カスタマイズ要素**:
  - 生地タイプ（コットン、ポリエステル、デニム、フリース等）
  - カラー（基本色 + カスタムカラー）
  - パターン（無地、ストライプ、チェック、ドット等）

### 3. 採寸データ入力
- **必要な採寸項目**:
  - 首回り（cm）
  - 胸囲（cm）
  - 着丈（cm）
  - 胴回り（cm）
  - 体重（kg）
- サイズガイド表示
- 採寸方法の図解説明

### 4. 3Dプレビュー
- リアルタイムで選択内容を反映
- 360度回転表示
- ズームイン/ズームアウト
- カラー変更時の即座反映

### 5. 注文・カート機能
- カスタム内容の保存
- 価格のリアルタイム計算
- カート追加
- 注文履歴

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **3D表示**: React Three Fiber (Three.js wrapper)
- **状態管理**: React Context API
- **フォーム**: React Hook Form + Zod

### バックエンド
- **API**: Next.js API Routes
- **データベース**: SQLite (開発) / PostgreSQL (本番想定)
- **ORM**: Prisma

### その他
- **画像最適化**: Next.js Image
- **アイコン**: Lucide React

## データモデル

### Product（商品テンプレート）
```typescript
interface Product {
  id: string
  name: string // "パーカー", "Tシャツ" など
  description: string
  basePrice: number
  imageUrl: string
  availableParts: string[] // カスタマイズ可能なパーツのリスト
}
```

### CustomizablePart（カスタマイズ可能パーツ）
```typescript
interface CustomizablePart {
  id: string
  name: string // "ネック", "胴", "袖" など
  partType: 'neck' | 'body' | 'sleeve' | 'hem' | 'pocket' | 'fastener'
}
```

### Material（生地）
```typescript
interface Material {
  id: string
  name: string // "コットン", "ポリエステル" など
  type: string
  priceModifier: number // 基本価格からの変動額
  colors: Color[]
  patterns: Pattern[]
}
```

### Color（カラー）
```typescript
interface Color {
  id: string
  name: string // "レッド", "ブルー" など
  hexCode: string // "#FF0000"
  rgbCode: string // "rgb(255, 0, 0)"
}
```

### Pattern（パターン）
```typescript
interface Pattern {
  id: string
  name: string // "無地", "ストライプ" など
  textureUrl?: string
  priceModifier: number
}
```

### Measurement（採寸データ）
```typescript
interface Measurement {
  neckCircumference: number // 首回り
  chestCircumference: number // 胸囲
  bodyLength: number // 着丈
  waistCircumference: number // 胴回り
  weight: number // 体重
}
```

### CustomOrder（カスタム注文）
```typescript
interface CustomOrder {
  id: string
  productId: string
  customizations: {
    partId: string
    materialId: string
    colorId: string
    patternId: string
  }[]
  measurements: Measurement
  totalPrice: number
  createdAt: Date
  status: 'draft' | 'ordered' | 'in_production' | 'shipped' | 'delivered'
}
```

## UI/UXフロー

### 1. ランディングページ
- ヒーロセクション（メインビジュアル）
- 商品ラインアップ一覧
- カスタマイズ事例

### 2. カスタマイザーページ
**レイアウト構成**:
```
┌────────────────────────────────────────┐
│ Header (ロゴ、ナビゲーション)         │
├────────────────┬───────────────────────┤
│                │                       │
│  3Dプレビュー  │  カスタマイズパネル   │
│  (左側50%)     │  (右側50%)            │
│                │                       │
│                │  1. 商品選択          │
│                │  2. パーツ選択        │
│                │  3. 生地選択          │
│  - 回転        │  4. カラー選択        │
│  - ズーム      │  5. パターン選択      │
│                │  6. 採寸入力          │
│                │                       │
│                │  価格表示             │
│                │  [カートに追加]       │
└────────────────┴───────────────────────┘
```

### 3. カート/チェックアウト
- 注文内容確認
- 配送先入力
- 決済

## 実装フェーズ

### Phase 1: 基盤構築
- Next.jsプロジェクト初期化
- Tailwind CSS設定
- 基本レイアウト作成

### Phase 2: データ層
- データモデル定義
- モックデータ作成
- Context API実装

### Phase 3: カスタマイザーUI
- 商品選択UI
- パーツ選択UI
- 生地/カラー/パターン選択UI
- 採寸入力フォーム

### Phase 4: 3Dプレビュー
- React Three Fiber導入
- 3Dモデル表示
- カラー/テクスチャ変更

### Phase 5: カート/注文
- カート機能
- 注文確認
- 簡易バックエンドAPI

### Phase 6: 最適化・テスト
- パフォーマンス最適化
- レスポンシブ対応
- ビルド・デプロイ準備

## 価格計算ロジック
```
総額 = 基本価格 + Σ(各パーツの生地価格変動) + Σ(各パーツのパターン価格変動)
```

## 備考
- 3D表示は初期段階では簡易的な2D画像の切り替えで対応も可
- 決済機能は後回しでモック実装
- 管理画面は今回のスコープ外
