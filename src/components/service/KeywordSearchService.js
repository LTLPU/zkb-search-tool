import { EntityId } from '../entity/EntityId'
import { KeywordSearchResultItem } from '../entity/KeywordSearchResultItem'

import { EntityTypes } from '../enum/EntityTypes'

import { EntityInfoService } from '../service/EntityInfoService'

import axios from 'axios'

const MAX_SEARCH_RESULT = 5

const GROUPS_PATH = './Groups.json'
const SHIPS_PATH = './Ships.json'

const entityInfoService = new EntityInfoService()

export class KeywordSearchService {
  async search(searchWord = '') {
    const searchResultList = []

    if (searchWord === null || searchWord.length < 3) {
      return searchResultList
    }

    const searchResultIdList = new SearchResultIdList()
    searchResultIdList.append(await getCsvSearchResultEntityIds(searchWord))
    searchResultIdList.append(await getEsiSearchResultEntityIds(searchWord))

    // infoList取得
    const promises = []
    for (const entityId of searchResultIdList) {
      promises.push(entityInfoService.getInfo(entityId))
    }

    const entityInfoList = []
    await Promise.all(promises).then(resultList => {
      resultList.forEach(result => {
        entityInfoList.push(result)
      })
    })

    // searchResultList取得
    entityInfoList.forEach(entityInfo => {
      searchResultList.push(
        new KeywordSearchResultItem(
          entityInfo.type,
          entityInfo.id,
          entityInfo.label,
          entityInfo.img
        )
      )
    })

    return searchResultList
  }

  clear() {
    this._searchResultList.clear()
  }
}

async function getCsvSearchResultEntityIds(searchWord) {
  const searchResultIdList = new SearchResultIdList()

  searchResultIdList.append(
    await searchCsv(GROUPS_PATH, EntityTypes.Group, searchWord)
  )

  searchResultIdList.append(
    await searchCsv(SHIPS_PATH, EntityTypes.Ship, searchWord)
  )

  return searchResultIdList
}

async function getEsiSearchResultEntityIds(searchWord) {
  const searchResultPromises = []

  // 検索値 : alliance,character,constellation,corporation,region,solar_system
  // strict = true
  searchResultPromises.push(
    axios.get(
      `https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=true`
    )
  )
  // strict = false
  searchResultPromises.push(
    axios.get(
      `https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=false`
    )
  )

  const searchResultIdList = new SearchResultIdList()

  // idList取得
  await Promise.all(searchResultPromises).then(resultList => {
    resultList.forEach(result => {
      searchResultIdList.append(getSearchResultIdList(result.data))
    })
  })

  return searchResultIdList
}

function getSearchResultIdList(searchResultData) {
  const searchResultIdList = new SearchResultIdList()

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
          new EntityId(SearchCategoriesMap.get(category), data[i])
        )
      }
    }
  })

  return searchResultIdList
}

function searchCsv(fileName, EntityTypes, searchWord) {
  const regExp = new RegExp(searchWord, 'i')
  return new Promise((resolve, reject) => {
    axios
      .get(fileName)
      .then(response => {
        const searchResultIdList = new SearchResultIdList()
        const resultList = response.data.filter(item => {
          return item.name.match(regExp) !== null
        })
        resultList.forEach(item => {
          if (item.name.match(regExp) !== null) {
            searchResultIdList.push(new EntityId(EntityTypes, item.typeId))
          }
        })
        resolve(searchResultIdList)
      })
      .catch(error => {
        reject(error)
      })
  })
}

class SearchResultIdList {
  constructor() {
    this._idItemList = []
  }

  *[Symbol.iterator]() {
    for (const idItem of this._idItemList) {
      yield idItem
    }
  }

  append(idList) {
    if (!(idList instanceof SearchResultIdList)) {
      throw new Error('idList must be SearchResultIdList')
    }
    for (const newItem of idList) {
      this.push(newItem)
    }
  }

  push(item) {
    if (!(item instanceof EntityId)) {
      throw new Error('item must be EntityId')
    }
    if (!this._isConflict(item)) {
      this._idItemList.push(item)
    }
  }

  _isConflict(newItem) {
    for (const item of this._idItemList) {
      if (item.equals(newItem)) {
        return true
      }
    }
    return false
  }
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
  [SearchCategories.System, EntityTypes.System],
  [SearchCategories.Constellation, EntityTypes.Constellation],
  [SearchCategories.Region, EntityTypes.Region],
  [SearchCategories.Character, EntityTypes.Character],
  [SearchCategories.Corporation, EntityTypes.Corporation],
  [SearchCategories.Alliance, EntityTypes.Alliance]
])
