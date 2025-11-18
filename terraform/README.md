# Terraform Infrastructure for Custom Dog Wear

このディレクトリには、犬服カスタムオーダーメイドECサイトのAWSインフラ構成が含まれています。

## アーキテクチャ

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Route 53 (DNS)     │
│  (Optional)         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  CloudFront (CDN)   │
│  - HTTPS            │
│  - Caching          │
│  - Compression      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  S3 Bucket          │
│  - Static Website   │
│  - Versioning       │
│  - Encryption       │
└─────────────────────┘
```

## 含まれるリソース

### S3
- **Website Bucket**: 静的サイトのホスティング
- **Logs Bucket**: アクセスログの保存

### CloudFront
- グローバルCDN配信
- HTTPS強制
- カスタムドメイン対応
- キャッシング最適化

### セキュリティ
- S3バケットのパブリックアクセスブロック
- CloudFront OAC (Origin Access Control)
- 暗号化 (S3)
- TLS 1.2以上

## 前提条件

1. AWSアカウント
2. Terraform 1.0以上
3. AWS CLI設定済み
4. （オプション）ACM証明書（us-east-1リージョン）

## セットアップ

### 1. Terraform初期化

```bash
cd terraform

# 変数ファイルをコピー
cp terraform.tfvars.example terraform.tfvars

# 変数を編集
vi terraform.tfvars

# Terraform初期化
terraform init
```

### 2. バックエンド設定（推奨）

S3バックエンドを使用する場合：

```bash
# まず、Terraformステート用のS3バケットとDynamoDBテーブルを作成
# これは手動または別のTerraformプロジェクトで実施

# backend.tfを作成
cat << EOF > backend.tf
terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "custom-dog-wear/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
EOF

# 再初期化
terraform init
```

### 3. インフラのデプロイ

```bash
# プランの確認
terraform plan

# デプロイ実行
terraform apply

# 出力値の確認
terraform output
```

## 環境別デプロイ

### 開発環境

```bash
terraform workspace new dev
terraform workspace select dev
terraform apply -var-file="environments/dev.tfvars"
```

### ステージング環境

```bash
terraform workspace new staging
terraform workspace select staging
terraform apply -var-file="environments/staging.tfvars"
```

### 本番環境

```bash
terraform workspace new production
terraform workspace select production
terraform apply -var-file="environments/production.tfvars"
```

## カスタムドメイン設定

カスタムドメインを使用する場合：

1. **ACM証明書の作成（us-east-1リージョン）**
   ```bash
   # AWS Certificate Managerでドメインの証明書を作成
   # リージョンは必ずus-east-1を選択
   ```

2. **terraform.tfvarsに設定**
   ```hcl
   domain_name     = "example.com"
   certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/xxxxx"
   ```

3. **Route 53でDNS設定**
   - CloudFrontのドメイン名へのALIASレコードを作成
   - または、CNAMEレコードを作成

## デプロイ後の作業

### 1. ビルドとアップロード

```bash
# Next.jsアプリのビルド
cd ..
npm run build

# S3へアップロード
aws s3 sync out/ s3://$(terraform -chdir=terraform output -raw s3_bucket_name)/ --delete

# CloudFrontキャッシュクリア
aws cloudfront create-invalidation \
  --distribution-id $(terraform -chdir=terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

### 2. 動作確認

```bash
# CloudFrontのドメイン名を取得
terraform output website_url

# ブラウザでアクセス
open $(terraform output -raw website_url)
```

## コスト見積もり

### 開発環境（小規模）
- S3: $1-5/月
- CloudFront: $10-20/月
- 合計: 約$15-30/月

### 本番環境（中規模）
- S3: $5-20/月
- CloudFront: $50-200/月
- Route 53: $0.5/月
- 合計: 約$60-250/月

## メンテナンス

### ログの確認

```bash
# S3ログバケットから取得
aws s3 ls s3://$(terraform output -raw logs_bucket_name)/cloudfront/
```

### リソースの削除

```bash
# 注意：S3バケット内のデータも削除される
terraform destroy
```

## トラブルシューティング

### CloudFrontの更新が反映されない

```bash
# キャッシュクリア
aws cloudfront create-invalidation \
  --distribution-id $(terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

### S3バケットが削除できない

```bash
# バケット内のオブジェクトを全削除
aws s3 rm s3://$(terraform output -raw s3_bucket_name)/ --recursive

# バージョニングが有効な場合
aws s3api delete-objects \
  --bucket $(terraform output -raw s3_bucket_name) \
  --delete "$(aws s3api list-object-versions \
    --bucket $(terraform output -raw s3_bucket_name) \
    --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"
```

## セキュリティのベストプラクティス

1. **terraform.tfvarsをGitに含めない**
   - `.gitignore`に追加済み

2. **State fileの保護**
   - S3バックエンドを使用
   - バージョニングを有効化
   - 暗号化を有効化

3. **最小権限の原則**
   - IAMロール/ユーザーに必要最小限の権限のみ付与

4. **定期的なアップデート**
   - Terraformプロバイダーのバージョンアップ
   - AWS サービスの新機能の活用

## 参考資料

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
