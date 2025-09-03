# ルーティング設計

## ファイルベースルーティング

Astroは`src/pages/`ディレクトリ内のファイル構造に基づいて自動的にルートを生成します。

### 基本的なルーティング

```
src/pages/
├── index.astro          → /
├── about-us.astro       → /about-us
├── contact.astro        → /contact
├── 404.astro           → /404 (エラーページ)
└── privacy.astro       → /privacy
```

### ネストされたルート

```
src/pages/
└── topic/
    ├── index.astro      → /topic
    └── [slug].astro     → /topic/:slug (動的ルート)
```

## 現在のルート構成

### トップレベルページ

| ファイル | パス | 説明 |
|---------|------|------|
| `index.astro` | `/` | ホームページ |
| `about-us.astro` | `/about-us` | 協会について |
| `association.astro` | `/association` | 協会情報 |
| `contact.astro` | `/contact` | お問い合わせ |
| `join.astro` | `/join` | 入会案内 |
| `privacy.astro` | `/privacy` | プライバシーポリシー |
| `recruitment.astro` | `/recruitment` | 採用情報 |
| `404.astro` | `/404` | 404エラーページ |

### セクション別ルート

#### トピック（ニュース・お知らせ）
```
src/pages/topic/
├── index.astro          → /topic (一覧)
└── [slug].astro         → /topic/:slug (詳細)
```

#### ハンターハウス
```
src/pages/hunter-house/
├── index.astro          → /hunter-house (一覧)
└── [slug].astro         → /hunter-house/:slug (詳細)
```

#### ハンターコミュニティ
```
src/pages/hunter-community/
├── index.astro          → /hunter-community
├── hunter.astro         → /hunter-community/hunter
├── lady-hunter.astro    → /hunter-community/lady-hunter
└── young-hunter.astro   → /hunter-community/young-hunter
```

#### 理事・役員
```
src/pages/directors/
└── index.astro          → /directors
```

#### 年次報告
```
src/pages/reports/
└── index.astro          → /reports
```

## 動的ルーティング

### 基本的な動的ルート

```astro
---
// src/pages/topic/[slug].astro
import { getCollection } from 'astro:content';
import Layout from '@/layouts/Layout.astro';

export async function getStaticPaths() {
  const topics = await getCollection('topic');
  
  return topics.map(topic => ({
    params: { slug: topic.slug },
    props: { topic }
  }));
}

const { topic } = Astro.props;
---

<Layout title={topic.data.title}>
  <article>
    <h1>{topic.data.title}</h1>
    <Content />
  </article>
</Layout>
```

### 複数パラメータの動的ルート

```astro
---
// src/pages/[year]/[month]/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  
  return posts.map(post => {
    const date = new Date(post.data.pubDate);
    return {
      params: {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        slug: post.slug
      },
      props: { post }
    };
  });
}
---
```

### Rest パラメータ

```astro
---
// src/pages/docs/[...path].astro
// /docs/guide/getting-started → path = 'guide/getting-started'
export async function getStaticPaths() {
  return [
    { params: { path: 'guide/getting-started' } },
    { params: { path: 'guide/configuration' } },
    { params: { path: 'api/reference' } }
  ];
}

const { path } = Astro.params;
---
```

## ナビゲーション実装

### メインナビゲーション

```astro
---
// src/components/Navigation.astro
const currentPath = Astro.url.pathname;

const navItems = [
  { label: 'ホーム', href: '/' },
  { label: '協会について', href: '/about-us' },
  { label: 'トピック', href: '/topic' },
  { label: 'ハンターハウス', href: '/hunter-house' },
  { label: 'お問い合わせ', href: '/contact' }
];
---

<nav>
  <ul class="flex space-x-4">
    {navItems.map(item => (
      <li>
        <a 
          href={item.href}
          class:list={[
            'nav-link',
            { 'active': currentPath === item.href }
          ]}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

<style>
  .nav-link {
    @apply px-3 py-2 rounded-md text-sm font-medium;
  }
  .nav-link.active {
    @apply bg-orange-500 text-white;
  }
</style>
```

### パンくずリスト

```astro
---
// src/components/Breadcrumb.astro
interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="パンくずリスト">
  <ol class="flex items-center space-x-2">
    {items.map((item, index) => (
      <li class="flex items-center">
        {index > 0 && <span class="mx-2">/</span>}
        {item.href ? (
          <a href={item.href} class="text-blue-600 hover:underline">
            {item.label}
          </a>
        ) : (
          <span class="text-gray-700">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

## リダイレクト設定

### Astro設定でのリダイレクト

```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/old-page': '/new-page',
    '/blog/[...slug]': '/topic/[...slug]',
    '/en': {
      status: 302,
      destination: '/en/home'
    }
  }
});
```

### メタタグリダイレクト

```astro
---
// src/pages/old-page.astro
---
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/new-page" />
  </head>
</html>
```

## URLパラメータとクエリ

### URLパラメータの取得

```astro
---
// URLパラメータの取得
const { slug } = Astro.params;

// クエリパラメータの取得
const searchParams = Astro.url.searchParams;
const page = searchParams.get('page') || '1';
const category = searchParams.get('category');
---
```

### ページネーション実装

```astro
---
// src/pages/topic/index.astro
import { getCollection } from 'astro:content';

const page = Number(Astro.url.searchParams.get('page') || '1');
const perPage = 10;

const allPosts = await getCollection('topic');
const totalPages = Math.ceil(allPosts.length / perPage);

const posts = allPosts
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
  .slice((page - 1) * perPage, page * perPage);
---

<Layout title="トピック一覧">
  <!-- 記事一覧 -->
  {posts.map(post => <PostCard {...post} />)}
  
  <!-- ページネーション -->
  <nav class="pagination">
    {page > 1 && (
      <a href={`?page=${page - 1}`}>前へ</a>
    )}
    
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
      <a 
        href={`?page=${num}`}
        class:list={{ active: num === page }}
      >
        {num}
      </a>
    ))}
    
    {page < totalPages && (
      <a href={`?page=${page + 1}`}>次へ</a>
    )}
  </nav>
</Layout>
```

## SEO最適化

### canonical URLの設定

```astro
---
// src/layouts/Layout.astro
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <link rel="canonical" href={canonicalURL} />
</head>
```

### サイトマップ生成

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/private/'),
      customPages: ['https://example.com/external-page'],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ]
});
```

## ルートガード（認証）

```astro
---
// src/middleware/auth.ts
export async function onRequest({ cookies, redirect }, next) {
  const token = cookies.get('auth-token');
  
  if (!token && Astro.url.pathname.startsWith('/admin')) {
    return redirect('/login');
  }
  
  return next();
}
---
```

## パフォーマンス最適化

### プリフェッチ

```astro
<!-- 個別リンクのプリフェッチ -->
<a href="/about" data-astro-prefetch>About</a>

<!-- ViewTransitions API -->
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

### ルート分割

```javascript
// 大きなルートを分割してビルド時間を短縮
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  
  // 年ごとにルートを分割
  const years = [...new Set(posts.map(p => 
    new Date(p.data.pubDate).getFullYear()
  ))];
  
  return years.flatMap(year => {
    const yearPosts = posts.filter(p => 
      new Date(p.data.pubDate).getFullYear() === year
    );
    
    return yearPosts.map(post => ({
      params: { year: year.toString(), slug: post.slug },
      props: { post }
    }));
  });
}
```

## トラブルシューティング

### 404エラーの処理

```astro
---
// src/pages/404.astro
---
<Layout title="404 - ページが見つかりません">
  <div class="error-page">
    <h1>404</h1>
    <p>お探しのページは見つかりませんでした。</p>
    <a href="/">ホームに戻る</a>
  </div>
</Layout>
```

### 動的ルートのデバッグ

```astro
---
// getStaticPathsのデバッグ
export async function getStaticPaths() {
  const paths = await generatePaths();
  
  // 開発環境でパスを確認
  if (import.meta.env.DEV) {
    console.log('Generated paths:', paths);
  }
  
  return paths;
}
---
```

## ベストプラクティス

1. **一貫性のあるURL構造**: kebab-caseを使用
2. **意味のあるURL**: `/topic/2025-01-news` > `/p/123`
3. **階層の適切な深さ**: 3階層以内を推奨
4. **trailing slashの統一**: 有り/無しを統一
5. **リダイレクトの適切な使用**: 301/302を使い分け

---

最終更新: 2025年1月