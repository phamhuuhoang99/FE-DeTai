import View from "ol/View";
import { Modify, Snap } from "ol/interaction";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";

export default {
  map: new Map(),
  layers: [],
  layerMission: null,
  sourceMission: new TileWMS({
    url: "http://localhost:8090/geoserver/hoang/wms",
    params: { LAYERS: "hoang:missions", tiled: true },
    serverType: "geoserver",
  }),
  sourceScheme: new TileWMS({
    url: "http://localhost:8090/geoserver/hoang/wms",
    params: { LAYERS: "hoang:schemes", tiled: true },
    serverType: "geoserver",
  }),
  sourceBaseMap: null,
  view: new View(),
  draw: null,
  overlay: null,
  modify: new Modify({ source: new VectorSource() }),
  snap: new Snap(),
  isDrawingScheme: false,
  colorDraw: "#FF0000",
  missions: [],
};
