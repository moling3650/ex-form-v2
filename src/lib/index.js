import ExForm from './ExForm.vue';
import showDialogForm from './showDialogForm';

const components = {
  ExForm,
};

function install(Vue) {
  const keys = Object.keys(components);
  keys.forEach((name) => {
    const component = components[name];
    Vue.component(component.name || name, component);
  });
  Object.defineProperty(Vue.prototype, '$showDialogForm', {
    value: showDialogForm,
  });
}

export default {
  install,
  ...components,
};
