import TileWMS from "ol/source/TileWMS";
import axios from "axios";
import { styleFeatureScheme } from "../../common/styleFeatureScheme";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import "ol/ol.css";

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  // Circle,
} from "ol/style";
import Point from "ol/geom/Point";
// import Polyline from "ol/format/Polyline";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import { getVectorContext } from "ol/render";

const schemeModule = {
  state: {
    schemes: [],
    isDrawingScheme: false,
    isEditingScheme: false,
    colorDraw: "#FF0000",
    typeDrawScheme: "",
    layerScheme: null,
    sourceScheme: new TileWMS({
      url: "http://localhost:8090/geoserver/hoang/wms",
      params: { LAYERS: "hoang:schemes", tiled: true },
      serverType: "geoserver",
    }),
  },
  getters: {
    isDrawingScheme: (state) => state.isDrawingScheme,
    colorDraw: (state) => state.colorDraw,
    schemes: (state) => state.schemes,
    layerScheme: (state) => state.layerScheme,
    typeDrawScheme: (state) => state.typeDrawScheme,
    isEditingScheme: (state) => state.isEditingScheme,
  },
  actions: {
    updateScheme(context, scheme) {
      context.commit("UPDATE_SCHEME", scheme);
    },

    async getSchemes(context) {
      try {
        // const prefixUrl = process.env.VUE_APP_ROOT_API;
        const res = await axios.get("/schemes");
        context.commit("setSchemes", res.data);
      } catch (error) {
        console.log(error);
      }
      //draw Arrow
      styleFeatureScheme(
        context.state.layerScheme.getSource(),
        context.state.schemes
      );
    },
    startSimulation(context, polyline) {
      var route = new LineString(polyline.coordinates).transform(
        "EPSG:4326",
        "EPSG:4326"
      );

      const routeFeature = new Feature({
        type: "route",
        geometry: route,
      });
      const startMarker = new Feature({
        type: "icon",
        geometry: new Point(route.getFirstCoordinate()),
      });
      const endMarker = new Feature({
        type: "icon",
        geometry: new Point(route.getLastCoordinate()),
      });
      const position = startMarker.getGeometry().clone();
      const geoMarker = new Feature({
        type: "geoMarker",
        geometry: position,
      });
      const styles = {
        route: new Style({
          stroke: new Stroke({
            width: 6,
            color: [255, 0, 0, 0.3],
          }),
        }),
        icon: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
          }),
        }),
        geoMarker: new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "black" }),
            stroke: new Stroke({
              color: "white",
              width: 2,
            }),
          }),
        }),
      };
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [routeFeature, geoMarker, startMarker, endMarker],
        }),
        style: function(feature) {
          return styles[feature.get("type")];
        },
      });

      context.state.map.addLayer(vectorLayer);

      const speedInput = 20;
      // const startButton = document.getElementById("start-animation");
      // let animating = false;
      let distance = 0;
      let lastTime;

      function moveFeature(event) {
        const speed = Number(speedInput);
        const time = event.frameState.time;
        const elapsedTime = time - lastTime;
        distance = (distance + (speed * elapsedTime) / 1e6) % 2;
        lastTime = time;

        const currentCoordinate = route.getCoordinateAt(
          distance > 1 ? 2 - distance : distance
        );
        position.setCoordinates(currentCoordinate);
        const vectorContext = getVectorContext(event);
        vectorContext.setStyle(styles.geoMarker);
        vectorContext.drawGeometry(position);
        // tell OpenLayers to continue the postrender animation
        context.state.map.render();
      }

      function startAnimation() {
        // animating = true;
        lastTime = Date.now();
        // startButton.textContent = "Stop Animation";
        vectorLayer.on("postrender", moveFeature);
        // hide geoMarker and trigger map render through change event
        geoMarker.setGeometry(null);
      }

      startAnimation();

      // function stopAnimation() {
      //   animating = false;
      //   // startButton.textContent = "Start Animation";

      //   // Keep marker at current animation position
      //   geoMarker.setGeometry(position);
      //   vectorLayer.un("postrender", moveFeature);
      // }

      // startButton.addEventListener("click", function() {
      //   if (animating) {
      //     stopAnimation();
      //   } else {
      //     startAnimation();
      //   }
      // });
    },
  },
  mutations: {
    UPDATE_SCHEME(state, scheme) {
      const indexScheme = state.schemes.findIndex((item) => {
        return item.id === scheme.id;
      });

      state.schemes[indexScheme] = { ...scheme };
    },
    setIsDrawingScheme(state, isDrawingScheme) {
      state.isDrawingScheme = isDrawingScheme;
    },
    setColorDraw(state, colorDraw) {
      state.colorDraw = colorDraw;
    },
    setSchemes(state, schemes) {
      state.schemes = schemes;
    },
    setLayerScheme(state, layerScheme) {
      state.layerScheme = layerScheme;
    },
    setTypeDrawScheme(state, typeDrawScheme) {
      state.typeDrawScheme = typeDrawScheme;
    },
    setIsEditingScheme(state, isEditingScheme) {
      state.isEditingScheme = isEditingScheme;
    },
  },
};
export default schemeModule;
