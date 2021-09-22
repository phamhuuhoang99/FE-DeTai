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

    <ModalAddVictim
      :show="showModalAdd"
      :hide="hideModalAdd"
      :missionId="missionId"
      @addVictim="addVictimHandler"
    />
    <ModalDeleteVictim :show="showModalDelete" :hide="hideModalDelete" />
  </fragment>
</template>

<script>
import ModalAddVictim from "./ModalAddVictim.vue";
import ModalDeleteVictim from "./ModalDeleteVictim.vue";
export default {
  components: { ModalAddVictim, ModalDeleteVictim },
  props: ["missionId"],
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
          key: "hometown",
          width: 130,
          align: "center",
        },
        {
          title: "Đặc điểm",
          key: "characteristic",
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
      data: [],
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
    addVictimHandler(data) {
      this.showModalAdd = false;
      console.log(data);
      this.data.push(data);
    },
  },
};
</script>

<style></style>
