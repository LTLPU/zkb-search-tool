let key = 0

export class SearchCriteriaListItem {
  constructor (value) {
    // インスタンス作成時に指定(引数)
    this._key = key++
    this._value = value
    this._label = ''
    // Class側で指定(固定)
    this._type = ''
    this._color = '#FFFFFF'
  }

  get key () {
    return this._index
  }

  // Getter (表示用)
  get value () {
    return this._value
  }

  get label () {
    return this._label
  }

  get type () {
    return this._type
  }

  get hasValue () {
    if (typeof this._value === 'undefined') {
      return false
    }
    return true
  }

  get color () {
    return this._color
  }
}

/**
 * Kills
 */
export class KillsSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'kills'
    this._label = 'Kills'
    this._color = '#00FF00'
  }
}

/**
 * Losses
 */
export class LossesSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'losses'
    this._label = 'Losses'
    this._color = '#FF0000'
  }
}

/**
 * Ganked
 */
export class GankedSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'ganked'
    this._label = 'Ganked'
    this._color = '#00FF33'
  }
}

/**
 * Solo
 */
export class SoloSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'solo'
    this._label = 'Solo'
    this._color = '#0033FF'
  }
}

/**
 * Alliance
 */
export class AllianceSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value AllianceId
   * @param {String} label AllianceName
   */
  constructor (value, label) {
    super()
    this._type = 'alliance'
    this._value = value
    this._label = label
    this._color = '#FFCC00'
  }
}

/**
 * Corporation
 */
export class CorporationSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value CorporationId
   * @param {String} label CorporationName
   */
  constructor (value, label) {
    super()
    this._type = 'corporation'
    this._value = value
    this._label = label
    this._color = '#FFFF00'
  }
}

/**
 * Character
 */
export class CharacterSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value CharacterId
   * @param {String} label CharacterName
   */
  constructor (value, label) {
    super()
    this._type = 'character'
    this._value = value
    this._label = label
    this._color = '#FF0000'
  }
}

/**
 * Highsec
 */
export class HighsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'highsec'
    this._label = 'Highsec'
    this._color = '#00FF00'
  }
}

/**
 * Lowsec
 */
export class LowsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'lowsec'
    this._label = 'Lowsec'
    this._color = '#FFFF00'
  }
}

/**
 * Nullsec
 */
export class NullsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'nullsec'
    this._label = 'Nullsec'
    this._color = '#FF0000'
  }
}

/**
 * Abyssal
 */
export class AbyssalSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'abyssal'
    this._label = 'Abyssal'
    this._color = '#000000'
  }
}

/**
 * Group
 */
export class GroupSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value GroupId
   * @param {String} label GroupName
   */
  constructor (value, label) {
    super()
    this._type = 'group'
    this._value = value
    this._label = label
    this._color = '#000000'
  }
}

/**
 * Ship
 */
export class ShipSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value ItemId
   * @param {String} label ItemName
   */
  constructor (value, label) {
    super()
    this._type = 'group'
    this._value = value
    this._label = label
    this._color = '#000000'
  }
}

/**
 * Region
 */
export class RegionSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value RegionId
   * @param {String} label RegionName
   */
  constructor (value, label) {
    super()
    this._type = 'group'
    this._value = value
    this._label = label
    this._color = '#000000'
  }
}

/**
 * Consteration
 */
export class ConsterationSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value ConsterationId
   * @param {String} label ConsterationName
   */
  constructor (value, label) {
    super()
    this._type = 'consteration'
    this._value = value
    this._label = label
    this._color = '#000000'
  }
}

/**
 * System
 */
export class SystemSearchCriteriaListItem extends SearchCriteriaListItem {
  /**
   *
   * @param {String} value SystemId
   * @param {String} label SystemName
   */
  constructor (value, label) {
    super()
    this._type = 'group'
    this._value = value
    this._label = label
    this._color = '#000000'
  }
}
