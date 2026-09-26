<template>
    <div class="pnd-card-header">
      <IconSvg class="pnd-card-header-icon svg" :name='icon'></IconSvg>
      <span class="pnd-card-header-text">{{ text }}</span>
      <div style="gap:4px; display:flex">
        <div v-for="(key, idx) in shortcuts" :key="idx" class="shortcut">
          <span>{{ key }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { isFontAwesome } from "../helpers/helperString";
import IconSvg from "./IconSvg.vue";

  defineProps({
    icon: { type: String, default: "" },
    text: { type: String, required: true },
    shortcuts: { type: Array, default: () => [] }
  })
  </script>