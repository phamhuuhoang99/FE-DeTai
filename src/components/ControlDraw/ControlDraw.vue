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
      <Button @click="drawPolygon" type="success" icon="md-crop" shape="circle">
      </Button>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { startDraw } from "../../common/draw";
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
      "setDraw",
    ]),
    drawArrow() {
      const draw = startDraw(this.map, this.colorDraw, "Arrow");
      this.setDraw(draw);
      this.setTypeDrawScheme("Arrow");
      this.endDraw();
    },
    drawLine() {
      const draw = startDraw(this.map, this.colorDraw, "LineString");
      this.setDraw(draw);
      this.setTypeDrawScheme("LineString");
      this.endDraw();
    },
    drawPolygon() {
      const draw = startDraw(this.map, this.colorDraw, "Polygon");
      this.setDraw(draw);
      this.setTypeDrawScheme("Polygon");
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
      this.colorDraw = data;
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
