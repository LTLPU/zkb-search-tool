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
import * as criteriaCreators from './entity/CriteriaCreators.js'
import * as criteriaListModel from './entity/CriteriaListModel.js'

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
    this.criteriaList = new criteriaListModel.CriteriaListModel()
    console.log(this.criteriaList instanceof criteriaListModel.CriteriaListModel)
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(criteriaCreators.KillCriteriaCreator.create())
      this.updateUrl()
    },
    /**
     * losses/を追加する。
     */
    addLosses: function () {
      this.addCriteria(criteriaCreators.LossCriteriaCreator.create())
      this.updateUrl()
    },
    addCharacter: function () {
      this.addCriteria(criteriaCreators.CharacterCriteriaCreator.create(this.inputText))
      this.updateUrl()
      this.inputText = ''
    },
    /**
     * 中身をクリアする。
     */
    clear: function () {
      this.criteriaList = []
      this.updateUrl()
    },
    /**
     * generatedUrlを更新する。
     */
    updateUrl: function () {
      this.generatedUrl = this.generateSearchURL()
    }
  }
}

</script>

<style>
</style>
