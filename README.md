# JHA WebSite
日本狩猟協会のウェブサイトプロジェクトです。

# フレームワーク
- gatsby
- docker

# 環境構築
以下のツールをインストールしてください。
- docker
- docker-compose

インストールが完了したら、以下のコマンドでコンテナを起動してください。

`docker-compose up`

# プロジェクトの起動方法
gatsbyを起動するには以下のコマンドを使用します。

`gatsby develop`

もし、localhost:8000が応答しない場合は、以下のオプション付きコマンドも試してみてください。

`gatsby develop --host=0.0.0.0`

なお、なんらかのエラーで起動しない場合は、

`gatsby clean`

でキャッシュを削除することで改善することもあります。

## ポートが使用済みと警告される場合
以下のようにポートが重複しているという警告が出る場合があります。

```
Something is already running at port 8000

✔ Would you like to run the app at another port instead? 
```

この場合は、コンテナ内からターミナルで

`kill -9 $(lsof -t -i:8000)`

を実行すると、うまく処理が終了していないプロセスを終了させることができます。