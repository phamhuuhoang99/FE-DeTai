<template>
  <div>
    <Modal
      :value="showModalDelete"
      :mask-closable="false"
      :closable="false"
      width="360"
    >
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>Xác nhận yêu cầu xóa</span>
      </p>
      <div style="text-align: center">
        <p>Bạn có muốn xóa?</p>
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="closeModal">Hủy</Button>
        <Button type="error" size="large" @click="deleteUser">Delete</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["onShow", "idUser"],
  data() {
    return {
      showModalDelete: this.onShow,
    };
  },
  methods: {
    closeModal() {
      this.showModalDelete = false;
    },
    async deleteUser() {
      const res = await this.callApi("delete", "/users/" + this.idUser);
      if (res.status === 200) {
        this.s("Deleted successfully");
      } else {
        this.swr();
      }
      this.$emit("deleteUser");
    },
  },
  watch: {
    onShow: function(value) {
      this.showModalDelete = value;
    },
    showModalDelete: function(value) {
      this.$emit("hideModalDelele", value);
    },
  },
};
</script>

<style></style>
