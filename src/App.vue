<template>
  <div id="app">
    <div class="form-wrapper">
      <ex-form :form-config="formConfig" @submit="handleSubmit" />
    </div>
    <el-button size="mini" type="primary" @click="openDialogForm">打开弹窗表单</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dialogAttrs: {
        title: '活动申请表',
        width: '450px',
        top: '10vh',
        center: false,
      },
      formConfig: {
        formAttrs: {
          labelWidth: '80px',
        },
        formItems: {
          name: { label: '活动名称', component: 'el-input' },
          region: {
            label: '活动区域',
            component: 'el-select',
            style: { width: '100%' },
            options: [{ value: 'A', label: '区域A' }, { value: 'B', label: '区域B' }],
          },
          date: {
            label: '活动时间', component: 'el-date-picker', type: 'date', placeholder: '选择日期',
          },
          delivery: { label: '即时配送', component: 'el-switch' },
          type: { label: '活动性质', component: 'el-checkbox-group', options: [] },
          resource: {
            label: '特殊资源',
            component: 'el-radio-group',
            options: [{ label: '线上品牌商赞助' }, { label: '线下场地免费' }],
          },
          desc: { label: '活动形式', component: 'el-input', type: 'textarea' },

        },
        formData: {
          name: '',
          region: '',
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur',
            },
          ],
          region: { required: true, message: '请选择活动区域', trigger: 'change' },
          date: {
            type: 'date', required: true, message: '请选择日期', trigger: 'change',
          },
          type: {
            type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change',
          },
          resource: { required: true, message: '请选择活动资源', trigger: 'change' },
          desc: { required: false, message: '请填写活动形式', trigger: 'blur' },
        },
        events: {
          deliveryChange(formData, formItems, rules) {
            formData.desc = formData.delivery ? '即时配送' : '';
            formItems.desc.disabled = !!formData.delivery;
            rules.desc.required = !!formData.delivery;
          },
        },
        beforeOpen(formData, formItems, rules) {
          formItems.type.options = [{ label: '美食/餐厅线上活动' }, { label: '地推活动' }, { label: '线下主题活动' }, { label: '单纯品牌曝光' }];
          rules.type.required = true;
          formData.type = ['地推活动'];
        },
        beforeSubmit(formData) {
          formData.desc += '!!!';
        },
      },
    };
  },
  methods: {
    handleSubmit(formData) {
      console.log(formData);
    },

    openDialogForm() {
      this.$showDialogForm({ dialogAttrs: this.dialogAttrs, formConfig: this.formConfig }).then((formData) => {
        console.log(formData);
      });
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 400px;
  margin: 20px;
  border: 1px solid #000;
  padding: 20px;
}
</style>
