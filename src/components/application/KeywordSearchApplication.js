import { EntityInfoService } from '../service/EntityInfoService'
import { KeywordSearchService } from '../service/KeywordSearchService'
import { KeywordSearchResultItem } from '../entity/KeywordSearchResultItem'

const entityInfoService = new EntityInfoService()
const keywordSearchService = new KeywordSearchService()

export class KeywordSearchApplication {
  async search(searchWord = '') {
    const searchResultList = []

    if (searchWord === null || searchWord.length < 3) {
      return searchResultList
    }

    // id取得
    const searchResultIdList = await keywordSearchService.search(searchWord)

    // infoList取得
    const promises = []
    for (const searchResultId of searchResultIdList) {
      promises.push(entityInfoService.getInfo(searchResultId.entityId))
    }

    const entityInfoList = []
    await Promise.all(promises).then(resultList => {
      resultList.forEach(result => {
        entityInfoList.push(result)
      })
    })

    // searchResultList取得
    entityInfoList.forEach((entityInfo, i) => {
      searchResultList.push(
        new KeywordSearchResultItem(
          entityInfo.type,
          entityInfo.id,
          entityInfo.label,
          entityInfo.img,
          searchResultIdList.list[i].isStrict
        )
      )
    })

    return searchResultList
  }
}
