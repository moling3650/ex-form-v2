<template>
  <el-form ref="FormRef" v-if="ready" v-loading="loading" :model="form" :rules="rules" v-bind="formAttrs">
    <el-row :gutter="20">
      <el-col v-for="item in formItems" :key="item.prop" :span="item.span">
        <el-form-item :label="item.label" :prop="item.prop">
          <component
            :is="item.component"
            v-model="form[item.prop]"
            :disabled="item.disabled"
            :options="item.options"
            v-bind="item.attrs"
            v-on="item.listeners">
            <template  v-if="item.subComp">
              <component :is="item.subComp" v-for="o in item.options" :key="o.key" v-bind="o">
                {{ o.innerText || o.label || o.value }}
              </component>
            </template>
          </component>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const defaultFormAttrs = {
  size: 'mini',
  labelWidth: '100px',
};
export default {
  name: 'ExForm',
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ready: false,
      loading: false,
      formAttrs: {},
      formItems: {},
      form: {},
      rules: {},
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    clone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    createEventMap(events) {
      const eventMap = {};

      Object.entries(events).forEach(([key, handler]) => {
        const [prop, eventName] = key.split(/([A-Z][a-z]*$)/, 2);
        if (!eventMap[prop]) {
          eventMap[prop] = {};
        }
        eventMap[prop][eventName.toLowerCase()] = async () => {
          this.loading = true;
          const formData = await handler(this.form, this.formItems, this.rules);
          this.loading = false;
          if (formData) {
            this.form = formData;
          }
        };
      });
      return eventMap;
    },
    async initForm() {
      if (this.ready) {
        return;
      }
      const eventMap = this.createEventMap(this.formConfig.events);
      this.formAttrs = { ...defaultFormAttrs, ...this.formConfig.formAttrs };
      this.rules = this.formConfig.rules;
      Object.entries(this.formConfig.formItems).forEach(([prop, value]) => {
        if (!value.subComp) {
          value.subComp = {
            'el-select': 'el-option',
            'el-radio-group': 'el-radio',
            'el-checkbox-group': 'el-checkbox',
          }[value.component] || '';
        }
        if (value.options) {
          value.options.forEach((o) => {
            o.key = o.value || o.label;
          });
        }
        const {
          span = 24, label, component, disabled, options, subComp, ...attrs
        } = value;

        this.formItems[prop] = {
          span,
          prop,
          label,
          component,
          subComp,
          disabled,
          options,
          attrs,
          listeners: eventMap[prop] || {},
        };
      });
      await this.resetForm();
      this.ready = true;
    },
    async resetForm() {
      if (this.$refs.FormRef) {
        this.$refs.FormRef.resetFields();
      }

      this.form = this.clone(this.formConfig.formData || {});
      if (typeof this.formConfig.beforeOpen === 'function') {
        await this.formConfig.beforeOpen(this.form, this.formItems, this.rules);
      }
      if (this.ready) {
        Object.entries(this.formConfig.events).forEach(([key, handler]) => {
          if (key.endsWith('Change')) {
            handler(this.form, this.formItems, this.rules);
          }
        });
      }
    },
    submitForm() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          let formData = this.clone(this.form);
          if (typeof this.formConfig.beforeSubmit === 'function') {
            formData = this.formConfig.beforeSubmit(formData) || formData;
          }
          this.$emit('submit', formData);
          return true;
        }
        return false;
      });
    },
  },
};
</script>
