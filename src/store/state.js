import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";

export default {
  map: new Map(),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View(),
};
