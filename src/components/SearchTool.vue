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
      this.searchResultList.clear()

      const searchResultList = new SearchResultListModel()

      axios
        .get(`https://esi.evetech.net/latest/search/?categories=character&datasource=tranquility&language=en-us&strict=false&search=${searchWord}`)
        .then(response => {
          response.data.character.some(characterId => {
            axios
              .get(`https://esi.evetech.net/latest/characters/${characterId}/?datasource=tranquility`)
              .then(response2 => {
                searchResultList.add(
                  new SearchResultListItem(
                    'character'
                    , characterId
                    , response2.data.name
                    , 'character.jpg'
                  )
                )
              })
              .catch(function (error) {
                // TODO キャラクター名検索エラー処理実装
                console.log(error)
              })
          })
        })
        .catch(function (error) {
          // TODO キャラクター検索エラー処理実装
          console.log(error)
        })

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
