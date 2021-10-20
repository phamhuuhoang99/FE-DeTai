<template>
  <Modal
    v-model="isEditingScheme"
    title="Sửa phương án"
    :closable="false"
    :mask-closable="false"
  >
    <Form label-position="left" :model="scheme" :label-width="100">
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
      <FormItem label="Chọn màu">
        <ColorPicker v-model="scheme.color_scheme" />
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
        Sửa phương án
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import GeoJSON from "ol/format/GeoJSON";
import { styleFeatureScheme } from "../../common/styleFeatureScheme";
export default {
  props: ["scheme"],
  data() {
    return {
      // scheme: {
      //   ...this.defaultScheme,
      // },
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
      ],
      defaultScheme: {
        name: "",
        idDonVi: null,
        time_start: null,
        note: "",
        geom: null,
      },
    };
  },
  // created() {
  //   this.setIsDrawingScheme(false);
  // },
  computed: {
    ...mapGetters([
      "colorDraw",
      "map",
      "layerScheme",
      "schemes",
      "typeDrawScheme",
      "isEditingScheme",
      "layerOverlayEdit",
    ]),
  },
  methods: {
    ...mapMutations(["setIsDrawingScheme", "setIsEditingScheme"]),
    ...mapActions(["clearSourceDraw", "updateScheme"]),
    cancel() {
      this.setIsEditingScheme(false);
      this.layerOverlayEdit.getSource().clear();
      this.map.removeLayer(this.layerOverlayEdit);
    },
    async save() {
      const geoJSONformat = new GeoJSON();
      const featureGeojson = geoJSONformat.writeFeaturesObject(
        this.layerOverlayEdit.getSource().getFeatures()
      );
      const geojsonFeatureArray = featureGeojson.features;
      const geom = geojsonFeatureArray[0].geometry;

      this.scheme.geom = geom;
      const id = this.scheme.id;

      const res = await this.callApi("put", "/schemes/" + id, this.scheme);

      if (res.status === 200) {
        this.s("Sửa thành công");
        this.setIsEditingScheme(false);
        this.updateScheme(this.scheme);

        this.layerScheme.getSource().refresh();

        styleFeatureScheme(this.layerScheme.getSource(), this.schemes);

        this.layerOverlayEdit.getSource().clear();
        this.map.removeLayer(this.layerOverlayEdit);
      } else {
        if (res.status === 500) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }
    },
  },
};
</script>

<style></style>
