<template>
  <Modal
    v-model="onShow"
    title="Thêm Nhân sự "
    :closable="false"
    :mask-closable="false"
  >
    <Form :model="personnel" :label-width="100">
      <FormItem label="Tên Nhân sự">
        <Input v-model="personnel.name" placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Đơn vị">
        <Select v-model="personnel.unitId" filterable>
          <Option v-for="item in units" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="Chức vụ">
        <Input
          v-model="personnel.position"
          placeholder="Nhập Chức vụ..."
        ></Input>
      </FormItem>
      <FormItem label="Cấp bậc">
        <Input v-model="personnel.rank" placeholder="Nhập Cấp bậc..."></Input>
      </FormItem>
      <FormItem label="Chuyên môn">
        <Input
          v-model="personnel.specialize"
          placeholder="Nhập Chuyên môn..."
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="hide()">
        Hủy
      </Button>
      <Button type="primary" @click="onSave()">
        Thêm Nhân sự
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "hide", "units"],
  data() {
    return {
      personnel: {
        name: "",
        rank: "",
        position: "",
        unitId: null,
        specialize: "",
      },
      defaultPersonnel: {
        name: "",
        rank: "",
        position: "",
        unitId: null,
        specialize: "",
      },
    };
  },
  methods: {
    async onSave() {
      if (this.personnel.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên Nhân sự");
      }
      if (this.personnel.unitId === null) {
        return this.e("Yêu cầu chọn tên Đơn vị");
      }

      const res = await this.callApi(
        "post",
        "/personnel/create",
        this.personnel
      );

      if (res.status === 200) {
        this.s("Thêm thành công");
        // this.onShow = false;
        const unit = this.units.find((item) => item.id === res.data.unitId);
        this.$emit("addPersonnel", { ...res.data, unit: unit });
        this.personnel = { ...this.defaultPersonnel };
      } else {
        if (res.status === 400) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }
    },
  },
  mounted() {
    console.log(this.units);
  },
  computed: {
    onShow: function() {
      return this.show;
    },
  },
};
</script>

<style></style>
