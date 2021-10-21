import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Fill, Stroke, Style, Circle } from "ol/style";
export function overlayFeatureEdit(map, coordinates, layerOverlay, type) {
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
  let feature;
  switch (type) {
    case "LineString": {
      feature = new Feature({
        geometry: new LineString(coordinates),
      });
      break;
    }
    case "Polygon": {
      feature = new Feature({
        geometry: new Polygon(coordinates),
      });
      break;
    }
  }

  feature.setStyle(style);

  layerOverlay.getSource().addFeature(feature);
  map.addLayer(layerOverlay);
}
