import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
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
        primary: colors.blue.darken2,
        secondary: colors.red.darken4,
        accent: colors.indigo.base,
        kills: colors.green.lighten1,
        losses: colors.red.lighten1,
        solo: colors.green.lighten1,
        highsec: colors.blue.lighten1,
        lowsec: colors.orange.lighten1,
        nullsec: colors.red.lighten1,
        wspace: colors.purple.lighten1,
        abyssal: colors.grey.lighten1,
        finalblow: colors.pink.lighten1,
        iskvalue: colors.cyan.lighten1,
        isk5b: colors.amber.lighten1,
        isk10b: colors.orange.lighten1,
        isk20b: colors.red.lighten1,
        character: colors.blueGrey.lighten1,
        corporation: colors.blueGrey.lighten1,
        alliance: colors.blueGrey.lighten1,
        system: colors.teal.lighten1,
        constellation: colors.teal.lighten1,
        region: colors.teal.lighten1,
        ship: colors.brown.lighten1,
        group: colors.brown.lighten1
      }
    }
  }
})
