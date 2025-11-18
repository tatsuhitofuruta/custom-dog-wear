# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-11-18

### Added
- 初期リリース
- 5種類の商品ラインアップ（パーカー、Tシャツ、ジャケット、コート、ベスト）
- パーツごとのカスタマイズ機能（ネック、ボディ、袖、裾、ポケット）
- 5種類の生地選択（コットン、ポリエステル、フリース、デニム、ナイロン）
- 12色のカラーバリエーション
- 6種類のパターン（無地、ストライプ、ドット、チェック、迷彩、花柄）
- リアルタイム3Dプレビュー（React Three Fiber）
- 2D SVGプレビュー
- プレビューモード切り替え
- 採寸データ入力フォーム
- 採寸ガイド表示
- リアルタイム価格計算
- 注文確認画面
- TerraformによるAWSインフラ定義（S3 + CloudFront）
- GitHub Actionsによる自動デプロイパイプライン
- 環境別デプロイ対応（dev/staging/production）
- SEO最適化（メタデータ、sitemap、robots.txt）
- セキュリティヘッダー（CSP、HSTS、X-Frame-Options等）
- エラーハンドリングとローディング状態
- レスポンシブデザイン
- アクセシビリティ対応

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- S3バケットのパブリックアクセスブロック
- CloudFront OAC（Origin Access Control）
- HTTPS強制
- TLS 1.2以上
- セキュリティヘッダー設定
- 入力バリデーション

## [0.0.1] - 2024-11-07

### Added
- プロジェクト初期化
- 基本設計

[Unreleased]: https://github.com/username/custom-dog-wear/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/username/custom-dog-wear/releases/tag/v0.1.0
[0.0.1]: https://github.com/username/custom-dog-wear/releases/tag/v0.0.1
