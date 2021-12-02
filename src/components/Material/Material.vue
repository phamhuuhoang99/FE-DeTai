<template>
  <div>
    <Button shape="circle" icon="md-add" @click="onShowModalAdd"
      >Thêm CSVC</Button
    >
    <Table
      no-data-text="Không có dữ liệu"
      style="margin-top:10px"
      border
      :columns="columns"
      :data="materials"
    >
      <template slot-scope="{ index }" slot="action">
        <Button
          type="error"
          shape="circle"
          icon="ios-trash"
          size="small"
          style="margin-right: 5px"
          @click="onShowModalDelete(index)"
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
    <ModalAddMaterial
      :show="showModalAdd"
      :hide="onHideModalAdd"
      :missionId="missionId"
      @addMaterial="addMaterialHandler"
    />
    <ModalDeleteMaterial
      :show="showModalDelete"
      :hide="onHideModalDelete"
      :materialId="idMaterialDelete"
      @deleteMaterial="deleteMaterialHandler"
    />
  </div>
</template>

<script>
import ModalAddMaterial from "./ModalAddMaterial.vue";
import ModalDeleteMaterial from "./ModalDeleteMaterial.vue";
export default {
  components: { ModalAddMaterial, ModalDeleteMaterial },
  props: ["missionId"],
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
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
      materials: [],
      indexMaterialDelete: null,
      idMaterialDelete: null,
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
    onShowModalDelete(index) {
      this.showModalDelete = true;
      this.indexMaterialDelete = index;
      this.idMaterialDelete = this.materials[index].id;
    },
    onHideModalDelete() {
      this.showModalDelete = false;
    },
    addMaterialHandler(data) {
      this.showModalAdd = false;
      this.materials.push(data);
    },
    deleteMaterialHandler() {
      this.materials.splice(this.indexMaterialDelete, 1);
      this.indexMaterialDelete = null;
      this.idMaterialDelete = null;
      this.showModalDelete = false;
    },
  },
  async created() {
    const res = await this.callApi("get", "/materials");
    if (res.status === 200) {
      this.materials = res.data;
    }
  },
};
</script>

<style></style>
