<template>
  <Menu active-name="0" theme="light" width="auto">
    <MenuItem to="/admin" name="0">
      <Icon type="ios-speedometer" />
      Bảng Điều Khiển
    </MenuItem>
    <Submenu name="1">
      <template slot="title">
        <Icon type="md-contacts" />
        Quản lý tài khoản
      </template>

      <MenuItem :to="{ name: 'create-user' }" name="1-1">
        <Icon type="md-person-add" />
        Tài Khoản
      </MenuItem>

      <MenuItem :to="{ name: 'dashboard' }" name="1-2">
        <Icon type="md-list" />
        Cấp quyền người dùng
      </MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="md-cloud"></Icon>
        Quản lý Kiêu Thảm họa
      </template>
      <MenuItem :to="{ name: 'kieuThamHoa' }" name="2-1">
        <Icon type="md-list"></Icon>Kiểu thảm họa
      </MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-people"></Icon>
        Lực lượng tìm kiếm
      </template>
      <MenuItem :to="{ name: 'donViTimKiem' }" name="3-1"
        ><Icon type="md-list" />Đơn vị</MenuItem
      >
      <MenuItem name="3-2"><Icon type="md-list" />Nhân sự</MenuItem>
      <MenuItem name="3-3"><Icon type="md-list" />Phương tiện</MenuItem>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="md-people" />
        Lực lượng Quân Y
      </template>
      <MenuItem name="4-1"> <Icon type="md-list" />Đơn vị </MenuItem>
      <MenuItem name="4-2"> <Icon type="md-list" />Nhân sự </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
export default {};
</script>

<style>
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
