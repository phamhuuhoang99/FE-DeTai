<template>
  <div>
    <div class="button_add">
      <Button @click="onShowModalAdd" type="primary" icon="ios-add"
        >Thêm</Button
      >
    </div>
    <TableData :listUnit="data" @deleteUnit="onDeleteUnitHandler" />
    <!-- <DVQuanY v-if="isRouteQuanY" :listUnit="listUnitTK" /> -->
    <ModalAdd
      :show="showModalAdd"
      :hide="hideModalAdd"
      @addUnit="addUnitHandler"
      :type="typeUnit"
    />
    <ModalDelete
      :show="showModalDelete"
      :hide="hideModalDelete"
      :unit="unitDelete"
      @removeUnit="deleteUnitHandler"
    />
  </div>
</template>

<script>
import TableData from "./TableData.vue";
import ModalDelete from "./ModalDelete.vue";
import ModalAdd from "./ModalAdd.vue";
export default {
  components: { TableData, ModalDelete, ModalAdd },
  data() {
    return {
      showModalAdd: false,
      showModalDelete: false,
      unitDelete: null,
      listUnitTK: [],
      listUnitQY: [],
    };
  },
  async created() {
    const res = await this.callApi("get", "/units");
    if (res.status === 200) {
      this.listUnitTK = [...res.data.filter((unit) => unit.typeUnit === "TK")];
      this.listUnitQY = [...res.data.filter((unit) => unit.typeUnit === "QY")];
    }
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
    addUnitHandler(data) {
      this.showModalAdd = false;
      if (data.typeUnit === "TK") {
        this.listUnitTK.push(data);
      } else if (data.typeUnit === "QY") this.listUnitQY.push(data);
    },
    onDeleteUnitHandler(unit) {
      this.onShowModalDelete();
      this.unitDelete = unit;
    },
    deleteUnitHandler() {
      if (this.unitDelete.typeUnit === "QY") {
        let index = this.listUnitQY.findIndex((item) => {
          return item.id === this.unitDelete.id;
        });
        this.listUnitQY.splice(index, 1);
      } else if (this.unitDelete.typeUnit === "TK") {
        let index = this.listUnitTK.findIndex((item) => {
          return item.id === this.unitDelete.id;
        });

        this.listUnitTK.splice(index, 1);
      }

      this.unitDelete = null;
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isRouteTimKiem() {
      return this.currentRouteName === "donViTimKiem";
    },
    isRouteQuanY() {
      return this.currentRouteName === "donViQuanY";
    },
    data() {
      if (this.isRouteTimKiem) return this.listUnitTK;
      return this.listUnitQY;
    },
    typeUnit() {
      if (this.isRouteTimKiem) return "TK";
      return "QY";
    },
  },
};
</script>

<style></style>
