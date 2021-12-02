<template>
  <div>
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
      <template slot-scope="{ index }" slot="image">
        <Avatar
          v-if="data[index].image.length > 0"
          :src="preUrl + '/uploads/' + data[index].image"
          shape="square"
          icon="ios-person"
          size="large"
        />
      </template>

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
    <ModalDeleteVictim
      :show="showModalDelete"
      :victim="victimDelete"
      :hide="hideModalDelete"
      @deleteVictim="deleteVictimHandler"
    />
  </div>
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
          slot: "image",
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
      data: [],
      victimDelete: null,
      indexVictimDelete: null,
      showModalAdd: false,
      showModalDelete: false,
      preUrl: process.env.VUE_APP_ROOT_API,
    };
  },
  computed: {
    urlImage: function(index) {
      return index;
    },
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
      this.indexVictimDelete = index;
      this.victimDelete = this.data[index];
    },

    hideModalDelete() {
      this.showModalDelete = false;
    },
    addVictimHandler(data) {
      this.showModalAdd = false;
      this.data.push(data);
    },
    deleteVictimHandler() {
      this.data.splice(this.indexVictimDelete, 1);
      this.indexVictimDelete = null;
      this.victimDelete = null;
    },
  },
  async created() {
    const res = await this.callApi("get", "/victims");
    if (res.status === 200) {
      this.data = res.data;
    }
  },
};
</script>

<style></style>
