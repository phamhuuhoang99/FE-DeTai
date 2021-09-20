export default {
  setMap(state, map) {
    state.map = map;
  },
  setTarget(state, target) {
    state.target = target;
  },
  setView(state, view) {
    state.view = view;
  },
  setLayers(state, layers) {
    state.layers = [...layers];
  },
  setDraw(state, draw) {
    state.draw = draw;
  },
  setLayerMission(state, layerMission) {
    state.layerMission = layerMission;
  },
  setOverlay(state, overlay) {
    state.overlay = overlay;
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
  },
  setIsDrawingScheme(state, isDrawingScheme) {
    state.isDrawingScheme = isDrawingScheme;
  },
  setColorDraw(state, colorDraw) {
    state.colorDraw = colorDraw;
  },
  // setPlanSeeDetail(state, plan) {
  //   state.planSeeDetail = plan;
  // },
};
