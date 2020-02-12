import { KeywordSearchResultId } from './KeywordSearchResultId'

export class KeywordSearchResultIdList {
  constructor() {
    this._idList = []
  }

  *[Symbol.iterator]() {
    for (const idItem of this._idList) {
      yield idItem
    }
  }

  append(idList) {
    if (idList === null || !(idList instanceof KeywordSearchResultIdList)) {
      throw new Error('idList must be provided')
    }
    for (const newItem of idList) {
      this.push(newItem)
    }
  }

  push(item) {
    if (item === null || !(item instanceof KeywordSearchResultId)) {
      throw new Error('item must be provided')
    }
    if (!this._isConflict(item)) {
      this._idList.push(item)
    }
  }

  get list() {
    return this._idList
  }

  _isConflict(newItem) {
    for (const item of this._idList) {
      if (item.entityId.equals(newItem.entityId)) {
        return true
      }
    }
    return false
  }
}
