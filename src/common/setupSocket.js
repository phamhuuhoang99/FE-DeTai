export function moveMap(map) {
  map.on("moveend", () => {
    console.log("move");
  });
}
