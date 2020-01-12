import axios from 'axios'
import { WordSearchResultItem } from '../entity/WordSearchResultItem.js'

export class WordSearchService {
  constructor (searchResultList) {
    this._searchResultList = searchResultList
  }

  async search (searchWord) {
    this._searchResultList.clear()
    await getSearchResultItems(this._searchResultList, searchWord)
  }

  clear () {
    this._searchResultList.clear()
  }
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
        response.data.character.forEach(characterId => {
          promises.push(getCharacterItem(characterId))
        })
      }
      if ('alliance' in response.data) {
        response.data.alliance.forEach(allianceId => {
          promises.push(getAllianceItem(allianceId))
        })
      }
      if ('corporation' in response.data) {
        response.data.corporation.forEach(corporationId => {
          promises.push(getCorporationItem(corporationId))
        })
      }
      if ('solar_system' in response.data) {
        response.data.solar_system.forEach(systemId => {
          promises.push(getSystemItem(systemId))
        })
      }
      if ('constellation' in response.data) {
        response.data.constellation.forEach(constellationId => {
          promises.push(getConstellationItem(constellationId))
        })
      }
      if ('region' in response.data) {
        response.data.region.forEach(regionId => {
          promises.push(getRegionItem(regionId))
        })
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
        return new WordSearchResultItem(
          'corporation',
          corporationId,
          `${response.data.name} (Corporation)`,
          'corporation.jpg'
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
        return new WordSearchResultItem(
          'system',
          systemId,
          `${response.data.name} (System)`,
          'system.jpg'
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
        return new WordSearchResultItem(
          'constellation',
          constellationId,
          `${response.data.name} (COnstellation)`,
          'constellation.jpg'
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
        return new WordSearchResultItem(
          'region',
          regionId,
          `${response.data.name} (Region)`,
          'region.jpg'
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
