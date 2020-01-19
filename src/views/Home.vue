<template>
  <div class="home">
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
