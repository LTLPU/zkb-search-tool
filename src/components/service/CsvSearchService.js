import axios from 'axios'

import { EntityId } from '../entity/EntityId'
import { KeywordSearchResultId } from '../entity/KeywordSearchResultId'
import { KeywordSearchResultIdList } from '../entity/KeywordSearchResultIdList'

import { EntityType } from '../enum/EntityType'

const GROUPS_PATH = './Groups.json'
const SHIPS_PATH = './Ships.json'

export class CsvSearchService {
  async search(searchWord, isStrict = false) {
    const searchResultPromises = []

    searchResultPromises.push(
      searchCsv(GROUPS_PATH, EntityType.Group, searchWord, isStrict)
    )
    searchResultPromises.push(
      searchCsv(SHIPS_PATH, EntityType.Ship, searchWord, isStrict)
    )

    const searchResultIdList = new KeywordSearchResultIdList()

    // idList取得
    await Promise.all(searchResultPromises).then(resultList => {
      resultList.forEach(result => {
        searchResultIdList.append(result)
      })
    })

    return searchResultIdList
  }
}

function searchCsv(fileName, entityType, searchWord, isStrict) {
  return new Promise((resolve, reject) => {
    axios
      .get(fileName)
      .then(response => {
        const searchResultIdList = new KeywordSearchResultIdList()

        const resultList = filter(response.data, searchWord, isStrict)

        resultList.forEach(item => {
          searchResultIdList.push(
            new KeywordSearchResultId(
              new EntityId(entityType, item.typeId),
              isStrict
            )
          )
        })
        resolve(searchResultIdList)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function filter(data, searchWord, isStrict) {
  if (isStrict) {
    return data.filter(item => {
      return item.name.toUpperCase() === searchWord.toUpperCase()
    })
  } else {
    const regExp = new RegExp(searchWord, 'i')
    return data.filter(item => {
      return item.name.match(regExp) !== null
    })
  }
}
