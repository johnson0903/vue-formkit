import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { plugin, defaultConfig, createInput } from '@formkit/vue'
import CustomMultiSelect from './components/CustomMultiSelect.vue';

createApp(App).use(plugin,
  defaultConfig({
    theme: 'genesis',
    inputs: {
      'customMultiSelect': createInput(CustomMultiSelect, {
        props: ['options', 'multiple', 'placeholder'],
      })
    }
  })).mount('#app')