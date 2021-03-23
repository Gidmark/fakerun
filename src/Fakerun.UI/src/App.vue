<template>
  <div class="app">
    <div class="app__nav nav">
      <router-link to="/" class="nav__link">Home</router-link>
      <router-link to="/about" class="nav__link">About</router-link>
    </div>
    <div class="app__map">
      <Map />
    </div>
    <div class="app__content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Map from "@/components/Map.vue"

@Options({
  components: {
    Map
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  @import "@/assets/ui/scss/main.scss";
</style>