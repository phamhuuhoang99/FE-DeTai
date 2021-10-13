import Feature from "ol/Feature";
import { Icon, Style } from "ol/style";
import Point from "ol/geom/Point";
import { Fill, Circle } from "ol/style";
function createNewFeature(coordinates) {
  return new Feature({
    geometry: new Point(coordinates),
    name: "Mission Edit ",
  });
}

export function editFeaturePoint(sourceMissionLayer, missions, missionDetail) {
  // Delete all Feature
  function addFeatureInLayer(style, coordinates) {
    let feature = createNewFeature(coordinates);
    feature.setStyle(style);
    sourceMissionLayer.addFeature(feature);
  }
  sourceMissionLayer.forEachFeature(function(feature) {
    sourceMissionLayer.removeFeature(feature);
  });
  // Style Feature Default Point
  const style = new Style({
    image: new Circle({
      fill: new Fill({
        color: "rgba(255,0,0,0.9)",
      }),
      radius: 5,
    }),
    fill: new Fill({
      color: "rgba(255,0,0,0.9)",
    }),
  });
  //Add Feature Default Point Mission

  for (let mission of missions) {
    if (missionDetail !== null) {
      if (mission.id !== missionDetail.id) {
        addFeatureInLayer(style, mission.location.coordinates);
      }
    } else {
      addFeatureInLayer(style, mission.location.coordinates);
    }
  }

  if (missionDetail !== null) {
    const missionEditCoordinate = missionDetail.location.coordinates;

    //Feature Point Edit
    const iconFeature = new Feature({
      geometry: new Point(missionEditCoordinate),
      name: "Mission Edit ",
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "https://openlayers.org/en/latest/examples/data/icon.png",
      }),
    });
    iconFeature.setStyle(iconStyle);
    sourceMissionLayer.addFeature(iconFeature);
  }
}
