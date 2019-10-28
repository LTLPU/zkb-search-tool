import * as criterias from './Criteria.js'

export class CriteriaCreator {
  static create (criteriaString) {
    return null
  }
}

// eslint-disable-next-line no-unused-vars
export class KillCriteriaCreator extends CriteriaCreator {
  static create () {
    return new criterias.KillCriteria()
  }
}

// eslint-disable-next-line no-unused-vars
export class LossCriteriaCreator extends CriteriaCreator {
  static create () {
    return new criterias.LossCriteria()
  }
}

// eslint-disable-next-line no-unused-vars
export class CharacterCriteriaCreator extends CriteriaCreator {
  static create (characterId) {
    return new criterias.CharacterCriteria(characterId)
  }
}
