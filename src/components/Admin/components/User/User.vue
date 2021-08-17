<template>
  <div>
    <Button @click="showModal" type="primary" size="large">
      <Icon type="ios-add" />
      Thêm</Button
    >

    <Table style="margin-top: 15px" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot="action">
        <Button type="warning" style="margin-right: 5px" size="small"
          >Sửa</Button
        >
        <Button type="error" size="small">Xóa</Button>
      </template>
    </Table>
    <ModalAddUser @clicked="onChange" :onShow="modal1" />
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
          key: "lastname",
        },
        {
          title: "Tên",
          slot: "name",
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
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
        },
      ],
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
  },
};
</script>
<style scoped></style>
