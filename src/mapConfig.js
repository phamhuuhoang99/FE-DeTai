export default {
  map: {
    wms: {
      geoserver: "http://localhost:8090/geoserver/hoang/wms",
      layers: [
        {
          layerName: "hoang:base_map",
          url: "",
          visible: true,
          zIndex: 0,
        },
      ],
    },
    wfs: {
      geoserver: "http://localhost:8090/geoserver/hoang/wfs",
      layers: [
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
  },
};
