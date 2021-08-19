export default {
  first_name: [
    {
      required: true,
      message: "Họ không được bỏ trống",
      trigger: "blur",
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
};
