import { SearchCriteria } from './SearchCriteria.js'
import { SearchCriteriaType, SearchCriteriaTypeInfo } from './SearchCriteriaType.js'

export class SearchCriteriaListModel {
  constructor () {
    this._searchCriteriaList = []
  }

  /**
   * CriteriaListModelのIterator
   */
  * [Symbol.iterator] () {
    for (const searchCriteria of this._searchCriteriaList) {
      yield searchCriteria
    }
  }

  /**
   * 条件を追加する。
   *
   * @param {SearchCriteria} newCriteria 追加する条件
   */
  addCriteria (newCriteria) {
    // TODO SearchCriteriaTypeInfo.conflictKey を見るように書き変える。

    if (!(newCriteria instanceof SearchCriteria)) {
      throw new Error('newCriteria is not Criteria.')
    }

    const typeInfo = newCriteria.getTypeInfo()

    // SearchCriteriaTypeInfo.conflictKeyが一致するものを検索
    const findIndex = this._searchCriteriaList.findIndex(searchCriteria => {
      return typeInfo.conflictKey === searchCriteria.getTypeInfo().conflictKey
    })

    if (!typeInfo.isMultiple) {
      // 重複が認められないCriteriaは削除→追加
      if (findIndex >= 0) {
        this._searchCriteriaList.splice(findIndex, 1)
      }
      this._searchCriteriaList.push(newCriteria)
    } else {
      // 重複が認められているTypeは追加
      this._searchCriteriaList.push(newCriteria)
    }
  }

  /**
   * リストを展開してUrlを返す。
   */
  getSearchUrl () {
    const sortOrder = [
      SearchCriteriaType.TYPE_CHARACTER,
      SearchCriteriaType.TYPE_ALLIANCE,
      SearchCriteriaType.TYPE_CORPORATION,
      SearchCriteriaType.TYPE_SHIP,
      SearchCriteriaType.TYPE_GROUP,
      SearchCriteriaType.TYPE_KILLS,
      SearchCriteriaType.TYPE_LOSSES,
      SearchCriteriaType.TYPE_GANKED,
      SearchCriteriaType.TYPE_SOLO,
      SearchCriteriaType.TYPE_REGION,
      SearchCriteriaType.TYPE_CONSTERATION,
      SearchCriteriaType.TYPE_SYSTEM,
      SearchCriteriaType.TYPE_HIGHSEC,
      SearchCriteriaType.TYPE_LOWSEC,
      SearchCriteriaType.TYPE_NULLSEC,
      SearchCriteriaType.TYPE_ABYSSAL,
      SearchCriteriaType.TYPE_GANKED

    ]

    let url = 'https://zkillboard.com/'

    for (const typeKey of sortOrder) {
      // SearchCriteriaTypeが一致するCriteriaリストを取得
      const filtered = this._searchCriteriaList.filter((current) => {
        return current.getType() === typeKey
      })

      // TODO デバッグ用
      console.log(typeof filtered)

      if (filtered.length < 1) {
        // 該当のSearchCriteriaTypeが存在しない場合
        continue
      }

      if (!SearchCriteriaTypeInfo[typeKey].isParameterRequired) {
        // url = type/
        url += SearchCriteriaTypeInfo[typeKey].type + '/'
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
        url += SearchCriteriaTypeInfo[typeKey].type + '/' + values + '/'
      }
    }

    return url
  }

  clear () {
    this._searchCriteriaList = []
  }
}
