<template>
  <Modal
    v-model="onShow"
    title="Thêm CSVC cần bảo vệ"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80" :model="material">
      <FormItem label="Nhập tên">
        <Input placeholder="Nhập tên CSVC ..." v-model="material.name" />
      </FormItem>

      <FormItem label="Loại CSVC">
        <Input v-model="material.type" placeholder="Nhập loại CSVC ..." />
      </FormItem>
      <FormItem label="Trạng thái">
        <!-- <Input
          v-model="material.status"
          placeholder="Nhập trạng thái CSVC ..."
        /> -->
        <Select v-model="material.status" placeholder="Chọn trạng thái">
          <Option
            v-for="item in listStatus"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="Mô tả">
        <Input
          type="textarea"
          v-model="material.description"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập Mô tả..."
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="hide()">
        Hủy
      </Button>
      <Button type="primary" @click="onSave">
        Thêm Nhiệm vụ
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "hide", "missionId"],
  data() {
    return {
      material: {
        name: "",
        description: "",
        type: "",
        status: "",
      },
      materialDefault: {
        name: "",
        description: "",
        type: "",
        status: "",
      },
      listStatus: [
        {
          value: "CSVC Mới",
          label: "CSVC Mới",
        },
        {
          value: "CSVC Cũ",
          label: "CSVC Cũ",
        },
        {
          value: "CSVC Hỏng",
          label: "CSVC Hỏng",
        },
      ],
    };
  },
  methods: {
    async onSave() {
      if (this.material.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên CSVC");
      }

      const res = await this.callApi("post", "/materials/create", {
        ...this.material,
        missionId: this.missionId,
      });

      if (res.status === 200) {
        this.s("Thêm thành công");
        this.$emit("addMaterial", res.data);
        this.material = { ...this.defaultMaterial };
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
  computed: {
    onShow: function() {
      return this.show;
    },
  },
};
</script>

<style></style>
