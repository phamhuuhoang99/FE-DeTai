import { Snap, Modify } from "ol/interaction";
export function modifySnapMap(layer) {
  return {
    modify: new Modify({
      hitDetection: layer,
      source: layer.getSource(),
    }),
    snap: new Snap({
      source: layer.getSource(),
    }),
  };
}
