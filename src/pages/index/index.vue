<template>
  <view class="user-info">
    <div class="user-info-header">请完善您的信息，我们将通过邮件向您发送下载地址。</div>
    <div v-for="item in formData" :key="item.label">
      <div v-if="item.type === 'singleSelect'">
        <nut-cell
          class="nut-cell-flex-row nut-cell-item"
          @click="item.show = true"
          :title="item.label"
          :desc="item.value"
          is-link
        ></nut-cell>
        <nut-popup position="bottom" v-model:visible="item.show">
          <nut-picker
            :columns="item.options"
            :title="`${item.label}选择`"
            @confirm="
              ({ selectedValue }) => {
                item.show = false;
                item.value = selectedValue[0];
              }
            "
            @cancel="item.show = false"
          ></nut-picker>
        </nut-popup>
      </div>

      <nut-cell
        v-if="item.type !== 'singleSelect'"
        :class="`nut-cell-flex-column nut-cell-item${
          item.focus ? ' nut-cell-focused' : ''
        }`"
      >
        <div class="input-label">{{ item.label }}</div>
        <nut-input
          @focus="item.focus = true"
          @blur="item.focus = false"
          v-model="item.value"
          :border="false"
        ></nut-input>
      </nut-cell>
    </div>
    <div class="button-container">
      <nut-button type="primary" @click="handleSubmit">确认提交</nut-button>
    </div>
    <nut-toast
      :msg="msg"
      v-model:visible="show"
      type="text"
      @closed="show = false"
      cover
    />
  </view>
</template>

<script lang="ts">
export interface FormItem {
  type: "text" | "tel" | "email" | "singleSelect";
  label: string;
  options?: Array<any>;
  show?: boolean;
  focus?: boolean;
  key: string;
  value?: any;
  required: boolean;
}
import { reactive, toRefs } from "vue";
import { Dongdong } from "@nutui/icons-vue-taro";
import { FormItem } from "@nutui/nutui-taro";
const state = reactive<{
  msg: string;
  type: string;
  show: boolean;
  cover: boolean;
  formData: FormItem[];
}>({
  msg: "",
  type: "text",
  show: false,
  cover: false,
  formData: [],
});
export default {
  name: "Index",
  components: {
    Dongdong,
  },
  async created() {
    console.log("on ready");
    const formData = await this.getFormData();
    console.log(formData);
    state.formData = formData;
  },
  methods: {
    async getFormData(): Promise<FormItem[]> {
      const formData: FormItem[] = [
        {
          label: "姓名",
          type: "text",
          required: true,
          key: "name",
        },
        {
          label: "手机号",
          type: "tel",
          required: true,
          key: "phone",
        },
        {
          label: "邮箱",
          type: "email",
          required: true,
          key: "email",
        },
        {
          label: "公司",
          type: "singleSelect",
          options: [
            { text: "aaaa", value: "aaaaa" },
            { text: "bbbb", value: "bbbb" },
            { text: "ccccc", value: "ccccc" },
            { text: "ddddd", value: "dddddd" },
          ],
          required: false,
          key: "company",
        },
        {
          label: "行业",
          type: "singleSelect",
          options: [
            { text: "aaaa", value: "aaaaa" },
            { text: "bbbb", value: "bbbb" },
            { text: "ccccc", value: "ccccc" },
            { text: "ddddd", value: "dddddd" },
          ],
          required: true,
          key: "hangye",
        },
        {
          label: "职位",
          type: "singleSelect",
          options: [
            { text: "aaaa", value: "aaaaa" },
            { text: "bbbb", value: "bbbb" },
            { text: "ccccc", value: "ccccc" },
            { text: "ddddd", value: "dddddd" },
          ],
          required: false,
          key: "zhiwei",
        },
      ];
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve(formData);
        }, 300);
      });
    },
  },

  setup() {
    const handleSubmit = () => {
      const { values, errors } = validateForm();
      if (errors) {
        state.msg = "请填写完成后提交";
        state.show = true;
      }
      console.log(values, errors);
    };

    const validateForm = () => {
      const formData = state.formData;
      let errors: { [key: string]: any } | null = null;
      const values: { [key: string]: any } = {};
      formData.forEach((item) => {
        if (item.required && !item.value) {
          if (!errors) {
            errors = {};
          }
          errors[item.key] = `field ${item.key} is requried`;
        }
        values[item.key] = item.value;
      });
      return { errors, values };
    };

    return {
      ...toRefs(state),
      handleSubmit,
      confirm,
    };
  },
};
</script>

<style lang="scss">
.nut-input-left-box {
  margin-right: 0;
}

.input-text {
  padding: 0 60rpx !important;
  height: 60rpx;
  line-height: 60rpx;
}
.nut-form-item {
  padding: 0;
}

.form-label {
  font-size: 22rpx;
}
.info-form-item {
  margin-bottom: 40rpx;
}

.nut-cell-flex-column {
  display: flex;
  flex-direction: column;
}

.nut-cell-item {
  height: 140rpx;
  border-bottom: 6rpx solid #cccccc;
  &.nut-cell-focused {
    border-bottom-color: blue;
  }
  .input-label {
    font-size: 22rpx;
  }
}

.nut-cell-flex-row {
  display: flex;
  align-items: center;
}
.user-info {
  width: 100vw;
  height: 100vh;
  padding: 0 24rpx;
  background: lightcyan;
  box-sizing: border-box;
  .user-info-header {
    color: #888888;
  }
  .nut-cell {
    .nut-input {
      padding: 0;
      .input-text {
        padding: 0 !important;
        height: 40rpx;
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
