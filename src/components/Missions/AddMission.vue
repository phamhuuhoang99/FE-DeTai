<template>
  <div>
    <Modal
      v-model="onShow"
      ok-text="Lưu"
      cancel-text="Hủy"
      @on-cancel="onCancel"
      @on-ok="onSave"
      title="Chi tiết nhiệm vụ"
    >
      <Form :model="mission" :label-width="80">
        <FormItem label="Tên">
          <Input
            v-model="mission.name"
            placeholder="Nhập tên nhiệm vụ..."
          ></Input>
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
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import GeoJSON from "ol/format/GeoJSON";
import { flash } from "../../animation/animation";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
export default {
  props: ["show"],
  data() {
    return {
      onShow: this.show,
      mission: {
        name: "",
        start_date: null,
        end_date: null,
        description: "",
      },
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["clearSourceDraw"]),
    ...mapMutations(["setView"]),
    ...mapGetters(["map", "layers"]),
    onCancel() {
      this.clearSourceDraw();
    },
    onSave() {
      const source = this.$store.state.draw.source_;
      var geoJSONformat = new GeoJSON();
      var featureGeojson = geoJSONformat.writeFeaturesObject(
        source.getFeatures()
      );
      var geojsonFeatureArray = featureGeojson.features;
      const view = this.$store.state.view;

      const center = geojsonFeatureArray[0].geometry.coordinates;
      let geom = new Point(center);
      let feature = new Feature(geom);
      const layer = this.$store.state.layers[0];
      const map = this.$store.state.map;

      view.animate({
        zoom: 11,
        duration: 800,
        center: center,
      });
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
