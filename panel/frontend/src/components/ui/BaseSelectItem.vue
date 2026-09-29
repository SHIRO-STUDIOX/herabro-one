<template>
  <BaseDropdownItem v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </BaseDropdownItem>
</template>

<script setup lang="ts">
import BaseDropdownItem from './BaseDropdownItem.vue'
export type { BaseDropdownItemProps as BaseSelectItemProps } from './BaseDropdownItem.vue'
</script>
