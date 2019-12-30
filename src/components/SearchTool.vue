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
  ShipSearchCriteriaListItem } from './entity/SearchCriteriaListItem.js'
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
      const searchResultList = searchEntity(searchWord)

      this.searchResultList = searchResultList
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

function searchEntity (searchWord) {
  const searchResultList = new SearchResultListModel()

  // 検索値 : alliance,character,constellation,corporation,region,solar_system
  axios
    .get(`https://esi.evetech.net/latest/search/?categories=alliance,character,constellation,corporation,region,solar_system&datasource=tranquility&language=en-us&search=${searchWord}&strict=false`)
    .then(response => {
      if ('character' in response.data) {
        searchResultList.appendList(searchCharacter(response.data.character))
      }
      if ('alliance' in response.data) {
        searchResultList.appendList(searchAlliance(response.data.alliance))
      }
      if ('corpoartion' in response.data) {
        searchResultList.appendList(searchCorporation(response.data.corpoartion))
      }
      if ('solar_system' in response.data) {
        searchResultList.appendList(searchSystem(response.data.solar_system))
      }
      if ('constellation' in response.data) {
        searchResultList.appendList(searchConstellation(response.data.constellation))
      }
      if ('region' in response.data) {
        searchResultList.appendList(searchRegion(response.data.region))
      }
      return searchResultList
    })
    .catch(error => {
      // TODO 検索エラー処理実装
      console.log(`検索時エラー Key=${searchWord} Error=${error}`)
    })
}

function searchCharacter (characterIds) {
  const searchResultList = new SearchResultListModel()

  characterIds.some(characterId => {
    axios
      .get(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`)
      .then(response => {
        // TODO キャラクター画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'character'
            , characterId
            , `${response.data.name} (Character)`
            , 'character.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO キャラクター名検索エラー処理実装
        console.log(`キャラクター検索時エラー CharacterId=${characterId}} Error=${error}`)
      })
  })
}

function searchAlliance (allianceIds) {
  const searchResultList = new SearchResultListModel()

  allianceIds.some(allianceId => {
    axios
      .get(`https://esi.evetech.net/latest/alliances/${allianceId}/?datasource=tranquility`)
      .then(response => {
        // TODO アライアンス画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'alliance'
            , allianceId
            , `${response.data.name} (Alliance)`
            , 'alliance.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO アライアンス名検索エラー処理実装
        console.log(`アライアンス検索時エラー AllianceId=${allianceId}} Error=${error}`)
      })
  })
}

function searchCorporation (corporationIds) {
  const searchResultList = new SearchResultListModel()

  corporationIds.some(corporationId => {
    axios
      .get(`https://esi.evetech.net/latest/corporations/${corporationId}/?datasource=tranquility`)
      .then(response => {
        // TODO コーポレーション画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'corporation'
            , corporationId
            , `${response.data.name} (Corporation)`
            , 'corporation.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO コーポレーション名検索エラー処理実装
        console.log(`コーポレーション検索時エラー CorporationId=${corporationId}} Error=${error}`)
      })
  })
}

function searchSystem (systemIds) {
  const searchResultList = new SearchResultListModel()

  systemIds.some(systemId => {
    axios
      .get(`https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO ソーラーシステム画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'system'
            , systemId
            , `${response.data.name} (System)`
            , 'system.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO ソーラーシステム名検索エラー処理実装
        console.log(`ソーラーシステム検索時エラー SystemId=${systemId}} Error=${error}`)
      })
  })
}

function searchConstellation (constellationIds) {
  const searchResultList = new SearchResultListModel()

  constellationIds.some(constellationId => {
    axios
      .get(`https://esi.evetech.net/latest/universe/constellations/${constellationId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO コンステレーション画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'constellation'
            , constellationId
            , `${response.data.name} (COnstellation)`
            , 'constellation.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO コンステレーション名検索エラー処理実装
        console.log(`コンステレーション検索時エラー ConstellationId=${constellationId}} Error=${error}`)
      })
  })
}

function searchRegion (regionIds) {
  const searchResultList = new SearchResultListModel()

  regionIds.some(regionId => {
    axios
      .get(`https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility&language=en-us`)
      .then(response => {
        // TODO リージョン画像アドレス取得
        searchResultList.add(
          new SearchResultListItem(
            'region'
            , regionId
            , `${response.data.name} (Region)`
            , 'region.jpg'
          )
        )
        return searchResultList
      })
      .catch(error => {
        // TODO リージョン名検索エラー処理実装
        console.log(`リージョン検索時エラー RegionId=${regionId}} Error=${error}`)
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
