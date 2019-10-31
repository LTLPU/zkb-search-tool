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
        :key="criteria.getType() + criteria.getValue()"
      >
        {{ criteria.getCriteriaView() }}
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
    <br>
    <input
      type="text"
      v-model="inputText"
    />
    <br>
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
import { CriteriaCreator } from './entity/CriteriaCreator.js'
import { CriteriaListModel } from './entity/CriteriaListModel.js'
import { CriteriaType } from './entity/CriteriaType.js'

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
    this.criteriaList = new CriteriaListModel()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(CriteriaType.TYPE_KILLS)
    },
    addLosses: function () {
      this.addCriteria(CriteriaType.TYPE_LOSSES)
    },
    addAlliance: function () {
      this.addCriteria(CriteriaType.TYPE_ALLIANCE, this.inputText)
    },
    addCorporation: function () {
      this.addCriteria(CriteriaType.TYPE_CORPORATION, this.inputText)
    },
    addCharacter: function () {
      this.addCriteria(CriteriaType.TYPE_CHARACTER, this.inputText)
    },
    /**
     * 条件を追加する。
     */
    addCriteria: function (type, value) {
      this.criteriaList.addCriteria(
        CriteriaCreator.create(type, value)
      )
      this.updateUrl()
      if (!value) {
        this.inputText = ''
      }
    },
    /**
     * 条件をクリアする。
     */
    clear: function () {
      this.criteriaList.clear()
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
</style>
