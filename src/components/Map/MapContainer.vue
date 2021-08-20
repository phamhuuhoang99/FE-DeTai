<template>
  <div ref="map-root" id="map" style="width: 100%;height:100vh"></div>
</template>

<script>
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import TileWMS from "ol/source/TileWMS";
import "ol/ol.css";
// import mapConfig from "../../mapConfig";
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
