import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import "ol/ol.css";
import mapConfig from "../../src/mapConfig";

export default {
  getAllTileLayers(context) {
    let allLayers = mapConfig.map.layers;
    let layers = [];
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
        layers.push(layer);
      }
    }
    context.commit("setLayers", layers);
  },
  initMap(context) {
    context.commit("setLayers", [
      new TileLayer({
        source: new OSM(), // tiles are served by OpenStreetMap
      }),
      ...context.getters.layers,
    ]);
    context.commit(
      "setView",
      new View({
        zoom: 7.5,
        center: [11781474.417420888, 2415619.3084370033],
        constrainResolution: true,
      })
    );
    const map = new Map({
      target: "map",
      layers: [...context.getters.layers],
      view: context.getters.view,
    });
    context.commit("setMap", map);
  },
};
