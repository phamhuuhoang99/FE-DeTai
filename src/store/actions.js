import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";
import "ol/ol.css";
import mapConfig from "../../src/mapConfig";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
} from "ol/style";
import { FullScreen, defaults as defaultControls } from "ol/control";
import ZoomSlider from "ol/control/ZoomSlider";
import Overlay from "ol/Overlay";
import Point from "ol/geom/Point";
// import Polyline from "ol/format/Polyline";
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";
import { flash } from "../animation/animation";
import { getVectorContext } from "ol/render";
import axios from "axios";
import * as turf from "@turf/turf";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import { styleFeatureScheme } from "../common/styleFeatureScheme";

// import { transform } from "ol/proj";

export default {
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
        var fill = new Fill({
          color: "rgba(255,0,0,0.9)",
        });

        let layerWFS = new VectorLayer({
          source: vectorSource,
          style: new Style({
            image: new Circle({
              fill: fill,
              radius: 5,
            }),
            fill: fill,
          }),
        });
        layersWFS.push(layerWFS);
      }
    }
    //i=0 Layer Vector Mission
    const INDEX_LAYER_MISSION = 0;
    context.commit("setLayerMission", layersWFS[INDEX_LAYER_MISSION]);
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
      controls: defaultControls().extend([new ZoomSlider(), new FullScreen()]),
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
      url = context.state.sourceMission.getFeatureInfoUrl(
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
  startDraw(context, type = "None") {
    const geometryFunction = function(coordinates, geometry) {
      if (!geometry) {
        geometry = new LineString([], "XY");
      }

      var line = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      };
      var curved = turf.bezier(line);
      geometry.setCoordinates(curved["geometry"]["coordinates"]);
      return geometry;
    };
    const source = new VectorSource({ wrapX: false });
    let style;

    if (type === "Point") {
      style = new Style({
        fill: new Fill({
          color: "#FF0000",
        }),
        stroke: new Stroke({
          color: "#FF0000",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "#FF0000",
          }),
        }),
      });
    }
    if (type === "Arrow") {
      const color = context.state.colorDraw;
      style = function(feature) {
        const geometry = feature.getGeometry();
        let styles = [
          new Style({
            stroke: new Stroke({
              color: color,
              width: 2,
            }),
          }),
        ];
        geometry.forEachSegment((start, end) => {
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const rotation = Math.atan2(dy, dx);
          // arrows
          // styles.push(
          //   new Style({
          //     geometry: new Point(end),
          //     image: new Icon({
          //       src: "./images/arrow.png",
          //       anchor: [0.75, 0.5],
          //       rotateWithView: true,
          //       rotation: -rotation,
          //       scale: 1.25,
          //       color: color,
          //     }),
          //   })
          // );
          styles = new Array(
            new Style({
              geometry: new Point(end),
              image: new Icon({
                src: "./images/arrow.png",
                anchor: [0.75, 0.5],
                rotateWithView: true,
                rotation: -rotation,
                scale: 1.25,
                color: color,
              }),
            })
          );
        });
        styles.push(
          new Style({
            stroke: new Stroke({
              color: color,
              width: 2,
            }),
          })
        );
        return styles;
      };
    }
    if (type === "LineString") {
      const color = context.state.colorDraw;
      style = new Style({
        stroke: new Stroke({
          color: color,
          width: 2,
        }),
      });
    }

    const vector = new VectorLayer({
      source: source,
      style: style,
    });

    const map = context.state.map;

    map.addLayer(vector);

    let draw; // global so we can remove it later

    if (type !== "None") {
      if (type === "Arrow") {
        type = "LineString";
        draw = new Draw({
          source: source,
          type: type,
          geometryFunction: geometryFunction,
        });
      } else {
        draw = new Draw({
          source: source,
          type: type,
        });
      }

      context.commit("setDraw", draw);
      map.addInteraction(draw);
    }
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
  async getMissions(context) {
    try {
      const prefixUrl = process.env.VUE_APP_ROOT_API;
      const res = await axios.get(prefixUrl + "/missions");
      context.commit("setMissions", res.data);
      const layer = context.state.layers[1];
      const map = context.state.map;

      context.state.missions.forEach((mission) => {
        let coordinates = mission.location.coordinates;
        let point = new Point(coordinates);
        let feature = new Feature(point);

        window.setInterval(() => {
          flash(feature, layer, map);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  },
  addMission(context, newMission) {
    context.commit("ADD_MISSION", newMission);
  },
  deleteMission(context, missionId) {
    context.commit("DELETE_MISSION", missionId);
  },
  updateMission(context, mission) {
    context.commit("UPDATE_MISSION", mission);
  },
  updateScheme(context, scheme) {
    context.commit("UPDATE_SCHEME", scheme);
  },

  async getSchemes(context) {
    try {
      const prefixUrl = process.env.VUE_APP_ROOT_API;
      const res = await axios.get(prefixUrl + "/schemes");
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
};
