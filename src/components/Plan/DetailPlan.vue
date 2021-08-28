<template>
  <div class="detail-plan">
    <Button ghost long type="success" icon="md-arrow-back"
      >Quay lại nhiệm vụ
    </Button>
    <h2 class="title">Chi tiết kế hoạch</h2>
    <Row class="row-plan">
      <Col span="12">
        <p>Tên kế hoạch</p>
      </Col>
      <Col span="12">Kế hoạch 1</Col>
    </Row>
    <Row class="row-plan">
      <Col span="12">
        <p>Mô tả</p>
      </Col>
      <Col span="12">Mô Tả 1</Col>
    </Row>

    <Button class="row-plan" type="primary" shape="circle" icon="ios-add"
      >Thêm phương án</Button
    >
    <Table class="row-plan" border :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "Tên phương án",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
      ],
      data1: [],
    };
  },
};
</script>

<style>
.detail-plan {
  margin: 0px 16px;
}
.row-plan,
.title {
  margin: 8px 0px;
}
</style>
