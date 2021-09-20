export default {
  map: {
    geoserver: "http://localhost:8090/geoserver/hoang/wms",
    layers: [
      {
        layerName: "hoang:base_map",
        url: "",
        visible: true,
        zIndex: 0,
      },
      {
        layerName: "hoang:missions",
        url: "",
        visible: true,
        zIndex: 2,
      },
      {
        layerName: "hoang:schemes",
        url: "",
        visible: true,
        zIndex: 2,
      },
    ],
  },
};
