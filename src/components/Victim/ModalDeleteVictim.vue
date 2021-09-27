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
        <Button type="error" @click="deleteVictim" size="large">Xóa</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["show", "hide", "victim"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.showModalDelete = false;
    },
    async deleteVictim() {
      const res = await this.callApi("delete", "/victims/" + this.victim.id);
      let resImage = null;
      if (this.victim.image.length > 0) {
        resImage = await this.callApi("post", "/victims/delete-image", {
          imageName: this.victim.image,
        });
        if (resImage.status !== 201) {
          this.swr();
        }
      }
      if (res.status === 200) {
        this.s("Xóa Nạn nhân thành công");
        this.$emit("deleteVictim");
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
