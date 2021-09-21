<template>
  <fragment>
    <Button shape="circle" icon="md-add" @click="onShowModalAdd"
      >Thêm CSVC</Button
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
      </template>
    </Table>
    <ModalAddMaterial :show="showModalAdd" :hide="onHideModalAdd" />
    <ModalDeleteMaterial :show="showModalDelete" :hide="onHideModalDelete" />
  </fragment>
</template>

<script>
import ModalAddMaterial from "./ModalAddMaterial.vue";
import ModalDeleteMaterial from "./ModalDeleteMaterial.vue";
export default {
  components: { ModalAddMaterial, ModalDeleteMaterial },
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
          title: "Tên CSVC",
          key: "name",
          width: 150,
          align: "center",
        },
        { title: "Mô tả", key: "description", width: 150, align: "center" },
        {
          title: "Loại CSVC",
          key: "type",
          width: 100,
          align: "center",
        },
        { title: "Trạng thái", key: "status", width: 100, align: "center" },
        {
          title: "Ghi chú",
          key: "note",
          width: 100,
          align: "center",
        },
        {
          title: "Action",
          slot: "action",
          width: 100,
          align: "center",
          fixed: "right",
        },
      ],
      data: [
        {
          name: "Huu Hoang",
        },
      ],
      showModalAdd: false,
      showModalDelete: false,
    };
  },
  methods: {
    onShowModalAdd() {
      this.showModalAdd = true;
    },
    onHideModalAdd() {
      this.showModalAdd = false;
    },
    onShowModalDelete() {
      this.showModalDelete = true;
    },
    onHideModalDelete() {
      this.showModalDelete = false;
    },
  },
};
</script>

<style></style>
