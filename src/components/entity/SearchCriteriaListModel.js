import { SearchCriteriaListItem } from './SearchCriteriaListItem.js'

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
   * @param {SearchCriteriaListItem} newItem 追加する条件
   */
  add (newItem) {
    if (!(newItem instanceof SearchCriteriaListItem)) {
      throw new Error('newItem must be SearchCriteriaListItem.')
    }

    if (this._isConflict(newItem)) {
      throw new Error('newSearchCriteriaListItem can not conflict.')
    }

    this._searchCriteriaList.push(newItem)
  }

  remove (key) {
    const findIdx = this._searchCriteriaList.findIndex(current => {
      return current.key === key
    })

    if (findIdx > -1) {
      this._searchCriteriaList.splice(findIdx, 1)
    }
  }

  clear () {
    this._searchCriteriaList = []
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl () {
    let url = 'https://zkillboard.com/'

    // TODO SearchCriteriaListItemよりSortOrderをとるように変更
    let sortedList = this._getSortedList()

    for (const listItem of sortedList) {
      url = url + listItem.urlString
    }

    return url
  }

  /**
   * ソート済のSearchCriteriaListを返す。
   */
  _getSortedList () {
    let sortedList = []

    for (const itemList of this._searchCriteriaList) {
      sortedList.push(itemList)
    }

    return sortedList
  }

  /**
   * 重複判定結果を返す。
   * @param {SearchCriteriaListItem} newItem 追加する条件
   */
  _isConflict (newItem) {
    if (newItem.conflictKey < 0) {
      return false
    }

    for (const listItem of this._searchCriteriaList) {
      if (listItem.conflictKey === newItem.conflictKey) {
        return true
      }
    }
    return false
  }
}
