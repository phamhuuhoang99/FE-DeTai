<template>
  <div class="layout">
    <Layout :style="{ minHeight: '99vh' }">
      <Header />
      <Layout>
        <Sider :style="{ background: '#fff', minWidth: '250px' }">
          <MenuSider />
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <Breadcrumb :style="{ margin: '24px 0' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Header from "./HeaderAdmin.vue";
import MenuSider from "./MenuSider.vue";
export default {
  components: { Header, MenuSider },
};
</script>
<style scoped>
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
