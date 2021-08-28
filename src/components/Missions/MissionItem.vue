<template>
  <Card :style="{ margin: '5px' }" :bordered="true">
    <div slot="title">
      <Row>
        <Col span="20">
          <p style="color:#2db7f5">
            <Icon type="ios-book"></Icon>
            <strong>{{ missionDetail.name }}</strong>
          </p>
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
          no-data-text="Không có dữ liệu"
          style="margin-top:10px"
          border
          :columns="columns1"
          :data="data1"
        >
          <template slot-scope="{ index }" slot="action">
            <Tooltip content="Xóa Kế hoạch" placement="top">
              <Button
                type="error"
                shape="circle"
                icon="ios-trash"
                size="small"
                style="margin-right: 5px"
                @click="show(index)"
              ></Button>
            </Tooltip>
            <Tooltip content="Sửa Kế hoạch" placement="top-end">
              <Button
                shape="circle"
                icon="ios-create"
                type="warning"
                size="small"
                @click="remove(index)"
              ></Button>
            </Tooltip>
          </template>
        </Table>
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
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: "Tên Kế Hoạch",
          key: "name",
        },
        {
          title: "Mô tả",
          key: "description",
          align: "left",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "Action",
          slot: "action",
          width: 90,
          align: "center",
        },
      ],
      data1: this.missionDetail.plans,
    };
  },
  created() {
    eventBus.$on("addPlan", (plan) => {
      if (plan.missionId === this.missionDetail.id) {
        this.data1.push(plan);
      }
    });
  },
  methods: {
    deleteMission: function(mission) {
      this.$emit("deleteModalMission", mission);
    },
    show(index) {
      console.log(index);
    },
    remove(index) {
      console.log(index);
    },
  },
};
</script>
<style scoped>
.i-icon {
  margin-left: 5px;
}
</style>
