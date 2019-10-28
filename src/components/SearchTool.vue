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
    this.criteriaList = []
    this.updateUrl()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function () {
      this.addCriteria(KillCriteriaCreator.create())
      this.updateUrl()
    },
    /**
     * losses/を追加する。
     */
    addLosses: function () {
      this.addCriteria(LossCriteriaCreator.create())
      this.updateUrl()
    },
    addCharacter: function () {
      this.addCriteria(CharacterCriteriaCreator.create(this.inputText))
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
    },
    /**
     * 条件を追加する。
     *
     * @param {Criteria} newCriteria 追加する条件
     */
    addCriteria: function (newCriteria) {
      if (!(newCriteria instanceof Criteria)) {
        throw new Error('newCriteria is not Criteria')
      }

      const type = newCriteria.getCriteriaType()

      // Typeが一致するものを検索
      const findIndex = this.criteriaList.findIndex(criteria => {
        return criteria.getCriteriaType() === type
      })
      // 重複が認められていないTypeは上書きする
      if (!TYPES[type].isMultiple) {
        if (findIndex < 0) {
          // 追加
          this.criteriaList.push(newCriteria)
        } else {
          // 上書き
          this.criteriaList.splice(findIndex, 1, newCriteria)
        }
      } else {
        // 重複が認められているTypeは追加
        this.criteriaList.push(newCriteria)
      }
    },
    /**
     * リストを展開してUrlを返す。
     */
    generateSearchURL: function () {
      let url = 'https://zkillboard.com/'

      for (let criteria of this.criteriaList) {
        if (criteria instanceof Criteria) {
          url += criteria.getUrlString()
        }
      }

      return url
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
const TYPES = {}
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

class Criteria {
  constructor () {
    this._criteriaType = ''
    this._searchType = ''
    this._searchValue = []
  }

  addSearchValue (value) {
    this._searchValue.push(value)
  }

  getCriteriaType () {
    return this._criteriaType
  }

  getUrlString () {
    if (this._searchValue !== '') {
      return this._searchType + '/' + this._searchValue.join(', ') + '/'
    } else {
      return this._searchType + '/'
    }
  }

  getCriteriaView () {
    if (this._searchValue !== '') {
      return this._searchType + ' : ' + this._searchValue.join(', ')
    } else {
      return this._searchType
    }
  }
}

class KillCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = TYPE_KILLLOSS
    this._searchType = 'kills'
  }
}

class LossCriteria extends Criteria {
  constructor () {
    super()
    this._criteriaType = TYPE_KILLLOSS
    this._searchType = 'losses'
  }
}

class CharacterCriteria extends Criteria {
  constructor (characterId) {
    super()
    this._criteriaType = TYPE_CHARACTER
    this._searchType = 'character'
    this._searchValue.push(characterId)
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

</script>

<style>
</style>
