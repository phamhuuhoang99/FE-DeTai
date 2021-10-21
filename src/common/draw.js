import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";

import Point from "ol/geom/Point";
// import Polyline from "ol/format/Polyline";
import LineString from "ol/geom/LineString";
import * as turf from "@turf/turf";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";

function startDrawTest(map, colorDraw, type = "None") {
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
          color: colorDraw,
        }),
      }),
    });
  }
  if (type === "Arrow") {
    const color = colorDraw;
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
    const color = colorDraw;
    style = new Style({
      stroke: new Stroke({
        color: color,
        width: 2,
      }),
    });
  }
  if (type === "Polygon") {
    const color = colorDraw;

    style = new Style({
      fill: new Fill({
        color: color,
      }),
    });
  }

  const vector = new VectorLayer({
    source: source,
    style: style,
  });

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

    map.addInteraction(draw);
    return draw;
  }
}

export { startDrawTest };
