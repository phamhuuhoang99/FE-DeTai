<template>
  <div>
    <div class="button_add">
      <Button @click="onShowModalAdd" type="primary" icon="ios-add"
        >Thêm</Button
      >
    </div>
    <TableData
      :listPersonnel="dataPersonnel"
      @deletePersonnel="onDeleteUnitHandler"
    />
    <ModalAdd
      :show="showModalAdd"
      :hide="hideModalAdd"
      @addPersonnel="addPersonnelHandler"
      :units="dataUnit"
    />
    <ModalDelete
      :show="showModalDelete"
      :hide="hideModalDelete"
      :personnel="personnelDelete"
      @deletePersonnel="deletePersonnelHandler"
    />
  </div>
</template>

<script>
import TableData from "./TableData.vue";
import ModalDelete from "./ModalDelete.vue";
import ModalAdd from "./ModalAdd.vue";
export default {
  components: { ModalAdd, TableData, ModalDelete },
  data() {
    return {
      showModalAdd: false,
      showModalDelete: false,
      personnelDelete: null,
      listUnitTK: [],
      listUnitQY: [],
      listPersonelTK: [],
      listPersonelQY: [],
    };
  },
  async created() {
    const [resUnit, resPersonel] = await Promise.all([
      this.callApi("get", "/units"),
      this.callApi("get", "/personnel"),
    ]);
    if (resUnit.status === 200) {
      this.listUnitTK = [
        ...resUnit.data.filter((unit) => unit.typeUnit === "TK"),
      ];
      this.listUnitQY = [
        ...resUnit.data.filter((unit) => unit.typeUnit === "QY"),
      ];
    }
    if (resPersonel.status === 200) {
      this.listPersonelTK = [
        ...resPersonel.data.filter(
          (personnel) => personnel.unit.typeUnit === "TK"
        ),
      ];
      this.listPersonelQY = [
        ...resPersonel.data.filter(
          (personnel) => personnel.unit.typeUnit === "QY"
        ),
      ];
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
    addPersonnelHandler(data) {
      this.showModalAdd = false;
      if (this.typeUnit === "TK") {
        this.listPersonelTK.unshift(data);
      } else if (this.typeUnit === "QY") this.listPersonelQY.unshift(data);
    },
    onDeleteUnitHandler(personnel) {
      this.onShowModalDelete();
      this.personnelDelete = personnel;
    },
    deletePersonnelHandler() {
      if (this.typeUnit === "QY") {
        let index = this.listPersonelQY.findIndex((item) => {
          return item.id === this.personnelDelete.id;
        });
        this.listPersonelQY.splice(index, 1);
      } else if (this.typeUnit === "TK") {
        let index = this.listPersonelTK.findIndex((item) => {
          return item.id === this.personnelDelete.id;
        });
        this.listPersonelTK.splice(index, 1);
      }

      this.unitDelete = null;
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isRouteTimKiem() {
      return this.currentRouteName === "nhanSuTimKiem";
    },
    isRouteQuanY() {
      return this.currentRouteName === "nhanSuQuanY";
    },
    dataUnit() {
      if (this.isRouteTimKiem) return this.listUnitTK;
      return this.listUnitQY;
    },
    dataPersonnel() {
      if (this.isRouteTimKiem) return this.listPersonelTK;
      return this.listPersonelQY;
    },
    typeUnit() {
      if (this.isRouteTimKiem) return "TK";
      return "QY";
    },
  },
};
</script>

<style></style>
