import { SearchCriteria } from './SearchCriteria.js'
import { SearchCriteriaType, SearchCriteriaTypeInfo } from './SearchCriteriaType.js'

export class SearchCriteriaCreator {
  static create (type, value) {
    if (!SearchCriteriaType.hasOwnProperty(type)) {
      throw new Error('type is not SearchCriteriaType.')
    }

    const typeInfo = SearchCriteriaTypeInfo[type]

    if (typeInfo.isParameterRequired && !value) {
      throw new Error('value is required.')
    }

    return new SearchCriteria(type, typeInfo.type, value)
  }
}
