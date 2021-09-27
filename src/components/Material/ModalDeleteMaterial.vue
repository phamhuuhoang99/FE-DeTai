<template>
  <div>
    <Modal :value="onShow" :mask-closable="false" :closable="false" width="360">
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>Xác nhận yêu cầu xóa</span>
      </p>
      <div style="text-align: center">
        <p>Bạn có muốn xóa?</p>
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="hide()">Hủy</Button>
        <Button @click="deleteMaterial" type="error" size="large">Xóa</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["show", "hide", "materialId"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.showModalDelete = false;
    },
    async deleteMaterial() {
      const res = await this.callApi("delete", "/materials/" + this.materialId);

      if (res.status === 200) {
        this.s("Xóa CSVC thành công");
        this.$emit("deleteMaterial");
      } else {
        this.swr();
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
