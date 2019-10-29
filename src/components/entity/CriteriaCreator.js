import { Criteria } from './Criteria.js'
import { CriteriaType, CriteriaTypeInfo } from './CriteriaType.js'

export class CriteriaCreator {
  static create (criteriaType, value) {
    if (!CriteriaType.hasOwnProperty(criteriaType)) {
      throw new Error('criteriaType is not CriteriaType.')
    }

    const typeInfo = CriteriaTypeInfo[criteriaType]

    return new Criteria(criteriaType, typeInfo.type, value)
  }
}
