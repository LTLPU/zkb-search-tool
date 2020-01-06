let key = 0

export class SearchCriteriaListItem {
  constructor () {
    // 自動で設定
    this._key = key++
    this._type = ''
    this._class = ''
    this._conflictKey = -1
    this._sortOrder = -1

    // 引数で設定
    this._value = ''
    this._label = ''
  }

  get key () {
    return this._key
  }

  get type () {
    return this._type
  }

  get class () {
    return this._class
  }

  get value () {
    return this._value
  }

  get label () {
    return this._label
  }

  get conflictKey () {
    return this._conflictKey
  }

  get sortOrder () {
    return this._sortOrder
  }

  get urlString () {
    return this._type + '/'
  }
}

export class SearchCriteriaValueListItem extends SearchCriteriaListItem {
  constructor (value, label) {
    super()
    this._value = value
    this._label = label
  }

  get urlString () {
    return this._type + '/' + this._value + '/'
  }
}

/**
 * Kills
 */
export class KillsSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'kills'
    this._class = 'kills'
    this._label = 'Kills'
    this._conflictKey = 1
    this._sortOrder = 6
  }
}

/**
 * Losses
 */
export class LossesSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'losses'
    this._class = 'losses'
    this._label = 'Losses'
    this._conflictKey = 1
    this._sortOrder = 6
  }
}

/**
 * Ganked
 */
export class GankedSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'ganked'
    this._class = 'ganked'
    this._label = 'Ganked'
    this._conflictKey = 3
    this._sortOrder = 11
  }
}

/**
 * Solo
 */
export class SoloSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'solo'
    this._class = 'solo'
    this._label = 'Solo'
    this._conflictKey = 4
    this._sortOrder = 11
  }
}

/**
 * Alliance
 */
export class AllianceSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value AllianceId
   * @param {String} label AllianceName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'alliance'
    this._class = 'alliance'
    this._conflictKey = -1
    this._sortOrder = 2
  }
}

/**
 * Corporation
 */
export class CorporationSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value CorporationId
   * @param {String} label CorporationName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'corporation'
    this._class = 'corporation'
    this._conflictKey = -1
    this._sortOrder = 3
  }
}

/**
 * Character
 */
export class CharacterSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value CharacterId
   * @param {String} label CharacterName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'character'
    this._class = 'character'
    this._conflictKey = -1
    this._sortOrder = 1
  }
}

/**
 * Highsec
 */
export class HighsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'highsec'
    this._class = 'highsec'
    this._label = 'Highsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Lowsec
 */
export class LowsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'lowsec'
    this._class = 'lowsec'
    this._label = 'Lowsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Nullsec
 */
export class NullsecSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'nullsec'
    this._class = 'nullsec'
    this._label = 'Nullsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Abyssal
 */
export class AbyssalSearchCriteriaListItem extends SearchCriteriaListItem {
  constructor () {
    super()
    this._type = 'abyssal'
    this._class = 'abyssal'
    this._label = 'Abyssal'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Group
 */
export class GroupSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value GroupId
   * @param {String} label GroupName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'group'
    this._class = 'group'
    this._conflictKey = -1
    this._sortOrder = 4
  }
}

/**
 * Ship
 */
export class ShipSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value ItemId
   * @param {String} label ItemName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'item'
    this._class = 'item'
    this._conflictKey = -1
    this._sortOrder = 5
  }
}

/**
 * Region
 */
export class RegionSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value RegionId
   * @param {String} label RegionName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'region'
    this._class = 'region'
    this._conflictKey = -1
    this._sortOrder = 8
  }
}

/**
 * Consteration
 */
export class ConsterationSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value ConsterationId
   * @param {String} label ConsterationName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'consteration'
    this._class = 'consteration'
    this._conflictKey = -1
    this._sortOrder = 9
  }
}

/**
 * System
 */
export class SystemSearchCriteriaListItem extends SearchCriteriaValueListItem {
  /**
   *
   * @param {String} value SystemId
   * @param {String} label SystemName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'system'
    this._class = 'system'
    this._conflictKey = -1
    this._sortOrder = 10
  }
}
