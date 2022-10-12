<script setup>
import { FormKitSchema, createInput } from "@formkit/vue";
import { ref } from "vue";

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
    $formkit: 'password',
    name: 'password',
    label: 'Password',
    help: 'Enter your new password.',
    validation: 'required|length:5,16'
  },
  {
    $formkit: 'password',
    name: 'password_confirm',
    label: 'Confirm password',
    help: 'Enter your new password again to confirm it.',
    validation: 'required|confirm',
    validationLabel: 'password confirmation',
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
    $formkit: 'checkbox',
    name: 'toppings',
    label: 'Toppings',
    options: ['Mushrooms', 'Olives', 'Salami', 'Anchovies']
  },
  {
    $formkit: 'customMultiSelect',
    name: 'customMultiSelect',
    options: ['schema', 'custom', 'multi select'],
    multiple: true,
    placeholder: 'Select one option',
    validation: 'required',
    'validation-messages': {
      required: '此欄位必填',
    }
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
    <h3>資料結果</h3>
    <pre>{{ data }}</pre>
  </div>

</template>
<style>
.form {
  text-align: left;
  width: 500px;
}

.form pre {
  text-align: left;
}
</style>