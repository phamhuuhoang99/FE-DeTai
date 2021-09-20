<template>
  <Modal
    v-model="onShow"
    title="Thêm người cần TKCN"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80">
      <FormItem label="Họ tên">
        <Input placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Ngày sinh">
        <DatePicker type="date" placeholder="Ngày sinh"></DatePicker>
      </FormItem>
      <FormItem label="Quê quán">
        <Input placeholder="Nhập quê quán ..." />
      </FormItem>
      <FormItem label="Đặc điểm nhận dạng">
        <Input
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
  props: ["show", "hide"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    onShow: function() {
      return this.show;
    },
  },
};
</script>

<style></style>
