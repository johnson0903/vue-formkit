<template>
  <VueMultiselect v-model="value" :options="options" :close-on-select="!vueMultiSelectOptions.multiple"
    v-bind="vueMultiSelectOptions">
  </VueMultiselect>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import VueMultiselect from 'vue-multiselect'
const props = defineProps({
  context: Object
})
const multiSelectDefault = {}
const vueMultiSelectOptions = { ...multiSelectDefault, ...props.context.vueMultiSelectOptions }
const vSelectTrackBy = props.context.vueMultiSelectOptions && props.context.vueMultiSelectOptions['track-by'];

const options = computed(() => {
  return props.context.options;
})

const value = ref(null)

watch(value, () => {
  if ((typeof value.value === 'object') && vSelectTrackBy) {
    // 若 multiselect 選項為物件，則需以 multiselect 的 track-by 屬性對應的 key 之值作為輸入值
    const valueOfOptionObj = value.value && value.value[vSelectTrackBy];
    props.context.node.input(valueOfOptionObj)
  } else {
    props.context.node.input(value.value)
  }
})
watch(() => props.context.options, (newOptions, oldOptions) => {
  if (JSON.stringify(newOptions) !== JSON.stringify(oldOptions)) {
    value.value = undefined;
    props.context.node.input(value.value);
  }
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.css">

</style>