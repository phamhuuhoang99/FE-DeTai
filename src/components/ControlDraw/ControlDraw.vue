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
      <Button class="mg" type="success" icon="md-remove" shape="circle">
      </Button>
    </Tooltip>

    <Tooltip content="Vẽ đa giác" placement="top">
      <Button type="success" icon="md-crop" shape="circle"> </Button>
    </Tooltip>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      colorDraw: "#FF0000",
    };
  },
  methods: {
    ...mapActions(["startDraw"]),
    ...mapMutations(["setColorDraw"]),
    drawArrow() {
      this.startDraw("Arrow");
    },

    colorChange(data) {
      this.setColorDraw(data);
    },
  },
  computed: {
    // ...mapGetters(["colorDraw"]),
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
