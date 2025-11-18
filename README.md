# ワンちゃんオーダーメイド - カスタム犬服EC

犬服をパーツごとに生地やカラーを選択できるオーダーメイドECサイト

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 主要機能

### カスタマイズ機能
- ✅ 5種類の商品ラインアップ（パーカー、Tシャツ、ジャケット、コート、ベスト）
- ✅ パーツごとのカスタマイズ（ネック、ボディ、袖、裾、ポケット）
- ✅ 5種類の生地選択（コットン、ポリエステル、フリース、デニム、ナイロン）
- ✅ 12色のカラーバリエーション
- ✅ 6種類のパターン（無地、ストライプ、ドット、チェック、迷彩、花柄）

### プレビュー機能
- ✅ リアルタイム3Dプレビュー（React Three Fiber）
- ✅ 2D SVGプレビュー
- ✅ プレビューモード切り替え

### 注文機能
- ✅ 採寸データ入力フォーム（首回り、胸囲、着丈、胴回り、体重）
- ✅ 採寸ガイド表示
- ✅ リアルタイム価格計算
- ✅ 注文確認画面

### その他
- ✅ レスポンシブデザイン
- ✅ SEO最適化
- ✅ エラーハンドリング
- ✅ ローディング状態

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **3D**: React Three Fiber + Three.js
- **状態管理**: React Context API
- **アイコン**: Lucide React

### インフラ
- **ホスティング**: AWS S3 + CloudFront
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **DNS**: Route 53 (オプション)

## クイックスタート

### ローカル開発

```bash
# 1. 依存関係のインストール
npm install

# 2. 環境変数の設定
cp .env.local.example .env.local

# 3. 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### ビルド

```bash
# 本番ビルド
npm run build

# ビルド結果は out/ ディレクトリに出力されます
```

## デプロイ

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

### AWS へのデプロイ

```bash
# 1. Terraformでインフラ構築
cd terraform
terraform init
terraform apply

# 2. アプリケーションビルド
cd ..
npm run build

# 3. S3へアップロード
aws s3 sync out/ s3://your-bucket-name/ --delete

# 4. CloudFrontキャッシュクリア
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### CI/CD

GitHub Actionsによる自動デプロイが設定されています：

- `main` ブランチ → 本番環境
- `staging` ブランチ → ステージング環境
- `develop` ブランチ → 開発環境

## プロジェクト構造

```
custom-dog-wear/
├── .github/
│   └── workflows/        # GitHub Actions
│       ├── deploy.yml    # デプロイワークフロー
│       └── terraform.yml # Terraformワークフロー
├── terraform/            # インフラ定義
│   ├── main.tf          # メイン設定
│   ├── variables.tf     # 変数定義
│   ├── s3.tf            # S3バケット
│   ├── cloudfront.tf    # CloudFront
│   └── outputs.tf       # 出力値
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── customize/    # カスタマイザーページ
│   │   ├── layout.tsx    # ルートレイアウト
│   │   ├── page.tsx      # ホームページ
│   │   ├── robots.ts     # robots.txt
│   │   ├── sitemap.ts    # サイトマップ
│   │   └── globals.css   # グローバルスタイル
│   ├── components/       # Reactコンポーネント
│   │   ├── Header.tsx
│   │   ├── ProductSelector.tsx
│   │   ├── CustomizationPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── ThreeDPreview.tsx      # 3Dプレビュー
│   │   ├── MeasurementForm.tsx
│   │   ├── ReviewPanel.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── contexts/         # React Context
│   │   └── CustomizerContext.tsx
│   ├── data/             # データ定義
│   │   ├── products.ts
│   │   └── materials.ts
│   └── types/            # TypeScript型定義
│       └── index.ts
├── public/               # 静的ファイル
├── DESIGN.md             # システム設計書
├── DEPLOYMENT.md         # デプロイメントガイド
├── .env.example          # 環境変数サンプル
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

## 環境変数

`.env.example` を参照して環境変数を設定してください。

```bash
# Application
NEXT_PUBLIC_APP_NAME=ワンちゃんオーダーメイド
NEXT_PUBLIC_APP_URL=https://example.com

# Feature Flags
NEXT_PUBLIC_ENABLE_3D_PREVIEW=true
```

## ドキュメント

- [システム設計書](./DESIGN.md) - アーキテクチャとデータモデル
- [デプロイメントガイド](./DEPLOYMENT.md) - デプロイ手順の詳細
- [Terraform README](./terraform/README.md) - インフラ構築ガイド

## 今後の拡張予定

- [x] 3Dプレビュー機能（React Three Fiber）
- [x] AWS インフラ（Terraform）
- [x] CI/CD（GitHub Actions）
- [x] SEO最適化
- [ ] カート機能
- [ ] 決済統合（Stripe等）
- [ ] ユーザー認証
- [ ] 注文履歴
- [ ] 管理画面
- [ ] メール通知
- [ ] PWA対応

## パフォーマンス

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- 静的エクスポートによる高速配信
- CloudFront CDNによるグローバル配信

## セキュリティ

- S3バケットのパブリックアクセスブロック
- CloudFront OAC（Origin Access Control）
- HTTPS強制
- セキュリティヘッダー
- 定期的な依存関係の更新

## ライセンス

Private
