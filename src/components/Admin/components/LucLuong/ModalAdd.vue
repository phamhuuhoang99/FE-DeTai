<template>
  <Modal
    v-model="onShow"
    title="Thêm Đơn vị"
    :closable="false"
    :mask-closable="false"
  >
    <Form :model="unit" :label-width="100">
      <FormItem label="Tên đơn vị">
        <Input v-model="unit.name" placeholder="Nhập tên ..." />
      </FormItem>
      <FormItem label="Quân số">
        <InputNumber
          style="width:100%;"
          :max="1000"
          :min="1"
          v-model="unit.number"
          placeholder="Nhập Quân số..."
        ></InputNumber>
      </FormItem>
      <FormItem label="Số lượng phương tiện">
        <InputNumber
          style="width:100%;"
          :max="100"
          :min="1"
          v-model="unit.vehicleNumber"
          placeholder="Nhập số phương tiện..."
        ></InputNumber>
      </FormItem>
      <FormItem label="Symbol">
        <div class="demo-upload-list" v-if="unit.url.length > 0">
          <template>
            <img :src="unit.url" />
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
          action="http://localhost:3000/units/upload"
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
        Thêm Nhiệm vụ
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "hide", "type"],
  data() {
    return {
      unit: {
        name: "",
        number: null,
        vehicleNumber: null,
        image: "",
        typeUnit: "",
        position: null,
        url: "",
      },
      defaultUnit: {
        name: "",
        number: null,
        vehicleNumber: null,
        image: "",
        position: null,
        typeUnit: "",
        url: "",
      },
    };
  },
  methods: {
    handleSuccess(res) {
      this.unit.image = res;
      this.unit.url = "http://localhost:3000/uploads/units/" + res;
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
        image = this.unit.image;
        this.unit.image = "";
        this.unit.url = "";
      }
      const res = await this.callApi("post", "/units/delete-image", {
        imageName: image,
      });
      if (res.status !== 201) {
        this.unit.image = image;
        this.swr();
      }
    },
    async onSave() {
      if (this.unit.name.trim().length === 0) {
        return this.e("Yêu cầu nhập tên Đơn vị");
      }

      const res = await this.callApi("post", "/units/create", {
        ...this.unit,
        typeUnit: this.type,
      });

      if (res.status === 200) {
        this.s("Thêm thành công");
        // this.onShow = false;
        this.$emit("addUnit", res.data);
        this.unit = { ...this.defaultUnit };
      } else {
        if (res.status === 400) {
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
      return this.unit.image.length > 0;
    },
  },
};
</script>

<style></style>
