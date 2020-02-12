export class KeywordSearchResultItem {
  constructor(type, id, label, img, isStrict) {
    this._type = type
    this._id = id
    this._label = label
    this._img = img
    this._isStrict = isStrict
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

  get img() {
    return this._img
  }

  get isStrict() {
    return this._isStrict
  }
}
