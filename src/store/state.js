import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import TileWMS from "ol/source/TileWMS";

export default {
  map: new Map(),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  layerMission: null,
  sourceMission: new TileWMS({
    url: "http://localhost:8090/geoserver/hoang/wms",
    params: { LAYERS: "hoang:missions", tiled: true },
    serverType: "geoserver",
  }),
  view: new View(),
  draw: null,
  overlay: null,
  missions: [],
};
