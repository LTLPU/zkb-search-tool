export class SearchCriteria {
  constructor (value) {
    // インスタンス作成時に指定(引数)
    this._value = value
    this._label = ''
    // Class側で指定(固定)
    this._type = ''
    this._color = '#FFFFFF'
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
export class KillsSearchCriteria extends SearchCriteria {
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
export class LossesSearchCriteria extends SearchCriteria {
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
export class GankedSearchCriteria extends SearchCriteria {
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
export class SoloSearchCriteria extends SearchCriteria {
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
export class AllianceSearchCriteria extends SearchCriteria {
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
export class CorporationSearchCriteria extends SearchCriteria {
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
export class CharacterSearchCriteria extends SearchCriteria {
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
export class HighsecSearchCriteria extends SearchCriteria {
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
export class LowsecSearchCriteria extends SearchCriteria {
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
export class NullsecSearchCriteria extends SearchCriteria {
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
export class AbyssalSearchCriteria extends SearchCriteria {
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
export class GroupSearchCriteria extends SearchCriteria {
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
export class ShipSearchCriteria extends SearchCriteria {
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
export class RegionSearchCriteria extends SearchCriteria {
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
export class ConsterationSearchCriteria extends SearchCriteria {
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
export class SystemSearchCriteria extends SearchCriteria {
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
