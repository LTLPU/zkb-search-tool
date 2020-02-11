import { ZkbSearchCriteriaTypes } from '../enum/ZkbSearchCriteriaTypes'

export class ZkbSearchCriteriaItemFactory {
  create(itemType, value, label) {
    switch (itemType) {
      case ZkbSearchCriteriaTypes.Kills:
        return new KillsSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Losses:
        return new LossesSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Ganked:
        return new GankedSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Solo:
        return new SoloSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Alliance:
        return new AllianceSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Corporation:
        return new CorporationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Character:
        return new CharacterSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Highsec:
        return new HighsecSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Lowsec:
        return new LowsecSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Nullsec:
        return new NullsecSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.WSpace:
        return new WSpaceSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Abyssal:
        return new AbyssalSearchCriteriaListItem()
      case ZkbSearchCriteriaTypes.Group:
        return new GroupSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Ship:
        return new ShipSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Region:
        return new RegionSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.Constellation:
        return new ConstellationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaTypes.System:
        return new SystemSearchCriteriaListItem(value, label)
      default:
        throw new Error(`invalid itemtype = ${itemType}`)
    }
  }
}

export class ZkbSearchCriteriaItem {
  constructor() {
    // 自動で設定
    this._type = ''
    this._class = ''
    this._conflictKey = -1
    this._sortOrder = -1

    // 引数で設定
    this._value = ''
    this._label = ''
  }

  get type() {
    return this._type
  }

  get class() {
    return this._class
  }

  get value() {
    return this._value
  }

  get label() {
    return this._label
  }

  get conflictKey() {
    return this._conflictKey
  }

  get sortOrder() {
    return this._sortOrder
  }

  get urlString() {
    return this._type + '/'
  }
}

export class ZkbSearchCriteriaValueItem extends ZkbSearchCriteriaItem {
  constructor(value, label) {
    super()
    this._value = value
    this._label = label
  }

  get urlString() {
    return this._type + '/' + this._value + '/'
  }
}

/**
 * Kills
 */
export class KillsSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Kills
    this._class = 'mdi-circle-double'
    this._label = 'Kills'
    this._conflictKey = 1
    this._sortOrder = 6
  }
}

/**
 * Losses
 */
export class LossesSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Losses
    this._class = 'mdi-circle-double'
    this._label = 'Losses'
    this._conflictKey = 1
    this._sortOrder = 6
  }
}

/**
 * Ganked
 */
export class GankedSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Ganked
    this._class = 'mdi-circle-double'
    this._label = 'Ganked'
    this._conflictKey = 3
    this._sortOrder = 11
  }
}

/**
 * Solo
 */
export class SoloSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Solo
    this._class = 'mdi-circle-double'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Alliance
    this._class = 'mdi-account-supervisor-circle'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Corporation
    this._class = 'mdi-account-supervisor-circle'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Character
    this._class = 'mdi-account-circle'
    this._conflictKey = -1
    this._sortOrder = 1
  }
}

/**
 * Highsec
 */
export class HighsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Highsec
    this._class = 'mdi-diameter'
    this._label = 'Highsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Lowsec
 */
export class LowsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Lowsec
    this._class = 'mdi-diameter'
    this._label = 'Lowsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Nullsec
 */
export class NullsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Nullsec
    this._class = 'mdi-diameter'
    this._label = 'Nullsec'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * W-Space
 */
export class WSpaceSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.WSpace
    this._class = 'mdi-diameter'
    this._label = 'W-Space'
    this._conflictKey = 2
    this._sortOrder = 7
  }
}

/**
 * Abyssal
 */
export class AbyssalSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaTypes.Abyssal
    this._class = 'mdi-diameter'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Group
    this._class = 'mdi-circle-double'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Ship
    this._class = 'mdi-circle-double'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Region
    this._class = 'mdi-map-marker-circle'
    this._conflictKey = -1
    this._sortOrder = 8
  }
}

/**
 * Constellation
 */
export class ConstellationSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
  /**
   *
   * @param {String} value ConstellationId
   * @param {String} label ConstellationName
   */
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.Constellation
    this._class = 'mdi-map-marker-circle'
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
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaTypes.System
    this._class = 'mdi-map-marker-circle'
    this._conflictKey = -1
    this._sortOrder = 10
  }
}
