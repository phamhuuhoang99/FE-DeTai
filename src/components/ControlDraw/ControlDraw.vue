<template>
  <div class="control-plan">
    <Tooltip content="Chọn màu" placement="top">
      <Button
        class="mg"
        type="primary"
        shape="circle"
        icon="md-color-palette"
      ></Button>
    </Tooltip>
    <Tooltip content="Vẽ mũi tên" placement="top">
      <Button
        class="mg"
        type="success"
        shape="circle"
        icon="md-arrow-round-forward"
        @click="drawArrow"
      ></Button>
    </Tooltip>
    <Tooltip content="Vẽ điểm" placement="top">
      <Button
        class="mg"
        type="success"
        shape="circle"
        icon="md-radio-button-on"
      ></Button>
    </Tooltip>
    <Tooltip content="Vẽ đường" placement="top">
      <Button class="mg" type="success" icon="md-remove" shape="circle">
      </Button>
    </Tooltip>

    <Tooltip content="Vẽ đa giác" placement="top">
      <Button type="success" icon="md-crop" shape="circle"> </Button>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["startDraw"]),
    drawArrow() {
      this.startDraw("Arrow");
    },
  },
  computed: {},
};
</script>

<style scoped>
.control-plan {
  position: absolute;
  top: 10px;
  left: 50px;
  z-index: 999;
}
.mg {
  margin: 0 2px;
}
</style>
