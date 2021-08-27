<template>
  <Card :style="{ margin: '5px' }" :bordered="true">
    <div slot="title">
      <Row>
        <Col span="20">
          <p><Icon type="ios-book"></Icon> {{ missionDetail.name }}</p>
        </Col>
        <Col span="4">
          <span @click="deleteMission(missionDetail)">
            <Icon type="md-trash" size="20" color="red" />
          </span>
          <span style="margin-left:5px">
            <Icon type="ios-create" size="20" color="#ff9900" />
          </span>
        </Col>
      </Row>
    </div>
    <div class="info-mission">
      <Row>
        <Col span="12">
          <p>Thời gian bắt đầu</p>
        </Col>
        <Col span="12">{{ missionDetail.start_date }}</Col>
      </Row>
      <Row>
        <Col span="12">
          <p>Thời gian kết thúc</p>
        </Col>
        <Col span="12">{{ missionDetail.end_date }}</Col>
      </Row>
      <Row>
        <Col span="12">
          <p>Mô tả</p>
        </Col>
        <Col span="12">{{ missionDetail.description }}</Col>
      </Row>
    </div>

    <Tabs type="card">
      <TabPane label="Kế hoạch" size="large" icon="logo-buffer">
        <Button @click="showAddPlan(missionDetail)" shape="circle" icon="md-add"
          >Thêm kế hoạch</Button
        >
        <Table
          highlight-row
          style="margin-top:10px"
          border
          :columns="columns1"
          :data="data1"
        ></Table>
      </TabPane>

      <TabPane label="Đơn vị tham gia" icon="md-people"></TabPane>
      <TabPane label="" icon="md-create"></TabPane>
      <!-- <TabPane label="" icon="ios-pricetags">标签三的内容</TabPane>
      <TabPane label="" icon="ios-paper">标签三的内容</TabPane> -->
    </Tabs>
  </Card>
</template>
<script>
import { eventBus } from "../../main";
export default {
  props: ["missionDetail", "showAddPlan"],
  data() {
    return {
      columns1: [
        {
          title: "Tên Kế Hoạch",
          key: "name",
        },
        {
          title: "Mô tả",
          key: "description",
        },
      ],
      data1: this.missionDetail.plans,
    };
  },
  mounted() {
    eventBus.$on("addPlan", (plan) => {
      this.data1.push(plan);
    });
  },
  methods: {
    deleteMission: function(mission) {
      this.$emit("deleteModalMission", mission);
    },
  },
};
</script>
<style scoped>
.i-icon {
  margin-left: 5px;
}
</style>
