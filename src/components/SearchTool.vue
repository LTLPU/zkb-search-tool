<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-row class="py-8">
          <v-col class="d-flex pa-3 ma-3" justify="center">
            <vue-responsive-text
              :transition="Number(100)"
              class="font-weight-medium"
            >
              <a :href="generatedUrl" target="_blank">
                {{ generatedUrl }}
              </a>
            </vue-responsive-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card min-height="90px" outlined>
              <v-card-text>
                <v-chip-group column>
                  <v-chip
                    v-for="(criteriaItem, idx) of criteriaList"
                    :key="idx"
                    @click="removeCriteria(idx)"
                    @click:close="removeCriteria(idx)"
                    class="ma-2 font-weight-bold"
                    color="grey darken-2"
                    text-color="white"
                    pill
                    close
                  >
                    <v-avatar left tile>
                      <v-icon>{{ criteriaItem.class }}</v-icon>
                    </v-avatar>
                    {{ criteriaItem.label }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>

      <v-flex xs12>
        <v-row>
          <v-col>
            <v-card outlined>
              <v-card-text>
                <v-text-field
                  v-model="inputText"
                  label="Keyword"
                  clearable
                  :loading="isLoading"
                ></v-text-field>
                <v-list dense v-if="searchResultList.length > 0">
                  <v-list-item-group v-model="searchResultList" color="primary">
                    <v-list-item
                      v-for="(resultItem, idx) of searchResultList"
                      :key="idx"
                    >
                      <v-list-item-content @click="addSearchItem(resultItem)">
                        <v-list-item-title
                          v-text="resultItem.label"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>

      <v-flex xs12>
        <v-row>
          <v-col md="auto">
            <v-card
              class="mx-auto text-no-wrap overflow-x-auto"
              cols="2"
              outlined
            >
              <v-card-text>
                <v-btn
                  outlined
                  class="mr-2 font-weight-bold"
                  color="green darken-4"
                  @click="addKills()"
                >
                  Kills
                </v-btn>
                <v-btn
                  outlined
                  class="font-weight-bold"
                  color="red darken-4"
                  @click="addLosses()"
                >
                  Losses
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="auto">
            <v-card
              class="mx-auto text-no-wrap overflow-x-auto"
              cols="1"
              outlined
            >
              <v-card-text>
                <v-btn
                  outlined
                  class="font-weight-bold"
                  color="green darken-4"
                  @click="addSolo()"
                >
                  Solo
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="auto">
            <v-card
              class="mx-auto text-no-wrap overflow-x-auto"
              cols="5"
              outlined
            >
              <v-card-text>
                <v-btn
                  outlined
                  class="mr-2 font-weight-bold"
                  color="blue darken-4"
                  @click="addHighsec()"
                >
                  Highsec
                </v-btn>
                <v-btn
                  outlined
                  class="mr-2 font-weight-bold"
                  color="orange darken-4"
                  @click="addLowsec()"
                >
                  Lowsec
                </v-btn>
                <v-btn
                  outlined
                  class="mr-2 font-weight-bold"
                  color="red darken-4"
                  @click="addNullsec()"
                >
                  Nullsec
                </v-btn>
                <v-btn
                  outlined
                  class="mr-2 font-weight-bold"
                  color="purple darken-4"
                  @click="addWSpace()"
                >
                  W-Space
                </v-btn>
                <v-btn
                  outlined
                  class="font-weight-bold"
                  color="grey darken-4"
                  @click="addAbyssal()"
                >
                  Abyssal
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ZkbSearchCriteriaList } from './entity/ZkbSearchCriteriaList'
import { ZkbSearchCriteriaTypes } from './enum/ZkbSearchCriteriaTypes'

import { KeywordSearchService } from './service/KeywordSearchService'
import { ZkbSearchCriteriaService } from './service/ZkbSearchCriteriaService'

import _ from 'lodash'
import VueResponsiveText from 'vue-responsive-text'

const keywordSearchService = new KeywordSearchService()

export default {
  name: 'SearchTool',
  components: {
    VueResponsiveText
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      generatedUrl: 'https://zkillboard.com/',
      criteriaList: {},
      inputText: '',
      isLoading: false,
      searchResultList: {},
      urlStringTransitionTime: 500
    }
  },
  watch: {
    inputText: {
      handler(n, o) {
        this.isLoading = true
        this.debouncedSearch(n)
      },
      deep: true
    }
  },
  created: function() {
    this.debouncedSearch = _.debounce(this.search, 500)

    this.criteriaList = new ZkbSearchCriteriaList()
    this.searchResultList = []

    this._zkbSearchCriteriaService = new ZkbSearchCriteriaService(
      this.criteriaList
    )
  },
  mounted: function() {
    this.updateUrl()
  },
  methods: {
    /**
     * kills/を追加する。
     */
    addKills: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Kills)
    },
    addLosses: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Losses)
    },
    addSolo: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Solo)
    },
    addHighsec: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Highsec)
    },
    addLowsec: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Lowsec)
    },
    addWSpace: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.WSpace)
    },
    addNullsec: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Nullsec)
    },
    addAbyssal: function() {
      this.addCriteria(ZkbSearchCriteriaTypes.Abyssal)
    },
    addSearchItem: function(resultItem) {
      // 検索条件追加
      switch (resultItem.type) {
        case 'character':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Character,
            resultItem.id,
            resultItem.label
          )
          break
        case 'corporation':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Corporation,
            resultItem.id,
            resultItem.label
          )
          break
        case 'alliance':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Alliance,
            resultItem.id,
            resultItem.label
          )
          break
        case 'system':
          this.addCriteria(
            ZkbSearchCriteriaTypes.System,
            resultItem.id,
            resultItem.label
          )
          break
        case 'constellation':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Constellation,
            resultItem.id,
            resultItem.label
          )
          break
        case 'region':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Region,
            resultItem.id,
            resultItem.label
          )
          break
        case 'group':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Group,
            resultItem.id,
            resultItem.label
          )
          break
        case 'ship':
          this.addCriteria(
            ZkbSearchCriteriaTypes.Ship,
            resultItem.id,
            resultItem.label
          )
          break
        default:
          throw new Error('something wrong')
      }

      // 入力状態クリア
      this.clear()
    },
    addCriteria: function(itemType, value, label) {
      this._zkbSearchCriteriaService.addCriteria(itemType, value, label)
      this.updateUrl()
    },
    removeCriteria: function(idx) {
      this._zkbSearchCriteriaService.removeCriteria(idx)
      this.updateUrl()
    },
    clearCriteria: function() {
      this._zkbSearchCriteriaService.removeAllCriteria()
      this.updateUrl()
    },
    clear: function() {
      this.inputText = ''
      this.searchResultList = []
    },
    updateUrl: function() {
      this.generatedUrl = this._zkbSearchCriteriaService.getSearchUrl()
    },
    search: function(searchWord) {
      keywordSearchService
        .search(searchWord)
        .then(res => {
          this.searchResultList = res
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
