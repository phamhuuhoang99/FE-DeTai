<template>
  <div class="list-mission">
    <Modal
      v-model="showModalDelete"
      :mask-closable="false"
      :closable="false"
      width="360"
    >
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>Xác nhận yêu cầu xóa</span>
      </p>
      <div style="text-align: center">
        <p>Bạn có muốn xóa Nhiệm vụ?</p>
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="onCancel">Hủy</Button>
        <Button type="error" size="large" @click="deleteMission()">Xóa</Button>
      </div>
    </Modal>

    <MissionItem
      :showModal="showModalDelete"
      @deleteModal="deleteModalHandler"
      :missionDetail="mission"
      v-for="mission in missions"
      :key="mission.id"
    ></MissionItem>
  </div>
</template>
<script>
import MissionItem from "./MissionItem.vue";
import { eventBus } from "../../main";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { flash } from "../../animation/animation";
import { mapActions, mapGetters } from "vuex";
// import TileWMS from "ol/source/TileWMS";
export default {
  components: { MissionItem },
  data() {
    return {
      missions: [],
      showModalDelete: false,
      missionDelete: null,
    };
  },
  async created() {
    const res = await this.callApi("get", "/missions");
    if (res.status === 200) {
      this.missions = res.data;

      const layer = this.$store.state.layers[1];
      const map = this.$store.state.map;

      this.missions.forEach((mission) => {
        let coordinates = mission.location.coordinates;
        let point = new Point(coordinates);
        let feature = new Feature(point);

        window.setInterval(() => {
          flash(feature, layer, map);
        }, 1000);
      });
    }

    eventBus.$on("addMission", (mission) => {
      this.missions.unshift(mission);
    });
  },
  mounted() {},

  methods: {
    ...mapActions(["clearSourceDraw"]),
    ...mapGetters(["layerMission", "sourceMission"]),
    showModalDeleteHandler() {
      this.showModalDelete = true;
    },
    onCancel() {
      this.showModalDelete = false;
    },

    deleteModalHandler(mission) {
      this.missionDelete = mission;
      this.showModalDelete = true;
    },

    async deleteMission() {
      const indexObjDelete = this.missions.findIndex((mission) => {
        return mission.id == this.missionDelete.id;
      });

      const res = await this.callApi(
        "delete",
        "/missions/" + this.missionDelete.id
      );
      if (res.status === 200) {
        this.s("Xoá nhiệm vụ thành công");
        this.missions.splice(indexObjDelete, 1);
        this.showModalDelete = false;

        this.clearInterval();

        //code ngu
        const layer = this.$store.state.layers[1];
        const map = this.$store.state.map;

        this.missions.forEach((mission) => {
          let coordinates = mission.location.coordinates;
          let point = new Point(coordinates);
          let feature = new Feature(point);

          window.setInterval(() => {
            flash(feature, layer, map);
          }, 1000);
        });
        //code ngu
        this.clearSourceDraw();
        this.updateLayer(
          this.$store.state.layerMission,
          this.$store.state.sourceMission
        );
      } else {
        this.swr();
      }
    },
  },
};
</script>

<style scoped>
.list-mission {
  color: "#000";
  margin: "5px 10px";
  /* overflow: scroll; */
  height: 760px;
  overflow: auto;
}
</style>
