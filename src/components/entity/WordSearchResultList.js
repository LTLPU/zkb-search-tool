// import { WordSearchResultItem } from './WordSearchResultItem.js'

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
    this._wordSearchResultList.push(resultItem)
  }

  clear () {
    this._wordSearchResultList = []
  }
}
