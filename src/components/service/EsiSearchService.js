import axios from 'axios'

import { EntityId } from '../entity/EntityId'
import { KeywordSearchResultId } from '../entity/KeywordSearchResultId'
import { KeywordSearchResultIdList } from '../entity/KeywordSearchResultIdList'

import { EntityType } from '../enum/EntityType'

const MAX_SEARCH_RESULT = 5

export class EsiSearchService {
  async search(searchWord, isStrict = false) {
    const promise = axios.get(
      `https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=${isStrict.toString()}`
    )

    const searchResultIdList = new KeywordSearchResultIdList()

    await promise.then(result => {
      searchResultIdList.append(getSearchResultIdList(result.data, isStrict))
    })

    return searchResultIdList
  }
}

function getSearchResultIdList(searchResultData, isStrict) {
  const searchResultIdList = new KeywordSearchResultIdList()

  // Resultに追加する順番
  const order = [
    SearchCategories.System,
    SearchCategories.Constellation,
    SearchCategories.Region,
    SearchCategories.Character,
    SearchCategories.Corporation,
    SearchCategories.Alliance
  ]

  order.forEach(category => {
    if (category in searchResultData) {
      const data = searchResultData[category]
      for (let i = 0; i < MAX_SEARCH_RESULT && i < data.length; i++) {
        searchResultIdList.push(
          new KeywordSearchResultId(
            new EntityId(SearchCategoriesMap.get(category), data[i]),
            isStrict
          )
        )
      }
    }
  })

  return searchResultIdList
}

const SearchCategories = {
  System: 'solar_system',
  Constellation: 'constellation',
  Region: 'region',
  Character: 'character',
  Corporation: 'corporation',
  Alliance: 'alliance'
}

const SearchCategoriesMap = new Map([
  [SearchCategories.System, EntityType.System],
  [SearchCategories.Constellation, EntityType.Constellation],
  [SearchCategories.Region, EntityType.Region],
  [SearchCategories.Character, EntityType.Character],
  [SearchCategories.Corporation, EntityType.Corporation],
  [SearchCategories.Alliance, EntityType.Alliance]
])
