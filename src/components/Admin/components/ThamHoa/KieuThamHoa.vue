<template>
  <div>
    <div class="button_add">
      <Button type="primary" icon="ios-add" @click="onShowModalAdd"
        >Thêm</Button
      >
    </div>
    <Table style="margin-top: 15px" border :columns="columns12" :data="symbols">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="image">
        <Avatar
          v-if="row.image.length > 0"
          :src="preUrl + '/uploads/symbols/' + row.image"
          shape="square"
          icon="ios-person"
          size="large"
        />
      </template>

      <template slot-scope="{ index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px"
          >Sửa</Button
        >
        <Button @click="onShowModalDelete(index)" type="error" size="small"
          >Xóa</Button
        >
      </template>
    </Table>
    <ModalAdd
      :show="showModalAdd"
      :hide="hideModalAdd"
      @addSymbol="addSymbolHandler"
    />
    <ModalDelete
      :show="showModalDelete"
      :hide="hideModalDelete"
      :symbol="symbolDelete"
      @deleteSymbol="deleteSymbolHandler"
    />
  </div>
</template>
<script>
import ModalAdd from "./ModalAdd.vue";
import ModalDelete from "./ModalDelete.vue";
export default {
  components: {
    ModalAdd,
    ModalDelete,
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
          key: "image",
          slot: "image",
          align: "center",
        },
        {
          title: "Đặc thù thảm họa",
          key: "type",
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
      symbols: [],
      showModalAdd: false,
      showModalDelete: false,
      indexSymbolDelete: null,
      symbolDelete: null,
      preUrl: process.env.VUE_APP_ROOT_API,
    };
  },
  methods: {
    onShowModalAdd() {
      this.showModalAdd = true;
    },
    hideModalAdd() {
      this.showModalAdd = false;
    },
    onShowModalDelete(index) {
      this.showModalDelete = true;
      this.indexSymbolDelete = index;
      this.symbolDelete = this.symbols[index];
    },

    hideModalDelete() {
      this.showModalDelete = false;
    },
    addSymbolHandler(data) {
      this.symbols.push(data);
      this.showModalAdd = false;
    },
    deleteSymbolHandler() {
      this.symbols.splice(this.indexSymbolDelete, 1);
      this.indexSymbolDelete = null;
      this.symbolDelete = null;
    },
  },
  async created() {
    const res = await this.callApi("get", "/symbols");
    if (res.status === 200) {
      this.symbols = res.data;
    }
  },
};
</script>
<style scoped>
.button_add {
  margin: 10px 0;
}
</style>
