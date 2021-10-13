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
          <span style="margin-left:5px" @click="editMission">
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
    <Divider />
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
        <Victim :missionId="missionDetail.id" />
      </TabPane>
      <TabPane label="CSVC Bảo vệ" icon="md-settings">
        <Material :missionId="missionDetail.id" />
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
import { eventBus } from "../../main";
import { mapGetters } from "vuex";
import Victim from "../Victim/Victim.vue";
import Material from "../Material/Material.vue";
// import { Snap, Modify } from "ol/interaction";
import { modifySnapMap } from "../../common/modifySnapMap";
import GeoJSON from "ol/format/GeoJSON";
import { editFeaturePoint } from "../../common/editFeaturePoint";
export default {
  props: ["missionDetail", "showAddPlan"],
  components: { Victim, Material },
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
    editMission() {
      const modify = modifySnapMap(this.layerMission).modify;
      const snap = modifySnapMap(this.layerMission).snap;

      this.map.addInteraction(snap);
      this.map.addInteraction(modify);
      const sourceMissionLayer = this.layerMission.getSource();

      editFeaturePoint(sourceMissionLayer, this.missions, this.missionDetail);
      modify.on("modifyend", () => {
        var geoJSONformat = new GeoJSON();
        var featureGeojson = geoJSONformat.writeFeaturesObject(
          modify
            .getOverlay()
            .getSource()
            .getFeatures()
        );

        const geojsonFeatureArray = featureGeojson.features;
        const geom = geojsonFeatureArray[0].geometry;
        const editMap = {
          snap,
          modify,
        };
        this.$emit("editModalMission", this.missionDetail, geom, editMap);
      });
    },
  },
  computed: {
    ...mapGetters(["view", "map", "layerMission", "missions"]),
  },
};
</script>
<style scoped>
.i-icon {
  margin-left: 5px;
}
</style>
