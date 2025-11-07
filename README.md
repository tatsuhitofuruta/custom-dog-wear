# ワンちゃんオーダーメイド - カスタム犬服EC

犬服をパーツごとに生地やカラーを選択できるオーダーメイドECサイト

## 主要機能

- 5種類の商品ラインアップ（パーカー、Tシャツ、ジャケット、コート、ベスト）
- パーツごとのカスタマイズ（ネック、ボディ、袖、裾、ポケット）
- 生地・カラー・パターン選択
- リアルタイムプレビュー（2D SVG）
- 採寸データ入力フォーム
- 注文確認・決済フロー

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context API
- **アイコン**: Lucide React

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
custom-dog-wear/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── customize/    # カスタマイザーページ
│   │   ├── layout.tsx    # ルートレイアウト
│   │   ├── page.tsx      # ホームページ
│   │   └── globals.css   # グローバルスタイル
│   ├── components/       # Reactコンポーネント
│   │   ├── Header.tsx
│   │   ├── ProductSelector.tsx
│   │   ├── CustomizationPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── MeasurementForm.tsx
│   │   └── ReviewPanel.tsx
│   ├── contexts/         # React Context
│   │   └── CustomizerContext.tsx
│   ├── data/             # データ定義
│   │   ├── products.ts
│   │   └── materials.ts
│   └── types/            # TypeScript型定義
│       └── index.ts
├── DESIGN.md             # システム設計書
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## カスタマイズフロー

1. **商品選択**: 5種類の商品から選択
2. **パーツカスタマイズ**: 各パーツの生地・カラー・パターンを選択
3. **採寸データ入力**: ワンちゃんのサイズを入力
4. **注文確認**: 内容を確認して注文確定

## 価格計算

```
総額 = 基本価格 + Σ(生地価格変動) + Σ(パターン価格変動)
```

## 今後の拡張予定

- [ ] 3Dプレビュー機能（React Three Fiber）
- [ ] カート機能
- [ ] 決済統合（Stripe等）
- [ ] ユーザー認証
- [ ] 注文履歴
- [ ] 管理画面
- [ ] メール通知
- [ ] レスポンシブ最適化

## ライセンス

Private
