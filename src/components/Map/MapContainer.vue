<template>
  <div style="position: relative;">
    <div class="control-plan">
      <Tooltip content="Chọn màu" placement="top">
        <Button
          class="mg"
          type="primary"
          shape="circle"
          icon="md-color-palette"
        ></Button>
      </Tooltip>
      <Tooltip content="Vẽ mũi tên" placement="top">
        <Button
          class="mg"
          type="success"
          shape="circle"
          icon="md-arrow-round-forward"
        ></Button>
      </Tooltip>
      <Tooltip content="Vẽ điểm" placement="top">
        <Button
          class="mg"
          type="success"
          shape="circle"
          icon="md-radio-button-on"
        ></Button>
      </Tooltip>
      <Tooltip content="Vẽ đường" placement="top">
        <Button class="mg" type="success" icon="md-remove" shape="circle">
        </Button>
      </Tooltip>

      <Tooltip content="Vẽ đa giác" placement="top">
        <Button type="success" icon="md-crop" shape="circle"> </Button>
      </Tooltip>
    </div>
    <div ref="map-root" id="map" style="width: 100%;height:100vh"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MapContainer",
  data() {
    return {};
  },
  created() {
    this.getAllTileLayers();
  },
  mounted() {
    this.initMap();
    this.initEventClickMap();
    this.getMissions();
  },
  computed: {},
  methods: {
    ...mapActions([
      "getAllTileLayers",
      "initMap",
      "getMissions",
      "initEventClickMap",
    ]),
  },
};
</script>

<style>
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
.control-plan {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 999;
}
.mg {
  margin: 0 2px;
}
</style>
