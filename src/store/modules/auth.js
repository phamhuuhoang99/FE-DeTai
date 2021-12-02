const authModule = {
  state: {
    user: {},
    permissions: [],
  },
  getters: {
    user: (state) => state.user,
  },
  actions: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
};

export default authModule;
