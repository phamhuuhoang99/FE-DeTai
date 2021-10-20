<template>
  <div class="control-plan">
    <Tooltip content="Chọn màu" placement="top">
      <!-- <Button
        class="mg"
        type="primary"
        shape="circle"
        icon="md-color-palette"
      ></Button> -->
      <ColorPicker v-model="colorDraw" @on-change="colorChange" />
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
      <Button
        @click="drawLine"
        class="mg"
        type="success"
        icon="md-remove"
        shape="circle"
      >
      </Button>
    </Tooltip>

    <Tooltip content="Vẽ đa giác" placement="top">
      <Button type="success" icon="md-crop" shape="circle"> </Button>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      colorDraw: "#FF0000",
    };
  },
  methods: {
    ...mapActions(["startDraw"]),
    ...mapMutations([
      "setColorDraw",
      "setTypeDrawScheme",
      "setIsDrawingScheme",
    ]),
    drawArrow() {
      this.startDraw("Arrow");
      this.setTypeDrawScheme("Arrow");
      this.endDraw();
    },
    drawLine() {
      this.startDraw("LineString");
      this.setTypeDrawScheme("LineString");
      this.endDraw();
    },
    endDraw() {
      this.draw.on("drawend", () => {
        setTimeout(() => {
          this.setIsDrawingScheme(true);
          this.map.removeInteraction(this.draw);
        }, 500);
      });
    },

    colorChange(data) {
      this.setColorDraw(data);
    },
  },
  computed: {
    ...mapGetters(["draw", "map"]),
  },
};
</script>

<style scoped>
.control-plan {
  position: absolute;
  top: 10px;
  left: 150px;
  z-index: 999;
}
.mg {
  margin: 0 2px;
}
</style>
