export class KeywordSearchResultList {
  constructor() {
    this._keywordSearchResultList = []
  }

  *[Symbol.iterator]() {
    for (const resultItem of this._keywordSearchResultList) {
      yield resultItem
    }
  }

  add(resultItem) {
    if (this._keywordSearchResultList.length < 20) {
      this._keywordSearchResultList.push(resultItem)
    }
  }

  clear() {
    this._keywordSearchResultList = []
  }
}
