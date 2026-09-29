<template>
  <BaseInlineDelete
    variant="undo"
    :confirm-text="resolvedConfirmText"
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
import { computed } from 'vue'
import BaseInlineDelete from '@/components/ui/BaseInlineDelete.vue'

export interface BaseInlineUndoProps {
  /** Explicit confirm caption. When empty, built from targetLabel as «بازگشت به {targetLabel}؟» */
  confirmText?: string
  /** Label of the previous status to return to (e.g. «پیش‌نویس») */
  targetLabel?: string
  tooltip?: string
  timeout?: number
  disabled?: boolean
  icon?: string
  iconClass?: string
  buttonClass?: string
  capsuleClass?: string
}

const props = withDefaults(defineProps<BaseInlineUndoProps>(), {
  confirmText: '',
  targetLabel: 'پیش‌نویس',
  tooltip: 'لغو تایید و بازگشت',
  timeout: 3000,
  disabled: false,
  icon: 'solar:restart-bold',
  iconClass: 'w-3.5 h-3.5',
  buttonClass: '',
  capsuleClass: '',
})

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'toggle', isOpen: boolean): void
}>()

const resolvedConfirmText = computed(() => {
  if (props.confirmText) return props.confirmText
  if (props.targetLabel) return `بازگشت به ${props.targetLabel}؟`
  return 'بازگشت به وضعیت قبلی؟'
})
</script>
