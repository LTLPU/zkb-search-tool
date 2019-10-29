import { Criteria } from './Criteria.js'
import { CriteriaTypeInfo } from './CriteriaType.js'

export class CriteriaListModel {
  constructor () {
    this._criteriaList = []
  }

  /**
   * CriteriaListModelのIterator
   */
  * [Symbol.iterator] () {
    for (const criteria of this._criteriaList) {
      yield criteria
    }
  }

  /**
   * 条件を追加する。
   *
   * @param {Criteria} newCriteria 追加する条件
   */
  addCriteria (newCriteria) {
    // TODO CriteriaTypeInfo.conflictKey を見るように書き変える。

    if (!(newCriteria instanceof Criteria)) {
      throw new Error('newCriteria is not Criteria.')
    }

    const type = newCriteria.getCriteriaType()

    // Typeが一致するものを検索
    const findIndex = this._criteriaList.findIndex(criteria => {
      return criteria.getCriteriaType() === type
    })
    // 重複が認められていないTypeは上書きする
    if (!CriteriaTypeInfo[type].isMultiple) {
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
  getSearchUrl () {
    let url = 'https://zkillboard.com/'

    for (const criteria of this._criteriaList) {
      url += criteria.getUrlString()
    }

    return url
  }

  clear () {
    this._criteriaList = []
  }
}
