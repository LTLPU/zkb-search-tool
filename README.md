# zkb-search-tool

zKillboardの検索URLを生成するツール。

- 複数条件付与できるようにする。
- 画面項目を大きくして選びやすくする。
- 前後スペースをトリムしてキャラコピペでも検索しやすくする。

## 検索条件

- セキュリティ
  - /highsec/, /lowsec/, /nullsec/, /abyssal/
- カテゴリ
  - /losses/, /kills/, /solo/, /ganked/
- 艦種
  - /ship/[SHIPID]/
- グループ(Ship配下)
  - /group/[GROUPID]/ for example /group/25/ for frigates.
- キャラクター
  - /character/[CHARACTERID]/
- コーポレーション
  - /corporation/[CORPID]/
- アライアンス
  - /alliance/[ALLIANCEID]/
- システム
  - /system/[SYSTEMID]/
- リージョン
  - /region/[REGIONID]/
- ロケーション
  - /location/[LOCATIONID]/

## 参考URL

- <https://www.reddit.com/r/Eve/comments/84ebp7/zkillboard_url_tricks_how_to_advanced_search/dvp4jt5/>
- <https://github.com/zKillboard/zKillboard/wiki/API-(Killmails)>
- <https://esi.evetech.net/ui/>
