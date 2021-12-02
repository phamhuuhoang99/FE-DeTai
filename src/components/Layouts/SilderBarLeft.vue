<template>
  <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
    <MenuItem name="1-2">
      <Button
        type="primary"
        icon="ios-pin"
        long
        @click="addMisson"
        v-if="!isAddLocation"
      >
        Thêm Mới Nhiệm vụ
      </Button>
      <Button
        v-if="isAddLocation"
        type="primary"
        long
        :loading="!addingPoint"
        @click="stopMisson"
      >
        Tiếp tục
      </Button>
    </MenuItem>
    <MenuItem name="1-1">
      <Input suffix="ios-search" placeholder="Nhập tên nhiệm vụ" size="large" />
    </MenuItem>
    <AddMission @onClose="closeHandler" :show="isAddMission" />
    <Spin size="large" fix v-if="isAddingScheme"></Spin>
  </Menu>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AddMission from "../Missions/AddMission";
import GeoJSON from "ol/format/GeoJSON";
import { eventBus } from "../../main";
import { startDraw } from "../../common/draw";
export default {
  components: { AddMission },
  data() {
    return {
      isAddLocation: false,
      isAddMission: false,
      adding: false,
      isAddingScheme: false,
    };
  },
  computed: {
    ...mapGetters(["map", "draw"]),
    menuitemClasses: function() {
      return ["menu-item", this.closable ? "collapsed-menu" : ""];
    },
    addingPoint: function() {
      var geoJSONformat = new GeoJSON();
      var featureGeojson = geoJSONformat.writeFeaturesObject(
        this.draw.source_.getFeatures()
      );
      return featureGeojson.features.length > 0;
    },
  },
  methods: {
    ...mapActions(["stopDraw"]),
    ...mapMutations(["setDraw"]),
    addMisson() {
      const draw = startDraw(this.map, "#FF0000", "Point");
      this.setDraw(draw);
      this.i("Thêm địa điểm xảy ra thảm họa");
      this.isAddLocation = true;
    },
    stopMisson() {
      this.stopDraw();
      this.i("Thêm chi tiết nhiệm vụ");
      this.isAddMission = true;
    },
    closeHandler(value) {
      this.isAddMission = value;
      this.isAddLocation = false;

      // this.clearSourceDraw();
    },
  },
  created() {
    eventBus.$on("showControlDraw", (show) => {
      this.isAddingScheme = show;
    });
    eventBus.$on("hideControlDraw", (show) => {
      this.isAddingScheme = show;
    });
  },
};
</script>
<style scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
