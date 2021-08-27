<template>
  <Modal
    v-model="show"
    title="Thêm mới kế hoạch"
    :closable="false"
    :mask-closable="false"
  >
    <Form ref="formAddPlan" :model="plan" :rules="validate">
      <FormItem label="Tên kế hoạch" prop="name">
        <Input
          :autofocus="true"
          type="text"
          v-model="plan.name"
          placeholder="Nhập tên kế hoạch"
        >
        </Input>
      </FormItem>
      <FormItem label="Mô tả" prop="description">
        <Input
          v-model="plan.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Nhập mô tả..."
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="onHidden()">
        Hủy
      </Button>
      <Button type="primary" @click="savePlan('formAddPlan')">
        Thêm Kế hoạch
      </Button>
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../../main";
export default {
  props: ["onShow", "onHidden", "mission"],
  data() {
    return {
      plan: {
        name: "",
        description: "",
      },
      defaultPlan: {
        name: "",
        description: "",
      },
      validate: {
        name: [
          {
            required: true,
            message: "Yêu cầu nhập tên kế hoạch",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    savePlan(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.callApi("post", "/plans/create", {
            plan: this.plan,
            missionId: this.mission.id,
          });
          if (res.status === 200) {
            this.s("Thêm thành công");
            this.onHidden();
            eventBus.$emit("addPlan", res.data);
            this.plan = { ...this.defaultPlan };
          } else {
            if (res.status === 500) {
              this.e(res.data.message);
              this.$Loading.error();
              return;
            } else {
              this.swr();
            }
          }
        } else {
          this.e("Nhập tên kế hoạch");
        }
      });
    },
  },
  computed: {
    show: function() {
      return this.onShow;
    },
  },
};
</script>
