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
      @editModalMission="editModalMissionHandler"
      :missionDetail="mission"
      v-for="mission in missions"
      :key="mission.id"
    ></MissionItem>

    <EditMission
      :show="showModalEdit"
      :mission="missionEdit"
      :hide="onHideModalEdit"
      :editMap="editMap"
    />
  </div>
</template>
<script>
import MissionItem from "./MissionItem.vue";
import { resetAnimation } from "../../animation/resetAnimation";
import { mapActions, mapGetters } from "vuex";
import AddPlan from "../Plan/ModalAddPlan.vue";
import EditMission from "./EditMission";
export default {
  components: { MissionItem, AddPlan, EditMission },
  data() {
    return {
      showModalDelete: false,
      missionDelete: Object,
      showModalAddPlan: false,
      showModalEdit: false,
      missionAddPlan: Object,
      missionEdit: {
        name: "",
        start_date: null,
        end_date: null,
        description: "",
        location: null,
      },
      editMap: Object,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "layerMission",
      "sourceMission",
      "missions",
      "layers",
      "map",
      "layerScheme",
    ]),
  },

  methods: {
    ...mapActions(["clearSourceDraw", "deleteMission"]),
    onCancel() {
      this.showModalDelete = false;
    },
    deleteModalMissionHandler(mission) {
      this.missionDelete = mission;
      this.showModalDelete = true;
    },

    async onDeleteMission() {
      const res = await this.callApi(
        "delete",
        "/missions/" + this.missionDelete.id
      );
      if (res.status === 200) {
        this.s("Xoá nhiệm vụ thành công");
        this.deleteMission(this.missionDelete.id);
        this.showModalDelete = false;

        this.clearSourceDraw();
        this.layerMission.getSource().refresh();
        this.layerScheme.getSource().refresh();

        this.clearInterval();

        resetAnimation(this.missions, this.layers[1], this.map);
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
    onShowModalEdit() {
      this.showModalEdit = true;
    },
    editModalMissionHandler(mission, newLocation, editMap) {
      this.showModalEdit = true;
      this.missionEdit = { ...mission, newLocation: newLocation };
      this.editMap = editMap;
    },
    onHideModalEdit() {
      this.showModalEdit = false;
    },
  },
};
</script>

<style scoped>
.list-mission {
  color: "#000";
  margin: "5px 10px";
  height: 720px;
  overflow: auto;
}
</style>
