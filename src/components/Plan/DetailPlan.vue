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
      <Col span="12">{{ data.name }}</Col>
    </Row>
    <Row class="row-plan">
      <Col span="12">
        <p>Mô tả</p>
      </Col>
      <Col span="12">{{ data.description }}</Col>
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
      :columns="columns1"
      :data="data1"
    ></Table>

    <ModalAddScheme />
  </div>
</template>

<script>
import { eventBus } from "../../main";
import ModalAddScheme from "../Scheme/ModalAddScheme";
export default {
  props: ["data"],
  components: { ModalAddScheme },
  data() {
    return {
      isAddScheme: false,
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "Tên phương án",
          key: "name",
        },
        {
          title: "Tên đơn vị",
          key: "age",
        },
      ],
      isAddingScheme: false,
      data1: [],
    };
  },
  created() {
    eventBus.$on("showControlDraw", (show) => {
      this.isAddingScheme = show;
    });
    eventBus.$on("hideControlDraw", (show) => {
      this.isAddingScheme = show;
    });
  },
  methods: {
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
