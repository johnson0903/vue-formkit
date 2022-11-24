import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'
import CustomMultiSelect from './components/CustomMultiSelect.vue';
import { floatingLabelTextInput } from './inputs/floatingLabelTextInput';
import { customCheckbox } from './inputs/checkbox';
import optionAllowOther from './custom-rules/optionAllowOther'

createApp(App).use(plugin,
  defaultConfig({
    theme: 'genesis',
    inputs: {
      'customMultiSelect': createInput(CustomMultiSelect, {
        props: ['options', 'vueMultiSelectOptions'],
      }),
      floatingLabelTextInput,
      customCheckbox
    },
    rules: {
      optionAllowOther
    }
  })).mount('#app')