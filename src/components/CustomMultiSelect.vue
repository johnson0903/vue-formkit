<template>
  <VueMultiselect v-model="value" :options="props.context.options" :multiple="!!props.context.multiple"
    :close-on-select="!props.context.multiple" 
    :placeholder="props.context.placeholder || 'Select one option'">
  </VueMultiselect>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import VueMultiselect from 'vue-multiselect'

const props = defineProps({
  context: Object
})

const value = ref(null)
watch(value, () => {
  props.context.node.input(value.value)
})
</script>
<style src="vue-multiselect/dist/vue-multiselect.css">

</style>