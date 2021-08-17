<template>
  <div class="list-mission">
    <MissionItem></MissionItem>
  </div>
</template>
<script>
import MissionItem from "./MissionItem.vue";

export default {
  components: { MissionItem },
};
</script>

<style scoped>
.list-mission {
  color: "#000";
  margin: "5px 10px";
}
</style>
