# パフォーマンス最適化

## 最適化手法

### 画像最適化

- WebP/AVIFフォーマットの使用
- 遅延読み込み
- レスポンシブ画像

### コード最適化

- JavaScriptの最小化
- CSSのパージ
- コード分割

### キャッシュ戦略

- CDNの活用
- 適切なCache-Controlヘッダー
- Service Worker

## パフォーマンス測定

### Lighthouse

```bash
npx lighthouse http://localhost:4321 --view
```

### 目標スコア

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

詳細な最適化手法は[アーキテクチャ](../architecture.md)を参照してください。