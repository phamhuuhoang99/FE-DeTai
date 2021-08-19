<template>
  <div>
    <div class="container">
      <div
        class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 col-md-4 mx-auto"
      >
        <div class="login-header text-center">
          <h1>Đăng Nhập</h1>
        </div>
        <div class="space mt-3">
          <Input
            type="email"
            size="large"
            v-model="data.email"
            placeholder="Email"
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
          >
            {{ this.isLogging ? "Đang đăng nhập..." : "Đăng Nhập" }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
      isLogging: false,
    };
  },
  methods: {
    //     async login() {
    //         if (this.data.email.trim() == "")
    //             return this.e("Email is required");
    //         if (this.data.password.trim() == "")
    //             return this.e("Password is required");
    //         if (this.data.password.trim().length < 6)
    //             return this.e("Incorrect Login Details");
    //         this.isLogging = true;
    //         const res = await this.callApi(
    //             "post",
    //             "app/admin_login",
    //             this.data
    //         );
    //         if (res.status === 200) {
    //             this.s(res.data.msg);
    //             window.location = "/";
    //         } else {
    //             if (res.status === 401) {
    //                 this.i(res.data.msg);
    //             } else if (res.status === 422) {
    //                 for (let i in res.data.errors) {
    //                     this.e(res.data.errors[i]);
    //                     console.log(res.data.errors[i][0]);
    //                 }
    //             } else {
    //                 this.swr();
    //             }
    //         }
    //         this.isLogging = false;
    //     }
  },
};
</script>
<style scoped>
._1adminOverveiw_table_recent {
  margin-top: 220px;
}

._box_shadow {
  background: #fff;
  /*box-shadow: 0px 2px 28px 0px rgba(48, 48, 48, 0.1);
      box-shadow: 0px 2px 18px 0px rgba(186, 212, 247, 0.43);*/
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
  -ms-flex: 0 0 33.333333%;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
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
}
.text-center {
  text-align: center !important;
}
.mt-3 {
  margin-top: 1rem !important;
}
</style>
