<script setup>
import { FormKitSchema, createInput } from "@formkit/vue";
import { ref } from "vue";
import mockFormJson from '../assets/data.json';
const customOptions = [
  {
    value: '1',
    label: 'Request for Quotation',
  },
  {
    value: '2',
    label: 'Form a Partnership',
  },
  {
    value: '3',
    label: 'Talk to Sales',
  },
  {
    value: '4',
    label: 'Educational Resource',
  },
  {
    value: '5',
    label: 'Need More Information',
  },
  {
    value: '6',
    label: 'After-sales Service',
  },
]

const schema = [
  {
    $el: 'h1',
    children: 'Register'
  },
  {
    $el: 'p',
    attrs: {
      innerHTML: `<div>Please contact us if you would like to know more about our products. For services and support, please visit <a class="eSupportLink" href="https://esupport.gigabyte.com" target="_blank">eSupport</a>.</div>`
    }
  },
  {
    $el: 'div',
    attrs: {
      class: 'gc-form-group'
    },
    children: [
      {
        $el: 'h3',
        children: 'Inquiries*'
      },
      {
        $el: 'div',
        attrs: {
          class: 'gc-form-row'
        },
        children: [
          {
            $formkit: 'customCheckbox',
            name: 'customCheckbox',
            label: 'Custom checkbox',
            options: customOptions,
            validation: 'required|optionAllowOther',
            'validation-messages': {
              optionAllowOther: 'Please provide a value for “other”.'
            },
            'allow-other': true,
            help: '請選擇'
          },
        ]
      }
    ]
  },
  {
    $el: 'div',
    attrs: {
      class: 'gc-form-group'
    },
    children: [
      {
        $el: 'h3',
        children: 'Profile'
      },
      {
        $el: 'div',
        attrs: {
          class: 'gc-form-row'
        },
        children: [
          {
            $formkit: 'text',
            name: 'Firstname',
            label: 'Firstname',
            validation: 'required:trim',
            outerClass: 'col',
          },
          {
            $formkit: 'text',
            name: 'email',
            label: 'Email',
            validation: 'required:trim',
            outerClass: 'col',
          },
        ]
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
    ]
  },
];

const data = ref({});

// 整理 json 資料
let schemaData = mockFormJson.formSections
let newData = schemaData.map((section) => {
  let newSection = {}
  newSection.$el = 'div'
  newSection.attrs = {
    class: 'gc-form-group'
  }
  let sectionChildren = [];
  section.childNodes.forEach((node) => {
    const formRowNode = {
      $el: 'div',
      attrs: {
        class: 'gc-form-row'
      },
      children: []
    }
    if (node.nodeType === 'input') {
      node.$formkit = node.inputType;
      node.outerClass = 'col'
      formRowNode.children.push(node)
    } else if (node.nodeType === 'group') {
      node.children.forEach((inputNode) => {
        inputNode.$formkit = inputNode.inputType;
        delete inputNode.nodeType
        inputNode.outerClass = 'col'
        formRowNode.children.push(inputNode)
      });
    }
    delete node.nodeType;
    sectionChildren.push(formRowNode)
  })
  sectionChildren.unshift({
    $el: 'h2',
    children: section.title
  })
  newSection.children = sectionChildren;
  return newSection
})
console.log(newData)

const handleSubmit = () => alert("Valid submit!");


</script>

<template>
  <div class="form">
    <FormKit type="form" v-model="data" @submit="handleSubmit">
      <FormKitSchema :schema="newData" />
    </FormKit>
    <hr>

  </div>
  <h3>資料結果</h3>
  <pre>{{ data }}</pre>

</template>
<style>
.form {
  text-align: left;
  max-width: 690px;
  padding-inline: 15px;
}

.form pre {
  text-align: left;
}

[data-type="checkbox"] fieldset.formkit-fieldset {
  border: none !important;
  padding: 0;
}

[data-type="checkbox"] .formkit-options {
  display: flex;
  flex-wrap: wrap;
}

.formkit-wrapper,
.formkit-fieldset {
  max-width: initial !important;
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