# コンポーネント一覧

## 概要

JHA Websiteで使用されているコンポーネントのカタログです。各コンポーネントは機能別にディレクトリ分けされ、再利用可能な設計になっています。

## コンポーネント構成

```
src/components/
├── base/           # 基本UIコンポーネント
├── top/            # トップページ専用
├── topic/          # トピック関連
├── house/          # ハンターハウス関連
├── service/        # サービス関連
├── about-us/       # 協会について関連
├── recruit/        # 採用関連
└── director/       # 理事・役員関連
```

## Base コンポーネント

### Header.astro
**用途**: サイト全体のヘッダー

```astro
---
import Navigation from './Navigation.astro';
import LanguageSwitcher from './LanguageSwitcher.astro';
---

<header class="site-header">
  <div class="container">
    <Logo />
    <Navigation />
    <LanguageSwitcher />
  </div>
</header>
```

**Props**:
- なし（グローバルコンポーネント）

---

### Footer.astro
**用途**: サイト全体のフッター

```astro
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-section">
      <h3>協会について</h3>
      <!-- リンクリスト -->
    </div>
    <div class="footer-section">
      <h3>サービス</h3>
      <!-- リンクリスト -->
    </div>
  </div>
</footer>
```

**Props**:
- なし

---

### Navigation.astro
**用途**: メインナビゲーション

```astro
export interface Props {
  currentPath?: string;
  isMobile?: boolean;
}
```

**機能**:
- アクティブページのハイライト
- モバイル対応（ハンバーガーメニュー）
- ドロップダウンメニュー

---

### Button.astro
**用途**: 汎用ボタンコンポーネント

```astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

**使用例**:
```astro
<Button variant="primary" size="lg" href="/join">
  入会申込み
</Button>
```

---

### Card.astro
**用途**: 汎用カードコンポーネント

```astro
export interface Props {
  title?: string;
  image?: string;
  imageAlt?: string;
  description?: string;
  href?: string;
  tags?: string[];
}
```

---

### Modal.astro
**用途**: モーダルダイアログ

```astro
export interface Props {
  id: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}
```

---

## Top コンポーネント

### Hero.astro
**用途**: トップページのヒーローセクション

```astro
export interface Props {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
}
```

---

### NewsSection.astro
**用途**: トップページのニュースセクション

```astro
export interface Props {
  limit?: number;
  showMore?: boolean;
}
```

**機能**:
- 最新ニュースの表示
- もっと見るリンク

---

### ServiceCards.astro
**用途**: サービス紹介カード群

```astro
export interface Props {
  services: Array<{
    title: string;
    description: string;
    icon: string;
    href: string;
  }>;
}
```

---

## Topic コンポーネント

### TopicCard.astro
**用途**: トピック記事のカード表示

```astro
import type { CollectionEntry } from 'astro:content';

export interface Props {
  topic: CollectionEntry<'topic'>;
  variant?: 'compact' | 'detailed';
}
```

---

### TopicList.astro
**用途**: トピック記事のリスト表示

```astro
export interface Props {
  topics: CollectionEntry<'topic'>[];
  showPagination?: boolean;
  perPage?: number;
}
```

---

### TagCloud.astro
**用途**: タグクラウド表示

```astro
export interface Props {
  tags: Array<{
    name: string;
    count: number;
  }>;
  activeTag?: string;
}
```

---

### AuthorInfo.astro
**用途**: 著者情報表示

```astro
export interface Props {
  name: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
  };
}
```

---

## House コンポーネント

### HouseCard.astro
**用途**: ハンターハウスのカード表示

```astro
import type { CollectionEntry } from 'astro:content';

export interface Props {
  house: CollectionEntry<'house'>;
  showDetails?: boolean;
}
```

---

### HouseGallery.astro
**用途**: ハウス画像ギャラリー

```astro
export interface Props {
  images: string[];
  name: string;
}
```

**機能**:
- 画像スライダー
- サムネイル表示
- フルスクリーン表示

---

### FacilityList.astro
**用途**: 施設・設備リスト

```astro
export interface Props {
  facilities: string[];
  equipment: string[];
}
```

---

### BookingButton.astro
**用途**: 予約ボタン

```astro
export interface Props {
  bookingUrl?: string;
  available: boolean;
  houseName: string;
}
```

---

## Service コンポーネント

### ServiceDetail.astro
**用途**: サービス詳細表示

```astro
export interface Props {
  title: string;
  description: string;
  features: string[];
  pricing?: {
    price: number;
    unit: string;
  };
}
```

---

### PricingTable.astro
**用途**: 料金表

```astro
export interface Props {
  plans: Array<{
    name: string;
    price: number;
    features: string[];
    recommended?: boolean;
  }>;
}
```

---

## About-us コンポーネント

### Timeline.astro
**用途**: 沿革タイムライン

```astro
export interface Props {
  events: Array<{
    year: number;
    month?: number;
    title: string;
    description?: string;
  }>;
}
```

---

### MissionStatement.astro
**用途**: ミッション・ビジョン表示

```astro
export interface Props {
  mission: string;
  vision: string;
  values: string[];
}
```

---

### Statistics.astro
**用途**: 統計数値表示

```astro
export interface Props {
  stats: Array<{
    label: string;
    value: number | string;
    unit?: string;
    icon?: string;
  }>;
}
```

---

## Director コンポーネント

### DirectorCard.astro
**用途**: 理事・役員カード

```astro
export interface Props {
  name: string;
  title: string;
  photo?: string;
  bio?: string;
  message?: string;
}
```

---

### OrganizationChart.astro
**用途**: 組織図

```astro
export interface Props {
  data: {
    name: string;
    title: string;
    children?: Array<...>;
  };
}
```

---

## Recruit コンポーネント

### JobCard.astro
**用途**: 求人情報カード

```astro
export interface Props {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
}
```

---

### ApplicationForm.astro
**用途**: 応募フォーム

```astro
export interface Props {
  jobId?: string;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    required?: boolean;
  }>;
}
```

---

## 共通ユーティリティコンポーネント

### SEO.astro
**用途**: SEOメタタグ管理

```astro
export interface Props {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
}
```

---

### Breadcrumb.astro
**用途**: パンくずリスト

```astro
export interface Props {
  items: Array<{
    label: string;
    href?: string;
  }>;
}
```

---

### Pagination.astro
**用途**: ページネーション

```astro
export interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}
```

---

### ShareButtons.astro
**用途**: SNSシェアボタン

```astro
export interface Props {
  url: string;
  title: string;
  description?: string;
  platforms?: ('twitter' | 'facebook' | 'line')[];
}
```

---

### LoadingSpinner.astro
**用途**: ローディング表示

```astro
export interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}
```

---

### ErrorMessage.astro
**用途**: エラーメッセージ表示

```astro
export interface Props {
  type?: 'error' | 'warning' | 'info';
  message: string;
  dismissible?: boolean;
}
```

---

## コンポーネント使用ガイドライン

### 命名規則
- PascalCaseを使用
- 機能を表す明確な名前
- 接尾辞で種類を表現（Card, List, Section等）

### Props設計
- TypeScriptで型定義
- オプショナルプロパティにデフォルト値
- 必須プロパティは最小限に

### スタイリング
- Tailwind CSSクラスを優先
- コンポーネントスコープのCSSは`<style>`タグ内
- BEM命名規則でカスタムクラス

### アクセシビリティ
- 適切なARIA属性
- キーボード操作対応
- スクリーンリーダー対応

### パフォーマンス
- 画像の遅延読み込み
- 必要に応じてclient:ディレクティブ
- 不要な再レンダリングを避ける

---

最終更新: 2025年1月