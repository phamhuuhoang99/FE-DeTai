<template>
  <Modal
    v-model="onShow"
    title="Thêm mới Kiểu thảm họa"
    :closable="false"
    :mask-closable="false"
  >
    <Form :label-width="80">
      <FormItem label="Tên kiểu thảm họa">
        <Input v-model="symbol.name" placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Symble">
        <div class="demo-upload-list" v-if="symbol.url.length > 0">
          <template>
            <img :src="symbol.url" />
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
          action="http://localhost:3000/symbols/upload"
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
      <FormItem label="Đặc thù thảm họa">
        <Input v-model="symbol.type" placeholder="Nhập Đặc thù..." />
      </FormItem>
      <FormItem label="Ghi chú">
        <Input
          v-model="symbol.note"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập ghi chú..."
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="hide()">
        Hủy
      </Button>
      <Button type="primary" @click="onSave()">
        Thêm Kiểu thảm họa
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "hide"],
  data() {
    return {
      symbol: {
        name: "",
        image: "",
        type: "",
        note: "",
        url: "",
      },
      defaultSymbol: {
        name: "",
        image: "",
        type: "",
        note: "",
        url: "",
      },
    };
  },
  methods: {
    handleSuccess(res) {
      this.symbol.image = res;
      this.symbol.url = "http://localhost:3000/uploads/symbols/" + res;
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
      if (!isAdd) {
        // this.isIconImageView = true;
        // image = this.editData.iconImage;
        // this.editData.iconImage = "";
        // this.$refs.editImageUploads.clearFiles();
        console.log(image);
      } else {
        image = this.symbol.image;
        this.symbol.image = "";
        this.symbol.url = "";
      }
      const res = await this.callApi("post", "/symbols/delete-image", {
        imageName: image,
      });
      if (res.status !== 201) {
        this.symbol.image = image;
        this.swr();
      }
    },
    async onSave() {
      if (this.symbol.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên Symbol");
      }
      if (this.symbol.image.trim().length === 0) {
        return this.e("Upload file Symbol");
      }

      const res = await this.callApi("post", "/symbols/create", this.symbol);

      if (res.status === 200) {
        this.s("Thêm thành công");
        // this.onShow = false;
        this.$emit("addSymbol", res.data);
        this.symbol = { ...this.defaultSymbol };
      } else {
        if (res.status === 500) {
          this.e(res.data.message);
          return;
        } else {
          this.swr();
        }
      }
    },
  },
  computed: {
    onShow: function() {
      return this.show;
    },
    disabledBtnUpload: function() {
      return this.symbol.image.length > 0;
    },
  },
};
</script>

<style></style>
