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
// import { Fill, Style, Stroke } from "ol/style";
import { FullScreen, defaults as defaultControls } from "ol/control";
import ZoomSlider from "ol/control/ZoomSlider";
// import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay";

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
    context.commit("setLayerMission", context.state.layers[2]);

    context.commit(
      "setView",
      new View({
        zoom: 7.5,
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
      const url = context.state.sourceMission.getFeatureInfoUrl(
        coordinate,
        resolution,
        projection,
        { INFO_FORMAT: "application/json" }
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
              // if (data.features[0].geometry.type == "Polygon") {
              //   popup.show(data.features[0].geometry.coordinates[0][0], content);
              // } else if (data.features[0].geometry.type == "Point") {
              //   popup.show(data.features[0].geometry.coordinates, content);
              // } else {
              //   popup.show(data.features[0].geometry.coordinates[0], content);
              // }
              context.state.overlay.setPosition(coordinate);
            } catch (err) {
              return;
            }
          });

        //pop-up style point
        // $.getJSON(url, function(data) {
        //   // console.log(data.getKeys());
        //   // console.log(data);
        //   if (data.features.length == 0) return;

        //   let gid = Number(data.features[0].id.split(".")[1]);

        //   if (typeStyle === "Style Point") {
        //     document
        //       .getElementById("saveStylePoint")
        //       .setAttribute("onclick", "changePoint(" + gid + ")");
        //     $("#modal-style").modal("show");
        //   } else if (typeStyle === "Style Line") {
        //     document
        //       .getElementById("saveStyleLine")
        //       .setAttribute("onclick", "changeLine(" + gid + ")");
        //     $("#modal-style-line").modal("show");
        //   } else if (typeStyle === "Style Polygon") {
        //     document
        //       .getElementById("saveStylePolygon")
        //       .setAttribute("onclick", "changePolygon(" + gid + ")");
        //     $("#modal-style-polygon").modal("show");
        //   } else if (typeStyle === "Style Symbol") {
        //     document
        //       .getElementById("saveStyleSymbol")
        //       .setAttribute("onclick", "changeSymbol(" + gid + ")");
        //     $("#modal-style-symbol").modal("show");
        //   }

        //   try {
        //     content =
        //       "<b>TYPE</b> : " +
        //       data.features[0].properties.type +
        //       "<br> <b>NAME </b> :" +
        //       data.features[0].properties.name;

        //     if (data.features[0].geometry.type == "Polygon") {
        //       popup.show(data.features[0].geometry.coordinates[0][0], content);
        //     } else if (data.features[0].geometry.type == "Point") {
        //       popup.show(data.features[0].geometry.coordinates, content);
        //     } else {
        //       popup.show(data.features[0].geometry.coordinates[0], content);
        //     }
        //   } catch (err) {
        //     return;
        //   }
        // });
      }
    });
  },
  startDraw(context, type = "None") {
    const source = new VectorSource({ wrapX: false });
    const stylePointDraw = new Style({
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
    const vector = new VectorLayer({
      source: source,
      style: stylePointDraw,
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
    map.removeInteraction(draw);
  },

  clearSourceDraw(context) {
    const draw = context.state.draw;
    if (draw) {
      const source = draw.source_;
      source.clear();
    }
  },
};
