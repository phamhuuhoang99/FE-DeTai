<template>
  <fragment>
    <Button @click="onShowModalAdd" shape="circle" icon="md-add"
      >Thêm đối tượng</Button
    >
    <Table
      no-data-text="Không có dữ liệu"
      style="margin-top:10px"
      border
      :columns="columns"
      :data="data"
    >
      <template slot-scope="" slot="action">
        <Button
          type="error"
          shape="circle"
          icon="ios-trash"
          size="small"
          style="margin-right: 5px"
          @click="onShowModalDelete"
        ></Button>

        <Button
          shape="circle"
          icon="ios-create"
          type="warning"
          size="small"
          style="margin-right: 5px"
        ></Button>

        <Button
          shape="circle"
          icon="ios-eye"
          type="primary"
          size="small"
        ></Button>
      </template>
    </Table>

    <ModalAddPerson :show="showModalAdd" :hide="hideModalAdd" />
    <ModalDeletePerson :show="showModalDelete" :hide="hideModalDelete" />
  </fragment>
</template>

<script>
import ModalAddPerson from "./ModalAddPerson.vue";
import ModalDeletePerson from "./ModalDeletePerson.vue";
export default {
  components: { ModalAddPerson, ModalDeletePerson },
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          title: "Họ tên",
          key: "name",
          width: 150,
          align: "center",
        },
        {
          title: "Ngày sinh",
          key: "birthday",
          width: 130,
          align: "center",
        },
        {
          title: "Quê quán",
          key: "nativePlace",
          width: 130,
          align: "center",
        },
        {
          title: "Đặc điểm",
          key: "",
          width: 100,
          align: "center",
        },
        {
          title: "Hình ảnh",
          key: "image",
          width: 100,
          align: "center",
        },
        {
          title: "Action",
          slot: "action",
          width: 120,
          align: "center",
          fixed: "right",
        },
      ],
      showModalAdd: false,
      showModalDelete: false,
      data: [
        {
          name: "Huu Hoang",
        },
      ],
    };
  },
  methods: {
    onShowModalAdd() {
      this.showModalAdd = true;
    },
    hideModalAdd() {
      this.showModalAdd = false;
    },
    onShowModalDelete() {
      this.showModalDelete = true;
    },

    hideModalDelete() {
      this.showModalDelete = false;
    },
  },
};
</script>

<style></style>
