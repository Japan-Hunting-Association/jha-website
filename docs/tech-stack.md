# 技術スタック詳細

## コア技術

### Astro (v4.5.x)
**静的サイトジェネレーター**

#### 選定理由
- **Island Architecture**: 必要な部分のみインタラクティブ化
- **Zero JS by default**: デフォルトでJavaScript無し
- **高速ビルド**: Viteベースの高速開発環境

#### 主要機能
```javascript
// ページ例
---
import Layout from '../layouts/Layout.astro';
const posts = await getCollection('topic');
---
<Layout title="トピック一覧">
  {posts.map(post => <PostCard {...post} />)}
</Layout>
```

### TypeScript (v5.4.x)
**型安全な開発**

#### 設定 (tsconfig.json)
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 活用例
- コンポーネントのProps型定義
- Content Collectionの型生成
- APIレスポンスの型定義

## スタイリング

### Tailwind CSS (v3.4.x)
**ユーティリティファーストCSS**

#### 設定 (tailwind.config.js)
```javascript
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'jha-orange': '#DC5F00',
        'jha-dark': '#1a1a1a'
      }
    }
  },
  plugins: [require('daisyui')]
}
```

### DaisyUI (v4.12.x)
**Tailwindベースのコンポーネントライブラリ**

#### 利用コンポーネント
- ボタン: `btn`, `btn-primary`
- カード: `card`, `card-body`
- モーダル: `modal`, `modal-box`
- ナビゲーション: `navbar`, `drawer`

#### テーマ設定
```javascript
daisyui: {
  themes: ["light", "dark", "cupcake"],
  darkTheme: "dark",
  base: true,
  styled: true,
  utils: true
}
```

## コンテンツ処理

### Markdown/MDX
**コンテンツ記述形式**

#### Rehypeプラグイン
```javascript
// astro.config.mjs
{
  markdown: {
    rehypePlugins: [
      'rehype-slug',           // 見出しにID付与
      'rehype-autolink-headings', // 見出しにリンク
      'rehype-external-links',    // 外部リンク処理
      'rehype-img-attr'           // 画像属性カスタマイズ
    ]
  }
}
```

### Zod
**スキーマ検証ライブラリ**

#### コンテンツスキーマ例
```typescript
// src/content/config.ts
const topicCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    author: z.string().optional(),
    image: z.string().optional()
  })
});
```

## 開発環境

### Vite
**高速ビルドツール**

#### 特徴
- Hot Module Replacement (HMR)
- 高速な開発サーバー
- 最適化されたビルド

### Docker (Node.js 20)
**コンテナ化環境**

#### Dockerfile設定
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "4321:4321"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

## 国際化 (i18n)

### Astro i18n
**多言語対応**

#### 設定
```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: true
    }
  }
});
```

#### 翻訳管理
```typescript
// src/i18n/ui.ts
export const languages = {
  ja: '日本語',
  en: 'English'
};

export const translations = {
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '協会について'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us'
  }
};
```

## 画像処理

### Astro Image
**画像最適化**

#### 機能
- 自動リサイズ
- 遅延読み込み
- WebP/AVIF変換
- レスポンシブ画像

#### 使用例
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---
<Image 
  src={heroImage} 
  alt="Hero"
  width={1920}
  height={1080}
  format="webp"
/>
```

## 依存関係管理

### NPM Scripts
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check"
  }
}
```

### 主要パッケージ

#### プロダクション依存
```json
{
  "@astrojs/check": "^0.5.10",
  "@astrojs/tailwind": "^5.1.0",
  "astro": "^4.5.16",
  "tailwindcss": "^3.4.4",
  "daisyui": "^4.12.24"
}
```

#### 開発依存
```json
{
  "typescript": "^5.4.4",
  "@types/node": "^20.0.0",
  "prettier": "^3.0.0",
  "eslint": "^8.0.0"
}
```

## CI/CD

### GitHub Actions
**自動化パイプライン**

#### ビルドワークフロー
```yaml
name: Build Check
on:
  push:
    branches: ['**']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

## セキュリティ

### 依存関係セキュリティ
```bash
# 脆弱性チェック
npm audit

# 自動修正
npm audit fix

# 強制アップデート
npm audit fix --force
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data: https:; 
               script-src 'self' 'unsafe-inline';">
```

## パフォーマンス

### Lighthouse スコア目標
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 最適化手法
1. **静的生成**: ビルド時HTML生成
2. **画像最適化**: 次世代フォーマット使用
3. **CSS削減**: Tailwind CSSパージ
4. **コード分割**: 動的インポート

## 開発ツール

### VS Code拡張機能
- Astro
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### デバッグツール
- Chrome DevTools
- React Developer Tools (Astro Islands用)
- Lighthouse

## バージョン管理

### Node.js バージョン
```
# .nvmrc
20.0.0
```

### パッケージロック
- `package-lock.json`で厳密なバージョン管理
- CI/CDでは`npm ci`使用

## 今後の技術検討

### 検討中の技術
- **Partytown**: サードパーティスクリプトの最適化
- **Astro DB**: 組み込みデータベース
- **View Transitions API**: ページ遷移アニメーション

### アップグレード計画
- Astro v5への移行検討
- Node.js 22 LTSへの更新

---

最終更新: 2025年1月