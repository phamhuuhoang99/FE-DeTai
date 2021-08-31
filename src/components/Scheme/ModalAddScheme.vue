<template>
  <Modal
    v-model="isDrawingScheme"
    title="Thêm mới phương án"
    :closable="false"
    :mask-closable="false"
  >
    <Form
      ref="formAddScheme"
      label-position="left"
      :model="scheme"
      :label-width="100"
    >
      <!-- <Form :model="formLeft" label-position="left" :label-width="100"> -->
      <FormItem label="Tên ">
        <Input
          type="text"
          v-model="scheme.name"
          placeholder="Nhập tên phương án"
        >
        </Input>
      </FormItem>
      <!-- <FormItem label="Tên đơn vị">
        <Select v-model="model12" filterable multiple>
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </FormItem> -->
      <FormItem label="Thời gian xuất phát">
        <DatePicker
          clear-text="Chọn"
          v-model="scheme.time_start"
          type="datetime"
          placeholder="Thời gian xuất phát"
          style="width: 200px"
        ></DatePicker>
      </FormItem>

      <FormItem label="Ghi chú" prop="note">
        <Input
          v-model="scheme.note"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập ghi chú..."
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="cancel">
        Hủy
      </Button>
      <Button type="primary" @click="save">
        Thêm phương án
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import GeoJSON from "ol/format/GeoJSON";
export default {
  props: ["planId"],
  data() {
    return {
      scheme: {
        name: "",
        idDonVi: null,
        time_start: null,
        note: "",
        geom: null,
        validate: {},
      },
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
      ],
      model11: "",
      model12: [],
    };
  },
  computed: {
    ...mapGetters(["isDrawingScheme", "draw"]),
  },
  methods: {
    ...mapMutations(["setIsDrawingScheme"]),
    ...mapActions(["clearSourceDraw"]),
    cancel() {
      this.setIsDrawingScheme(false);
      this.clearSourceDraw();
    },
    save() {
      const source = this.draw.source_;
      var geoJSONformat = new GeoJSON();
      var featureGeojson = geoJSONformat.writeFeaturesObject(
        source.getFeatures()
      );
      const geojsonFeatureArray = featureGeojson.features;
      const geom = geojsonFeatureArray[0].geometry;
      this.scheme.geom = geom;

      console.log(this.planId);
    },
  },
};
</script>

<style></style>
