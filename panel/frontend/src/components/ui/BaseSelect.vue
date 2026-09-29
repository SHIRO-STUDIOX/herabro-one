<template>
  <BaseDropdown v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import BaseDropdown from './BaseDropdown.vue'
export type {
  BaseDropdownProps as BaseSelectProps,
  BaseDropdownOption as SelectOption,
} from './BaseDropdown.vue'
</script>
