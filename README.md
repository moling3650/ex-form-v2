# ex-form-v2

## npm 安装
```
npm i element-ui ex-form-v2 -S
```

## 引入
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ExFormV2 from './lib/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ExFormV2);

new Vue({
  render: (h) => h(App),
}).$mount('#app');

```

## demo

```vue
<template>
  <div id="app">
    <!-- ex-form组件示例 -->
    <ex-form :form-config="formConfig" @submit="handleSubmit" />

    <!-- $showDialogForm方法示例 -->
    <el-button @click="openDialogForm">打开弹窗表单</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 弹窗属性
      dialogAttrs: {
        title: '活动申请表',
        width: '450px',
        top: '10vh',
        center: false,
      },
      // 表单配置
      formConfig: {
        // 表单属性
        formAttrs: {
          labelWidth: '80px',
        },
        // 表单元素
        formItems: {
          name: { label: '活动名称', component: 'el-input' },
          region: {
            label: '活动区域',
            component: 'el-select',
            style: { width: '100%' },
            options: [{ value: 'A', label: '区域A' }, { value: 'B', label: '区域B' }],
          },
          date: { label: '活动时间', component: 'el-date-picker', type: 'date', placeholder: '选择日期' },
          delivery: { label: '即时配送', component: 'el-switch' },
          type: { label: '活动性质', component: 'el-checkbox-group', options: [] },
          resource: {
            label: '特殊资源',
            component: 'el-radio-group',
            options: [{ label: '线上品牌商赞助' }, { label: '线下场地免费' }],
          },
          desc: { label: '活动形式', component: 'el-input', type: 'textarea' },

        },
        // 表单初始値
        formData: {
          name: '',
          region: '',
          date: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        // 表单规则
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          ],
          region: { required: true, message: '请选择活动区域', trigger: 'change' },
          date: { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
          type: { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' },
          resource: { required: true, message: '请选择活动资源', trigger: 'change' },
          desc: { required: false, message: '请填写活动形式', trigger: 'blur' },
        },
        // 表单元素事件
        events: {
          deliveryChange(formData, formItems, rules) {
            formData.desc = formData.delivery ? '即时配送' : '';
            formItems.desc.disabled = !!formData.delivery;
            rules.desc.required = !!formData.delivery;
          },
        },
        // 打开表单前的钩子
        beforeOpen(formData, formItems, rules) {
          formItems.type.options = [
            { label: '美食/餐厅线上活动' }, 
            { label: '地推活动' }, 
            { label: '线下主题活动' }, 
            { label: '单纯品牌曝光' }
          ];
          rules.type.required = true;
          formData.type = ['地推活动'];
        },
        // 提交之前的钩子
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
      const dialogFormConfig = { 
        dialogAttrs: this.dialogAttrs, 
        formConfig: this.formConfig 
      }
      this.$showDialogForm(dialogFormConfig).then((formData) => {
        console.log(formData);
      });
    },
  },
};
</script>
```
