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
      },
      dark: {
        primary: colors.blue.lighten2,
        secondary: colors.red.darken4,
        accent: colors.indigo.base,
        kills: colors.green.lighten4,
        losses: colors.red.lighten4,
        solo: colors.green.lighten4,
        highsec: colors.blue.lighten4,
        lowsec: colors.orange.lighten4,
        nullsec: colors.red.lighten4,
        wspace: colors.purple.lighten4,
        abyssal: colors.grey.lighten4,
        finalblow: colors.pink.lighten4,
        iskvalue: colors.cyan.lighten4,
        isk5b: colors.amber.lighten4,
        isk10b: colors.orange.lighten4,
        isk20b: colors.red.lighten4,
        character: colors.blueGrey.lighten4,
        corporation: colors.blueGrey.lighten4,
        alliance: colors.blueGrey.lighten4,
        system: colors.teal.lighten4,
        constellation: colors.teal.lighten4,
        region: colors.teal.lighten4,
        ship: colors.brown.lighten4,
        group: colors.brown.lighten4
      }
    }
  }
})
