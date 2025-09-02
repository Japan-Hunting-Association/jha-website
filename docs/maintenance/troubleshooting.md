# トラブルシューティング

## よくある問題と解決方法

### ビルドエラー

#### 型エラー
```bash
# 型定義の再生成
npm run astro sync
```

#### 依存関係エラー
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### 開発サーバーの問題

#### ポート競合
```bash
# 別のポートで起動
npm run dev -- --port 4322
```

### パフォーマンス問題

[パフォーマンス最適化](./performance.md)を参照してください。

## デバッグ方法

### 詳細ログの有効化
```bash
DEBUG=* npm run dev
```

### VS Codeデバッガー

[開発ワークフロー](../development/workflow.md)を参照してください。