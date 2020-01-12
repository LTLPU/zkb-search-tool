let key = 0

export class ZkbSearchCriteriaItemFactory {
  create (itemType, value, label) {
    switch (itemType) {
      case ZkbSearchCriteriaItemTypes.Kills:
        return new KillsSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Losses:
        return new LossesSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Ganked:
        return new GankedSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Solo:
        return new SoloSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Alliance:
        return new AllianceSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Corporation:
        return new CorporationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Character:
        return new CharacterSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Highsec:
        return new HighsecSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Lowsec:
        return new LowsecSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Nullsec:
        return new NullsecSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Abyssal:
        return new AbyssalSearchCriteriaListItem()
      case ZkbSearchCriteriaItemTypes.Group:
        return new GroupSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Ship:
        return new ShipSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Region:
        return new RegionSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.Consteration:
        return new ConsterationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaItemTypes.System:
        return new SystemSearchCriteriaListItem(value, label)
      default:
        throw new Error(`invalid itemtype = ${itemType}`)
    }
  }
}

export const ZkbSearchCriteriaItemTypes = {
  Kills: 'kills',
  Losses: 'losses',
  Ganked: 'ganked',
  Solo: 'solo',
  Alliance: 'alliance',
  Corporation: 'corporation',
  Character: 'character',
  Highsec: 'highsec',
  Lowsec: 'lowsec',
  Nullsec: 'nullsec',
  Abyssal: 'abyssal',
  Group: 'group',
  Ship: 'ship',
  Region: 'region',
  Consteration: 'consteration',
  System: 'system'
}

export class ZkbSearchCriteriaItem {
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

export class ZkbSearchCriteriaValueItem extends ZkbSearchCriteriaItem {
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
export class KillsSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class LossesSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class GankedSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class SoloSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class AllianceSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class CorporationSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class CharacterSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class HighsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class LowsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class NullsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class AbyssalSearchCriteriaListItem extends ZkbSearchCriteriaItem {
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
export class GroupSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class ShipSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
  /**
   *
   * @param {String} value ItemId
   * @param {String} label ItemName
   */
  constructor (value, label) {
    super(value, label)
    this._type = 'ship'
    this._class = 'ship'
    this._conflictKey = -1
    this._sortOrder = 5
  }
}

/**
 * Region
 */
export class RegionSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class ConsterationSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
export class SystemSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
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
