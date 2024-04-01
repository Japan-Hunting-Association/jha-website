# TALO
TALOは、インバウンド向けグループマッチングアプリのモックプロジェクトです。

# フレームワーク
- flutter
- django-rest
- docker

# 環境構築
以下のツールをインストールしてください。
- docker
- docker-compose

インストールが完了したら、以下のコマンドでコンテナを起動してください。

`docker-compose up`

# ローカル起動方法
コンテナが起動したら、コンテナ内もしくはRemote Conteinarを経由して、以下のコマンドでflutterをrunします。

`flutter run -d web-server --release --web-port 5555 --web-hostname 0.0.0.0`

