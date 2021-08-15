<template>
  <div class="list-mission">
    <mission-item></mission-item>
  </div>
</template>
<script>
import MissionItem from "./MissionItem.vue";

export default {
  component: { "mission-item": MissionItem },
};
</script>

<style scoped>
.list-mission {
  color: "#000";
  margin: "5px 10px";
}
</style>
