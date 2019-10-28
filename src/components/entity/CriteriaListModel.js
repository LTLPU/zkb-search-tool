import * as criterias from './Criteria.js'
import * as types from './Types.js'

export class CriteriaListModel {
  constructor () {
    this._criteriaList = []
  }
  /**
   * 条件を追加する。
   *
   * @param {Criteria} newCriteria 追加する条件
   */
  addCriteria = newCriteria => {
    if (!(newCriteria instanceof criterias.Criteria)) {
      throw new Error('newCriteria is not Criteria')
    }

    const type = newCriteria.getCriteriaType()

    // Typeが一致するものを検索
    const findIndex = this._criteriaList.findIndex(criteria => {
      return criteria.getCriteriaType() === type
    })
    // 重複が認められていないTypeは上書きする
    if (!types.TYPES[type].isMultiple) {
      if (findIndex < 0) {
        // 追加
        this._criteriaList.push(newCriteria)
      } else {
        // 上書き
        this._criteriaList.splice(findIndex, 1, newCriteria)
      }
    } else {
      // 重複が認められているTypeは追加
      if (findIndex < 0) {
        // 新規追加
        this._criteriaList.push(newCriteria)
      } else {
        // 既存のものデータを統合
        this._criteriaList[findIndex].merge(newCriteria)
      }
      this._criteriaList.push(newCriteria)
    }
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl = () => {
    let url = 'https://zkillboard.com/'

    for (let criteria of this._criteriaList) {
      if (criteria instanceof criterias.Criteria) {
        url += criteria.getUrlString()
      }
    }

    return url
  }

  // TODO Iteratorを実装する。
}
