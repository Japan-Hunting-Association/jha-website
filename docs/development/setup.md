# 開発環境セットアップ

## 必要な環境

### システム要件
- **Node.js**: v20.0.0以上
- **npm**: v9.0.0以上
- **Git**: v2.0以上
- **メモリ**: 4GB以上推奨
- **ディスク**: 2GB以上の空き容量

### 推奨開発環境
- **OS**: macOS, Linux, Windows (WSL2推奨)
- **エディタ**: VS Code
- **ブラウザ**: Chrome/Firefox (最新版)

## セットアップ手順

### 1. リポジトリのクローン

```bash
# HTTPSの場合
git clone https://github.com/your-org/jha-website.git

# SSHの場合
git clone git@github.com:your-org/jha-website.git

# ディレクトリ移動
cd jha-website
```

### 2. Node.jsのインストール

#### nvmを使用する場合（推奨）
```bash
# nvmのインストール（未インストールの場合）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Node.js 20のインストール
nvm install 20
nvm use 20

# デフォルトバージョンに設定
nvm alias default 20
```

#### 直接インストールする場合
[Node.js公式サイト](https://nodejs.org/)からv20 LTSをダウンロード

### 3. 依存関係のインストール

```bash
# package-lock.jsonを使用した厳密なインストール
npm ci

# 通常のインストール（新規の場合）
npm install
```

### 4. 環境変数の設定

```bash
# .envファイルの作成
cp .env.example .env

# .envファイルを編集
nano .env  # または好みのエディタで
```

**.env ファイルの内容**
```env
# 開発環境設定
NODE_ENV=development
PUBLIC_SITE_URL=http://localhost:4321

# API設定（必要に応じて）
API_BASE_URL=https://api.example.com

# その他の環境変数
DEBUG=true
```

### 5. 開発サーバーの起動

```bash
# 開発サーバー起動
npm run dev

# ブラウザで確認
# http://localhost:4321
```

## Docker環境のセットアップ

### 1. Dockerのインストール

#### macOS/Windows
[Docker Desktop](https://www.docker.com/products/docker-desktop)をインストール

#### Linux
```bash
# Dockerのインストール
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Composeのインストール
sudo apt-get install docker-compose-plugin
```

### 2. Dockerコンテナの起動

```bash
# コンテナのビルドと起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d

# ログの確認
docker-compose logs -f

# コンテナの停止
docker-compose down
```

### 3. Dockerコンテナ内での作業

```bash
# コンテナにアクセス
docker-compose exec web sh

# コンテナ内でコマンド実行
docker-compose exec web npm run build
```

## VS Code セットアップ

### 1. 推奨拡張機能のインストール

**.vscode/extensions.json**
```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "naumovs.color-highlight",
    "christian-kohler.path-intellisense"
  ]
}
```

インストールコマンド:
```bash
# 推奨拡張機能の一括インストール
code --install-extension astro-build.astro-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

### 2. VS Code設定

**.vscode/settings.json**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "astro": "html"
  },
  "files.associations": {
    "*.astro": "astro"
  },
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

## 開発用コマンド一覧

### 基本コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド（型チェック付き）
npm run build

# ビルド結果のプレビュー
npm run preview

# 型チェックのみ
npm run astro check
```

### デバッグコマンド
```bash
# 詳細ログ付き開発サーバー
DEBUG=* npm run dev

# ビルド詳細ログ
npm run build -- --verbose
```

### クリーンアップ
```bash
# node_modulesとキャッシュのクリア
rm -rf node_modules .astro
npm ci

# ビルド成果物のクリア
rm -rf dist
```

## トラブルシューティング

### ポート競合エラー
```bash
# エラー: Port 4321 is already in use

# 解決方法1: 別のポートを使用
npm run dev -- --port 4322

# 解決方法2: 使用中のプロセスを終了
lsof -i :4321
kill -9 <PID>
```

### 依存関係エラー
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュクリア付き
npm cache clean --force
npm install
```

### TypeScriptエラー
```bash
# 型定義の再生成
npm run astro sync

# TypeScript設定の確認
npx tsc --noEmit
```

### Dockerエラー
```bash
# コンテナの再ビルド
docker-compose down
docker-compose build --no-cache
docker-compose up

# ボリュームのクリア
docker-compose down -v
```

## 開発環境の確認

### 環境確認スクリプト
```bash
#!/bin/bash
echo "=== 開発環境チェック ==="
echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"
echo "Git: $(git --version)"
echo ""
echo "=== プロジェクト状態 ==="
echo "Branch: $(git branch --show-current)"
echo "Dependencies: $(npm list --depth=0 | wc -l) packages"
echo ""
echo "=== ポート確認 ==="
lsof -i :4321 2>/dev/null || echo "Port 4321: 利用可能"
```

### ヘルスチェック
```bash
# ビルドテスト
npm run build

# 型チェック
npm run astro check

# 依存関係の脆弱性チェック
npm audit
```

## 次のステップ

1. [開発ワークフロー](./workflow.md)を確認
2. [コーディング規約](./coding-standards.md)を理解
3. [コンポーネント設計](../components/design.md)を学習
4. 実際の開発を開始

## サポート

問題が解決しない場合:
1. [トラブルシューティングガイド](../maintenance/troubleshooting.md)を確認
2. プロジェクトのIssueを検索
3. チームメンバーに相談

---

最終更新: 2025年1月