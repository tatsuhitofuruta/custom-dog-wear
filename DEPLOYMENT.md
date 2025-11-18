# デプロイメントガイド

## 概要

このプロジェクトはAWS（S3 + CloudFront）にデプロイする静的Next.jsアプリケーションです。

## 前提条件

- Node.js 18以上
- AWS CLI設定済み
- Terraformインストール済み（インフラ構築用）
- GitHub Secretsの設定（CI/CD用）

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.localを編集

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## ビルド

```bash
# 本番ビルド
npm run build

# ビルド結果の確認
ls -la out/
```

## インフラ構築

### 1. Terraform設定

```bash
cd terraform

# 変数ファイルの作成
cp terraform.tfvars.example terraform.tfvars

# terraform.tfvarsを編集
vi terraform.tfvars
```

### 2. インフラデプロイ

```bash
# 初期化
terraform init

# プラン確認
terraform plan

# デプロイ
terraform apply

# 出力値の確認
terraform output
```

### 3. 出力値の保存

```bash
# S3バケット名
export S3_BUCKET=$(terraform output -raw s3_bucket_name)

# CloudFront Distribution ID
export CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)

# Website URL
terraform output website_url
```

## 手動デプロイ

### 1. ビルド

```bash
npm run build
```

### 2. S3へアップロード

```bash
# 全ファイルをS3にアップロード（静的アセットは長期キャッシュ）
aws s3 sync out/ s3://$S3_BUCKET/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sitemap.xml" \
  --exclude "robots.txt"

# HTMLファイルは短期キャッシュ
aws s3 sync out/ s3://$S3_BUCKET/ \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --include "sitemap.xml" \
  --include "robots.txt"
```

### 3. CloudFrontキャッシュクリア

```bash
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_ID \
  --paths "/*"
```

## CI/CDデプロイ

GitHub Actionsを使用した自動デプロイが設定されています。

### GitHub Secretsの設定

以下のSecretsをGitHubリポジトリに設定してください：

#### AWS認証情報
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

#### 本番環境
- `PRODUCTION_S3_BUCKET`
- `PRODUCTION_CLOUDFRONT_ID`

#### ステージング環境（オプション）
- `STAGING_S3_BUCKET`
- `STAGING_CLOUDFRONT_ID`

#### 開発環境（オプション）
- `DEV_S3_BUCKET`
- `DEV_CLOUDFRONT_ID`

### デプロイフロー

#### mainブランチへのpush
```bash
git push origin main
```
→ 本番環境に自動デプロイ

#### stagingブランチへのpush
```bash
git push origin staging
```
→ ステージング環境に自動デプロイ

#### developブランチへのpush
```bash
git push origin develop
```
→ 開発環境に自動デプロイ

## カスタムドメイン設定

### 1. ACM証明書の作成

```bash
# us-east-1リージョンで作成（CloudFront用）
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names "*.example.com" \
  --validation-method DNS \
  --region us-east-1
```

### 2. DNS検証

AWS Certificate Managerのコンソールで、DNSレコードを追加して検証します。

### 3. Terraform変数に追加

```hcl
# terraform.tfvars
domain_name     = "example.com"
certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/xxxxx"
```

### 4. インフラ更新

```bash
terraform apply
```

### 5. Route 53設定（またはDNSプロバイダー）

CloudFrontのドメイン名へのALIASレコードを作成：

```
example.com -> d1234567890abc.cloudfront.net (ALIAS)
```

## 環境変数

### ビルド時の環境変数

`.env.example`を参照して、必要な環境変数を設定してください。

```bash
# 本番環境
NEXT_PUBLIC_APP_NAME=ワンちゃんオーダーメイド
NEXT_PUBLIC_APP_URL=https://example.com

# 開発環境
NEXT_PUBLIC_APP_NAME=ワンちゃんオーダーメイド（開発）
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## トラブルシューティング

### ビルドエラー

```bash
# node_modulesとキャッシュをクリア
rm -rf node_modules .next
npm install
npm run build
```

### CloudFrontの更新が反映されない

```bash
# キャッシュを完全にクリア
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_ID \
  --paths "/*"

# 反映まで5-10分待つ
```

### S3アップロードエラー

```bash
# 権限確認
aws s3 ls s3://$S3_BUCKET/

# バケットポリシー確認
aws s3api get-bucket-policy --bucket $S3_BUCKET
```

## パフォーマンス最適化

### 1. 画像最適化

Next.jsの`next/image`を使用していますが、静的エクスポートでは`unoptimized`になります。
別途CloudinaryやImgixなどのCDNを検討してください。

### 2. バンドルサイズ分析

```bash
npm run build
# Build Analyzerが有効な場合、バンドルサイズが表示されます
```

### 3. キャッシュ戦略

- 静的アセット（JS, CSS, 画像）: 1年キャッシュ
- HTMLファイル: キャッシュなし（常に最新）
- CloudFrontエッジでのキャッシュ最適化

## セキュリティ

### 1. S3バケット

- パブリックアクセスブロック有効
- CloudFront OACのみアクセス可能
- バージョニング有効
- 暗号化有効

### 2. CloudFront

- HTTPS強制
- TLS 1.2以上
- セキュリティヘッダー（オプション）

### 3. WAF（オプション）

必要に応じてAWS WAFを有効化：

```hcl
# terraform.tfvars
enable_waf = true
```

## コスト管理

### 月額コスト見積もり

- S3: $1-5
- CloudFront: $10-50（トラフィック次第）
- Route 53: $0.5
- 合計: 約$15-60/月

### コスト最適化

1. CloudFrontのPrice Classを調整
2. S3ライフサイクルポリシーでログ削除
3. 不要なオブジェクトバージョンの削除

## モニタリング

### CloudWatch

- CloudFrontメトリクス
- S3メトリクス
- アクセスログ

### ログ確認

```bash
# S3ログ
aws s3 ls s3://$(terraform output -raw logs_bucket_name)/cloudfront/

# ログダウンロード
aws s3 sync s3://$(terraform output -raw logs_bucket_name)/cloudfront/ ./logs/
```

## バックアップ

### S3バージョニング

S3バケットのバージョニングが有効になっているため、誤削除時の復元が可能です。

```bash
# バージョン一覧
aws s3api list-object-versions --bucket $S3_BUCKET

# バージョン復元
aws s3api get-object \
  --bucket $S3_BUCKET \
  --key index.html \
  --version-id <version-id> \
  index.html.backup
```

## リソース削除

### 全リソースの削除

```bash
# S3バケット内のオブジェクトを削除
aws s3 rm s3://$S3_BUCKET/ --recursive

# Terraformでインフラ削除
cd terraform
terraform destroy
```

**注意**: 本番環境では慎重に実施してください。

## サポート

問題が発生した場合は、以下を確認してください：

1. ビルドログ
2. CloudWatchログ
3. S3バケットポリシー
4. CloudFront設定
5. DNS設定

詳細は[DESIGN.md](./DESIGN.md)および[terraform/README.md](./terraform/README.md)を参照してください。
