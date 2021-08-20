<template>
  <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
    <MenuItem name="1-2">
      <Icon type="ios-pin" v-if="closable"></Icon>
      <Button type="primary" icon="ios-pin" long v-if="!closable"
        >Thêm Mới Nhiệm vụ</Button
      >
    </MenuItem>
    <MenuItem name="1-1">
      <Icon type="ios-search" v-if="closable"></Icon>
      <Input
        suffix="ios-search"
        placeholder="Nhập tên nhiệm vụ"
        size="large"
        v-if="!closable"
      />
    </MenuItem>
  </Menu>
</template>
<script>
export default {
  props: ["closable", "collapsed-width"],
  data() {
    return {};
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.closable ? "collapsed-menu" : ""];
    },
  },
};
</script>
<style scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
