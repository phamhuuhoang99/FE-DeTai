<template>
  <div>
    <Button @click="showModal" type="primary" size="large">
      <Icon type="ios-add" />
      Thêm</Button
    >

    <Table style="margin-top: 15px" border :columns="columns" :data="users">
      <template slot-scope="{ row }" slot="first_name">
        <strong>{{ row.first_name }}</strong>
      </template>
      <template slot="action">
        <Button type="warning" style="margin-right: 5px" size="small"
          >Sửa</Button
        >
        <Button type="error" size="small">Xóa</Button>
      </template>
    </Table>
    <ModalAddUser
      @addUser="addUserHandler"
      @clicked="onChange"
      :onShow="modal1"
    />
  </div>
</template>
<script>
import ModalAddUser from "./ModalAddUser.vue";
export default {
  components: { ModalAddUser },
  data() {
    return {
      columns: [
        {
          title: "Họ",
          key: "last_name",
        },
        {
          title: "Tên",
          slot: "first_name",
        },
        {
          title: "Tên tài khoản",
          key: "username",
        },
        {
          title: "Email",
          key: "email",
        },
        {
          title: "Số điện thoại",
          key: "phone",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      users: [],
      modal1: false,
    };
  },
  methods: {
    showModal() {
      this.modal1 = true;
    },
    onChange(value) {
      console.log("changed");
      this.modal1 = value;
    },
    addUserHandler(user) {
      this.users.unshift(user);
    },
  },
  async created() {
    const res = await this.callApi("get", "/users");
    if (res.status === 200) {
      this.users = res.data;
    }
  },
};
</script>
<style scoped></style>
