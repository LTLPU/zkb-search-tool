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
      CriteriaType.TYPE_SHIP,
      CriteriaType.TYPE_GROUP,
      CriteriaType.TYPE_KILLS,
      CriteriaType.TYPE_LOSSES,
      CriteriaType.TYPE_GANKED,
      CriteriaType.TYPE_SOLO,
      CriteriaType.TYPE_REGION,
      CriteriaType.TYPE_CONSTERATION,
      CriteriaType.TYPE_SYSTEM,
      CriteriaType.TYPE_HIGHSEC,
      CriteriaType.TYPE_LOWSEC,
      CriteriaType.TYPE_NULLSEC,
      CriteriaType.TYPE_ABYSSAL,
      CriteriaType.TYPE_GANKED

    ]

    let url = 'https://zkillboard.com/'

    for (const typeKey of sortOrder) {
      // CriteriaTypeが一致するCriteriaリストを取得
      const filtered = this._criteriaList.filter((current) => {
        return current.getType() === typeKey
      })

      // TODO デバッグ用
      console.log(typeof filtered)

      if (filtered.length < 1) {
        // 該当のCriteriaTypeが存在しない場合
        continue
      }

      if (!CriteriaTypeInfo[typeKey].isParameterRequired) {
        // url = type/
        url += CriteriaTypeInfo[typeKey].type + '/'
      } else {
        // valueを連結する
        const values = filtered.reduce((accum, current, idx) => {
          if (idx === 0) {
            return current.getValue()
          } else {
            return accum + ',' + current.getValue()
          }
        }, '')
        // url = type/value,value.../
        url += CriteriaTypeInfo[typeKey].type + '/' + values + '/'
      }
    }

    return url
  }

  clear () {
    this._criteriaList = []
  }
}
