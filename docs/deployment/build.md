# ビルド & デプロイ

## ビルドプロセス

### ローカルビルド

```bash
# 型チェックとビルド
npm run build

# ビルドのみ
npm run astro build
```

### ビルド最適化

- HTML/CSS/JSの最小化
- 画像の最適化
- コード分割

## デプロイオプション

### 静的ホスティング

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### コンテナデプロイ

[Docker設定](./docker.md)を参照してください。

### CI/CDパイプライン

[CI/CDガイド](./ci-cd.md)を参照してください。