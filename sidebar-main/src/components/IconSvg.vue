<template>
  <iconify-icon class="svg" v-if="isIconify" :icon="props.name"></iconify-icon>
  <span v-else class="svg" v-html="loadlIcon()"></span>
</template>

<script setup>
import 'iconify-icon';
import { computed } from 'vue';
const icons = import.meta.glob("../assets/icons/**/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const isIconify = computed(() => props.name.includes(":"));

const loadlIcon = () => {
  const fileName = props.name.endsWith(".svg")
  ? props.name
  : props.name + ".svg";

  const appPath = `../assets/icons/modules/${fileName}`;
  if (icons[appPath]) {
    return icons[appPath];
  }

  const rootPath = `../assets/icons/${fileName}`;
  if (icons[rootPath]) {
    return icons[rootPath];
  }

  return "";
};
</script>