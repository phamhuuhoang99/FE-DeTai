<template>
  <div>
    <div class="button_add">
      <Button type="primary"><Icon type="ios-add" />Thêm</Button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        { title: "Id", key: "id" },
        {
          title: "Name",
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
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped>
.button_add {
  margin: 10px 0;
}
</style>
