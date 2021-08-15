<template>
  <div ref="map-root" style="width: 100%;height:100vh"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import "ol/ol.css";
import mapConfig from "../../mapConfig";

export default {
  name: "MapContainer",
  data() {
    return {
      listLayer: [],
    };
  },
  created() {
    this.initMap();
  },
  mounted() {
    new Map({
      target: this.$refs["map-root"],
      layers: [
        new TileLayer({
          source: new OSM(), // tiles are served by OpenStreetMap
        }),
        ...this.listLayer,
      ],
      view: new View({
        zoom: 7.5,
        center: [11781474.417420888, 2415619.3084370033],
        constrainResolution: true,
      }),
    });
  },
  methods: {
    getAllTileLayers() {
      let allLayers = mapConfig.map.layers;
      for (let i = 0; i < allLayers.length; i++) {
        if (allLayers[i].layerName) {
          let layer = new TileLayer({
            source: new TileWMS({
              url: mapConfig.map.geoserver,
              params: { LAYERS: allLayers[i].layerName, TILED: true },
              serverType: "geoserver",
            }),
            visible: allLayers[i].visible,
            zIndex: allLayers[i].zIndex,
          });
          this.listLayer.push(layer);
        }
      }
    },
    initMap() {
      this.getAllTileLayers();
    },
  },
};
</script>

<style></style>
