<template>
  <div style="position: relative;">
    <ControlDraw v-if="showControlDraw" />
    <div class="information-user">
      <Poptip trigger="hover" placement="bottom">
        <Avatar
          style="background-color: #2d8cf0"
          icon="ios-person"
          size="large"
        />
        <div slot="title">
          <i>{{ user.first_name + " " + user.last_name }}</i>
        </div>

        <div slot="content">
          <ul class="user-info-dropdown">
            <li>
              <a>
                Thông tin tài khoản
              </a>
            </li>
            <li>
              <a @click="logout()">
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </Poptip>
    </div>
    <div ref="map-root" id="map" style="width: 100%;height:100vh"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { eventBus } from "../../main";
import ControlDraw from "../ControlDraw/ControlDraw.vue";
// import { moveMap } from "../../common/setupSocket";
import socketioService from "../../services/socketio.service";

export default {
  name: "MapContainer",
  components: { ControlDraw },
  data() {
    return {
      showControlDraw: false,
    };
  },
  created() {
    this.getAllTileLayers();
    eventBus.$on("showControlDraw", (show) => {
      this.showControlDraw = show;
    });
    eventBus.$on("hideControlDraw", (show) => {
      this.showControlDraw = show;
    });
    socketioService.setupSocketConnection();
  },
  beforeUnmount() {
    socketioService.disconnect();
  },
  mounted() {
    this.initMap();
    this.initEventClickMap();
    this.getMissions();
    this.getSchemes();
    this.initLoadMap();

    this.map.on("moveend", function() {
      socketioService.moveMap();
      console.log("move");
    });
  },
  computed: {
    ...mapGetters(["sourceBaseMap", "user", "map"]),
  },
  methods: {
    ...mapActions([
      "getAllTileLayers",
      "initMap",
      "getMissions",
      "initEventClickMap",
      "getSchemes",
    ]),
    initLoadMap() {
      this.sourceBaseMap.on("tileloadstart", () => {
        this.$Loading.start();
      });

      this.sourceBaseMap.on("tileloadend", () => {
        this.$Loading.finish();
      });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");

      //handle Logout from BE
    },
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
.information-user {
  position: absolute;
  top: 10px;
  right: 80px;
  z-index: 999;
}
.user-info-dropdown li {
  border-bottom: 1px solid #e8eaec;
  padding: 8px;
}
</style>
