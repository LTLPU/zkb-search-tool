<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>zkb-search-tool</h1>
    <hr />
    <SearchTool />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchTool from '@/components/SearchTool.vue'

export default {
  name: 'home',
  components: {
    SearchTool
  }
}
</script>
