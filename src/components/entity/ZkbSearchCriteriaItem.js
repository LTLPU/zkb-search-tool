import { ZkbSearchCriteriaType } from '../enum/ZkbSearchCriteriaType'

export class ZkbSearchCriteriaItemFactory {
  create(itemType, value, label) {
    switch (itemType) {
      case ZkbSearchCriteriaType.Kills:
        return new KillsSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Losses:
        return new LossesSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Solo:
        return new SoloSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Finalblow:
        return new FinalblowSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Highsec:
        return new HighsecSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Lowsec:
        return new LowsecSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Nullsec:
        return new NullsecSearchCriteriaListItem()
      case ZkbSearchCriteriaType.WSpace:
        return new WSpaceSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Abyssal:
        return new AbyssalSearchCriteriaListItem()
      case ZkbSearchCriteriaType.Character:
        return new CharacterSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Corporation:
        return new CorporationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Alliance:
        return new AllianceSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Ship:
        return new ShipSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Group:
        return new GroupSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.System:
        return new SystemSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Constellation:
        return new ConstellationSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.Region:
        return new RegionSearchCriteriaListItem(value, label)
      case ZkbSearchCriteriaType.IskValue:
        return new IskValueSearchCriteriaListItem(value, label)
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
    this._color = ''
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

  get color() {
    console.log(this._color)
    return this._color
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
    this._type = ZkbSearchCriteriaType.Kills
    this._class = 'mdi-chevron-up-circle'
    this._label = 'Kills'
    this._color = 'kills'
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
    this._type = ZkbSearchCriteriaType.Losses
    this._class = 'mdi-chevron-down-circle'
    this._label = 'Losses'
    this._color = 'losses'
    this._conflictKey = 1
    this._sortOrder = 6
  }
}

/**
 * Solo
 */
export class SoloSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaType.Solo
    this._class = 'mdi-circle-double'
    this._label = 'Solo'
    this._color = 'solo'
    this._conflictKey = 4
    this._sortOrder = 11
  }
}

/**
 * Finalblow
 */
export class FinalblowSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaType.Finalblow
    this._class = 'mdi-alert-circle'
    this._label = 'Finalblow'
    this._color = 'finalblow'
    this._conflictKey = 5
    this._sortOrder = 12
  }
}

/**
 * Highsec
 */
export class HighsecSearchCriteriaListItem extends ZkbSearchCriteriaItem {
  constructor() {
    super()
    this._type = ZkbSearchCriteriaType.Highsec
    this._class = 'mdi-diameter'
    this._label = 'Highsec'
    this._color = 'highsec'
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
    this._type = ZkbSearchCriteriaType.Lowsec
    this._class = 'mdi-diameter'
    this._label = 'Lowsec'
    this._color = 'lowsec'
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
    this._type = ZkbSearchCriteriaType.Nullsec
    this._class = 'mdi-diameter'
    this._label = 'Nullsec'
    this._color = 'nullsec'
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
    this._type = ZkbSearchCriteriaType.WSpace
    this._class = 'mdi-diameter'
    this._label = 'W-Space'
    this._color = 'wspace'
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
    this._type = ZkbSearchCriteriaType.Abyssal
    this._class = 'mdi-diameter'
    this._label = 'Abyssal'
    this._color = 'abyssal'
    this._conflictKey = 2
    this._sortOrder = 7
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
    this._type = ZkbSearchCriteriaType.Ship
    this._class = 'mdi-circle-double'
    this._color = 'ship'
    this._conflictKey = -1
    this._sortOrder = 5
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
    this._type = ZkbSearchCriteriaType.Group
    this._class = 'mdi-circle-double'
    this._color = 'group'
    this._conflictKey = -1
    this._sortOrder = 4
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
    this._type = ZkbSearchCriteriaType.Character
    this._class = 'mdi-account-circle'
    this._color = 'character'
    this._conflictKey = -1
    this._sortOrder = 1
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
    this._type = ZkbSearchCriteriaType.Corporation
    this._class = 'mdi-account-supervisor-circle'
    this._color = 'corporation'
    this._conflictKey = -1
    this._sortOrder = 3
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
    this._type = ZkbSearchCriteriaType.Alliance
    this._class = 'mdi-account-supervisor-circle'
    this._color = 'alliance'
    this._conflictKey = -1
    this._sortOrder = 2
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
    this._type = ZkbSearchCriteriaType.System
    this._class = 'mdi-map-marker-circle'
    this._color = 'system'
    this._conflictKey = -1
    this._sortOrder = 10
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
    this._type = ZkbSearchCriteriaType.Constellation
    this._class = 'mdi-map-marker-circle'
    this._color = 'constellation'
    this._conflictKey = -1
    this._sortOrder = 9
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
    this._type = ZkbSearchCriteriaType.Region
    this._class = 'mdi-map-marker-circle'
    this._color = 'region'
    this._conflictKey = -1
    this._sortOrder = 8
  }
}

/**
 * IskValue
 */
export class IskValueSearchCriteriaListItem extends ZkbSearchCriteriaValueItem {
  /**
   *
   * @param {String} value IskValue
   * @param {String} label IskValueLabel
   */
  constructor(value, label) {
    super(value, label)
    this._type = ZkbSearchCriteriaType.IskValue
    this._class = 'mdi-currency-usd'
    this._color = 'iskvalue'
    this._conflictKey = 6
    this._sortOrder = 13
  }
}
