<template>
  <input
    class="pnd-text-input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  placeholder: String,
  modelValue: String,
});

const updateValue = (e) => {
    emit('update:modelValue', e.target.value)
}

</script>

<style scoped>
.pnd-text-input {
  font-size: 14px;
  padding: 12px;
  border: 1px solid var(--primary-12);
  border-radius: 12px;
  width: 100%;
}
</style>
