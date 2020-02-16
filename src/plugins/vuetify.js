import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken2,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base,
        kills: colors.green.darken4,
        losses: colors.red.darken4,
        solo: colors.green.darken4,
        highsec: colors.blue.darken4,
        lowsec: colors.orange.darken4,
        nullsec: colors.red.darken4,
        wspace: colors.purple.darken4,
        abyssal: colors.grey.darken4,
        finalblow: colors.pink.darken4,
        iskvalue: colors.cyan.darken4,
        isk5b: colors.amber.darken4,
        isk10b: colors.orange.darken4,
        isk20b: colors.red.darken4,
        character: colors.blueGrey.darken4,
        corporation: colors.blueGrey.darken4,
        alliance: colors.blueGrey.darken4,
        system: colors.teal.darken4,
        constellation: colors.teal.darken4,
        region: colors.teal.darken4,
        ship: colors.brown.darken4,
        group: colors.brown.darken4
      }
    }
  }
})
