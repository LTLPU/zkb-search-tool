<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
    <v-footer dark>
      <v-row>
        <v-col class="ppy-4 text-center font-weight-bold" cols="12">
          zkb-search-tool
          <a href="https://github.com/LTLPU/zkb-search-tool" target="_blank"
            >GitHub</a
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
