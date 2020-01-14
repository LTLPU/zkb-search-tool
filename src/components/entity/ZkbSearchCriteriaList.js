import { ZkbSearchCriteriaItem } from './ZkbSearchCriteriaItem.js'

export class ZkbSearchCriteriaList {
  constructor () {
    this._searchCriteriaList = []
  }

  /**
   * iterator
   */
  * [Symbol.iterator] () {
    for (const list of this._searchCriteriaList) {
      if (!Array.isArray(list)) {
        continue
      }

      for (const item of list) {
        yield item
      }
    }
  }

  /**
   * 条件を追加する。
   *
   * @param {ZkbSearchCriteriaItem} newItem 追加する条件
   */
  add (newItem) {
    if (!(newItem instanceof ZkbSearchCriteriaItem)) {
      throw new Error('newItem must be ZkbSearchCriteriaItem.')
    }

    this._getConflictItem(newItem).forEach(conflictItem => {
      this.remove(conflictItem.key)
    })

    if (!Array.isArray(this._searchCriteriaList[newItem.sortOrder])) {
      this._searchCriteriaList[newItem.sortOrder] = []
    }

    this._searchCriteriaList[newItem.sortOrder].push(newItem)
  }

  remove (key) {
    this._searchCriteriaList.forEach(list => {
      const find = list.findIndex(current => {
        return current.key === key
      })
      if (find !== -1) {
        list.splice(find, 1)
      }
    })
  }

  clear () {
    this._searchCriteriaList = []
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl () {
    let url = 'https://zkillboard.com/'

    // TODO SearchCriteriaItemよりSortOrderをとるように変更
    let sortedList = this._getSortedList()

    for (const listItem of sortedList) {
      url = url + listItem.urlString
    }

    return url
  }

  /**
   * 重複するオブジェクトを返す。
   * @param {ZkbSearchCriteriaItem} newItem 追加する条件
   */
  _getConflictItem (newItem) {
    if (newItem.conflictKey < 0) {
      return []
    }

    return this._searchCriteriaList.filter(listItem => {
      return listItem.conflictKey === newItem.conflictKey
    })
  }
}
