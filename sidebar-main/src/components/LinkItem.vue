<template>
  <a :href="url" :style="'cursor: ' + (active ? 'default': 'pointer')">
    <div class="link-option" :class="active ? 'active': ''">
      <div v-if="content" v-html="content" style="display: contents"></div>

      <template v-else>
        <span v-if="startIcon" class="link-option-icon" :class="startIcon"></span>
        <span class="link-option-text pnd-block pnd-ellipsis">{{ text }}</span>
        <span v-if="endIcon" class="link-option-icon" :class="endIcon"></span>
      </template>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  content: Object,
  startIcon: Object,
  endIcon: Object,
  text: String,
  url: String,
  active: Boolean
});
</script>
