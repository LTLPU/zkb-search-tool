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
              `https://images.evetech.net/characters/${characterId}/portrait?size=64`
            )
          )
        })
        .catch(error => {
          reject(new Error(`CharacterId=${characterId} / ${error}`))
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
              `https://images.evetech.net/alliances/${allianceId}/logo?size=64`
            )
          )
        })
        .catch(error => {
          reject(new Error(`AllianceId=${allianceId} / ${error}`))
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
              `https://images.evetech.net/corporations/${corporationId}/logo?size=64`
            )
          )
        })
        .catch(error => {
          reject(new Error(`CorporationId=${corporationId} / ${error}`))
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
              './img/systems.png'
            )
          )
        })
        .catch(error => {
          reject(new Error(`SystemId=${systemId} / ${error}`))
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
              './img/systems.png'
            )
          )
        })
        .catch(error => {
          reject(new Error(`ConstellationId=${constellationId} / ${error}`))
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
              './img/systems.png'
            )
          )
        })
        .catch(error => {
          reject(new Error(`RegionId=${regionId} / ${error}`))
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
              EntityType.Ship,
              shipId,
              resultList[0].name,
              `${resultList[0].name} (Ship)`,
              `https://images.evetech.net/types/${shipId}/icon?size=64`
            )
          )
        })
        .catch(error => {
          reject(new Error(`ShipId=${shipId}} / ${error}`))
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
              './img/ship.png'
            )
          )
        })
        .catch(error => {
          reject(new Error(`GroupId=${groupId} / ${error}`))
        })
    })
  }
}
