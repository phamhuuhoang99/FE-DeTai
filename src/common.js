const axios = require("axios");

const prefixUrl = "http://localhost:3000";
export default {
  data() {
    return {};
  },
  methods: {
    async callApi(method, url, dataObj) {
      try {
        return await axios({
          method: method,
          url: prefixUrl + url,
          data: dataObj,
        });
      } catch (e) {
        return e.response;
      }
    },
    i(desc, title = "Hey") {
      this.$Notice.info({
        title: title,
        desc: desc,
      });
    },
    s(desc, title = "Great") {
      this.$Notice.success({
        title: title,
        desc: desc,
      });
    },
    w(desc, title = "Oops!") {
      this.$Notice.warning({
        title: title,
        desc: desc,
      });
    },
    e(desc, title = "Oops") {
      this.$Notice.error({
        title: title,
        desc: desc,
      });
    },
    swr(desc = "Something went wrong! Please try again.", title = "Oops") {
      this.$Notice.error({
        title: title,
        desc: desc,
      });
    },
    clearInterval() {
      const interval_id = window.setInterval(function() {},
      Number.MAX_SAFE_INTEGER);

      // Clear any timeout/interval up to that id
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    },
    updateLayer(layer, source) {
      layer.setSource(source);
      layer.changed();

      var params = layer.getSource().getParams();
      params.t = new Date().getMilliseconds();
      layer.getSource().updateParams(params);
    },

    // checkUserPermission(key) {
    //   if (!this.userPermission) return true;
    //   let isPermitted = false;
    //   for (let d of this.userPermission) {
    //     if (this.$route.name == d.name) {
    //       if (d[key]) {
    //         isPermitted = true;
    //         break;
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    //   return isPermitted;
    // },
  },
  computed: {
    // ...mapGetters({
    //   userPermission: "getUserPermission",
    // }),
    // isReadPermitted() {
    //   return this.checkUserPermission("read");
    // },
    // isWritePermitted() {
    //   return this.checkUserPermission("write");
    // },
    // isUpdatePermitted() {
    //   return this.checkUserPermission("update");
    // },
    // isDeletePermitted() {
    //   return this.checkUserPermission("delete");
    // },
  },
};
