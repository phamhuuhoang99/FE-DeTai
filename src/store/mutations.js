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
};
