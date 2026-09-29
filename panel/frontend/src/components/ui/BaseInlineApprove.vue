<template>
  <BaseInlineDelete
    variant="approve"
    :confirm-text="confirmText"
    :tooltip="tooltip"
    :timeout="timeout"
    :disabled="disabled"
    :icon="icon"
    :icon-class="iconClass"
    :button-class="buttonClass"
    :capsule-class="capsuleClass"
    @confirm="$emit('confirm')"
    @cancel="$emit('cancel')"
    @toggle="(open: boolean) => $emit('toggle', open)"
  />
</template>

<script setup lang="ts">
import BaseInlineDelete from '@/components/ui/BaseInlineDelete.vue'

export interface BaseInlineApproveProps {
  confirmText?: string
  tooltip?: string
  timeout?: number
  disabled?: boolean
  icon?: string
  iconClass?: string
  buttonClass?: string
  capsuleClass?: string
}

withDefaults(defineProps<BaseInlineApproveProps>(), {
  confirmText: 'تایید شود؟',
  tooltip: 'تایید',
  timeout: 3000,
  disabled: false,
  icon: 'solar:check-bold',
  iconClass: 'w-3.5 h-3.5',
  buttonClass: '',
  capsuleClass: '',
})

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'toggle', isOpen: boolean): void
}>()
</script>
