import View from "ol/View";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import mapConfig from "../../../src/mapConfig";
import { FullScreen, defaults as defaultControls } from "ol/control";
import ZoomSlider from "ol/control/ZoomSlider";
import Overlay from "ol/Overlay";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import { Fill, Style, Circle } from "ol/style";

const mapModule = {
  state: {
    map: new Map(),
    layers: [],
    layerOverlayEdit: new VectorLayer({
      source: new VectorSource(),
    }),
    sourceBaseMap: null,
    view: new View(),
    draw: null,
    overlay: null,
  },
  getters: {
    map: (state) => state.map,
    layers: (state) => state.layers,
    layerOverlayEdit: (state) => state.layerOverlayEdit,
    sourceBaseMap: (state) => state.sourceBaseMap,
    view: (state) => state.view,
    draw: (state) => state.draw,
    overlay: (state) => state.overlay,
  },
  actions: {
    getAllTileLayers(context) {
      //get layer wms
      let allLayersWMS = mapConfig.map.wms.layers;
      let layersWMS = [];
      for (let i = 0; i < allLayersWMS.length; i++) {
        if (allLayersWMS[i].layerName) {
          let layer = new TileLayer({
            source: new TileWMS({
              url: mapConfig.map.wms.geoserver,
              params: { LAYERS: allLayersWMS[i].layerName, TILED: true },
              serverType: "geoserver",
            }),
            visible: allLayersWMS[i].visible,
            zIndex: allLayersWMS[i].zIndex,
          });
          layersWMS.push(layer);
        }
      }

      //index 0 of layersWMS baseMap
      const INDEX_BASE_MAP = 0;
      context.commit("setSourceBaseMap", layersWMS[INDEX_BASE_MAP].getSource());

      //get layer wfs
      let allLayersWFS = mapConfig.map.wfs.layers;
      let layersWFS = [];

      for (let i = 0; i < allLayersWFS.length; i++) {
        if (allLayersWFS[i].layerName) {
          let vectorSource = new VectorSource({
            format: new GeoJSON(),
            wrapX: false,
            url: function(extent) {
              return (
                mapConfig.map.wfs.geoserver +
                "?service=WFS&" +
                "version=1.1.0&request=GetFeature&typename=" +
                allLayersWFS[i].layerName +
                "&outputFormat=application/json&srsname=EPSG:4326&" +
                "bbox=" +
                extent.join(",") +
                ",EPSG:3857"
              );
            },
            strategy: bboxStrategy,
          });

          let layerWFS = new VectorLayer({
            source: vectorSource,
          });
          layersWFS.push(layerWFS);
        }
      }
      //i=0 Layer Vector Mission
      const INDEX_LAYER_MISSION = 0;
      context.commit("setLayerMission", layersWFS[INDEX_LAYER_MISSION]);
      //tam thoi
      context.getters.layerMission.setStyle(
        new Style({
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
          }),
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color: "red",
            }),
          }),
        })
      );

      //i=1 Layer Vector Scheme
      const INDEX_LAYER_SCHEME = 1;
      context.commit("setLayerScheme", layersWFS[INDEX_LAYER_SCHEME]);
      context.commit("setLayers", [...layersWMS, ...layersWFS]);
    },
    initMap(context) {
      context.commit("setLayers", [...context.state.layers]);
      // context.commit("setLayerMission", context.state.layers[2]);

      context.commit(
        "setView",
        new View({
          zoom: 10,
          center: [11781474.417420888, 2415619.3084370033],
          constrainResolution: true,
        })
      );
      const container = document.getElementById("popup");

      const overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      context.commit("setOverlay", overlay);

      const map = new Map({
        target: "map",
        layers: [...context.getters.layers],
        view: context.getters.view,
        overlays: [overlay],
        controls: defaultControls().extend([
          new ZoomSlider(),
          new FullScreen(),
        ]),
      });
      context.commit("setMap", map);
    },
    initEventClickMap(context) {
      const content = document.getElementById("popup-content");
      const closer = document.getElementById("popup-closer");

      closer.onclick = function() {
        context.state.overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

      context.state.map.on("click", (evt) => {
        context.state.overlay.setPosition(undefined);
        const coordinate = evt.coordinate;
        const resolution = context.state.map.getView().getResolution();
        const projection = context.state.map.getView().getProjection();
        let url;
        url = context.getters.sourceMission.getFeatureInfoUrl(
          coordinate,
          resolution,
          projection,
          {
            INFO_FORMAT: "application/json",
          }
        );

        if (url) {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.features.length == 0) return;
              console.log(data);
              try {
                content.innerHTML =
                  "<b>Tên Nhiệm Vụ</b>: " +
                  data.features[0].properties.name +
                  "<br> <b>Thời gian bắt đầu</b>:" +
                  data.features[0].properties.start_date +
                  "<br> <b>Thời gian kết thúc</b>:" +
                  data.features[0].properties.end_date +
                  "<br> <b>Mô tả</b>:" +
                  data.features[0].properties.description;
                context.state.overlay.setPosition(coordinate);
              } catch (err) {
                return;
              }
            });
        }
      });
    },
    stopDraw(context) {
      const map = context.state.map;
      const draw = context.state.draw;
      map.removeInteraction(draw);
    },

    clearSourceDraw(context) {
      const draw = context.state.draw;
      if (draw) {
        const source = draw.source_;
        source.clear();
      }
    },
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setView(state, view) {
      state.view = view;
    },
    setLayers(state, layers) {
      state.layers = [...layers];
    },
    setDraw(state, draw) {
      state.draw = draw;
    },
    setOverlay(state, overlay) {
      state.overlay = overlay;
    },
    setSourceBaseMap(state, sourceBaseMap) {
      state.sourceBaseMap = sourceBaseMap;
    },
    setLayerOverlayEdit(state, layerOverlayEdit) {
      state.layerOverlayEdit = layerOverlayEdit;
    },
  },
};

export default mapModule;
