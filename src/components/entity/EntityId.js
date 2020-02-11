export class EntityId {
  constructor(type, id) {
    this._type = type
    this._id = id
  }

  get type() {
    return this._type
  }

  get id() {
    return this._id
  }

  equals(anotherItem) {
    return this._type === anotherItem.type && this._id === anotherItem.id
  }
}
