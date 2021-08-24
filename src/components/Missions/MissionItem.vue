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

    <Tabs>
      <TabPane label="" size="large" icon="logo-buffer"></TabPane>
      <TabPane label="" icon="md-people">标签二的内容</TabPane>
      <TabPane label="" icon="md-create">标签三的内容</TabPane>
      <TabPane label="" icon="ios-pricetags">标签三的内容</TabPane>
      <TabPane label="" icon="ios-paper">标签三的内容</TabPane>
    </Tabs>
  </Card>
</template>
<script>
export default {
  props: ["missionDetail", "showModal"],

  data() {
    return {
      onShow: this.showModal,
    };
  },
  methods: {
    deleteMission: function(mission) {
      this.onShow = false;
      this.$emit("deleteModal", mission);
    },
  },
  watch: {
    // onShow: function(value) {
    //   this.$emit("hideModal", value);
    // },
  },
};
</script>
<style scoped>
.i-icon {
  margin-left: 5px;
}
</style>
