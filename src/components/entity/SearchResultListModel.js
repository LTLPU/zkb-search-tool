import { SearchResultListItem } from './SearchResultListItem.js'

export class SearchResultListModel {
  constructor () {
    this._searchResultList = []
  }

  * [Symbol.iterator] () {
    for (const resultItem of this._searchResultList) {
      yield resultItem
    }
  }

  add (resultItem) {
    if (!(resultItem instanceof SearchResultListItem)) {
      throw new Error('resultItem is not SearchResultListItem.')
    }
    this._searchResultList.push(resultItem)
  }

  clear () {
    this._searchResultList = []
  }

  appendList (searchResultList) {
    this._searchResultList.concat(searchResultList._searchResultList)
  }
}
