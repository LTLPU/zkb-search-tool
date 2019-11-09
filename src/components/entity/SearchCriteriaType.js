// 条件のタイプ
export const SearchCriteriaType = {
  TYPE_KILLS: 'TYPE_KILLS',
  TYPE_LOSSES: 'TYPE_LOSSES',
  TYPE_GANKED: 'TYPE_GANKED',
  TYPE_SOLO: 'TYPE_SOLO',
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
export const SearchCriteriaTypeInfo = {}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_KILLS] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'kills',
  conflictKey: 1
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_LOSSES] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'losses',
  conflictKey: 1
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_GANKED] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'ganked',
  conflictKey: 1
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_SOLO] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'solo',
  conflictKey: 2
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_HIGHSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'highsec',
  conflictKey: 3
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_LOWSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'lowsec',
  conflictKey: 3
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_NULLSEC] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'nullsec',
  conflictKey: 3
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_ABYSSAL] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'abyssal',
  conflictKey: 3
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_GROUP] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'group',
  conflictKey: 4
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_SHIP] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'ship',
  conflictKey: 4
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_ALLIANCE] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'alliance',
  conflictKey: 6
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_CORPORATION] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'corporation',
  conflictKey: 7
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_CHARACTER] = {
  isMultiple: true,
  isParameterRequired: true,
  type: 'character',
  conflictKey: 8
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_SYSTEM] = {
  isMultiple: false,
  isParameterRequired: true,
  type: 'system',
  conflictKey: 9
}
SearchCriteriaTypeInfo[SearchCriteriaType.TYPE_REGION] = {
  isMultiple: false,
  isParameterRequired: false,
  type: 'region',
  conflictKey: 10
}
