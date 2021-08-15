<template>
  <div ref="map-root" style="width: 100%;height:100vh"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

export default {
  name: "MapContainer",
  mounted() {
    new Map({
      target: this.$refs["map-root"],
      layers: [
        new TileLayer({
          source: new OSM(), // tiles are served by OpenStreetMap
        }),
      ],
      view: new View({
        zoom: 0,
        center: [0, 0],
        constrainResolution: true,
      }),
    });
  },
};
</script>

<style></style>
