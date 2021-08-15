<template>
  <div id="app">
    <Layouts> <MapContainer /> </Layouts>
  </div>
</template>

<script>
import Layouts from "./components/Layouts/Layouts.vue";
import MapContainer from "./components/Map/MapContainer.vue";

export default {
  name: "App",
  components: { Layouts, MapContainer },
  data() {
    return {};
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  box-sizing: border-box;
}
</style>
