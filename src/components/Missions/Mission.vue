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
        <Button type="error" size="large" @click="onDeleteMission()"
          >Xóa</Button
        >
      </div>
    </Modal>

    <AddPlan
      :mission="missionAddPlan"
      :onShow="showModalAddPlan"
      :onHidden="hideModalPlan"
    />

    <MissionItem
      :showAddPlan="showModalPlan"
      @deleteModalMission="deleteModalMissionHandler"
      :missionDetail="mission"
      v-for="mission in missions"
      :key="mission.id"
    ></MissionItem>
  </div>
</template>
<script>
import MissionItem from "./MissionItem.vue";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { flash } from "../../animation/animation";
import { mapActions, mapGetters } from "vuex";
import AddPlan from "../Plan/ModalAddPlan.vue";
export default {
  components: { MissionItem, AddPlan },
  data() {
    return {
      showModalDelete: false,
      missionDelete: null,
      showModalAddPlan: false,
      missionAddPlan: Object,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["layerMission", "sourceMission", "missions"]),
  },

  methods: {
    ...mapActions(["clearSourceDraw", "deleteMission"]),
    // showModalDeleteHandler() {
    //   this.showModalDelete = true;
    // },
    onCancel() {
      this.showModalDelete = false;
    },
    deleteModalMissionHandler(mission) {
      this.missionDelete = mission;
      this.showModalDelete = true;
    },

    async onDeleteMission() {
      // const indexObjDelete = this.missions.findIndex((mission) => {
      //   return mission.id == this.missionDelete.id;
      // });

      const res = await this.callApi(
        "delete",
        "/missions/" + this.missionDelete.id
      );
      if (res.status === 200) {
        this.s("Xoá nhiệm vụ thành công");
        // this.missions.splice(indexObjDelete, 1);
        this.deleteMission(this.missionDelete.id);
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
    showModalPlan(mission) {
      this.missionAddPlan = mission;
      this.showModalAddPlan = true;
    },
    hideModalPlan() {
      this.showModalAddPlan = false;
    },
  },
};
</script>

<style scoped>
.list-mission {
  color: "#000";
  margin: "5px 10px";
  /* overflow: scroll; */
  height: 720px;
  overflow: auto;
}
</style>
