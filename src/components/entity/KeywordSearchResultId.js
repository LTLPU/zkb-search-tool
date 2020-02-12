import { EntityId } from './EntityId'

export class KeywordSearchResultId {
  constructor(entityId, isStrict = false) {
    if (entityId === null || !(entityId instanceof EntityId)) {
      throw new Error('entityId must be provided')
    }
    this._entityId = entityId
    this._isStrict = isStrict
  }

  get entityId() {
    return this._entityId
  }

  get isStrict() {
    return this._isStrict
  }
}
