# CI/CD パイプライン

## 概要

JHA WebsiteではGitHub Actionsを使用して継続的インテグレーション（CI）と継続的デリバリー（CD）を実現しています。

## GitHub Actions ワークフロー

### メインワークフロー

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:

env:
  NODE_VERSION: '20'
  ASTRO_TELEMETRY_DISABLED: 1

jobs:
  # リント & 型チェック
  lint:
    name: Lint and Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run astro check
      
      - name: Run linter
        run: npm run lint
        continue-on-error: true

  # ビルド
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  # テスト
  test:
    name: Test
    runs-on: ubuntu-latest
    needs: build
    strategy:
      matrix:
        browser: [chrome, firefox]
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test
      
      - name: Run E2E tests
        run: npm run test:e2e:${{ matrix.browser }}

  # セキュリティスキャン
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
      
      - name: Run Snyk scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  # Lighthouse CI
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true
          temporaryPublicStorage: true

  # デプロイ（開発環境）
  deploy-dev:
    name: Deploy to Development
    runs-on: ubuntu-latest
    needs: [build, test]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: development
      url: https://dev.example.com
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

  # デプロイ（本番環境）
  deploy-prod:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build, test, security]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Deploy to AWS S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'dist'
      
      - name: Invalidate CloudFront
        uses: chetan/invalidate-cloudfront-action@v2
        env:
          DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: '/*'
          AWS_REGION: 'ap-northeast-1'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## 環境別設定

### 開発環境

```yaml
# .github/workflows/dev-deploy.yml
name: Development Deploy

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to dev
        env:
          DEPLOY_URL: ${{ secrets.DEV_DEPLOY_URL }}
          DEPLOY_TOKEN: ${{ secrets.DEV_DEPLOY_TOKEN }}
        run: |
          npm ci
          npm run build
          npm run deploy:dev
```

### ステージング環境

```yaml
# .github/workflows/staging-deploy.yml
name: Staging Deploy

on:
  push:
    branches: [staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          npm ci
          npm run build
          npm run deploy:staging
```

### 本番環境

```yaml
# .github/workflows/prod-deploy.yml
name: Production Deploy

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          npm ci
          npm run build
          npm run deploy:prod
```

## 品質チェック

### Lighthouse設定

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### ESLint設定

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  ]
};
```

## 自動化スクリプト

### package.json scripts

```json
{
  "scripts": {
    "ci": "npm run lint && npm run test && npm run build",
    "lint": "eslint . --ext .ts,.tsx,.astro",
    "lint:fix": "npm run lint -- --fix",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "deploy:dev": "vercel --prod",
    "deploy:staging": "npm run build && aws s3 sync dist/ s3://staging-bucket",
    "deploy:prod": "npm run build && aws s3 sync dist/ s3://prod-bucket",
    "release": "standard-version"
  }
}
```

## Secrets管理

### 必要なSecrets

```yaml
# GitHub Secrets設定
VERCEL_TOKEN              # Vercelデプロイ用
VERCEL_ORG_ID            # Vercel組織ID
VERCEL_PROJECT_ID        # VercelプロジェクトID
AWS_ACCESS_KEY_ID        # AWS認証
AWS_SECRET_ACCESS_KEY    # AWS認証
AWS_S3_BUCKET           # S3バケット名
CLOUDFRONT_DISTRIBUTION_ID # CloudFront ID
SNYK_TOKEN              # セキュリティスキャン
SLACK_WEBHOOK_URL       # 通知用
```

## 通知設定

### Slack通知

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  if: always()
  with:
    status: ${{ job.status }}
    text: 'Deployment ${{ job.status }}'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
    fields: repo,message,commit,author,action,eventName,ref,workflow
```

### メール通知

```yaml
- name: Send mail
  if: failure()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.MAIL_USERNAME }}
    password: ${{ secrets.MAIL_PASSWORD }}
    subject: Build Failed - ${{ github.repository }}
    to: team@example.com
    from: CI/CD Bot
    body: Build job of ${{ github.repository }} has failed!
```

## ブランチ保護

### 保護ルール

```yaml
# main ブランチ
- PRレビュー必須（最低1人）
- ステータスチェック必須
  - build
  - test
  - security
- 管理者も例外なし
- 強制プッシュ禁止

# develop ブランチ
- ステータスチェック必須
  - build
  - lint
- 直接プッシュ禁止
```

## リリース管理

### 自動リリース

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            Changes in this Release
            - Feature A
            - Bug fix B
          draft: false
          prerelease: false
```

### Semantic Versioning

```json
// .versionrc.json
{
  "types": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "docs", "section": "Documentation"},
    {"type": "style", "section": "Styles"},
    {"type": "refactor", "section": "Code Refactoring"},
    {"type": "perf", "section": "Performance Improvements"},
    {"type": "test", "section": "Tests"},
    {"type": "build", "section": "Build System"},
    {"type": "ci", "section": "CI/CD"}
  ]
}
```

## モニタリング

### デプロイ状況

```yaml
- name: Deploy Status
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.repos.createDeploymentStatus({
        owner: context.repo.owner,
        repo: context.repo.repo,
        deployment_id: deployment.data.id,
        state: 'success',
        environment_url: 'https://example.com',
        description: 'Deployed successfully'
      });
```

## ロールバック

### 自動ロールバック

```yaml
- name: Rollback on failure
  if: failure()
  run: |
    echo "Deployment failed, rolling back..."
    git revert HEAD
    git push origin main
```

## ベストプラクティス

1. **並列実行**: 可能な限りジョブを並列化
2. **キャッシング**: 依存関係のキャッシュ活用
3. **環境分離**: 本番・開発環境の明確な分離
4. **セキュリティ**: Secretsの適切な管理
5. **モニタリング**: デプロイ状況の可視化

---

最終更新: 2025年1月