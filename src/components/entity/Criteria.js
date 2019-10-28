import * as types from './Types.js'

export class Criteria {
  constructor () {
    this._criteriaType = ''
    this._searchType = ''
    this._searchValue = []
  }

  addSearchValue (value) {
    this._searchValue.push(value)
  }

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

  // TODO 同じCriteriaType, SearchTypeのCriteriaがきた場合、SearchValueを統合する処理を作る。

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
}

export class KillCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = types.TYPE_KILLLOSS
    this._searchType = 'kills'
  }
}

export class LossCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = types.TYPE_KILLLOSS
    this._searchType = 'losses'
  }
}

export class CharacterCriteria extends Criteria {
  constructor (characterId) {
    super()
    this._criteriaType = types.TYPE_CHARACTER
    this._searchType = 'character'
    this._searchValue.push(characterId)
  }
}
