import { KeywordSearchResultIdList } from '../entity/KeywordSearchResultIdList'

import { CsvSearchService } from '../service/CsvSearchService'
import { EsiSearchService } from '../service/EsiSearchService'

const csvSearchService = new CsvSearchService()
const esiSearchService = new EsiSearchService()

export class KeywordSearchService {
  async search(searchWord = '') {
    const searchPromises = []

    searchPromises.push(csvSearchService.search(searchWord, true))
    searchPromises.push(esiSearchService.search(searchWord, true))
    searchPromises.push(csvSearchService.search(searchWord, false))
    searchPromises.push(esiSearchService.search(searchWord, false))

    const searchResultIdList = new KeywordSearchResultIdList()

    await Promise.all(searchPromises).then(resultList => {
      resultList.forEach(result => {
        searchResultIdList.append(result)
      })
    })

    return searchResultIdList
  }
}
