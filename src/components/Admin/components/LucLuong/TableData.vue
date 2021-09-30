<template>
  <div>
    <Table style="margin-top: 15px" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ index }" slot="image">
        <Avatar
          v-if="data[index].image.length > 0"
          :src="preUrl + '/uploads/units/' + data[index].image"
          shape="square"
          icon="ios-person"
          size="large"
        />
      </template>
      <template slot-scope="{ index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px"
          >Sửa</Button
        >
        <Button @click="deleteUnit(index)" type="error" size="small"
          >Xóa</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  props: ["listUnit"],
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
          key: "number",
          align: "center",
        },
        {
          title: "Số lượng phương tiện",
          key: "vehicleNumber",
          align: "center",
        },
        {
          title: "Symbol",
          slot: "image",
          key: "image",
          align: "center",
        },
        {
          title: "Vị trí",
          key: "posision",
          align: "center",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data: [],
      preUrl: process.env.VUE_APP_ROOT_API,
    };
  },
  methods: {
    deleteUnit(index) {
      this.$emit("deleteUnit", this.data[index]);
    },
  },
  created() {
    this.data = this.listUnit;
  },
  watch: {
    listUnit: function(data) {
      this.data = data;
    },
  },
};
</script>
<style></style>
