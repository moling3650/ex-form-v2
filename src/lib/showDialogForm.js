import Vue from 'vue';
import Component from './ExDialogForm.vue';

const DialogFormConstructor = Vue.extend(Component);

let instance = null;

function getInstance() {
  if (!instance) {
    instance = new DialogFormConstructor({ el: document.createElement('div') });
    document.body.appendChild(instance.$el);
  }
  return instance;
}

function showDialogForm(config) {
  return new Promise((resolve) => {
    getInstance().open(config, resolve);
  });
}

export default showDialogForm;
