# Serena MCPサーバーのセットアップガイド

## 概要

Serena（セレナ）は、Claude CodeなどのLLM向けのコーディングエージェントツールキットです。プロジェクトコードのセマンティック（意味的）解析を行い、トークン消費量を60-80%削減することができます。

## セットアップ手順

### 1. Docker環境の再構築

Dockerfileとdocker-compose.ymlを更新したため、コンテナを再構築します：

```bash
# コンテナを停止
docker-compose down

# イメージを再ビルド
docker-compose build

# コンテナを起動
docker-compose up -d
```

### 2. コンテナへのログイン

```bash
docker-compose exec app bash
```

### 3. Claude CodeへのSerena統合

コンテナ内で以下のコマンドを実行：

```bash
# SerenaをClaude Codeに追加
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project /app
```

### 4. 初期設定（プロジェクト解析）

統合が完了したら、Claude Code内で以下のコマンドを実行してプロジェクトの初期解析を行います：

```
/mcp__serena__initial_instructions
```

このコマンドにより、Serenaがプロジェクトの構造を理解し、効率的なコード検索・編集が可能になります。

## 使用方法

Serenaが統合されると、Claude Codeは以下の機能を使用できるようになります：

- **セマンティック検索**: コードの意味を理解した上での高度な検索
- **効率的なファイル編集**: プロジェクト全体の文脈を考慮した編集提案
- **トークン消費の削減**: 必要な情報のみを効率的に取得

## トラブルシューティング

### Serenaが正しく動作しない場合

1. コンテナを再起動：
   ```bash
   docker-compose restart app
   ```

2. キャッシュをクリア：
   ```bash
   docker-compose down
   docker volume rm geekbeer_serena-cache
   docker-compose up -d
   ```

### uvxコマンドが見つからない場合

Dockerfileの更新が反映されていない可能性があります。イメージを再ビルドしてください：

```bash
docker-compose build --no-cache
```

## 参考資料

- [Serena GitHub リポジトリ](https://github.com/oraios/serena)
- [参考記事（Zenn）](https://zenn.dev/sc30gsw/articles/ff81891959aaef)