import View from "ol/View";
import TileWMS from "ol/source/TileWMS";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";

export default {
  map: new Map(),
  layers: [],
  layerMission: null,
  layerScheme: null,
  layerOverlayEdit: new VectorLayer({
    source: new VectorSource(),
  }),
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

  /*------scheme--------*/
  isDrawingScheme: false,
  isEditingScheme: false,
  colorDraw: "#FF0000",
  typeDrawScheme: "",
  /*---------------*/
  missions: [],
  schemes: [],
};
