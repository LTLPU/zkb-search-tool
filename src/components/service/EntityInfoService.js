import { EntityId } from '../entity/EntityId'
import { EntityInfo } from '../entity/EntityInfo'
import { EntityType } from '../enum/EntityType'

import axios from 'axios'

const GROUPS_PATH = './Groups.json'
const SHIPS_PATH = './Ships.json'

export class EntityInfoService {
  getInfo(entityId) {
    if (!(entityId instanceof EntityId)) {
      throw new Error('entityId must be EntityId')
    }
    switch (entityId.type) {
      case EntityType.System:
        return this.getSystemInfo(entityId.id)
      case EntityType.Constellation:
        return this.getConstellationInfo(entityId.id)
      case EntityType.Region:
        return this.getRegionInfo(entityId.id)
      case EntityType.Character:
        return this.getCharacterInfo(entityId.id)
      case EntityType.Corporation:
        return this.getCorporationInfo(entityId.id)
      case EntityType.Alliance:
        return this.getAllianceInfo(entityId.id)
      case EntityType.Ship:
        return this.getShipInfo(entityId.id)
      case EntityType.Group:
        return this.getGroupInfo(entityId.id)
      default:
        throw new Error(`Invalid EntityType. (${entityId.type})`)
    }
  }

  getCharacterInfo(characterId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.Character,
              characterId,
              response.data.name,
              `${response.data.name} (Character)`,
              'character.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `キャラクター検索エラー CharacterId=${characterId} Error=${error}`
            )
          )
        })
    })
  }

  getAllianceInfo(allianceId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/alliances/${allianceId}/?datasource=tranquility`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.Alliance,
              allianceId,
              response.data.name,
              `${response.data.name} <${response.data.ticker}> (Alliance)`,
              'alliance.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `アライアンス検索エラー AllianceId=${allianceId} Error=${error}`
            )
          )
        })
    })
  }

  getCorporationInfo(corporationId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.Corporation,
              corporationId,
              response.data.name,
              `${response.data.name} [${response.data.ticker}] (Corporation)`,
              'corporation.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `コーポレーション検索エラー CorporationId=${corporationId} Error=${error}`
            )
          )
        })
    })
  }

  getSystemInfo(systemId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.System,
              systemId,
              response.data.name,
              `${response.data.name} (System)`,
              'system.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `ソーラーシステム検索エラー SystemId=${systemId} Error=${error}`
            )
          )
        })
    })
  }

  getConstellationInfo(constellationId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/universe/constellations/${constellationId}/?datasource=tranquility&language=en-us`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.Constellation,
              constellationId,
              response.data.name,
              `${response.data.name} (Constellation)`,
              'constellation.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `コンステレーション検索エラー ConstellationId=${constellationId} Error=${error}`
            )
          )
        })
    })
  }

  getRegionInfo(regionId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`
        )
        .then(response => {
          resolve(
            new EntityInfo(
              EntityType.Region,
              regionId,
              response.data.name,
              `${response.data.name} (Region)`,
              'region.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(
              `リージョン検索エラー RegionId=${regionId} Error=${error}`
            )
          )
        })
    })
  }

  getShipInfo(shipId) {
    return new Promise((resolve, reject) => {
      axios
        .get(SHIPS_PATH)
        .then(response => {
          const resultList = response.data.filter(item => {
            return item.typeId === shipId
          })
          if (resultList.length !== 1) {
            throw new Error(`検索結果0件 ${shipId}`)
          }
          resolve(
            new EntityInfo(
              EntityType.Group,
              shipId,
              resultList[0].name,
              `${resultList[0].name} (Ship)`,
              'ship.jpg'
            )
          )
        })
        .catch(error => {
          reject(new Error(`Ship検索エラー RegionId=${shipId}} Error=${error}`))
        })
    })
  }

  getGroupInfo(groupId) {
    return new Promise((resolve, reject) => {
      axios
        .get(GROUPS_PATH)
        .then(response => {
          const resultList = response.data.filter(item => {
            return item.typeId === groupId
          })
          if (resultList.length !== 1) {
            throw new Error(`検索結果0件 ${groupId}`)
          }
          resolve(
            new EntityInfo(
              EntityType.Group,
              groupId,
              resultList[0].name,
              `${resultList[0].name} (Group)`,
              'group.jpg'
            )
          )
        })
        .catch(error => {
          reject(
            new Error(`Group検索エラー RegionId=${groupId}}} Error=${error}`)
          )
        })
    })
  }
}
