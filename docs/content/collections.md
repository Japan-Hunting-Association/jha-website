# コンテンツコレクション

## 概要

Astroのコンテンツコレクションは、Markdown/MDXファイルを構造化し、型安全に管理するための機能です。JHA Websiteでは`topic`（ニュース・お知らせ）と`house`（ハンターハウス）の2つのコレクションを使用しています。

## コレクション定義

### 設定ファイル

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

// トピックコレクション
const topicCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    author: z.string().default('日本狩猟協会'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// ハウスコレクション
const houseCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    prefecture: z.string(),
    capacity: z.number(),
    price: z.object({
      perNight: z.number(),
      perPerson: z.number().optional(),
    }),
    facilities: z.array(z.string()),
    equipment: z.array(z.string()),
    access: z.string(),
    contact: z.object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
    }),
    images: z.array(z.string()).default([]),
    bookingUrl: z.string().url().optional(),
    available: z.boolean().default(true),
  }),
});

export const collections = {
  topic: topicCollection,
  house: houseCollection,
};
```

## ディレクトリ構造

```
src/content/
├── topic/                    # ニュース・お知らせ
│   ├── 2025-01-news.md
│   ├── 2025-02-event.md
│   └── 2025-03-notice.md
└── house/                    # ハンターハウス
    ├── hokkaido-lodge.md
    ├── nagano-cabin.md
    └── kyushu-house.md
```

## コンテンツの作成

### トピック記事の例

```markdown
---
# src/content/topic/2025-hunting-season.md
title: "2025年度狩猟シーズン開始のお知らせ"
pubDate: 2025-01-27
description: "2025年度の狩猟シーズンが開始されます。安全な狩猟のための注意事項をご確認ください。"
author: "日本狩猟協会事務局"
image: "/images/hunting-season-2025.jpg"
imageAlt: "狩猟シーズン開始の告知画像"
tags: ["お知らせ", "狩猟シーズン", "安全対策"]
featured: true
draft: false
---

## 2025年度狩猟シーズンについて

本年度の狩猟シーズンが11月15日より開始されます。

### 重要な日程

- **開始日**: 2025年11月15日（金）
- **終了日**: 2026年2月15日（土）
- **休猟日**: 毎週火曜日・金曜日

### 安全対策について

狩猟を行う際は、以下の安全対策を必ず守ってください：

1. オレンジ色のベストの着用
2. 狩猟前の銃器点検
3. 天候確認と適切な判断
```

### ハンターハウスの例

```markdown
---
# src/content/house/shinshu-hunter-lodge.md
name: "信州ハンターロッジ"
location: "長野県北安曇郡小谷村"
prefecture: "長野県"
capacity: 8
price:
  perNight: 15000
  perPerson: 3000
facilities:
  - "キッチン"
  - "風呂"
  - "暖房"
  - "Wi-Fi"
  - "駐車場"
equipment:
  - "銃器保管庫"
  - "解体施設"
  - "冷凍庫"
  - "乾燥室"
access: "JR大糸線南小谷駅から車で20分"
contact:
  phone: "0261-82-xxxx"
  email: "info@shinshu-lodge.jp"
  website: "https://shinshu-lodge.jp"
images:
  - "/images/houses/shinshu-lodge-1.jpg"
  - "/images/houses/shinshu-lodge-2.jpg"
bookingUrl: "https://shinshu-lodge.jp/booking"
available: true
---

## 施設紹介

信州ハンターロッジは、北アルプスの麓に位置する狩猟者専用の宿泊施設です。

### 特徴

- 銃器保管庫完備
- 獲物の解体・保管施設
- 地元猟友会との連携
```

## データの取得

### 全コンテンツの取得

```astro
---
import { getCollection } from 'astro:content';

// 全てのトピックを取得
const allTopics = await getCollection('topic');

// 全てのハウスを取得
const allHouses = await getCollection('house');
---
```

### フィルタリング

```astro
---
// 公開記事のみ取得（draftがfalse）
const publishedTopics = await getCollection('topic', ({ data }) => {
  return data.draft !== true;
});

// 特定のタグを持つ記事
const newsTopics = await getCollection('topic', ({ data }) => {
  return data.tags.includes('ニュース');
});

// 利用可能なハウスのみ
const availableHouses = await getCollection('house', ({ data }) => {
  return data.available === true;
});

// 複数条件でフィルタ
const featuredRecent = await getCollection('topic', ({ data }) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return data.featured && 
         !data.draft && 
         data.pubDate > oneMonthAgo;
});
---
```

### ソート

```astro
---
// 日付順でソート（新しい順）
const sortedTopics = allTopics.sort((a, b) => {
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
});

// 価格順でソート（安い順）
const sortedHouses = allHouses.sort((a, b) => {
  return a.data.price.perNight - b.data.price.perNight;
});

// 複数キーでソート
const complexSort = allTopics.sort((a, b) => {
  // まずfeaturedで並べ、次に日付で並べる
  if (a.data.featured !== b.data.featured) {
    return b.data.featured ? 1 : -1;
  }
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
});
---
```

## 単一エントリの取得

```astro
---
import { getEntry } from 'astro:content';

// スラッグで取得
const specificTopic = await getEntry('topic', '2025-hunting-season');

// IDで取得
const specificHouse = await getEntry('house', 'shinshu-hunter-lodge');
---
```

## コンテンツのレンダリング

### 基本的なレンダリング

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
const { Content } = await topic.render();
---

<Layout title={topic.data.title}>
  <article>
    <h1>{topic.data.title}</h1>
    <time>{topic.data.pubDate.toLocaleDateString('ja-JP')}</time>
    
    {topic.data.image && (
      <img src={topic.data.image} alt={topic.data.imageAlt} />
    )}
    
    <Content />
  </article>
</Layout>
```

### コンポーネントでの使用

```astro
---
// src/components/TopicCard.astro
export interface Props {
  topic: CollectionEntry<'topic'>;
}

const { topic } = Astro.props;
const { slug, data } = topic;
---

<article class="card">
  <a href={`/topic/${slug}`}>
    {data.image && (
      <img src={data.image} alt={data.imageAlt} />
    )}
    
    <div class="card-body">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      
      <div class="meta">
        <time>{data.pubDate.toLocaleDateString('ja-JP')}</time>
        <span>{data.author}</span>
      </div>
      
      <div class="tags">
        {data.tags.map(tag => (
          <span class="tag">{tag}</span>
        ))}
      </div>
    </div>
  </a>
</article>
```

## 関連コンテンツ

### タグによる関連記事

```astro
---
// 現在の記事と同じタグを持つ記事を取得
const currentTopic = await getEntry('topic', Astro.params.slug);
const relatedTopics = await getCollection('topic', ({ data, slug }) => {
  // 自分自身は除外
  if (slug === currentTopic.slug) return false;
  
  // 共通のタグがあるか確認
  const commonTags = data.tags.filter(tag => 
    currentTopic.data.tags.includes(tag)
  );
  
  return commonTags.length > 0 && !data.draft;
});

// 関連度でソート（共通タグ数が多い順）
const sortedRelated = relatedTopics
  .map(topic => ({
    ...topic,
    relevance: topic.data.tags.filter(tag => 
      currentTopic.data.tags.includes(tag)
    ).length
  }))
  .sort((a, b) => b.relevance - a.relevance)
  .slice(0, 5); // 上位5件
---
```

## ページネーション

```astro
---
// src/pages/topic/page/[page].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths({ paginate }) {
  const topics = await getCollection('topic', ({ data }) => !data.draft);
  const sortedTopics = topics.sort((a, b) => 
    b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
  
  return paginate(sortedTopics, { pageSize: 10 });
}

const { page } = Astro.props;
---

<Layout title={`トピック - ページ ${page.currentPage}`}>
  {page.data.map(topic => (
    <TopicCard topic={topic} />
  ))}
  
  <nav class="pagination">
    {page.url.prev && (
      <a href={page.url.prev}>前のページ</a>
    )}
    
    <span>
      {page.currentPage} / {page.lastPage}
    </span>
    
    {page.url.next && (
      <a href={page.url.next}>次のページ</a>
    )}
  </nav>
</Layout>
```

## 検索機能

```astro
---
// src/pages/search.astro
import { getCollection } from 'astro:content';

const query = Astro.url.searchParams.get('q')?.toLowerCase() || '';
const topics = await getCollection('topic');

const searchResults = topics.filter(topic => {
  const searchableText = [
    topic.data.title,
    topic.data.description,
    topic.data.author,
    ...topic.data.tags
  ].join(' ').toLowerCase();
  
  return searchableText.includes(query);
});
---
```

## RSS フィード

```typescript
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const topics = await getCollection('topic', ({ data }) => !data.draft);
  
  return rss({
    title: '日本狩猟協会 ニュース',
    description: '最新のニュースとお知らせ',
    site: context.site,
    items: topics.map(topic => ({
      title: topic.data.title,
      pubDate: topic.data.pubDate,
      description: topic.data.description,
      link: `/topic/${topic.slug}/`,
      categories: topic.data.tags,
    })),
  });
}
```

## 型安全性

```typescript
// src/types/content.ts
import type { CollectionEntry } from 'astro:content';

export type Topic = CollectionEntry<'topic'>;
export type House = CollectionEntry<'house'>;

export type TopicData = Topic['data'];
export type HouseData = House['data'];

// コンポーネントPropsの型定義
export interface TopicListProps {
  topics: Topic[];
  showFeatured?: boolean;
}

export interface HouseCardProps {
  house: House;
  detailed?: boolean;
}
```

## ベストプラクティス

1. **スキーマ定義**: Zodで厳密な型定義
2. **ファイル命名**: 意味のあるスラッグ使用
3. **画像管理**: publicフォルダで一元管理
4. **draft機能**: 開発中のコンテンツ管理
5. **メタデータ**: SEOに必要な情報を含める

## トラブルシューティング

### コンテンツが表示されない

```typescript
// デバッグ用コード
console.log('Collection exists:', await getCollection('topic'));
console.log('Entry exists:', await getEntry('topic', 'slug-name'));
```

### 型エラーの解決

```bash
# 型定義の再生成
npm run astro sync
```

---

最終更新: 2025年1月