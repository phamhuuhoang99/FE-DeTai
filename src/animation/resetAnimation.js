import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { flash } from "./animation";
export function resetAnimation(missions, layer, map) {
  missions.forEach((mission) => {
    let coordinates = mission.location.coordinates;
    let point = new Point(coordinates);
    let feature = new Feature(point);

    window.setInterval(() => {
      flash(feature, layer, map);
    }, 1000);
  });
}
