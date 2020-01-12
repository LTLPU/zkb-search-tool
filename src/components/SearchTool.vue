<template>
  <div class="searchTool">
    <p class="generatedUrl">
      <a :href="generatedUrl" target="_blank">{{ generatedUrl }}</a>
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
    <input type="button" value="Kills" v-on:click="addKills()" />
    <input type="button" value="Losses" v-on:click="addLosses()" />
    <input type="button" value="Solo" v-on:click="addSolo()" />
    <br />
    <input type="button" value="Highsec" v-on:click="addHighsec()" />
    <input type="button" value="Lowsec" v-on:click="addLowsec()" />
    <input type="button" value="Nullsec" v-on:click="addNullsec()" />
    <input type="button" value="Abyssal" v-on:click="addAbyssal()" />
    <hr />
    <input type="text" v-model="inputText" />
    <br />
    <input type="button" value="Clear" v-on:click="clear()" />
    <hr />
    <ul class="searchResult">
      <li v-for="resultItem in searchResultList" :key="resultItem.key">
        <span v-on:click="addSearchItem(resultItem)">
          {{ resultItem.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import { ZkbSearchCriteriaService } from './service/ZkbSearchCriteriaService.js'
import { ZkbSearchCriteriaList } from './entity/ZkbSearchCriteriaList.js'
import { WordSearchService } from './service/WordSearchService.js'
import { WordSearchResultList } from './entity/WordSearchResultList.js'
import { ZkbSearchCriteriaItemTypes } from './entity/ZkbSearchCriteriaItem.js'

export default {
  name: 'SearchTool',
  props: {
    msg: String
  },
  data: function () {
    return {
      generatedUrl: '',
      criteriaList: {},
      inputText: '',
      searchResultList: {}
    }
  },
  created: function () {
    this.debouncedSearch = _.debounce(this.search, 500)

    this.criteriaList = new ZkbSearchCriteriaList()
    this.searchResultList = new WordSearchResultList()

    this._zkbSearchCriteriaService = new ZkbSearchCriteriaService(
      this.criteriaList
    )

    this._wordSearchService = new WordSearchService(this.searchResultList)

    this.updateUrl()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Kills)
    },
    addLosses: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Losses)
    },
    addSolo: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Solo)
    },
    addHighsec: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Highsec)
    },
    addLowsec: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Lowsec)
    },
    addNullsec: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Nullsec)
    },
    addAbyssal: function () {
      this.addCriteria(ZkbSearchCriteriaItemTypes.Abyssal)
    },
    addSearchItem: function (resultItem) {
      // 検索条件追加
      switch (resultItem.type) {
        case 'character':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.Character,
            resultItem.id,
            resultItem.label
          )
          break
        case 'corporation':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.Corporation,
            resultItem.id,
            resultItem.label
          )
          break
        case 'alliance':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.Alliance,
            resultItem.id,
            resultItem.label
          )
          break
        case 'system':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.System,
            resultItem.id,
            resultItem.label
          )
          break
        case 'group':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.Group,
            resultItem.id,
            resultItem.label
          )
          break
        case 'ship':
          this.addCriteria(
            ZkbSearchCriteriaItemTypes.Ship,
            resultItem.id,
            resultItem.label
          )
          break
        default:
          throw new Error('something wrong')
      }

      // 入力状態クリア
      this.inputText = ''
      this._wordSearchService.clear()
    },
    addCriteria: function (itemType, value, label) {
      this._zkbSearchCriteriaService.addCriteria(itemType, value, label)
      this.updateUrl()
    },
    removeCriteria: function (idx) {
      this._zkbSearchCriteriaService.removeCriteria(idx)
      this.updateUrl()
    },
    clearCriteria: function () {
      this._zkbSearchCriteriaService.removeAllCriteria()
      this.updateUrl()
    },
    clear: function () {
      this._wordSearchService.clear()
    },
    updateUrl: function () {
      this.generatedUrl = this._zkbSearchCriteriaService.getSearchUrl()
    },
    search: function (searchWord) {
      this._wordSearchService.search(searchWord)
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
  font-size: 150%;
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
