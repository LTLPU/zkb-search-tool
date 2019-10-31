import { CriteriaTypeInfo } from './CriteriaType.js'

export class Criteria {
  constructor (type, searchType, searchValue) {
    this._type = type !== undefined ? type : ''
    this._searchType = searchType !== undefined ? searchType : ''
    this._searchValue = searchValue !== undefined ? [searchValue] : []
  }

  addSearchValue (value) {
    this._searchValue.push(value)
  }

  getType () {
    return this._type
  }

  getTypeInfo () {
    return CriteriaTypeInfo[this._type]
  }

  getValue () {
    return this._searchValue
  }

  getUrlString () {
    if (Array.isArray(this._searchValue) && this._searchValue.length > 0) {
      return this._searchType + '/' + this._searchValue.join(', ') + '/'
    } else {
      return this._searchType + '/'
    }
  }

  getCriteriaView () {
    if (Array.isArray(this._searchValue) && this._searchValue.length > 0) {
      return this._searchType + ' : ' + this._searchValue.join(', ')
    } else {
      return this._searchType
    }
  }
}
