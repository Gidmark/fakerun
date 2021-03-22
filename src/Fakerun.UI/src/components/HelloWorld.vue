<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { MapService } from "../services/mapService";
import { ChallengeService } from "../services/challengeService";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
  /**
   *
   */
  mounted(): void {
    const mapService = new MapService();
    const challengeService = new ChallengeService();

    const map = mapService.renderMap("map", { longitude: 12.3248, latitude: 58.3797 });
    const challenge = challengeService.load("some id");
    challengeService.render(challenge, map);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map {
  height: 800px;
  width: 1vv;
}
</style>
