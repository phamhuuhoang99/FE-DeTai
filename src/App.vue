<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token && this.$route.name != "login") {
      this.$router.push("/login");
    }
  },
  async mounted() {
    const res = await this.callApi("get", "/users/user");
    if (res.status !== 200) {
      //clear user from state
      //clear Token from header
      // back to login
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
