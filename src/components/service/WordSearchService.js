import axios from 'axios'
import { WordSearchResultItem } from '../entity/WordSearchResultItem.js'

const CHARACTER_MAX = 20
const ALLIANCE_MAX = 10
const CORPORATION_MAX = 10
const SYSTEM_MAX = 5
const CONSTELLATION_MAX = 5
const REGION_MAX = 5

const GROUPS_PATH = './Groups.json'
const SHIPS_PATH = './Ships.json'

export class WordSearchService {
  constructor (searchResultList) {
    this._searchResultList = searchResultList
  }

  async search (searchWord) {
    this._searchResultList.clear()
    if (searchWord.length > 2) {
      await getSearchResultItems(this._searchResultList, searchWord)
      await getSearchResultItemsFromCsv(this._searchResultList, searchWord)
    }
  }

  clear () {
    this._searchResultList.clear()
  }
}

async function getSearchResultItemsFromCsv (searchResultList, searchWord) {
  searchCsv(GROUPS_PATH, searchWord)
    .then(response => {
      response.forEach(item => {
        searchResultList.add(
          new WordSearchResultItem(
            'group',
            item.typeId,
            `${item.name} (Group)`,
            'groups.png'
          )
        )
      })
    })
  searchCsv(SHIPS_PATH, searchWord).then(response => {
    response.forEach(item => {
      searchResultList.add(
        new WordSearchResultItem(
          'ship',
          item.typeId,
          `${item.name} (Ship)`,
          'ships.png'
        )
      )
    })
  })
}

async function getSearchResultItems (searchResultList, searchWord) {
  // 検索値 : alliance,character,constellation,corporation,region,solar_system
  axios
    .get(
      `https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=false`
    )
    .then(response => {
      const promises = []

      if ('character' in response.data) {
        for (
          let i = 0;
          i < CHARACTER_MAX && i < response.data.character.length;
          i++
        ) {
          promises.push(getCharacterItem(response.data.character[i]))
        }
      }
      if ('alliance' in response.data) {
        for (
          let i = 0;
          i < ALLIANCE_MAX && i < response.data.alliance.length;
          i++
        ) {
          promises.push(getAllianceItem(response.data.alliance[i]))
        }
      }
      if ('corporation' in response.data) {
        for (
          let i = 0;
          i < CORPORATION_MAX && i < response.data.corporation.length;
          i++
        ) {
          promises.push(getCorporationItem(response.data.corporation[i]))
        }
      }
      if ('solar_system' in response.data) {
        for (
          let i = 0;
          i < SYSTEM_MAX && i < response.data.solar_system.length;
          i++
        ) {
          promises.push(getSystemItem(response.data.solar_system[i]))
        }
      }
      if ('constellation' in response.data) {
        for (
          let i = 0;
          i < CONSTELLATION_MAX && i < response.data.constellation.length;
          i++
        ) {
          promises.push(getConstellationItem(response.data.constellation[i]))
        }
      }
      if ('region' in response.data) {
        for (
          let i = 0;
          i < REGION_MAX && i < response.data.region.length;
          i++
        ) {
          promises.push(getRegionItem(response.data.region[i]))
        }
      }

      Promise.all(promises).then(responses => {
        responses.forEach(response => {
          searchResultList.add(response)
        })

        Promise.resolve(searchResultList)
      })
    })
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
          new WordSearchResultItem(
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
          new WordSearchResultItem(
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
          new WordSearchResultItem(
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
          new WordSearchResultItem(
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
          new WordSearchResultItem(
            'constellation',
            constellationId,
            `${response.data.name} (COnstellation)`,
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
          new WordSearchResultItem(
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
