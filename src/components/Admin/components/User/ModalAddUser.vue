<template>
  <Modal
    v-model="show"
    title="Thêm một User"
    okText="Thêm"
    cancelText="Hủy"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <div class="form-control">
      <Input size="large" placeholder="Họ"></Input>
    </div>

    <div class="form-control">
      <Input size="large" border placeholder="Tên"></Input>
    </div>
    <div class="form-control">
      <Input size="large" placeholder="Tên Tài Khoản"></Input>
    </div>

    <div class="form-control">
      <Input size="large" password placeholder="Password"></Input>
    </div>
    <div class="form-control">
      <Input size="large" placeholder="Email"></Input>
    </div>
    <div class="form-control">
      <Input size="large" placeholder="Số điện thoaị"></Input>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["onShow"],
  data() {
    return {
      show: this.onShow,
    };
  },
  methods: {
    ok: function() {
      console.log("ok");
    },
    cancel: function() {
      this.$emit("clicked", this.show);
    },
  },
  watch: {
    onShow: function(value) {
      this.show = value;
    },
  },
};
</script>

<style>
.form-control {
  margin: 10px 0;
}
</style>
