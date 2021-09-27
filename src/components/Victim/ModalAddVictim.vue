<template>
  <Modal
    v-model="onShow"
    title="Thêm người cần TKCN"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80" :model="victim">
      <FormItem label="Họ tên">
        <Input placeholder="Nhập tên ..." v-model="victim.name" />
      </FormItem>
      <FormItem label="Ngày sinh">
        <DatePicker
          type="date"
          placeholder="Ngày sinh"
          v-model="victim.birthday"
        ></DatePicker>
      </FormItem>
      <FormItem label="Quê quán">
        <Input placeholder="Nhập quê quán ..." v-model="victim.hometown" />
      </FormItem>
      <FormItem label="Đặc điểm nhận dạng">
        <Input
          v-model="victim.characteristic"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập đặc điểm..."
        ></Input>
      </FormItem>
      <FormItem label="Hình ảnh">
        <div class="demo-upload-list" v-if="victim.url.length > 0">
          <template>
            <img :src="victim.url" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline"></Icon>
              <Icon
                type="ios-trash-outline"
                @click.native="handleRemove()"
              ></Icon>
            </div>
          </template>
        </div>
        <Upload
          ref="uploads"
          action="http://localhost:3000/victims/upload"
          :on-success="handleSuccess"
          type="drag"
          :max-size="2048"
          :format="['jpg', 'jpeg', 'png']"
          :on-exceeded-size="handleMaxSize"
          :headers="{
            'X-Requested-With': 'XMLHttpRequest',
          }"
          :on-format-error="handleFormatError"
          :show-upload-list="false"
          style="display:inline-block;width:58px;"
          v-if="!disabledBtnUpload"
        >
          <div style="width:58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="hide()">
        Hủy
      </Button>
      <Button type="primary" @click="onSave()">
        Thêm Nạn Nhân
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "hide", "missionId"],
  data() {
    return {
      victim: {
        name: "",
        birthday: null,
        hometown: "",
        characteristic: "",
        image: "",
        missionId: null,
        url: "",
      },
      defaultVictim: {
        name: "",
        birthday: null,
        hometown: "",
        characteristic: "",
        image: "",
        missionId: null,
        url: "",
      },
    };
  },
  methods: {
    async onSave() {
      if (this.victim.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên nạn nhân");
      }

      const res = await this.callApi("post", "/victims/create", {
        victim: { ...this.victim, missionId: this.missionId },
      });

      if (res.status === 200) {
        this.s("Thêm thành công");
        // this.onShow = false;
        this.$emit("addVictim", res.data);
        this.victim = { ...this.defaultVictim };
      } else {
        if (res.status === 500) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }
    },
    handleSuccess(res) {
      this.victim.image = res;
      this.victim.url = "http://localhost:3000/uploads/" + res;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    async handleRemove(isAdd = true) {
      let image = "";
      // console.log(image);
      if (!isAdd) {
        // this.isIconImageView = true;
        // image = this.editData.iconImage;
        // this.editData.iconImage = "";
        // this.$refs.editImageUploads.clearFiles();
        console.log(image);
      } else {
        image = this.victim.image;
        this.victim.image = "";
        this.victim.url = "";
      }
      var hinh = image.split("/");
      const res = await this.callApi("post", "/victims/delete-image", {
        imageName: hinh[0].toString(),
      });
      console.log(res);
      // if (res.status !== 200) {
      //   this.victim.image = image;
      //   this.swr();
      // }
    },
  },
  computed: {
    onShow: function() {
      return this.show;
    },
    disabledBtnUpload: function() {
      return this.victim.image.length > 0;
    },
  },
};
</script>

<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
