import { Criteria } from './Criteria.js'
import { CriteriaType, CriteriaTypeInfo } from './CriteriaType.js'

export class CriteriaCreator {
  static create (type, value) {
    if (!CriteriaType.hasOwnProperty(type)) {
      throw new Error('type is not CriteriaType.')
    }

    const typeInfo = CriteriaTypeInfo[type]

    if (typeInfo.isParameterRequired && !value) {
      throw new Error('value is required.')
    }

    return new Criteria(type, typeInfo.type, value)
  }
}
