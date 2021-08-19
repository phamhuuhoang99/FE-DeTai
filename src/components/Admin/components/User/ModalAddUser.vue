<template>
  <Modal v-model="show" title="Thêm một User">
    <Form
      ref="formValidate"
      :model="user"
      :rules="ruleValidate"
      :label-width="0"
    >
      <FormItem label="" prop="first_name">
        <Input v-model="user.first_name" size="large" placeholder="Nhập Họ">
          <Icon type="ios-person" slot="prepend"></Icon
        ></Input>
      </FormItem>
      <FormItem label="" prop="last_name">
        <Input v-model="user.last_name" size="large" placeholder="Nhập Tên">
          <Icon type="ios-person" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="" prop="username">
        <Input v-model="user.username" size="large" placeholder="Tên Tài Khoản">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="" prop="password">
        <Input
          v-model="user.password"
          password="password"
          type="password"
          size="large"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem label="" prop="email">
        <Input v-model="user.email" size="large" placeholder="Email">
          <Icon type="ios-mail" slot="prepend" />
        </Input>
      </FormItem>

      <FormItem label="" prop="phone">
        <Input v-model="user.phone" size="large" placeholder="Số điện thoại">
          <Icon type="md-call" slot="prepend" />
        </Input>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="default" @click="hideModal('formValidate')">Hủy</Button>
      <Button type="primary" @click="addUser('formValidate')">
        Thêm User
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["onShow"],
  data() {
    return {
      show: this.onShow,
      user: {
        ...this.defaultUser,
      },

      defaultUser: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      ruleValidate: {
        first_name: [
          {
            required: true,
            message: "Họ không được bỏ trống",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            message: "Nhập Email",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        last_name: [
          {
            required: true,
            message: "Tên không được bỏ trống",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "Nhập tên đăng nhập",
            trigger: "blur",
          },
          {
            min: 10,
            message: "Tên đăng nhập tối thiểu 10 ký tự ",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Nhập số điện thoại",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addUser(validate) {
      this.$refs[validate].validate(async (valid) => {
        if (valid) {
          const res = await this.callApi("post", "/users/create", this.user);
          console.log(res);
          if (res.status === 200) {
            this.s("Thêm thành công");
            this.show = false;
            this.$emit("addUser", this.user);
          } else {
            if (res.status === 500) {
              // console.log(res.data.errors);
              // for (let i in res.data.errors) {
              //   this.e(res.data.errors[i]);
              //   console.log(res.data.errors[i][0]);
              // }
              this.e(res.data.message);
            } else {
              this.swr();
            }
          }
        } else {
          this.e("Fail");
        }
      });
    },
    hideModal: function(name) {
      this.show = false;
      this.user = { ...this.defaultUser };
      this.$refs[name].resetFields();
    },
  },
  watch: {
    onShow: function(value) {
      this.show = value;
    },
    show: function(value) {
      this.$emit("clicked", value);
    },
  },
};
</script>

<style>
.form-control {
  margin: 10px 0;
}
</style>
