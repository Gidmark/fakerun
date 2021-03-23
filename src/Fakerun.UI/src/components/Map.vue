<template>
    <div id="map" class="map"></div>
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
export default class Map extends Vue {
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
<style lang="scss">
  @import "https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css";
</style>