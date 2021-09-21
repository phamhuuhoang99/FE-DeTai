<template>
  <Modal
    v-model="onShow"
    title="Thêm CSVC cần bảo vệ"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80">
      <FormItem label="Nhập tên">
        <Input placeholder="Nhập tên CSVC ..." />
      </FormItem>
      <FormItem label="Mô tả">
        <Input placeholder="Nhập Mô tả ..." />
      </FormItem>

      <FormItem label="Loại CSVC">
        <Input placeholder="Nhập loại CSVC ..." />
      </FormItem>
      <FormItem label="Trạng thái">
        <Input placeholder="Nhập trạng thái CSVC ..." />
      </FormItem>
      <FormItem label="Ghi chú">
        <Input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập đặc điểm..."
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
