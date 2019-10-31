import { Criteria } from './Criteria.js'
import { CriteriaType, CriteriaTypeInfo } from './CriteriaType.js'

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

    const typeInfo = newCriteria.getTypeInfo()

    // CriteriaTypeInfo.conflictKeyが一致するものを検索
    const findIndex = this._criteriaList.findIndex(criteria => {
      return typeInfo.conflictKey === criteria.getTypeInfo().conflictKey
    })

    if (!typeInfo.isMultiple) {
      // 重複が認められないCriteriaは削除→追加
      if (findIndex >= 0) {
        this._criteriaList.splice(findIndex, 1)
      }
      this._criteriaList.push(newCriteria)
    } else {
      // 重複が認められているTypeは追加
      this._criteriaList.push(newCriteria)
    }
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl () {
    const sortOrder = [
      CriteriaType.TYPE_CHARACTER,
      CriteriaType.TYPE_ALLIANCE,
      CriteriaType.TYPE_CORPORATION,
      CriteriaType.TYPE_KILLS,
      CriteriaType.TYPE_LOSSES
    ]

    let url = 'https://zkillboard.com/'

    for (const typeKey of sortOrder) {
      // CriteriaTypeが一致するCriteriaリストを取得
      const filtered = this._criteriaList.filter((current) => {
        return current.getType() === typeKey
      })

      if (filtered.length < 1) {
        // 該当のCriteriaTypeが存在しない場合
        continue
      }

      if (!CriteriaTypeInfo[typeKey].isParameterRequired) {
        url += CriteriaTypeInfo[typeKey].type + '/'
        continue
      }

      if (filtered.length === 1) {
        // 該当のCriteriaTypeが存在する場合
        url += CriteriaTypeInfo[typeKey].type + '/' + filtered[0].getValue() + '/'
      } else {
        // 該当のCriteriaTypeが複数存在する場合
        // valueを連結する
        const values = filtered.reduce((accum, current, idx) => {
          if (idx === 0) {
            return current.getValue()
          } else {
            return accum + ',' + current.getValue()
          }
        }, '')
        url += CriteriaTypeInfo[typeKey].type + '/' + values + '/'
      }
    }

    return url
  }

  clear () {
    this._criteriaList = []
  }
}
