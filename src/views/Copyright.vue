<template>
  <div class="copyright">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 class="pa-8">
          <v-row>
            <v-col class="d-flex pa-3 ma-3" justify="center">
              <vue-responsive-text
                :transition="Number(100)"
                class="font-weight-medium"
              >
                <span>zkb-search-tool</span>
              </vue-responsive-text>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex xs12>
          <v-row>
            <v-col>
              <v-card outlined>
                <v-card-title>COPYRIGHT NOTICE</v-card-title>
                <v-card-text>
                  <p>
                    EVE Online and the EVE logo are the registered trademarks of
                    CCP hf. All rights are reserved worldwide. All other
                    trademarks are the property of their respective owners. EVE
                    Online, the EVE logo, EVE and all associated logos and
                    designs are the intellectual property of CCP hf. All
                    artwork, screenshots, characters, vehicles, storylines,
                    world facts or other recognizable features of the
                    intellectual property relating to these trademarks are
                    likewise the intellectual property of CCP hf. CCP hf. has
                    granted permission to zkb-search-tool to use EVE Online and
                    all associated logos and designs for promotional and
                    information purposes on its website but does not endorse,
                    and is not in any way affiliated with, zkb-search-tool. CCP
                    is in no way responsible for the content on or functioning
                    of this website, nor can it be liable for any damage arising
                    from the use of this website.
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col justify="center">
              <p class="text-center"><a href="./">Back</a></p>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VueResponsiveText from 'vue-responsive-text'

export default {
  name: 'copyright',
  components: {
    VueResponsiveText
  }
}
</script>
