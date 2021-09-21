<template>
  <Modal
    v-model="onShow"
    title="Thêm mới Kiểu thảm họa"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80">
      <FormItem label="Tên kiểu thảm họa">
        <Input placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Symble">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem label="Đặc thù thảm họa">
        <Input placeholder="Nhập Đặc thù..." />
      </FormItem>
      <FormItem label="Ghi chú">
        <Input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập ghi chú..."
        ></Input>
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
