import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";
import "ol/ol.css";
import mapConfig from "../../src/mapConfig";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { FullScreen, defaults as defaultControls } from "ol/control";
import ZoomSlider from "ol/control/ZoomSlider";
// import GeoJSON from "ol/format/GeoJSON";

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
      ...context.state.layers,
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
      controls: defaultControls().extend([new ZoomSlider(), new FullScreen()]),
    });
    context.commit("setMap", map);
    console.log(context.state.map);
  },
  startDraw(context, type = "None") {
    const source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: "#FF0000",
        }),
        stroke: new Stroke({
          color: "#FF0000",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#FF0000",
          }),
        }),
      }),
    });

    const map = context.state.map;

    map.addLayer(vector);

    let draw; // global so we can remove it later

    if (type !== "None") {
      draw = new Draw({
        source: source,
        type: type,
      });
      context.commit("setDraw", draw);
      map.addInteraction(draw);
    }
  },
  stopDraw(context) {
    const map = context.state.map;
    const draw = context.state.draw;

    // context.commit("setDraw", null);

    map.removeInteraction(draw);
  },
  clearSourceDraw(context) {
    const draw = context.state.draw;

    const source = draw.source_;
    // var geoJSONformat = new GeoJSON();

    // var featureGeojson = geoJSONformat.writeFeaturesObject(
    //   source.getFeatures()
    // );
    // console.log(featureGeojson);

    source.clear();
  },
};
