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
        <Button type="error" @click="deleteSymbol" size="large">Xóa</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["show", "hide", "symbol"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.showModalDelete = false;
    },
    async deleteSymbol() {
      const [res, resImage] = await Promise.all([
        this.callApi("delete", "/symbols/" + this.symbol.id),
        this.callApi("post", "/symbols/delete-image", {
          imageName: this.symbol.image,
        }),
      ]);
      if (res.status === 200 && resImage.status === 201) {
        this.s("Xóa Nạn nhân thành công");
        this.$emit("deleteSymbol");
        this.hide();
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
