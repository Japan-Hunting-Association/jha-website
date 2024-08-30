# ページの追加方法について
ページを追加するには、[こちら](../app/src/content/house/ja/yubari.md)をコピーして、このREADMEファイルと同じ階層にある/jaフォルダに追加します。（英語版を追加するには翻訳した.mdを/en以下に配置してください）

## .mdファイルの構成について
ハンターハウス紹介ページの.mdは、以下の構成になっています。

```
---
name: 'ハンターハウスSample'
pubDate: 2024-06-26
description: '都内から車で2時間。千葉県の中央に位置するため、オールマイティに獲物が狙えます。'
address: 〒299-3246 千葉県大網白里市小中１１２５
map_embed: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.99201231506504!2d140.28831808248782!3d35.507438279928735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022be3fa243bb41%3A0x6e40a52f7af5e2ab!2z44CSMjk5LTMyNDYg5Y2D6JGJ55yM5aSn57ay55m96YeM5biC5bCP5Lit77yR77yR77yS77yV!5e0!3m2!1sja!2sjp!4v1719948066995!5m2!1sja!2sjp
owner: 'tokisaba'
price: 2500円　※1日利用
cover: '@assets/HunterHouseOami.jpg'
coverAlt: "hunter house in Oami-Shirasato"
lang: ja
tags: [千葉, 鳥撃ち, 古民家, 首都圏]
equipments: [冷凍ストッカー, ガンロッカー, 装弾ロッカー, 真空パック機]
booking: 'X(旧twitter)よりDMをお送りください。' 
contact: https://x.com/tokisaba
---

都内から車で2時間。千葉県の中央に位置するため、オールマイティに獲物が狙えます。

![画像の説明](@assets/HunterHouseOami.jpg)
```

先頭の---で囲まれたセクションが「ヘッダー」です。ハウスの基本情報が掲載されます。項目は過不足なく記載してください。

---に囲まれていない部分が本文になります。なお、マークダウン中における画像ファイルはすべてapp/src/assets以下に配置し、.md内では"@assets/hogehoge.jpg"のように相対パスで記述してください。
