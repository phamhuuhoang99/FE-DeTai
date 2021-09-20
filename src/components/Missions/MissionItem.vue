<template>
  <Card :style="{ margin: '5px' }" :bordered="true">
    <div slot="title">
      <Row>
        <Col span="18">
          <p style="color:#2db7f5">
            <Icon type="ios-book"></Icon>
            <strong>{{ missionDetail.name }}</strong>
          </p>
        </Col>
        <Col span="6">
          <span @click="deleteMission(missionDetail)">
            <Icon type="md-trash" size="20" color="red" />
          </span>
          <span style="margin-left:5px">
            <Icon type="ios-create" size="20" color="#ff9900" />
          </span>
          <span style="margin-left:5px" @click="zoomToMission">
            <Icon type="md-eye" size="20" color="#2d8cf0" />
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
            <Tooltip content="Xóa Kế hoạch" placement="top-end">
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
                style="margin-right: 5px"
                @click="remove(index)"
              ></Button>
            </Tooltip>
            <Tooltip content="Xem chi tiết" placement="top-end">
              <Button
                shape="circle"
                icon="ios-eye"
                type="primary"
                size="small"
                @click="showDetail(index)"
              ></Button>
            </Tooltip>
          </template>
        </Table>
      </TabPane>

      <TabPane label="Đối tượng TKCN" icon="md-people">
        <PersonSearch />
      </TabPane>
      <TabPane label="CSVC Bảo vệ" icon="md-settings"></TabPane>
      <!-- <TabPane label="" icon="ios-pricetags">标签三的内容</TabPane>
      <TabPane label="" icon="ios-paper">标签三的内容</TabPane> -->
    </Tabs>
  </Card>
</template>
<script>
import { eventBus } from "../../main";
import { mapGetters } from "vuex";
import PersonSearch from "../PersionSearch/PersonSearch.vue";
export default {
  props: ["missionDetail", "showAddPlan"],
  components: { PersonSearch },
  data() {
    return {
      columns1: [
        {
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: "Kế Hoạch",
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
          width: 120,
          align: "center",
        },
      ],

      data1: this.missionDetail.plans,
    };
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
    showDetail(index) {
      eventBus.$emit("detailPlanOfMission", this.data1[index]);
    },
    zoomToMission() {
      const coordinates = this.missionDetail.location.coordinates;
      this.view.animate({
        zoom: 18,
        duration: 900,
        center: coordinates,
      });
    },
  },
  computed: {
    ...mapGetters(["view"]),
  },
};
</script>
<style scoped>
.i-icon {
  margin-left: 5px;
}
</style>
