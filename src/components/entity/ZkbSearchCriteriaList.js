import { ZkbSearchCriteriaItem } from './ZkbSearchCriteriaItem.js'

export class ZkbSearchCriteriaList {
  constructor () {
    this._searchCriteriaList = []
  }

  /**
   * iterator
   */
  * [Symbol.iterator] () {
    for (const listItem of this._searchCriteriaList) {
      yield listItem
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

    this._removeConflictItem(newItem)

    this._searchCriteriaList.push(newItem)
  }

  remove (key) {
    const findIdx = this._searchCriteriaList.findIndex(current => {
      return current.key === key
    })
    if (findIdx !== -1) {
      this._searchCriteriaList.splice(findIdx, 1)
    }
  }

  clear () {
    this._searchCriteriaList = []
  }

  _removeConflictItem (newItem) {
    if (newItem.conflictKey === -1) {
      return
    }

    this._searchCriteriaList.forEach(listItem => {
      if (listItem.conflictKey === newItem.conflictKey) {
        this.remove(listItem.key)
      }
    })
  }

  _getSortedList () {}
}
