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
        v-for="criteria in criteriaList"
        :key="criteria.key"
        class="searchCriteria"
        :style="{ borderColor: criteria.color }"
      >
        <span :style="{ color: criteria.color }">◆</span> {{ criteria.label }} <input
          type="button"
          value="×"
          v-on:click="remove(criteria.key)"
        >
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
import { KillsSearchCriteriaListItem,
  LossesSearchCriteriaListItem,
  CharacterSearchCriteriaListItem,
  AllianceSearchCriteriaListItem,
  CorporationSearchCriteriaListItem,
  SoloSearchCriteriaListItem,
  HighsecSearchCriteriaListItem,
  LowsecSearchCriteriaListItem,
  NullsecSearchCriteriaListItem,
  AbyssalSearchCriteriaListItem } from './entity/SearchCriteriaListItem.js'
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
    addAlliance: function () {
      this.addCriteria(new AllianceSearchCriteriaListItem(this.inputText, this.inputText))
    },
    addCorporation: function () {
      this.addCriteria(new CorporationSearchCriteriaListItem(this.inputText, this.inputText))
    },
    addCharacter: function () {
      this.addCriteria(new CharacterSearchCriteriaListItem(this.inputText, this.inputText))
    },
    /**
     * 条件を追加する。
     */
    addCriteria: function (criteria) {
      this.criteriaList.add(criteria)
      this.updateUrl()
    },
    remove: function (idx) {
      this.criteriaList.remove(idx)
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
