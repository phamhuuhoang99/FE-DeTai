<template>
  <Modal
    v-model="onShow"
    title="Thêm người cần TKCN"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80" :model="victim">
      <FormItem label="Họ tên">
        <Input placeholder="Nhập tên ..." v-model="victim.name" />
      </FormItem>
      <FormItem label="Ngày sinh">
        <DatePicker
          type="date"
          placeholder="Ngày sinh"
          v-model="victim.birthday"
        ></DatePicker>
      </FormItem>
      <FormItem label="Quê quán">
        <Input placeholder="Nhập quê quán ..." v-model="victim.hometown" />
      </FormItem>
      <FormItem label="Đặc điểm nhận dạng">
        <Input
          v-model="victim.characteristic"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập đặc điểm..."
        ></Input>
      </FormItem>
      <FormItem label="Hình ảnh">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="hide()">
        Hủy
      </Button>
      <Button type="primary" @click="onSave()">
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
      victim: {
        ...this.defaultVictim,
      },
      defaultVictim: {
        name: "",
        birthday: null,
        hometown: "",
        characteristic: "",
        image: "",
        missionId: null,
      },
    };
  },
  methods: {
    async onSave() {
      if (this.victim.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên nạn nhân");
      }

      const res = await this.callApi("post", "/victims/create", {
        victim: { ...this.victim, missionId: this.missionId },
      });

      if (res.status === 200) {
        this.s("Thêm thành công");
        // this.onShow = false;
        this.$emit("addVictim", res.data);
        this.victim = { ...this.defaultVictim };
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
