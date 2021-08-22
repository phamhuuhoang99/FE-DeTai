import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
// import { Vector as VectorSource } from "ol/source";
// import { Vector as VectorLayer } from "ol/layer";

export default {
  map: new Map(),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View(),
  draw: null,
};
