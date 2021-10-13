<template>
  <div>
    <Modal
      v-model="onShow"
      title="Chi tiết nhiệm vụ"
      @on-cancel="onCancel"
      :closable="false"
      :mask-closable="false"
    >
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
          Sửa Nhiệm vụ
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { resetAnimation } from "../../animation/resetAnimation";
// import GML from "ol/format/GML";
import { editFeaturePoint } from "../../common/editFeaturePoint";
export default {
  props: ["show", "mission", "hide", "editMap"],
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      "missions",
      "layerMission",
      "map",
      "layers",
      "view",
      "draw",
    ]),
    onShow: function() {
      return this.show;
    },
  },
  methods: {
    ...mapActions(["updateMission"]),
    ...mapMutations(["setView"]),
    onCancel() {
      this.hide();
      const sourceMissionLayer = this.layerMission.getSource();
      editFeaturePoint(sourceMissionLayer, this.missions, null);
      this.map.removeInteraction(this.editMap.modify);
      this.map.removeInteraction(this.editMap.snap);
    },
    async onSave() {
      const newLocation = { ...this.mission.newLocation };
      this.mission.location = newLocation;

      const res = await this.callApi(
        "put",
        "/missions/" + this.mission.id,
        this.mission
      );
      if (res.status === 200) {
        this.s("Sửa thành công");
        delete this.mission.newLocation;
        this.updateMission(this.mission);
        this.hide();
      } else {
        if (res.status === 500) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }

      // // let fid_feat_mod = "missions.1";
      // // let name = "XX";
      // var format = new GML({
      //   srsName: "urn:ogc:def:crs:EPSG::4326",
      // });
      // //var id = mod_features[i].getId();

      // var gml3 = format.writeGeometry(newLocation.coordinates, {
      //   featureProjection: "urn:ogc:def:crs:EPSG::4326",
      // });
      // var body =
      //   '<wfs:Transaction service="WFS"\n' +
      //   'version="1.0.0"\n' +
      //   'xmlns:topp="http://www.openplans.org/topp"\n' +
      //   'xmlns:ogc="http://www.opengis.net/ogc"\n' +
      //   'xmlns:wfs="http://www.opengis.net/wfs">\n' +
      //   '<wfs:Update typeName="hoang:missions">\n' +
      //   "<wfs:Property>\n" +
      //   "<wfs:Name>location</wfs:Name>\n" +
      //   "<wfs:Value>" +
      //   gml3 +
      //   "</wfs:Value>\n" +
      //   "</wfs:Property>\n" +
      //   "<ogc:Filter>\n" +
      //   '<ogc:FeatureId fid="missions.1"/></ogc:Filter>\n' +
      //   "</wfs:Update>\n" +
      //   "</wfs:Transaction>";

      // await axios
      //   .post("http://localhost:8090/geoserver/wfs", body, {
      //     headers: {
      //       "X-Requested-With": "XMLHttpRequest",
      //       "Content-type": "text/xml",
      //     },
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // var req = new XMLHttpRequest();
      // req.open("POST", "http://localhost:8090/geoserver/wfs", false);
      // req.setRequestHeader("Content-type", "text/xml");
      // req.onreadystatechange = function() {
      //   if (req.readyState != 4) return;
      //   if (req.status != 200 && req.status != 304) {
      //     alert("HTTP error " + req.status);
      //     return;
      //   }
      //   // req_res[i] = req.responseText;

      //   //alert(req.responseText);
      //   //  Ext.MessageBox.alert('Status', 'changes saved successfully');
      // };
      // if (req.readyState == 4) return;
      // req.send(body);

      this.map.removeInteraction(this.editMap.modify);
      this.map.removeInteraction(this.editMap.snap);
      editFeaturePoint(this.layerMission.getSource(), this.missions, null);

      // const center = newLocation.coordinates;
      const layer = this.layers[0];
      // this.view.animate({
      //   zoom: 16,
      //   duration: 900,
      //   center: center,
      // });
      this.clearInterval();
      resetAnimation(this.missions, layer, this.map);
      this.setView(this.view);
    },
  },
  watch: {},
};
</script>

<style></style>
