<template>
  <Modal
    v-model="onShow"
    title="Thêm Đơn vị tìm Kiếm"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80">
      <FormItem label="Tên đơn vị">
        <Input placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Quân số">
        <Input placeholder="Nhập Quân số..." />
      </FormItem>
      <FormItem label="Số lượng phương tiện">
        <Input placeholder="Nhập số phương tiện..." />
      </FormItem>
      <FormItem label="Symbol">
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
