<template>
  <Card :style="{ margin: '5px' }" :bordered="true">
    <p slot="title"><Icon type="ios-book"></Icon> Bảo vệ chủ tịch nước</p>
    <div class="info-mission">
      <Row>
        <Col span="12">
          <p>Đối tượng bảo vệ</p>
        </Col>
        <Col span="12">Chủ tịch nước</Col>
      </Row>
      <Row>
        <Col span="12">
          <p>Thời gian bắt đầu</p>
        </Col>
        <Col span="12">Time</Col>
      </Row>
      <Row>
        <Col span="12">
          <p>Thời gian kết thúc</p>
        </Col>
        <Col span="12">Time</Col>
      </Row>
      <Row>
        <Col span="12">
          <p>Mô tả</p>
        </Col>
        <Col span="12">Bảo vệ chủ tịch nước</Col>
      </Row>
    </div>

    <Tabs>
      <TabPane label="" size="large" icon="logo-buffer"></TabPane>
      <TabPane label="" icon="md-people">标签二的内容</TabPane>
      <TabPane label="" icon="md-create">标签三的内容</TabPane>
      <TabPane label="" icon="ios-pricetags">标签三的内容</TabPane>
      <TabPane label="" icon="ios-paper">标签三的内容</TabPane>
    </Tabs>
  </Card>
</template>
