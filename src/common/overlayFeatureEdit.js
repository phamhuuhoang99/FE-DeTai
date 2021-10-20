import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
// import { Vector as VectorSource } from "ol/source";
// import { Vector as VectorLayer } from "ol/layer";
import { Fill, Stroke, Style, Circle } from "ol/style";
export function overlayFeatureEdit(map, coordinates, layerOverlay) {
  if (layerOverlay) {
    layerOverlay.getSource().clear();
    map.removeLayer(layerOverlay);
  }
  let style = new Style({
    fill: new Fill({
      color: "rgba(255,255,255,0.4)",
    }),
    stroke: new Stroke({
      color: "#3399CC",
      width: 3,
    }),
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: "#3399CC",
      }),
    }),
  });

  const feature = new Feature({
    geometry: new LineString(coordinates),
  });

  feature.setStyle(style);

  layerOverlay.getSource().addFeature(feature);
  map.addLayer(layerOverlay);
}
