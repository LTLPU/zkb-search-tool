import { SearchCriteria,
  KillsSearchCriteria,
  LossesSearchCriteria,
  CharacterSearchCriteria,
  AllianceSearchCriteria,
  CorporationSearchCriteria,
  GankedSearchCriteria,
  SoloSearchCriteria,
  RegionSearchCriteria,
  ConsterationSearchCriteria,
  SystemSearchCriteria,
  HighsecSearchCriteria,
  LowsecSearchCriteria,
  NullsecSearchCriteria,
  AbyssalSearchCriteria,
  GroupSearchCriteria,
  ShipSearchCriteria } from './SearchCriteria.js'

export class SearchCriteriaListModel {
  constructor () {
    this._searchCriteriaList = []
    this._idx = 0
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
   * @param {SearchCriteria} newSearchCriteria 追加する条件
   */
  addCriteria (newSearchCriteria) {
    if (!(newSearchCriteria instanceof SearchCriteria)) {
      throw new Error('newSearchCriteria is not SearchCriteria.')
    }

    // 重複が認められないCriteriaを無視
    // conflictDecisionListのconflictKeyで判断
    const newSearchCriteriaConflictKey = getConflictKey(newSearchCriteria)

    if (newSearchCriteriaConflictKey > 0) {
      for (const searchCriteria of this._searchCriteriaList) {
        if (newSearchCriteriaConflictKey === getConflictKey(searchCriteria.obj)) {
          throw new Error('newSearchCriteria can not conflict.')
        }
      }
    }

    // SearchCriteriaを追加
    this._searchCriteriaList.push({
      obj: newSearchCriteria,
      idx: this._idx
    })

    // idxを加算
    this._idx += 1
  }

  deleteSearchCriteria (key) {
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
      // クラスが一致するSearchCriteriaのリストを取得
      const filtered = this._searchCriteriaList.filter((current) => {
        return current.obj instanceof criteriaClass
      })

      // 該当のSearchCriteriaが存在しない場合
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
 * @param {SearchCriteria} searchCriteriaClass SearchCriteriaClass
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
  { searchCriteriaClass: KillsSearchCriteria, conflictKey: 1 },
  { searchCriteriaClass: LossesSearchCriteria, conflictKey: 1 },
  { searchCriteriaClass: GankedSearchCriteria, conflictKey: 2 },
  { searchCriteriaClass: SoloSearchCriteria, conflictKey: 3 },
  { searchCriteriaClass: HighsecSearchCriteria, conflictKey: 4 },
  { searchCriteriaClass: LowsecSearchCriteria, conflictKey: 4 },
  { searchCriteriaClass: NullsecSearchCriteria, conflictKey: 4 },
  { searchCriteriaClass: AbyssalSearchCriteria, conflictKey: 4 }
]

/**
 * ソート順
 */
const sortOrderClasses = [
  CharacterSearchCriteria,
  AllianceSearchCriteria,
  CorporationSearchCriteria,
  GroupSearchCriteria,
  ShipSearchCriteria,
  KillsSearchCriteria,
  LossesSearchCriteria,
  RegionSearchCriteria,
  ConsterationSearchCriteria,
  SystemSearchCriteria,
  HighsecSearchCriteria,
  LowsecSearchCriteria,
  NullsecSearchCriteria,
  AbyssalSearchCriteria,
  GankedSearchCriteria,
  SoloSearchCriteria
]
