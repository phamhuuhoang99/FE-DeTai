<template>
  <div>
    <Modal v-model="onShow" title="Chi tiết nhiệm vụ" @on-cancel="onCancel">
      <Form :model="mission" :label-width="80">
        <FormItem label="Tên">
          <Input v-model="mission.name" placeholder="Nhập tên nhiệm vụ..." />
        </FormItem>
        <FormItem label="Thời gian">
          <Row>
            <Col span="11">
              <DatePicker
                type="date"
                placeholder="Bắt đầu"
                :options="options3"
                v-model="mission.start_date"
              ></DatePicker>
            </Col>
            <Col span="2" style="text-align: center"> - </Col>
            <Col span="11">
              <DatePicker
                type="date"
                placeholder="Select date"
                :options="options3"
                v-model="mission.end_date"
              ></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Mô tả">
          <Input
            v-model="mission.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onCancel()">
          Hủy
        </Button>
        <Button type="primary" @click="onSave()">
          Thêm Nhiệm vụ
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import GeoJSON from "ol/format/GeoJSON";
import { flash } from "../../animation/animation";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { eventBus } from "../../main";
export default {
  props: ["show"],
  data() {
    return {
      onShow: this.show,
      mission: {
        ...this.defaultMission,
      },
      defaultMission: {
        name: "",
        start_date: null,
        end_date: null,
        description: "",
        location: null,
      },
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
    };
  },
  methods: {
    ...mapActions(["clearSourceDraw"]),
    ...mapMutations(["setView"]),
    ...mapGetters(["map", "layers"]),
    onCancel() {
      this.onShow = false;
      this.clearSourceDraw();
    },
    async onSave() {
      const source = this.$store.state.draw.source_;
      var geoJSONformat = new GeoJSON();
      var featureGeojson = geoJSONformat.writeFeaturesObject(
        source.getFeatures()
      );
      const geojsonFeatureArray = featureGeojson.features;
      const geom = geojsonFeatureArray[0].geometry;

      this.mission.location = geom;

      const res = await this.callApi("post", "/missions/create", this.mission);
      console.log(res);
      if (res.status === 200) {
        this.s("Thêm thành công");
        this.onShow = false;
        eventBus.$emit("addMission", res.data);
        this.mission = { ...this.defaultMission };
      } else {
        if (res.status === 500) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }

      const view = this.$store.state.view;
      const center = geom.coordinates;
      const layer = this.$store.state.layers[0];
      const map = this.$store.state.map;
      view.animate({
        zoom: 11,
        duration: 800,
        center: center,
      });

      let point = new Point(center);
      let feature = new Feature(point);
      window.setInterval(() => {
        flash(feature, layer, map);
      }, 1000);
      this.setView(view);
    },
  },
  watch: {
    show: function(value) {
      this.onShow = value;
    },
    onShow: function(value) {
      this.$emit("onClose", value);
    },
  },
};
</script>

<style></style>
