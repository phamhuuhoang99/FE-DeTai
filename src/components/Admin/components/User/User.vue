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
      <template slot-scope="{ index }" slot="action">
        <Button
          type="warning"
          style="margin-right: 5px"
          size="small"
          @click="editUser(index)"
          >Sửa</Button
        >
        <Button
          type="error"
          size="small"
          @click="deleteUser(index, modalDelelte)"
          >Xóa</Button
        >
      </template>
    </Table>
    <ModalAddUser
      @addUser="addUserHandler"
      @clicked="onChange"
      :onShow="modalAdd"
    />
    <ModalDeleteUser
      @hideModalDelele="hideModalDeleleHandler"
      :onShow="modalDelelte"
      :idUser="idDeleteUser"
      @deleteUser="deleteUserHandler"
    />
    <ModalEditUser
      :userEdit="userEdit"
      @hideModalEdit="hideModalEditHandler"
      :onShow="modalEdit"
      @editUser="editUserHandler"
    />
  </div>
</template>
<script>
import ModalAddUser from "./ModalAddUser.vue";
import ModalDeleteUser from "./ModalDeleteUser.vue";
import ModalEditUser from "./ModalEditUser";
export default {
  components: { ModalAddUser, ModalDeleteUser, ModalEditUser },
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: "Họ",
          key: "last_name",
          align: "center",
        },
        {
          title: "Tên",
          slot: "first_name",
          align: "center",
        },
        {
          title: "Tên tài khoản",
          key: "username",
          align: "center",
        },
        {
          title: "Email",
          key: "email",
          align: "center",
        },
        {
          title: "Số điện thoại",
          key: "phone",
          align: "center",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      users: [],
      modalAdd: false,
      modalDelelte: false,
      modalEdit: false,
      idDeleteUser: null,
      indexDeleteUser: null,
      userEdit: {
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        username: "",
        phone: "",
      },
      indexEditUser: -1,
    };
  },
  methods: {
    showModal() {
      this.modalAdd = true;
    },
    onChange(value) {
      this.modalAdd = value;
    },
    hideModalDeleleHandler(value) {
      this.modalDelelte = value;
    },
    hideModalEditHandler(value) {
      this.modalEdit = value;
    },
    addUserHandler(user) {
      this.users.unshift(user);
    },
    deleteUser(index) {
      this.modalDelelte = true;
      this.idDeleteUser = this.users[index].id;
      this.indexDeleteUser = index;
    },
    editUser(index) {
      this.modalEdit = true;
      this.userEdit = this.users[index];
      this.indexEditUser = index;
    },

    editUserHandler(user) {
      console.log("user: ", user);
      this.users[this.indexEditUser] = user;
    },
    deleteUserHandler() {
      this.users.splice(this.indexDeleteUser, 1);
      this.indexDeleteUser = null;
      this.indexDeleteUser = null;
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
