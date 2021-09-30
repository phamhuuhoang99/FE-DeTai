<template>
  <div>
    <Modal :value="onShow" :mask-closable="false" :closable="false" width="360">
      <p slot="header" style="color: #f60circle; text-align: center">
        <Icon type="ios-information-"></Icon>
        <span>Xác nhận yêu cầu xóa</span>
      </p>
      <div style="text-align: center">
        <p>Bạn có muốn xóa?</p>
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="hide()">Hủy</Button>
        <Button type="error" @click="deletePersonnel" size="large">Xóa</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["show", "hide", "personnel"],
  data() {
    return {};
  },
  methods: {
    async deletePersonnel() {
      const res = await this.callApi(
        "delete",
        "/personnel/" + this.personnel.id
      );
      if (res.status === 200) {
        this.s("Xóa Nhân sự thành công");
        this.$emit("deletePersonnel");
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
