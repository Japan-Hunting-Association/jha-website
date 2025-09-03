# コーディング規約

## 基本原則

### 1. 可読性を優先
- コードは書くより読まれる回数の方が多い
- 明確で自己文書化されたコード
- 適切な命名規則の使用

### 2. 一貫性を保つ
- プロジェクト全体で統一されたスタイル
- 既存のパターンに従う
- チーム内での合意事項を守る

### 3. シンプルに保つ
- KISS原則（Keep It Simple, Stupid）
- YAGNI原則（You Aren't Gonna Need It）
- 早すぎる最適化を避ける

## TypeScript規約

### 型定義

```typescript
// ✅ Good: 明示的な型定義
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ❌ Bad: any型の使用
const data: any = fetchData();

// ✅ Good: unknown型を使用して型安全に
const data: unknown = fetchData();
if (isUser(data)) {
  // 型ガードで検証後に使用
}
```

### 命名規則

```typescript
// インターフェース: PascalCase
interface UserProfile {
  // プロパティ: camelCase
  firstName: string;
  lastName: string;
}

// 型エイリアス: PascalCase
type UserRole = 'admin' | 'user' | 'guest';

// 定数: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// 関数: camelCase
function calculateTotalPrice(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// クラス: PascalCase
class UserService {
  // プライベートプロパティ: _prefix
  private _cache: Map<string, User>;
  
  // メソッド: camelCase
  getUserById(id: string): User | undefined {
    return this._cache.get(id);
  }
}
```

### 関数の書き方

```typescript
// ✅ Good: 単一責任の原則
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendWelcomeEmail(user: User): Promise<void> {
  if (!validateEmail(user.email)) {
    throw new Error('Invalid email address');
  }
  return emailService.send(user.email, 'Welcome!');
}

// ❌ Bad: 複数の責任を持つ関数
function processUser(user: User): void {
  // メール検証、送信、ログ記録など複数の処理
}
```

## Astroコンポーネント規約

### ファイル構造

```astro
---
// 1. インポート
import Layout from '@/layouts/Layout.astro';
import Card from '@/components/Card.astro';
import { getCollection } from 'astro:content';

// 2. Props定義
export interface Props {
  title: string;
  description?: string;
  showHeader?: boolean;
}

// 3. Props取得
const { 
  title, 
  description = 'デフォルトの説明', 
  showHeader = true 
} = Astro.props;

// 4. データ取得・処理
const posts = await getCollection('topic');
const sortedPosts = posts.sort((a, b) => 
  b.data.pubDate.getTime() - a.data.pubDate.getTime()
);
---

<!-- 5. HTML構造 -->
<Layout title={title}>
  {showHeader && (
    <header>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  )}
  
  <main>
    {sortedPosts.map(post => (
      <Card {...post.data} />
    ))}
  </main>
</Layout>

<!-- 6. スタイル -->
<style>
  header {
    @apply mb-8 text-center;
  }
  
  h1 {
    @apply text-4xl font-bold text-gray-900;
  }
</style>
```

### コンポーネント命名

```
components/
├── base/
│   ├── Button.astro       # 汎用ボタン
│   ├── Card.astro         # 汎用カード
│   └── Modal.astro        # 汎用モーダル
├── layout/
│   ├── Header.astro       # ヘッダー
│   ├── Footer.astro       # フッター
│   └── Sidebar.astro      # サイドバー
└── feature/
    ├── UserProfile.astro  # 機能固有
    └── PostList.astro     # 機能固有
```

## CSS/Tailwind規約

### Tailwindクラスの順序

```astro
<!-- 
  順序:
  1. レイアウト (display, position)
  2. ボックスモデル (width, height, padding, margin)
  3. タイポグラフィ (font, text)
  4. 装飾 (background, border, shadow)
  5. アニメーション (transition, animation)
  6. その他
-->
<div class="
  flex items-center justify-between
  w-full h-12 px-4 py-2 mt-4
  text-lg font-bold text-white
  bg-blue-500 rounded-lg shadow-md
  hover:bg-blue-600 transition-colors
">
```

### カスタムCSS

```css
/* コンポーネントスコープのスタイル */
<style>
  /* BEM命名規則 */
  .card {
    @apply p-4 bg-white rounded-lg shadow;
  }
  
  .card__header {
    @apply mb-2 pb-2 border-b;
  }
  
  .card__title {
    @apply text-xl font-bold;
  }
  
  .card--featured {
    @apply border-2 border-blue-500;
  }
  
  /* ユーティリティクラス */
  .text-gradient {
    @apply bg-gradient-to-r from-blue-500 to-purple-500;
    @apply bg-clip-text text-transparent;
  }
</style>
```

## Markdownコンテンツ規約

### フロントマター

```markdown
---
# 必須フィールド
title: "記事タイトル"
pubDate: 2025-01-27

# オプションフィールド
description: "記事の説明"
author: "著者名"
image: "/images/cover.jpg"
tags: ["タグ1", "タグ2"]
draft: false
featured: true
---
```

### 見出し構造

```markdown
# ページタイトル（h1は1つのみ）

## メインセクション（h2）

### サブセクション（h3）

#### 詳細項目（h4）
```

## Git規約

### コミットメッセージ

```bash
# 形式
<type>(<scope>): <subject>

# 例
feat(auth): ログイン機能を実装
fix(ui): ヘッダーのレイアウト崩れを修正
docs(readme): インストール手順を更新
style(global): インデントを統一
refactor(api): API呼び出しロジックを簡素化
perf(images): 画像の遅延読み込みを実装
test(user): ユーザー作成のテストを追加
```

### ブランチ名

```bash
# 形式
<type>/<description>

# 例
feature/user-authentication
fix/header-layout-issue
refactor/optimize-api-calls
docs/update-setup-guide
```

## ファイル・フォルダ規約

### ファイル命名

```bash
# コンポーネント: PascalCase
Header.astro
UserProfile.astro

# ページ: kebab-case
about-us.astro
contact-form.astro

# ユーティリティ: camelCase
formatDate.ts
validateForm.ts

# 設定ファイル: kebab-case
astro.config.mjs
tailwind.config.js
```

### インポート順序

```typescript
// 1. Node.js組み込みモジュール
import fs from 'fs';
import path from 'path';

// 2. 外部パッケージ
import { z } from 'zod';
import clsx from 'clsx';

// 3. Astro関連
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

// 4. 内部モジュール（絶対パス）
import Layout from '@/layouts/Layout.astro';
import { formatDate } from '@/utils/date';

// 5. 内部モジュール（相対パス）
import Card from './Card.astro';
import './styles.css';
```

## アクセシビリティ規約

### セマンティックHTML

```astro
<!-- ✅ Good -->
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="/">ホーム</a></li>
    <li><a href="/about">について</a></li>
  </ul>
</nav>

<!-- ❌ Bad -->
<div class="navigation">
  <div class="nav-item">ホーム</div>
</div>
```

### ARIA属性

```astro
<button
  aria-label="メニューを開く"
  aria-expanded={isOpen}
  aria-controls="navigation-menu"
>
  <svg aria-hidden="true">...</svg>
</button>

<img 
  src="/hero.jpg" 
  alt="協会の建物の外観写真"
  loading="lazy"
/>
```

## パフォーマンス規約

### 画像最適化

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/hero.jpg';
---

<!-- Astro Imageを使用 -->
<Image 
  src={heroImage}
  alt="説明文"
  width={1920}
  height={1080}
  format="webp"
  quality={80}
/>
```

### 遅延読み込み

```astro
<!-- 画像の遅延読み込み -->
<img src="/image.jpg" loading="lazy" />

<!-- コンポーネントの遅延読み込み -->
<InteractiveComponent client:idle />
```

## エラーハンドリング

```typescript
// ✅ Good: 適切なエラーハンドリング
async function fetchUserData(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    
    const data = await response.json();
    return validateUser(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('ユーザーデータの取得に失敗しました');
  }
}

// ❌ Bad: エラーを無視
async function fetchUserData(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    return await response.json();
  } catch {
    return null; // エラーを隠蔽
  }
}
```

## テスト規約

```typescript
// テストファイル命名: *.test.ts または *.spec.ts
describe('formatDate', () => {
  it('should format date in Japanese format', () => {
    const date = new Date('2025-01-27');
    expect(formatDate(date)).toBe('2025年1月27日');
  });
  
  it('should handle invalid date', () => {
    expect(() => formatDate('invalid')).toThrow();
  });
});
```

## コードレビューチェックリスト

- [ ] コーディング規約に準拠している
- [ ] 型定義が適切
- [ ] エラーハンドリングが実装されている
- [ ] アクセシビリティが考慮されている
- [ ] パフォーマンスへの影響を確認
- [ ] テストが追加/更新されている
- [ ] ドキュメントが更新されている

---

最終更新: 2025年1月