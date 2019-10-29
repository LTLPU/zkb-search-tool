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
        :key="criteria.getCriteriaType()"
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
    <input
      type="button"
      value="Clear"
      v-on:click="clear()"
    />
    <input
      type="text"
      v-model="inputText"
    />
    <input
      type="button"
      value="Character"
      v-on:click="addCharacter()"
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
    // console.log(this.criteriaList instanceof CriteriaListModel)
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.criteriaList.addCriteria(CriteriaCreator.create(CriteriaType.TYPE_KILLS))
      this.updateUrl()
    },
    /**
     * losses/を追加する。
     */
    addLosses: function () {
      this.criteriaList.addCriteria(CriteriaCreator.create(CriteriaType.TYPE_LOSSES))
      this.updateUrl()
    },
    addCharacter: function () {
      this.criteriaList.addCriteria(CriteriaCreator.create(CriteriaType.TYPE_CHARACTER), this.inputText)
      this.updateUrl()
      this.inputText = ''
    },
    /**
     * 中身をクリアする。
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
