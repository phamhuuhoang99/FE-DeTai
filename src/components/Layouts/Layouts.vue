<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider width="450" :collapsed-width="78" :style="{ background: '#fff' }">
        <SilderBarLeft> </SilderBarLeft>
        <Divider />
        <Mission v-if="!showDetailPlan" />
        <DetailPlan @showMission="showListMission" v-else :data="plan" />
      </Sider>
      <Layout>
        <ViewMap />
      </Layout>
      <!-- <SilderBarRight /> -->
    </Layout>
  </div>
</template>
<script>
// import SilderBarRight from "./SilderBarRight.vue";
import Mission from "../Missions/Mission.vue";
import SilderBarLeft from "./SilderBarLeft.vue";
import DetailPlan from "../Plan/DetailPlan.vue";
import ViewMap from "../ViewMap.vue";
import { eventBus } from "../../main";
export default {
  components: { Mission, SilderBarLeft, DetailPlan, ViewMap },
  data() {
    return {
      showDetailPlan: false,
      plan: Object,
    };
  },
  created() {
    eventBus.$on("detailPlanOfMission", (plan) => {
      if (plan) {
        this.showDetailPlan = true;
        this.plan = plan;
      }
    });
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    showListMission() {
      this.showDetailPlan = false;
    },
  },
};
</script>

<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}

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
