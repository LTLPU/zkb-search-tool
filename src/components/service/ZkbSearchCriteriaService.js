import { ZkbSearchCriteriaItemFactory } from '../entity/ZkbSearchCriteriaItem.js'

export class ZkbSearchCriteriaService {
  constructor (zkbSearchCriteriaList) {
    this._zkbSearchCriteriaList = zkbSearchCriteriaList
  }

  /** 検索条件追加 */
  addCriteria (itemType, value, label) {
    const criteriaItem = new ZkbSearchCriteriaItemFactory().create(
      itemType,
      value,
      label
    )
    this._zkbSearchCriteriaList.add(criteriaItem)
  }

  /** 検索条件削除 */
  removeCriteria (idx) {
    this._zkbSearchCriteriaList.remove(idx)
  }

  /** 検索条件全削除 */
  removeAllCriteria () {
    this._zkbSearchCriteriaList.clear()
  }

  /** URL取得 */
  getSearchUrl () {
    let url = 'https://zkillboard.com/'

    const criteriaList = Array.from(this._zkbSearchCriteriaList)

    const sortedList = criteriaList.sort((a, b) => a.sortOrder - b.sortOrder)

    sortedList.forEach(listItem => {
      url += listItem.urlString
    })

    return url
  }
}
