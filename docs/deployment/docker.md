# Docker設定ガイド

## 概要

JHA WebsiteはDockerを使用してコンテナ化されており、開発環境と本番環境の一貫性を保証します。

## Docker設定ファイル

### Dockerfile

```dockerfile
# マルチステージビルド
FROM node:20-alpine AS base

# 依存関係のインストール用ステージ
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 開発用依存関係を含むステージ
FROM base AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ビルドステージ
FROM base AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 本番用ステージ
FROM base AS runtime
WORKDIR /app

# 本番用依存関係のみコピー
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# セキュリティ: non-rootユーザーで実行
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 4321
CMD ["npm", "run", "preview"]

# 開発用ステージ
FROM base AS development
WORKDIR /app

# 開発ツールのインストール
RUN apk add --no-cache git curl bash

# GitHub CLIのインストール（オプション）
RUN wget -qO- https://github.com/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz | \
    tar xz && \
    mv gh_2.40.0_linux_amd64/bin/gh /usr/local/bin/

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  # 開発用サービス
  dev:
    build:
      context: .
      target: development
    ports:
      - "4321:4321"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.astro
    environment:
      - NODE_ENV=development
      - ASTRO_TELEMETRY_DISABLED=1
    networks:
      - jha-network
    restart: unless-stopped

  # 本番用サービス
  prod:
    build:
      context: .
      target: runtime
    ports:
      - "80:4321"
    environment:
      - NODE_ENV=production
    networks:
      - jha-network
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4321"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Nginxリバースプロキシ（オプション）
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./dist:/usr/share/nginx/html:ro
    depends_on:
      - prod
    networks:
      - jha-network
    restart: always

networks:
  jha-network:
    driver: bridge

volumes:
  node_modules:
  astro_cache:
```

### .dockerignore

```
node_modules
.astro
dist
.git
.gitignore
*.md
.env.local
.env.*.local
npm-debug.log*
.DS_Store
*.log
coverage
.nyc_output
.vscode
.idea
*.swp
*.swo
```

## 使用方法

### 開発環境

```bash
# 開発コンテナの起動
docker-compose up dev

# バックグラウンドで起動
docker-compose up -d dev

# ログの確認
docker-compose logs -f dev

# コンテナへのアクセス
docker-compose exec dev sh

# コンテナの停止
docker-compose down
```

### 本番環境

```bash
# 本番イメージのビルド
docker build -t jha-website:latest --target runtime .

# 本番コンテナの起動
docker-compose up -d prod

# ヘルスチェック
docker-compose ps
docker-compose exec prod curl http://localhost:4321/health

# ログ確認
docker-compose logs -f prod
```

## 環境変数設定

### .env.docker

```env
# Docker環境変数
COMPOSE_PROJECT_NAME=jha-website
DOCKER_BUILDKIT=1

# Node環境
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=4096

# Astro設定
PUBLIC_SITE_URL=https://example.com
ASTRO_TELEMETRY_DISABLED=1

# その他
TZ=Asia/Tokyo
```

### docker-compose.override.yml

```yaml
# ローカル開発用のオーバーライド設定
version: '3.8'

services:
  dev:
    environment:
      - DEBUG=*
      - VERBOSE=true
    volumes:
      - ~/.ssh:/home/node/.ssh:ro
      - ~/.gitconfig:/home/node/.gitconfig:ro
```

## Nginx設定

### nginx.conf

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 静的ファイルの配信
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
        
        # キャッシュ設定
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # gzip圧縮
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## ビルド最適化

### マルチステージビルドの利点

```dockerfile
# ステージ分離による最適化
# 1. deps: 本番依存関係のみ (小サイズ)
# 2. dev-deps: 開発依存関係を含む (ビルド用)
# 3. builder: ビルド成果物の生成
# 4. runtime: 最小限の本番イメージ

# 結果: 
# - 開発イメージ: ~500MB
# - 本番イメージ: ~150MB
```

### キャッシュ戦略

```yaml
# docker-compose.yml
services:
  dev:
    build:
      cache_from:
        - jha-website:latest
        - jha-website:dev
      args:
        BUILDKIT_INLINE_CACHE: 1
```

## セキュリティ

### セキュリティスキャン

```bash
# イメージの脆弱性スキャン
docker scan jha-website:latest

# Trivyを使用したスキャン
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image jha-website:latest
```

### ベストプラクティス

```dockerfile
# 1. 最小限のベースイメージ使用
FROM node:20-alpine

# 2. non-rootユーザーで実行
USER node

# 3. 機密情報を含めない
# .dockerignoreで除外

# 4. ヘルスチェックの実装
HEALTHCHECK CMD curl -f http://localhost:4321/health || exit 1
```

## CI/CD統合

### GitHub Actions

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            user/jha-website:latest
            user/jha-website:${{ github.sha }}
          cache-from: type=registry,ref=user/jha-website:buildcache
          cache-to: type=registry,ref=user/jha-website:buildcache,mode=max
```

## デプロイメント

### Docker Swarm

```bash
# Swarmモードの初期化
docker swarm init

# サービスのデプロイ
docker stack deploy -c docker-compose.yml jha-website

# スケーリング
docker service scale jha-website_prod=3
```

### Kubernetes

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jha-website
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jha-website
  template:
    metadata:
      labels:
        app: jha-website
    spec:
      containers:
      - name: web
        image: jha-website:latest
        ports:
        - containerPort: 4321
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
```

## モニタリング

### ログ管理

```bash
# ログの確認
docker logs -f container_name

# ログのエクスポート
docker logs container_name > logs.txt

# ログローテーション設定
docker run -d \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  jha-website:latest
```

### メトリクス

```yaml
# Prometheus設定
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
```

## トラブルシューティング

### よくある問題

```bash
# ポート競合
# 解決: 別のポートを使用
docker-compose -p jha-dev up -d

# ボリュームの権限問題
# 解決: 権限を修正
docker-compose exec dev chown -R node:node /app

# キャッシュのクリア
docker system prune -a
docker volume prune
```

### デバッグ

```bash
# コンテナ内でのデバッグ
docker-compose exec dev sh
npm run build -- --verbose

# ネットワークのデバッグ
docker network inspect jha-network

# リソース使用状況
docker stats
```

## ベストプラクティス

1. **イメージサイズの最小化**: マルチステージビルド使用
2. **セキュリティ**: non-rootユーザー、最新パッチ適用
3. **キャッシュ活用**: レイヤーキャッシュの最適化
4. **ヘルスチェック**: 適切な監視設定
5. **ログ管理**: 構造化ログ、適切なローテーション

---

最終更新: 2025年1月