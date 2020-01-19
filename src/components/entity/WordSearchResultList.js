export class WordSearchResultList {
  constructor () {
    this._wordSearchResultList = []
  }

  * [Symbol.iterator] () {
    for (const resultItem of this._wordSearchResultList) {
      yield resultItem
    }
  }

  add (resultItem) {
    if (this._wordSearchResultList.length < 20) {
      this._wordSearchResultList.push(resultItem)
    }
  }

  clear () {
    this._wordSearchResultList = []
  }
}
