<template>
  <div ref="map-root" id="map" style="width: 100%;height:100vh"></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MapContainer",
  data() {
    return {
      listLayer: [],
    };
  },
  created() {
    this.getAllTileLayers();
  },
  mounted() {
    this.initMap();
  },
  computed: {},
  methods: {
    ...mapActions(["getAllTileLayers", "initMap"]),
  },
};
</script>

<style></style>
