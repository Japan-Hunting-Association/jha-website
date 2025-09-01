# JHA Website ドキュメント

一般社団法人日本狩猟協会 (Japan Hunting Association) ウェブサイトの技術ドキュメント

## 📚 ドキュメント構成

### 🏗️ アーキテクチャ
- [アーキテクチャ概要](./architecture.md) - システム全体の設計と構造
- [技術スタック](./tech-stack.md) - 使用技術の詳細と選定理由

### 👨‍💻 開発ガイド
- [開発環境セットアップ](./development/setup.md) - 初期設定とインストール
- [開発ワークフロー](./development/workflow.md) - 開発手順とベストプラクティス
- [コーディング規約](./development/coding-standards.md) - コードスタイルとルール
- [Serena MCP セットアップ](./development/serena-mcp-setup.md) - AI支援開発環境

### 📖 API & ルーティング
- [ルーティング設計](./api/routing.md) - URLパターンとページ構成
- [国際化 (i18n)](./api/i18n.md) - 多言語対応の実装

### 🧩 コンポーネント
- [コンポーネント一覧](./components/index.md) - 全コンポーネントのカタログ
- [コンポーネント設計](./components/design.md) - 設計原則とパターン

### 📦 コンテンツ管理
- [コンテンツコレクション](./content/collections.md) - Markdownコンテンツの管理
- [画像アセット](./content/assets.md) - 画像の最適化と管理

### 🚀 デプロイメント
- [ビルド & デプロイ](./deployment/build.md) - 本番環境へのデプロイ手順
- [Docker設定](./deployment/docker.md) - コンテナ化とDocker Compose
- [CI/CD](./deployment/ci-cd.md) - GitHub Actionsによる自動化

### 🔧 運用・保守
- [トラブルシューティング](./maintenance/troubleshooting.md) - よくある問題と解決方法
- [パフォーマンス最適化](./maintenance/performance.md) - サイト高速化の手法

## 🚀 クイックスタート

```bash
# 開発環境の起動
npm run dev

# Dockerでの起動
docker-compose up

# ビルド
npm run build

# 型チェック
npm run astro check
```

## 📝 プロジェクト概要

- **フレームワーク**: Astro 4.5.x (Static Site Generation)
- **スタイリング**: Tailwind CSS + DaisyUI
- **言語**: TypeScript
- **国際化**: 日本語/英語対応
- **コンテンツ**: Markdown/MDXベース

## 🔗 関連リンク

- [CLAUDE.md](../CLAUDE.md) - AI開発支援用の指示書
- [README.md](../README.md) - プロジェクトのメインREADME

## 📂 ドキュメント構造

```
docs/
├── README.md                     # このファイル
├── architecture.md               # アーキテクチャ概要
├── tech-stack.md                # 技術スタック詳細
├── development/                 # 開発関連
│   ├── setup.md
│   ├── workflow.md
│   ├── coding-standards.md
│   └── serena-mcp-setup.md
├── api/                         # API & ルーティング
│   ├── routing.md
│   └── i18n.md
├── components/                  # コンポーネント
│   ├── index.md
│   └── design.md
├── content/                     # コンテンツ管理
│   ├── collections.md
│   └── assets.md
├── deployment/                  # デプロイメント
│   ├── build.md
│   ├── docker.md
│   └── ci-cd.md
└── maintenance/                 # 運用・保守
    ├── troubleshooting.md
    └── performance.md
```

## 🤝 コントリビューション

ドキュメントの改善や追加は歓迎します。変更を加える際は、既存のフォーマットとスタイルに従ってください。

---

最終更新: 2025年1月