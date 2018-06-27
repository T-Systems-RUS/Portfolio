import Vue from 'vue';
import Checkbox from './Checkbox/Checkbox.vue';
import CommonModal from './CommonModal/CommonModal.vue';
import ConfirmModal from './ConfirmModal/ConfirmModal.vue';
import FileUploader from './FileUploader/FileUploader.vue';
import RadioButton from './RadioButton/RadioButton.vue';
import Autocomplete from './Autocomplete/Autocomplete.vue';
import Ribbon from './Ribbon/Ribbon.vue';
import Accordion from './Accordion/Accordion.vue';
import ErrorMessage from './ErrorMessage/ErrorMessage.vue';

const components: { [key: string]: {} } = {
  Checkbox,
  ConfirmModal,
  CommonModal,
  FileUploader,
  RadioButton,
  Autocomplete,
  Ribbon,
  Accordion,
  ErrorMessage
};

Object.keys(components)
  .forEach(componentName => Vue.component(componentName, components[componentName]));
