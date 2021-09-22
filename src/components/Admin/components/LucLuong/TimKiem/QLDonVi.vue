<template>
  <div>
    <div class="button_add">
      <Button @click="onShowModalAdd" type="primary" icon="ios-add"
        >Thêm</Button
      >
    </div>
    <Table style="margin-top: 15px" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>

      <template slot="action">
        <Button type="primary" size="small" style="margin-right: 5px"
          >Sửa</Button
        >
        <Button type="error" size="small">Xóa</Button>
      </template>
    </Table>
    <ModalAdd :show="showModalAdd" :hide="hideModalAdd" />
  </div>
</template>

<script>
import ModalAdd from "./ModalAdd.vue";
export default {
  components: { ModalAdd },
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: "Tên đơn vị",
          key: "name",
          align: "center",
        },
        {
          title: "Quân số",
          key: "total",
          align: "center",
        },
        {
          title: "Số lượng phương tiện",
          key: "totalVehicle",
          align: "center",
        },
        {
          title: "Symbol",
          key: "symbol",
          align: "center",
        },
        {
          title: "Vị trí",
          key: "posision",
          align: "center",
        },
      ],
      data: [
        {
          name: "Huu hoang",
        },
      ],
      showModalAdd: false,
    };
  },
  methods: {
    onShowModalAdd() {
      this.showModalAdd = true;
    },
    hideModalAdd() {
      this.showModalAdd = false;
    },
    // onShowModalDelete() {
    //   this.showModalDelete = true;
    // },

    // hideModalDelete() {
    //   this.showModalDelete = false;
    // },
  },
};
</script>
<style></style>
