import TileWMS from "ol/source/TileWMS";
import { flash } from "../../animation/animation";
import axios from "axios";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
const missionModule = {
  state: {
    missions: [],
    layerMission: null,
    sourceMission: new TileWMS({
      url: "http://localhost:8090/geoserver/hoang/wms",
      params: { LAYERS: "hoang:missions", tiled: true },
      serverType: "geoserver",
    }),
  },
  getters: {
    layerMission: (state) => state.layerMission,
    sourceMission: (state) => state.sourceMission,
    missions: (state) => state.missions,
  },
  actions: {
    async getMissions(context) {
      try {
        const res = await axios.get("/missions");
        context.commit("setMissions", res.data);
        const layer = context.getters.layers[1];
        const map = context.getters.map;

        context.state.missions.forEach((mission) => {
          let coordinates = mission.location.coordinates;
          let point = new Point(coordinates);
          let feature = new Feature(point);

          window.setInterval(() => {
            flash(feature, layer, map);
          }, 1000);
        });
      } catch (error) {
        console.log(error);
      }
    },
    addMission(context, newMission) {
      context.commit("ADD_MISSION", newMission);
    },
    deleteMission(context, missionId) {
      context.commit("DELETE_MISSION", missionId);
    },
    updateMission(context, mission) {
      context.commit("UPDATE_MISSION", mission);
    },
  },
  mutations: {
    setLayerMission(state, layerMission) {
      state.layerMission = layerMission;
    },
    setMissions(state, missions) {
      state.missions = [...missions];
    },
    ADD_MISSION(state, newMission) {
      state.missions.unshift(newMission);
    },
    DELETE_MISSION(state, missionId) {
      state.missions = state.missions.filter(
        (mission) => mission.id !== missionId
      );
      console.log(state);
    },
    UPDATE_MISSION(state, mission) {
      const indexMission = state.missions.findIndex((item) => {
        return item.id === mission.id;
      });
      state.missions[indexMission] = { ...mission };
    },
  },
};

export default missionModule;
