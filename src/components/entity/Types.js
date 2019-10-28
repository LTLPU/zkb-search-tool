// 条件のタイプ
export const TYPE_KILLLOSS = 'type_killloss'
export const TYPE_KILLTYPE = 'type_killtype'
export const TYPE_SECURITY = 'type_sercurity'
export const TYPE_SHIP = 'type_ship'
export const TYPE_GROUP = 'type_group'
export const TYPE_CHARACTER = 'type_character'
export const TYPE_CORPORATION = 'type_corporation'
export const TYPE_ALLIANCE = 'type_alliance'
export const TYPE_SYSTEM = 'type_system'
export const TYPE_REGION = 'type_region'

// データ構造
export const TYPES = {}
TYPES[TYPE_KILLLOSS] = {
  isMultiple: false,
  isParameterRequired: false
}
TYPES[TYPE_KILLTYPE] = {
  isMultiple: false,
  isParameterRequired: false
}
TYPES[TYPE_SECURITY] = {
  isMultiple: true,
  isParameterRequired: false
}
TYPES[TYPE_SHIP] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_GROUP] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_CHARACTER] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_CORPORATION] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_ALLIANCE] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_SYSTEM] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_REGION] = {
  isMultiple: false,
  isParameterRequired: true
}
