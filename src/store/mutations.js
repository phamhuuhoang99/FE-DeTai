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
  UPDATE_MISSION(state, mission) {
    const indexMission = state.missions.findIndex((item) => {
      return item.id === mission.id;
    });

    state.missions[indexMission] = { ...mission };
  },
  UPDATE_SCHEME(state, scheme) {
    const indexScheme = state.schemes.findIndex((item) => {
      return item.id === scheme.id;
    });

    state.schemes[indexScheme] = { ...scheme };
  },
  setIsDrawingScheme(state, isDrawingScheme) {
    state.isDrawingScheme = isDrawingScheme;
  },
  setColorDraw(state, colorDraw) {
    state.colorDraw = colorDraw;
  },
  setSourceBaseMap(state, sourceBaseMap) {
    state.sourceBaseMap = sourceBaseMap;
  },
  setSchemes(state, schemes) {
    state.schemes = schemes;
  },
  setLayerScheme(state, layerScheme) {
    state.layerScheme = layerScheme;
  },
  setTypeDrawScheme(state, typeDrawScheme) {
    state.typeDrawScheme = typeDrawScheme;
  },
  setLayerOverlayEdit(state, layerOverlayEdit) {
    state.layerOverlayEdit = layerOverlayEdit;
  },
  setIsEditingScheme(state, isEditingScheme) {
    state.isEditingScheme = isEditingScheme;
  },
};
