<template>
  <div id="DialogForm">
    <el-dialog :visible.sync="visible" v-bind="dialogAttrs" @closed="onClosed">
      <ExForm v-if="formConfig" :formConfig="formConfig" @submit="onSubmit"/>
    </el-dialog>
  </div>
</template>

<script>
import ExForm from './ExForm.vue';

const defaultDialogAttrs = {
  center: true,
  'close-on-click-modal': false,
  'close-on-press-escape': false,
};

export default {
  components: {
    ExForm,
  },
  data() {
    return {
      visible: false,
      dialogAttrs: {},
      formConfig: null,
      callback: null,
    };
  },
  methods: {
    open(config, callback) {
      this.formConfig = config.formConfig;
      this.dialogAttrs = { ...defaultDialogAttrs, ...config.dialogAttrs };
      this.callback = callback;
      this.visible = true;
    },
    onSubmit(formData) {
      this.callback(formData);
      this.visible = false;
    },
    onClosed() {
      this.dialogAttrs = {};
      this.formConfig = null;
      this.callback = null;
    },
  },
};
</script>
