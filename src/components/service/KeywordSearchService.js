import axios from 'axios'
import { KeywordSearchResultItem } from '../entity/KeywordSearchResultItem.js'

const CHARACTER_MAX = 5
const ALLIANCE_MAX = 3
const CORPORATION_MAX = 3
const SYSTEM_MAX = 3
const CONSTELLATION_MAX = 3
const REGION_MAX = 3

const GROUPS_PATH = './Groups.json'
const SHIPS_PATH = './Ships.json'

export class KeywordSearchService {
  async search (searchWord = '') {
    let searchResultList = []

    if (searchWord !== null && searchWord.length > 2) {
      searchResultList = searchResultList.concat(await getSearchResultItemsFromCsv(searchWord))
      searchResultList = searchResultList.concat(await getSearchResultItems(searchWord))
    }

    return searchResultList
  }

  clear () {
    this._searchResultList.clear()
  }
}

async function getSearchResultItemsFromCsv (searchWord) {
  const searchResultList = []

  const groupsSearchResult = await searchCsv(GROUPS_PATH, searchWord)
  groupsSearchResult.forEach(item => {
    searchResultList.push(
      new KeywordSearchResultItem(
        'group',
        item.typeId,
        `${item.name} (Group)`,
        'groups.png'
      )
    )
  })

  const shipSearchResult = await searchCsv(SHIPS_PATH, searchWord)
  shipSearchResult.forEach(item => {
    searchResultList.push(
      new KeywordSearchResultItem(
        'ship',
        item.typeId,
        `${item.name} (Ship)`,
        'ships.png'
      )
    )
  })
  return searchResultList
}

async function getSearchResultItems (searchWord) {
  const promises = []

  // 検索値 : alliance,character,constellation,corporation,region,solar_system
  const searchResult =
    await axios.get(
      `https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=false`
    )

  if ('solar_system' in searchResult.data) {
    for (let i = 0; i < SYSTEM_MAX && i < searchResult.data.solar_system.length; i++) {
      promises.push(getSystemItem(searchResult.data.solar_system[i]))
    }
  }
  if ('constellation' in searchResult.data) {
    for (let i = 0; i < CONSTELLATION_MAX && i < searchResult.data.constellation.length; i++) {
      promises.push(getConstellationItem(searchResult.data.constellation[i]))
    }
  }
  if ('region' in searchResult.data) {
    for (let i = 0; i < REGION_MAX && i < searchResult.data.region.length; i++) {
      promises.push(getRegionItem(searchResult.data.region[i]))
    }
  }
  if ('character' in searchResult.data) {
    for (let i = 0; i < CHARACTER_MAX && i < searchResult.data.character.length; i++) {
      promises.push(getCharacterItem(searchResult.data.character[i]))
    }
  }
  if ('corporation' in searchResult.data) {
    for (let i = 0; i < CORPORATION_MAX && i < searchResult.data.corporation.length; i++) {
      promises.push(getCorporationItem(searchResult.data.corporation[i]))
    }
  }
  if ('alliance' in searchResult.data) {
    for (let i = 0; i < ALLIANCE_MAX && i < searchResult.data.alliance.length; i++) {
      promises.push(getAllianceItem(searchResult.data.alliance[i]))
    }
  }

  const searchResultList = []

  await Promise.all(promises)
    .then(resultList => {
      resultList.forEach(result => {
        searchResultList.push(result)
      })
    })

  return searchResultList
}

function getCharacterItem (characterId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`
      )
      .then(response => {
        // TODO キャラクター画像アドレス取得
        resolve(
          new KeywordSearchResultItem(
            'character',
            characterId,
            `${response.data.name} (Character)`,
            'character.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `キャラクター検索時エラー CharacterId=${characterId} Error=${error}`
          )
        )
      })
  })
}

function getAllianceItem (allianceId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/alliances/${allianceId}/?datasource=tranquility`
      )
      .then(response => {
        // TODO キャラクター画像アドレス取得
        resolve(
          new KeywordSearchResultItem(
            'alliance',
            allianceId,
            `${response.data.name} (Alliance)`,
            'alliance.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `アライアンス検索時エラー AllianceId=${allianceId}} Error=${error}`
          )
        )
      })
  })
}

function getCorporationItem (corporationId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`
      )
      .then(response => {
        // TODO キャラクタ画像取得
        resolve(
          new KeywordSearchResultItem(
            'corporation',
            corporationId,
            `${response.data.name} (Corporation)`,
            'corporation.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `コーポレーション検索時エラー CorporationId=${corporationId}} Error=${error}`
          )
        )
      })
  })
}

function getSystemItem (systemId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`
      )
      .then(response => {
        // TODO ソーラーシステム画像取得
        resolve(
          new KeywordSearchResultItem(
            'system',
            systemId,
            `${response.data.name} (System)`,
            'system.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `ソーラーシステム検索時エラー SystemId=${systemId}} Error=${error}`
          )
        )
      })
  })
}

function getConstellationItem (constellationId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/universe/constellations/${constellationId}/?datasource=tranquility&language=en-us`
      )
      .then(response => {
        // TODO コンステレーション画像アドレス取得
        resolve(
          new KeywordSearchResultItem(
            'constellation',
            constellationId,
            `${response.data.name} (Constellation)`,
            'constellation.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `コンステレーション検索時エラー ConstellationId=${constellationId}} Error=${error}`
          )
        )
      })
  })
}

function getRegionItem (regionId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`
      )
      .then(response => {
        // TODO リージョン画像アドレス取得
        resolve(
          new KeywordSearchResultItem(
            'region',
            regionId,
            `${response.data.name} (Region)`,
            'region.jpg'
          )
        )
      })
      .catch(error => {
        reject(
          new Error(
            `リージョン検索時エラー RegionId=${regionId}} Error=${error}`
          )
        )
      })
  })
}

function searchCsv (fileName, searchWord) {
  const regExp = new RegExp(searchWord, 'i')
  return new Promise((resolve, reject) => {
    axios
      .get(fileName)
      .then(response => {
        const resultList = response.data.filter(item => {
          return item.name.match(regExp) !== null
        })
        resolve(resultList)
      })
      .catch(error => {
        reject(error)
      })
  })
}