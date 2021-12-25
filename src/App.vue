<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setUser"]),
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token && this.$route.name !== "login") {
      this.$router.push("/login");
    }
  },

  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await this.callApi("get", "/users/user");
    if (res.status !== 200) {
      //clear user from state
      this.setUser(null);
      //clear Token from header
      localStorage.clear();
      // back to login
      this.$router.push("/login");
    } else if (res.status === 200) {
      this.setUser(res.data);
    }
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
* {
  word-break: break-word !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  box-sizing: border-box;
}
</style>
