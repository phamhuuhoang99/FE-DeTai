<template>
  <div>
    <Table style="margin-top: 15px" border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px"
          >Sửa</Button
        >
        <Button @click="deletePersonnel(index)" type="error" size="small"
          >Xóa</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  props: ["listPersonnel"],
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: "Tên Nhân sự",
          key: "name",
          align: "center",
        },
        {
          title: "Đơn vị",
          key: "unitName",
          align: "center",
        },
        {
          title: "Chức vụ",
          key: "position",
          align: "center",
        },
        {
          title: "Cấp bậc",
          key: "rank",
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
    deletePersonnel(index) {
      this.$emit("deletePersonnel", this.data[index]);
    },
  },
  created() {
    console.log(this.listPersonnel);
    const newData = this.listPersonnel.map((item) => {
      return {
        ...item,
        unitName: item.unit.name,
      };
    });
    this.data = newData;
  },
  watch: {
    listPersonnel: function(data) {
      const newData = data.map((item) => {
        return {
          ...item,
          unitName: item.unit.name,
        };
      });
      this.data = newData;
    },
  },
};
</script>
<style></style>
