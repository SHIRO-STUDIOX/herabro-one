<template>
  <button
    type="button"
    class="hrn-trigger-btn"
    :class="{
      'is-active': isOpen,
      'has-unread': hasUnread,
    }"
    :title="title"
    @click="handleClick"
  >
    <Icon
      :icon="isOpen ? 'solar:bell-bold' : 'solar:bell-bold-duotone'"
      class="hrn-trigger-icon"
    />

    <!-- Unread Notification Badge / Dot -->
    <span v-if="hasUnread" class="hrn-unread-indicator">
      <span class="hrn-unread-ping"></span>
      <span class="hrn-unread-dot"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useChangelog } from '../composables/useChangelog'

withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'تغییرات اخیر و یادداشت‌های انتشار',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { isOpen, hasUnread, toggleDrawer } = useChangelog()

const handleClick = () => {
  toggleDrawer()
  emit('click')
}
</script>

<style scoped>
.hrn-trigger-btn {
  width: 44px;
  height: 44px;
  border-radius: 24px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--primary-40, rgba(73, 64, 109, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  padding: 0;
}

.hrn-trigger-btn:hover {
  color: var(--primary-80, rgba(73, 64, 109, 0.8));
  background-color: var(--primary-6, rgba(73, 64, 109, 0.06));
}

.hrn-trigger-btn.is-active {
  color: var(--primary-100, rgba(73, 64, 109, 1));
  border-color: var(--white-100, #ffffff);
  background: radial-gradient(
    99.75% 50% at 50% 100%,
    var(--white-100, #ffffff) 0%,
    var(--white-0, rgba(255, 255, 255, 0)) 100%
  );
  box-shadow: 0px 0px 24px 0px var(--primary-6, rgba(73, 64, 109, 0.06));
}

.hrn-trigger-icon {
  width: 22px;
  height: 22px;
  font-size: 22px;
  transition: transform 0.2s ease;
}

.hrn-trigger-btn:active .hrn-trigger-icon {
  transform: scale(0.92);
}

.hrn-unread-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  width: 8px;
  height: 8px;
}

.hrn-unread-ping {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: var(--error-100, #b84242);
  opacity: 0.75;
  animation: hrn-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.hrn-unread-dot {
  position: relative;
  display: inline-flex;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  background-color: var(--error-100, #b84242);
  border: 1.5px solid #ffffff;
}

@keyframes hrn-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
