<template>
  <div class="detail-plan">
    <Button
      ghost
      long
      type="success"
      icon="md-arrow-back"
      @click="backToMission"
      :disabled="isAddScheme"
      >Quay lại nhiệm vụ
    </Button>
    <h2 class="title">Chi tiết kế hoạch</h2>
    <Row class="row-plan">
      <Col span="12">
        <p>Tên kế hoạch</p>
      </Col>
      <Col span="12">{{ plan.name }}</Col>
    </Row>
    <Row class="row-plan">
      <Col span="12">
        <p>Mô tả</p>
      </Col>
      <Col span="12">{{ plan.description }}</Col>
    </Row>

    <Button
      v-show="!isAddScheme"
      class="row-plan"
      type="primary"
      shape="circle"
      icon="md-add"
      @click="addScheme"
      >Thêm phương án</Button
    >

    <Button
      v-show="isAddScheme"
      class="row-plan"
      type="error"
      shape="circle"
      icon="md-close"
      @click="closeAddScheme"
      >Hủy</Button
    >
    <Table
      no-data-text="Không có dữ liệu"
      class="row-plan"
      border
      :columns="columns"
      :data="plan.schemes"
    >
      <template slot-scope="{ index }" slot="note">
        <Button
          size="small"
          v-bind:style="{
            margiRight: 5 + 'px',
            background: plan.schemes[index].color_scheme,
          }"
          @click="show(index)"
          icon="md-eye"
          shape="circle"
        ></Button>

        <Tooltip content="Mô phỏng" placement="top">
          <Button
            :style="{ marginLeft: 5 + 'px' }"
            size="small"
            type="primary"
            shape="circle"
            icon="md-play"
            @click="eventStart(index)"
          ></Button>
        </Tooltip>

        <Button
          :style="{ marginLeft: 5 + 'px' }"
          size="small"
          type="error"
          shape="circle"
          icon="md-trash"
        ></Button>
      </template>
    </Table>

    <ModalAddScheme :planId="plan.id" @addScheme="addSchemeHandler" />
  </div>
</template>

<script>
import { eventBus } from "../../main";
import ModalAddScheme from "../Scheme/ModalAddScheme";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  props: ["data"],
  components: { ModalAddScheme },
  data() {
    return {
      isAddScheme: false,
      columns: [
        {
          title: "Phương án",
          key: "name",
        },
        {
          title: "Xuất phát",
          key: "time_start",
        },
        {
          title: "Tên đơn vị",
          key: "age",
        },
        {
          title: "Ghi chú",
          slot: "note",

          width: 120,
        },
      ],
      isAddingScheme: false,
      plan: Object,
    };
  },
  computed: {
    ...mapGetters(["overlay"]),
  },
  async created() {
    const res = await this.callApi("get", "/plans/" + this.data.id);

    if (res.status === 200) {
      this.plan = res.data;
    }

    eventBus.$on("showControlDraw", (show) => {
      this.isAddingScheme = show;
    });
    eventBus.$on("hideControlDraw", (show) => {
      this.isAddingScheme = show;
    });
    this.setIsDrawingScheme(false);
  },
  methods: {
    ...mapMutations(["setIsDrawingScheme"]),
    ...mapActions(["startSimulation"]),
    backToMission() {
      this.$emit("showMission", true);
    },
    addScheme() {
      this.isAddScheme = true;
      eventBus.$emit("showControlDraw", this.isAddScheme);
    },
    closeAddScheme() {
      this.isAddScheme = false;
      eventBus.$emit("hideControlDraw", this.isAddScheme);
    },
    addSchemeHandler(data) {
      this.plan.schemes.push(data);
    },
    show(index) {
      const content = document.getElementById("popup-content");
      const closer = document.getElementById("popup-closer");
      const geom = this.plan.schemes[index].geom.coordinates;

      const coordinate = geom[geom.length - 2];
      console.log(coordinate);

      closer.onclick = () => {
        this.overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

      content.innerHTML =
        "<b>Tên Kế hoạch</b>: " +
        this.plan.name +
        "<br> <b>Tên phương án</b>: " +
        this.plan.schemes[index].name +
        "<br> <b>Thời gian xuất phát</b>: " +
        this.plan.schemes[index].time_start +
        "<br> <b>Mô tả</b>: " +
        this.plan.schemes[index].note;

      this.overlay.setPosition(coordinate);
    },
    eventStart(index) {
      console.log(index);
      this.startSimulation(this.plan.schemes[index].geom);
      // this.startSimulation();
    },
  },
};
</script>

<style>
.detail-plan {
  margin: 0px 16px;
}
.row-plan,
.title {
  margin: 8px 0px;
}
</style>
