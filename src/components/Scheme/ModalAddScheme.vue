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
      <FormItem label="Tên đơn vị">
        <Select v-model="model12" filterable multiple>
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="Thời gian xuất phát">
        <DatePicker
          type="datetime"
          placeholder="Select date and time"
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
      <Button type="primary">
        Thêm phương án
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      scheme: {
        name: "",
        idDonVi: null,
        timeStart: null,
        note: "",
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
    ...mapGetters(["isDrawingScheme"]),
  },
  methods: {
    ...mapMutations(["setIsDrawingScheme"]),
    ...mapActions(["clearSourceDraw"]),
    cancel() {
      this.setIsDrawingScheme(false);
      this.clearSourceDraw();
    },
  },
};
</script>

<style></style>
