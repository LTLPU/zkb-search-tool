export class Criteria {
  constructor (criteriaType, searchType, searchValue) {
    this._criteriaType = criteriaType !== undefined ? criteriaType : ''
    this._searchType = searchType !== undefined ? searchType : ''
    this._searchValue = searchValue !== undefined ? [searchValue] : []
  }

  addSearchValue (value) {
    this._searchValue.push(value)
  }

  getCriteriaType () {
    return this._criteriaType
  }

  getSearchValue () {
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

  // TODO 消すかも
  merge (criteria) {
    if (!(criteria instanceof Criteria)) {
      throw new Error('Criteriaではない')
    }
    if (this._criteriaType !== criteria._criteriaType) {
      throw new Error('CriteriaTypeが一致しない')
    }
    if (this._searchType !== criteria._searchType) {
      throw new Error('SearchTypeが一致しない')
    }

    for (const value of criteria.getSearchValue()) {
      this.addSearchValue(value)
    }
  }
}
