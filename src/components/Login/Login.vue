<template>
  <div class="container">
    <div
      class=" main _box_shadow _border_radious _mar_b30 _p20 col-md-4 mx-auto"
    >
      <div class="login-header text-center">
        <h1>Đăng Nhập</h1>
      </div>
      <div class="space mt-3">
        <Input
          type="email"
          size="large"
          v-model="data.username"
          placeholder="Tên đăng nhập"
        />
      </div>
      <div class="space" style="margin-top:5px">
        <Input
          type="password"
          size="large"
          v-model="data.password"
          placeholder="*********"
        />
      </div>
      <div class="login-footer text-center mt-3">
        <Button
          type="primary"
          :disabled="isLogging"
          :loading="isLogging"
          size="large"
          @click="onLogin"
        >
          {{ this.isLogging ? "Đang đăng nhập..." : "Đăng Nhập" }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
      },
      isLogging: false,
    };
  },
  methods: {
    async onLogin() {
      if (this.data.username.trim() == "")
        return this.e("Yêu cầu nhập tên đăng nhập");
      if (this.data.password.trim() == "")
        return this.e("Yêu cầu nhập mật khẩu");
      this.isLogging = true;

      const res = await this.callApi("post", "/users/signin", this.data);
      if (res.status === 200) {
        localStorage.setItem("token", res.headers["authorization"]);

        //set state user;

        this.s("Đăng nhập thành công");
        this.$router.push("/");
      } else {
        this.e(res.data);
      }

      this.isLogging = false;
    },
  },
};
</script>
<style scoped>
._box_shadow {
  background: #fff;
  -webkit-box-shadow: 0 10px 20px rgba(47, 91, 231, 0.1);
  box-shadow: 0 10px 20px rgba(47, 91, 231, 0.1);
}
._border_radious {
  border-radius: 3px;
}
._mar_b30 {
  margin-bottom: 30px;
}
._p20 {
  padding: 18px 20px 25px;
}
.col-md-4 {
  max-width: 25%;
}

.col-md-4 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}

.container {
  min-width: 992px !important;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.text-center {
  text-align: center !important;
}
.mt-3 {
  margin-top: 1rem !important;
}
</style>
