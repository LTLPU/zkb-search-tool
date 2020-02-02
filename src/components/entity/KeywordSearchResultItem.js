let key = 0

export class KeywordSearchResultItem {
  constructor(type, id, label, icon) {
    this._key = key++
    this._type = type
    this._id = id
    this._label = label
    this._icon = icon
  }

  get key() {
    return this._key
  }

  get type() {
    return this._type
  }

  get id() {
    return this._id
  }

  get label() {
    return this._label
  }

  get icon() {
    return this._icon
  }
}
