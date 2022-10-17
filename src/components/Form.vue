<script setup>
import { FormKitSchema, createInput } from "@formkit/vue";
import { ref } from "vue";

const customOptions = [
  {
    value: 'item-2',
    label: 'Bhajji',
  },
  {
    value: 'item-55',
    label: 'Vada Pav (out of stock)',
  },
  {
    value: 'item-22',
    label: 'Paratha',
  },
]

const schema = [
  {
    $el: 'h1',
    children: 'Register'
  },
  {
    $formkit: 'text',
    name: 'email',
    label: 'Email',
    help: '提醒您，為確保您能盡快收到 GIGABYTE 回覆信件，請避免使用免費信箱，如：Yahoo、Gmail、Hotmail等，以保障您的權益，謝謝。',
    validation: 'required|email'
  },
  {
    $formkit: 'checkbox',
    name: 'eu_citizen',
    id: 'eu',
    label: 'Are you a european citizen?',
  },
  {
    $formkit: 'select',
    if: '$get(eu).value', // 👀 Oooo, conditionals!
    name: 'cookie_notice',
    label: 'Cookie notice frequency',
    options: {
      refresh: 'Every page load',
      hourly: 'Ever hour',
      daily: 'Every day'
    },
    help: 'How often should we display a cookie notice?'
  },
  {
    $formkit: 'customMultiSelect',
    name: 'customMultiSelect',
    options: ['schema', 'custom', 'multi select', 'is', 'really', 'fun', 'and', 'usefull'],
    multiple: true,
    placeholder: 'Select one option',
    validation: 'required',
    'validation-messages': {
      required: '此欄位必填',
    }
  },
  {
    $formkit: 'floatingLabelTextInput',
    label: "漂浮文字框",
    name: 'floatinglabel'
  },
  {
    $formkit: 'customCheckbox',
    name: 'customCheckbox',
    label: 'Custom checkbox',
    options: customOptions,
    validation: 'required|optionAllowOther',
    'validation-messages': {
      optionAllowOther: 'Please provide a value for “other”.'
    },
    'allow-other': true
  }
];

const data = ref({});

const handleSubmit = () => alert("Valid submit!");


</script>

<template>
  <div class="form">
    <FormKit type="form" v-model="data" @submit="handleSubmit">
      <FormKitSchema :schema="schema" />
    </FormKit>
    <hr>

  </div>
  <h3>資料結果</h3>
  <pre>{{ data }}</pre>

</template>
<style>
.form {
  text-align: left;
  width: 500px;
}

.form pre {
  text-align: left;
}

.formkit-inner {
  position: relative;
}

.formkit-label-floating {
  position: absolute;
  left: .5em;
  color: grey;
  transition: all .25s;
  bottom: calc(100% - .5em);
  transform: translateY(100%);
  padding: .25em;
  box-sizing: border-box;
}

input:focus~.formkit-label-floating,
textarea:focus~.formkit-label-floating,
.formkit-label-floating[data-has-value="true"] {
  font-size: .7em;
  transform: translateY(50%);
  background-color: white;
  bottom: 100%;
}
</style>