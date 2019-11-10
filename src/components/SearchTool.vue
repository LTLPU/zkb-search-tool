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
    <ul>
      <li
        v-for="criteria in criteriaList"
        :key="criteria.idx"
        class="searchCriteria"
      >
        <span :style="{ color: criteria.obj.color }">◆</span> {{ criteria.obj.label }} <input type="button" value="×" v-on:click="remove(criteria.idx)">
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
    <input
      type="button"
      value="Alliance"
      v-on:click="addAlliance()"
    />
    <input
      type="button"
      value="Corporation"
      v-on:click="addCorporation()"
    />
    <input
      type="button"
      value="Character"
      v-on:click="addCharacter()"
    />
    <br>
    <input
      type="button"
      value="Clear"
      v-on:click="clear()"
    />

  </div>
</template>

<script>
import { KillsSearchCriteria,
  LossesSearchCriteria,
  CharacterSearchCriteria,
  AllianceSearchCriteria,
  CorporationSearchCriteria,
  SoloSearchCriteria,
  HighsecSearchCriteria,
  LowsecSearchCriteria,
  NullsecSearchCriteria,
  AbyssalSearchCriteria } from './entity/SearchCriteria.js'
import { SearchCriteriaListModel } from './entity/SearchCriteriaListModel.js'

export default {
  name: 'SearchTool',
  props: {
    msg: String
  },
  data: function () {
    return {
      generatedUrl: '',
      criteriaList: {},
      inputText: ''
    }
  },
  created: function () {
    this.criteriaList = new SearchCriteriaListModel()
    this.updateUrl()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(new KillsSearchCriteria())
    },
    addLosses: function () {
      this.addCriteria(new LossesSearchCriteria())
    },
    addSolo: function () {
      this.addCriteria(new SoloSearchCriteria())
    },
    addHighsec: function () {
      this.addCriteria(new HighsecSearchCriteria())
    },
    addLowsec: function () {
      this.addCriteria(new LowsecSearchCriteria())
    },
    addNullsec: function () {
      this.addCriteria(new NullsecSearchCriteria())
    },
    addAbyssal: function () {
      this.addCriteria(new AbyssalSearchCriteria())
    },
    addAlliance: function () {
      this.addCriteria(new AllianceSearchCriteria(this.inputText, this.inputText))
    },
    addCorporation: function () {
      this.addCriteria(new CorporationSearchCriteria(this.inputText, this.inputText))
    },
    addCharacter: function () {
      this.addCriteria(new CharacterSearchCriteria(this.inputText, this.inputText))
    },
    /**
     * 条件を追加する。
     */
    addCriteria: function (criteria) {
      this.criteriaList.addCriteria(criteria)
      this.updateUrl()
    },
    remove: function (idx) {
      this.criteriaList.deleteSearchCriteria(idx)
      this.updateUrl()
    },
    /**
     * 条件をクリアする。
     */
    clear: function () {
      this.criteriaList.clear()
      this.inputText = ''
      this.updateUrl()
    },
    /**
     * generatedUrlを更新する。
     */
    updateUrl: function () {
      this.generatedUrl = this.criteriaList.getSearchUrl()
    }
  }
}

</script>
<style>
.searchCriteria {
  display: inline;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
}
</style>
