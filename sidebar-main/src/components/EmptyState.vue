<template>
  <div class="container">
    <IconSvg class="icon" :name="icon"></IconSvg>
    <span class="title">{{ title }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </div>
</template>

<script setup>
import IconSvg from "./IconSvg.vue";

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 80px;
  height: 80px;
  font-size: 80px;
  color: var(--primary-60);
}

.title {
  font-size: 16px;
  font-weight: 700;
  margin-top: 20px;
  color: var(--primary-80);
}

.subtitle {
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  color: var(--primary-60);
  white-space: pre-line;
  text-align: center;
}
</style>
