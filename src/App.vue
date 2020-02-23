<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
    <v-footer dark>
      <v-row>
        <v-col class="py-2 text-center" cols="12">
          <span class="font-weight-bold">zkb-search-tool</span><br />
          <a href="https://github.com/LTLPU/zkb-search-tool" target="_blank"
            >GitHub</a
          >
          /
          <router-link to="/copyright">CCP Copyright Notice</router-link>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    copyright: false
  })
}
</script>
