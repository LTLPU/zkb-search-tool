// 条件のタイプ
export const CriteriaType = {
  // TYPE_KILLLOSS: 'type_killloss',
  TYPE_KILLS: 'TYPE_KILLS',
  TYPE_LOSSES: 'TYPE_LOSSES',
  TYPE_GANKED: 'TYPE_GANKED',
  // TYPE_KILLTYPE: 'type_killtype',
  TYPE_SOLO: 'TYPE_SOLO',
  // TYPE_SECURITY: 'type_sercurity',
  TYPE_HIGHSEC: 'TYPE_HIGHSEC',
  TYPE_LOWSEC: 'TYPE_LOWSEC',
  TYPE_NULLSEC: 'TYPE_NULLSEC',
  TYPE_ABYSSAL: 'TYPE_ABYSSAL',
  TYPE_SHIP: 'TYPE_SHIP',
  TYPE_GROUP: 'TYPE_GROUP',
  TYPE_ALLIANCE: 'TYPE_ALLIANCE',
  TYPE_CORPORATION: 'TYPE_CORPORATION',
  TYPE_CHARACTER: 'TYPE_CHARACTER',
  TYPE_REGION: 'TYPE_REGION',
  TYPE_CONSTERATION: 'TYPE_CONSTERATION',
  TYPE_SYSTEM: 'TYPE_SYSTEM'
}

// 各タイプのパラメータ
export const CriteriaTypeInfo = {}
CriteriaTypeInfo[CriteriaType.TYPE_KILLS] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'kills',
  conflictKey: 1
}
CriteriaTypeInfo[CriteriaType.TYPE_LOSSES] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'losses',
  conflictKey: 1
}
CriteriaTypeInfo[CriteriaType.TYPE_GANKED] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'ganked',
  conflictKey: 1
}
CriteriaTypeInfo[CriteriaType.TYPE_SOLO] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'solo',
  conflictKey: 2
}
CriteriaTypeInfo[CriteriaType.TYPE_HIGHSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'highsec',
  conflictKey: 3
}
CriteriaTypeInfo[CriteriaType.TYPE_LOWSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'lowsec',
  conflictKey: 3
}
CriteriaTypeInfo[CriteriaType.TYPE_NULLSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'nullsec',
  conflictKey: 3
}
CriteriaTypeInfo[CriteriaType.TYPE_ABYSSAL] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'abyssal',
  conflictKey: 3
}
CriteriaTypeInfo[CriteriaType.TYPE_GROUP] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'group',
  conflictKey: 4
}
CriteriaTypeInfo[CriteriaType.TYPE_SHIP] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'ship',
  conflictKey: 4
}
CriteriaTypeInfo[CriteriaType.TYPE_ALLIANCE] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'alliance',
  conflictKey: 6
}
CriteriaTypeInfo[CriteriaType.TYPE_CORPORATION] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'corporation',
  conflictKey: 7
}
CriteriaTypeInfo[CriteriaType.TYPE_CHARACTER] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'character',
  conflictKey: 8
}
CriteriaTypeInfo[CriteriaType.TYPE_SYSTEM] = {
  isMultiple: false,
  isParameterRequired: true,
  type: 'system',
  conflictKey: 9
}
CriteriaTypeInfo[CriteriaType.TYPE_REGION] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'region',
  conflictKey: 10
}
