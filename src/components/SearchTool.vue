<template>
  <div class="searchTool">
    <h1>zkb-search-tool</h1>
    <hr />
    <p class="generatedUrl">
      <a :href="generatedUrl" target="_blank">{{ generatedUrl }}</a>
    </p>
    <input type="button" value="Kills" v-on:click="addKills()"/>
  </div>
</template>

<script>
export default {
  name: 'SearchTool',
  props: {
    msg: String
  },
  data: function () {
    return {
      generatedUrl: '',
      criteriaList: new CriteriaListModel()
    }
  },
  created: function () {
    console.log(this.criteriaList instanceof CriteriaListModel) // => false
  },
  methods: {
    addKills: function () {
      console.log(this.criteriaList instanceof CriteriaListModel)
      this.criteriaList.add(KillCriteriaCreator.create())
      this.generatedUrl = generateSearchURL(this.criteriaList)
    }
  }
}

// 条件のタイプ
const TYPE_KILLLOSS = 'type_killloss'
const TYPE_KILLTYPE = 'type_killtype'
const TYPE_SECURITY = 'type_sercurity'
const TYPE_SHIP = 'type_ship'
const TYPE_GROUP = 'type_group'
const TYPE_CHARACTER = 'type_character'
const TYPE_CORPORATION = 'type_corporation'
const TYPE_ALLIANCE = 'type_alliance'
const TYPE_SYSTEM = 'type_system'
const TYPE_REGION = 'type_region'

// データ構造
export const TYPES = {}
TYPES[TYPE_KILLLOSS] = {
  isMultiple: false,
  isParameterRequired: false
}
TYPES[TYPE_KILLTYPE] = {
  isMultiple: false,
  isParameterRequired: false
}
TYPES[TYPE_SECURITY] = {
  isMultiple: true,
  isParameterRequired: false
}
TYPES[TYPE_SHIP] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_GROUP] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_CHARACTER] = {
  isMultiple: true,
  isParameterRequired: true
}
TYPES[TYPE_CORPORATION] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_ALLIANCE] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_SYSTEM] = {
  isMultiple: false,
  isParameterRequired: true
}
TYPES[TYPE_REGION] = {
  isMultiple: false,
  isParameterRequired: true
}

export class Criteria {
  constructor () {
    this._criteriaType = ''
    this._searchType = ''
    this._searchValue = ''
  }

  getCriteriaType () {
    return this._criteriaType
  }

  getUrlString () {
    if (this._searchValue !== '') {
      return this._searchType + '/' + this._searchValue + '/'
    } else {
      return this._searchType + '/'
    }
  }
}

class KillCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = TYPE_KILLLOSS
    this._searchType = 'kills'
    this._searchValue = ''
  }
}

class LossCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = TYPE_KILLLOSS
    this._searchType = 'losses'
    this._searchValue = ''
  }
}

class CharacterCriteria extends Criteria {
  constructor (characterId) {
    super()
    this._criteriaType = TYPE_CHARACTER
    this._searchType = 'character'
    this._searchValue = characterId
  }
}

class CriteriaListModel extends Array {
  constructor () {
    super()
    console.log('criteriaListModel')
  }
  /**
   * 条件を追加する。
   *
   * @param {Criteria} newCriteria 追加する条件
   */
  add (newCriteria) {
    if (!(newCriteria instanceof Criteria)) {
      throw new Error('newCriteria is not Criteria')
    }

    const type = newCriteria.getCriteriaType()

    // 重複が認められていないTypeは上書きする
    if (!TYPES[type].isMultiple) {
      // Typeが一致するものを検索
      let findCriteria = this.find(criteria => {
        return criteria.getCriteriaType() === type
      })
      if (typeof findCriteria === 'undefined') {
        // 追加
        this.push(newCriteria)
      } else {
        // 上書き
        findCriteria = newCriteria
      }
    } else {
      // 重複が認められているTypeは追加
      this.push(newCriteria)
    }
  }
}

class CriteriaCreator {
  static create (criteriaString) {
    return null
  }
}

// eslint-disable-next-line no-unused-vars
class KillCriteriaCreator extends CriteriaCreator {
  static create () {
    return new KillCriteria()
  }
}

// eslint-disable-next-line no-unused-vars
class LossCriteriaCreator extends CriteriaCreator {
  static create () {
    return new LossCriteria()
  }
}

// eslint-disable-next-line no-unused-vars
class CharacterCriteriaCreator extends CriteriaCreator {
  static create (characterId) {
    return new CharacterCriteria(characterId)
  }
}

const generateSearchURL = (criteriaList) => {
  let url = 'https://zkillboard.com/'

  for (let criteria of criteriaList) {
    if (criteria instanceof Criteria) {
      url += criteria.getUrlString()
    }
  }

  return url
}
</script>

<style>
</style>
