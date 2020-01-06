<template>
  <div class="searchTool">
    <h1>zkb-search-tool</h1>
    <hr />
    <p class="generatedUrl">
      <a
        :href="generatedUrl"
        target="_blank"
      >{{ generatedUrl }}</a>
    </p>
    <ul class="searchCriteria">
      <li
        v-for="criteriaItem in criteriaList"
        :key="criteriaItem.key"
        class="searchCriteria"
        v-on:click="removeCriteria(criteriaItem.key)"
      >
        <span>◆</span> {{ criteriaItem.label }}
      </li>
    </ul>
    <hr />
    <input
      type="button"
      value="Kills"
      v-on:click="addKills()"
    />
    <input
      type="button"
      value="Losses"
      v-on:click="addLosses()"
    />
    <input
      type="button"
      value="Solo"
      v-on:click="addSolo()"
    />
    <br>
    <input
      type="button"
      value="Highsec"
      v-on:click="addHighsec()"
    />
    <input
      type="button"
      value="Lowsec"
      v-on:click="addLowsec()"
    />
    <input
      type="button"
      value="Nullsec"
      v-on:click="addNullsec()"
    />
    <input
      type="button"
      value="Abyssal"
      v-on:click="addAbyssal()"
    />
    <hr>
    <input
      type="text"
      v-model="inputText"
    />
    <br>
    <input
      type="button"
      value="Clear"
      v-on:click="clear()"
    />
    <hr>
    <ul class="searchResult">
      <li
        v-for="resultItem in searchResultList"
        :key="resultItem.key"
      >
        <span
          v-on:click="addSearchItem(resultItem)"
        >
          {{ resultItem.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

import { KillsSearchCriteriaListItem,
  LossesSearchCriteriaListItem,
  CharacterSearchCriteriaListItem,
  AllianceSearchCriteriaListItem,
  CorporationSearchCriteriaListItem,
  SoloSearchCriteriaListItem,
  HighsecSearchCriteriaListItem,
  LowsecSearchCriteriaListItem,
  NullsecSearchCriteriaListItem,
  AbyssalSearchCriteriaListItem,
  GroupSearchCriteriaListItem,
  ShipSearchCriteriaListItem,
  SystemSearchCriteriaListItem } from './entity/SearchCriteriaListItem.js'
import { SearchCriteriaListModel } from './entity/SearchCriteriaListModel.js'
import { SearchResultListItem } from './entity/SearchResultListItem.js'
import { SearchResultListModel } from './entity/SearchResultListModel.js'

export default {
  name: 'SearchTool',
  props: {
    msg: String
  },
  data: function () {
    return {
      generatedUrl: '',
      criteriaList: {},
      searchResultList: {},
      inputText: ''
    }
  },
  created: function () {
    this.debouncedSearch = _.debounce(this.search, 500)

    this.criteriaList = new SearchCriteriaListModel()
    this.searchResultList = new SearchResultListModel()

    this.updateUrl()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(new KillsSearchCriteriaListItem())
    },
    addLosses: function () {
      this.addCriteria(new LossesSearchCriteriaListItem())
    },
    addSolo: function () {
      this.addCriteria(new SoloSearchCriteriaListItem())
    },
    addHighsec: function () {
      this.addCriteria(new HighsecSearchCriteriaListItem())
    },
    addLowsec: function () {
      this.addCriteria(new LowsecSearchCriteriaListItem())
    },
    addNullsec: function () {
      this.addCriteria(new NullsecSearchCriteriaListItem())
    },
    addAbyssal: function () {
      this.addCriteria(new AbyssalSearchCriteriaListItem())
    },
    addSearchItem: function (resultItem) {
      switch (resultItem.type) {
        case 'character':
          this.addCriteria(
            new CharacterSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        case 'corporation':
          this.addCriteria(
            new CorporationSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        case 'alliance':
          this.addCriteria(
            new AllianceSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        case 'system':
          this.addCriteria(
            new SystemSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        case 'group':
          this.addCriteria(
            new GroupSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        case 'ship':
          this.addCriteria(
            new ShipSearchCriteriaListItem(
              resultItem.id, resultItem.label
            ))
          break
        default:
          throw new Error('something wrong')
      }

      this.searchResultList.clear()
      this.inputText = ''
    },
    addCriteria: function (criteria) {
      this.criteriaList.add(criteria)
      this.updateUrl()
    },
    removeCriteria: function (idx) {
      this.criteriaList.remove(idx)
      this.updateUrl()
    },
    clearCriteria: function () {
      this.criteriaList.clear()
      this.inputText = ''
      this.updateUrl()
    },
    /**
     * generatedUrlを更新する。
     */
    updateUrl: function () {
      this.generatedUrl = this.criteriaList.getSearchUrl()
    },
    search: function (searchWord) {
      getSearchResultItems(searchWord)
        .then(response => {
          this.searchResultList = response
        })
        .catch(error => {
          alert(error)
        })
    }
  },
  watch: {
    inputText: {
      handler (n, o) {
        this.debouncedSearch(n)
      },
      deep: true
    }
  }
}

function getSearchResultItems (searchWord) {
  const searchResultList = new SearchResultListModel()

  // 検索値 : alliance,character,constellation,corporation,region,solar_system
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=false`)
      .then(response => {
        const promises = []
        if ('character' in response.data) {
          promises.push(getEntityItems(response.data.character, getCharacterItem))
        }
        if ('alliance' in response.data) {
          promises.push(getEntityItems(response.data.alliance, getAllianceItem))
        }
        if ('corporation' in response.data) {
          promises.push(getEntityItems(response.data.corporation, getCorporationItem))
        }
        if ('solar_system' in response.data) {
          promises.push(getEntityItems(response.data.solar_system, getSystemItem))
        }
        if ('constellation' in response.data) {
          promises.push(getEntityItems(response.data.constellation, getConstellationItem))
        }
        if ('region' in response.data) {
          promises.push(getEntityItems(response.data.region, getRegionItem))
        }
        return Promise.all(promises)
      })
      .then(responses => {
        for (const response of responses) {
          searchResultList.appendList(response)
        }
        resolve(searchResultList)
      })
      .catch(error => {
        // TODO 検索エラー処理実装
        reject(error)
      })
  })
}

function getEntityItems (ids, searchFunc) {
  const searchResultList = new SearchResultListModel()

  return new Promise((resolve, reject) => {
    Promise.all(
      ids.map(id => {
        return searchFunc(id)
      })
    ).then(responses => {
      responses.map(response => {
        searchResultList.add(response)
      })
      resolve(searchResultList)
    })
      .catch(error => {
        reject(error)
      })
  })
}

function getCharacterItem (characterId) {
  return new Promise((resolve, reject) => {
    axios.get(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`)
      .then(response => {
        // TODO キャラクター画像アドレス取得
        resolve(
          new SearchResultListItem(
            'character'
            , characterId
            , `${response.data.name} (Character)`
            , 'character.jpg'
          )
        )
      })
      .catch(error => {
        reject(new Error(`キャラクター検索時エラー CharacterId=${characterId} Error=${error}`))
      })
  })
}

function getAllianceItem (allianceId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/alliances/${allianceId}/?datasource=tranquility`)
      .then(response => {
        // TODO アライアンス画像アドレス取得
        resolve(
          new SearchResultListItem(
            'alliance'
            , allianceId
            , `${response.data.name} (Alliance)`
            , 'alliance.jpg'
          )
        )
      })
      .catch(error => {
        // TODO アライアンス名検索エラー処理実装
        alert(`アライアンス検索時エラー AllianceId=${allianceId}} Error=${error}`)
      })
  })
}

function getCorporationItem (corporationId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`)
      .then(response => {
        // TODO コーポレーション画像アドレス取得
        resolve(
          new SearchResultListItem(
            'corporation'
            , corporationId
            , `${response.data.name} (Corporation)`
            , 'corporation.jpg'
          )
        )
      })
      .catch(error => {
        // TODO コーポレーション名検索エラー処理実装
        alert(`コーポレーション検索時エラー CorporationId=${corporationId}} Error=${error}`)
      })
  })
}

function getSystemItem (systemId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO ソーラーシステム画像アドレス取得
        resolve(
          new SearchResultListItem(
            'system'
            , systemId
            , `${response.data.name} (System)`
            , 'system.jpg'
          )
        )
      })
      .catch(error => {
      // TODO ソーラーシステム名検索エラー処理実装
        alert(`ソーラーシステム検索時エラー SystemId=${systemId}} Error=${error}`)
      })
  })
}

function getConstellationItem (constellationId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/universe/constellations/${constellationId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO コンステレーション画像アドレス取得
        resolve(
          new SearchResultListItem(
            'constellation'
            , constellationId
            , `${response.data.name} (COnstellation)`
            , 'constellation.jpg'
          )
        )
      })
      .catch(error => {
        // TODO コンステレーション名検索エラー処理実装
        alert(`コンステレーション検索時エラー ConstellationId=${constellationId}} Error=${error}`)
      })
  })
}

function getRegionItem (regionId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO リージョン画像アドレス取得
        resolve(
          new SearchResultListItem(
            'region'
            , regionId
            , `${response.data.name} (Region)`
            , 'region.jpg'
          )
        )
      })
      .catch(error => {
        // TODO リージョン名検索エラー処理実装
        alert(`リージョン検索時エラー RegionId=${regionId}} Error=${error}`)
      })
  })
}

</script>
<style>
p.generatedUrl {
  font-size: 150%
}

ul.searchCriteria {
  list-style-type: none;
  padding: 0;
}

li.searchCriteria {
  display: inline;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
}
</style>
