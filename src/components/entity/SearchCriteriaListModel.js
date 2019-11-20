import { SearchCriteriaListItem,
  KillsSearchCriteriaListItem,
  LossesSearchCriteriaListItem,
  CharacterSearchCriteriaListItem,
  AllianceSearchCriteriaListItem,
  CorporationSearchCriteriaListItem,
  GankedSearchCriteriaListItem,
  SoloSearchCriteriaListItem,
  RegionSearchCriteriaListItem,
  ConsterationSearchCriteriaListItem,
  SystemSearchCriteriaListItem,
  HighsecSearchCriteriaListItem,
  LowsecSearchCriteriaListItem,
  NullsecSearchCriteriaListItem,
  AbyssalSearchCriteriaListItem,
  GroupSearchCriteriaListItem,
  ShipSearchCriteriaListItem } from './SearchCriteriaListItem'

export class SearchCriteriaListModel {
  constructor () {
    this._searchCriteriaList = []
  }

  /**
   * CriteriaListModelのIterator
   */
  * [Symbol.iterator] () {
    for (const searchCriteria of this._searchCriteriaList) {
      yield searchCriteria
    }
  }

  /**
   * 条件を追加する。
   *
   * @param {SearchCriteriaListItem} newSearchCriteriaListItem 追加する条件
   */
  add (newSearchCriteriaListItem) {
    if (!(newSearchCriteriaListItem instanceof SearchCriteriaListItem)) {
      throw new Error('newSearchCriteriaListItem is not SearchCriteriaListItem.')
    }

    // 重複が認められないCriteriaを無視
    // conflictDecisionListのconflictKeyで判断
    const newSearchCriteriaConflictKey = getConflictKey(newSearchCriteriaListItem)

    if (newSearchCriteriaConflictKey > 0) {
      for (const searchCriteria of this._searchCriteriaList) {
        if (newSearchCriteriaConflictKey === getConflictKey(searchCriteria.obj)) {
          throw new Error('newSearchCriteriaListItem can not conflict.')
        }
      }
    }

    // SearchCriteriaListItemを追加
    this._searchCriteriaList.push(newSearchCriteriaListItem)

    // idxを加算
    this._idx += 1
  }

  remove (key) {
    const findIdx = this._searchCriteriaList.findIndex(current => {
      return current.idx === key
    })

    if (findIdx > -1) {
      this._searchCriteriaList.splice(findIdx, 1)
    }
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl () {
    let url = 'https://zkillboard.com/'

    for (const criteriaClass of sortOrderClasses) {
      // クラスが一致するSearchCriteriaListItemのリストを取得
      const filtered = this._searchCriteriaList.filter((current) => {
        return current.obj instanceof criteriaClass
      })

      // 該当のSearchCriteriaListItemが存在しない場合
      if (filtered.length < 1) {
        continue
      }

      url += filtered[0].obj.type + '/'
      if (filtered[0].obj.hasValue) {
        // value配列抽出
        const values = filtered.map(current => {
          return current.obj.value
        })
        url += values.join(',') + '/'
      }
    }

    return url
  }

  clear () {
    this._searchCriteriaList = []
  }
}

/**
 * ConflictKey取得
 *
 * @param {SearchCriteriaListItem} searchCriteriaClass SearchCriteriaClass
 */
function getConflictKey (searchCriteriaClass) {
  for (const listObj of conflictDecisionList) {
    if (searchCriteriaClass instanceof listObj.searchCriteriaClass) {
      return listObj.conflictKey
    }
  }
  return null
}

/**
 * Conflict検証用リスト
 */
const conflictDecisionList = [
  { searchCriteriaClass: KillsSearchCriteriaListItem, conflictKey: 1 },
  { searchCriteriaClass: LossesSearchCriteriaListItem, conflictKey: 1 },
  { searchCriteriaClass: GankedSearchCriteriaListItem, conflictKey: 2 },
  { searchCriteriaClass: SoloSearchCriteriaListItem, conflictKey: 3 },
  { searchCriteriaClass: HighsecSearchCriteriaListItem, conflictKey: 4 },
  { searchCriteriaClass: LowsecSearchCriteriaListItem, conflictKey: 4 },
  { searchCriteriaClass: NullsecSearchCriteriaListItem, conflictKey: 4 },
  { searchCriteriaClass: AbyssalSearchCriteriaListItem, conflictKey: 4 }
]

/**
 * ソート順
 */
const sortOrderClasses = [
  CharacterSearchCriteriaListItem,
  AllianceSearchCriteriaListItem,
  CorporationSearchCriteriaListItem,
  GroupSearchCriteriaListItem,
  ShipSearchCriteriaListItem,
  KillsSearchCriteriaListItem,
  LossesSearchCriteriaListItem,
  RegionSearchCriteriaListItem,
  ConsterationSearchCriteriaListItem,
  SystemSearchCriteriaListItem,
  HighsecSearchCriteriaListItem,
  LowsecSearchCriteriaListItem,
  NullsecSearchCriteriaListItem,
  AbyssalSearchCriteriaListItem,
  GankedSearchCriteriaListItem,
  SoloSearchCriteriaListItem
]
