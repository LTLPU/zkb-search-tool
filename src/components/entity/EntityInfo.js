export class EntityInfo {
  constructor(type, id, name, label, img) {
    this._type = type
    this._id = id
    this._name = name
    this._label = label
    this._img = img
  }

  get type() {
    return this._type
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get label() {
    return this._label
  }

  get img() {
    return this._img
  }
}
