<template>
  <fragment>
    <div class="button_add">
      <Button type="primary" icon="ios-add" @click="onShowModalAdd"
        >Thêm</Button
      >
    </div>
    <Table border :columns="columns12" :data="data6">
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
  </fragment>
</template>
<script>
import ModalAdd from "./ModalAdd.vue";
export default {
  components: {
    ModalAdd,
  },
  data() {
    return {
      columns12: [
        {
          title: "Kiểu thảm họa",
          slot: "name",
        },
        {
          title: "Hình ảnh",
          key: "symbol",
        },
        {
          title: "Đặc thù thảm họa",
          key: "dacthu",
        },
        {
          title: "Ghi chú",
          key: "note",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data6: [
        {
          name: "Cháy",
        },
        {
          name: "Nổ",
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
<style scoped>
.button_add {
  margin: 10px 0;
}
</style>
