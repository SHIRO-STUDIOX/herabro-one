<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen && file"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black-32/70 backdrop-blur-md select-none font-sans"
        dir="rtl"
        @click.self="close"
      >
        <div
          class="relative w-full max-w-[680px] max-h-[90vh] bg-white-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-primary-12 transition-all"
          @click.stop
        >
          <!-- Header Bar -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-primary-8 bg-white-80">
            <div class="flex items-center gap-2.5 min-w-0">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                :class="isPdf ? 'bg-error-6 text-error-100' : 'bg-primary-6 text-primary-100'"
              >
                <Icon
                  :icon="isPdf ? 'solar:document-pdf-bold-duotone' : 'solar:gallery-bold-duotone'"
                  class="w-4.5 h-4.5"
                />
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-bold text-primary-100 font-dots-1 truncate max-w-[280px] sm:max-w-[400px]">
                  {{ file.name }}
                </span>
                <span class="text-3xs text-primary-60 font-mono">
                  {{ formatSize(file.size) }}
                </span>
              </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-1.5 shrink-0">
              <a
                v-if="file.url"
                :href="file.url"
                :download="file.name"
                target="_blank"
                rel="noopener noreferrer"
                class="w-7 h-7 rounded-lg bg-primary-6 hover:bg-primary-12 text-primary-80 hover:text-primary-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                title="دانلود فایل"
              >
                <Icon icon="solar:download-minimalistic-bold-duotone" class="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                class="w-7 h-7 rounded-lg bg-primary-6 hover:bg-error-6 text-primary-80 hover:text-error-100 flex items-center justify-center transition-all cursor-pointer outline-none"
                title="بستن"
                @click="close"
              >
                <Icon icon="solar:close-circle-linear" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Body / Viewer -->
          <div class="flex-1 min-h-[220px] max-h-[calc(85vh-110px)] overflow-auto bg-primary-6/40 flex items-center justify-center p-3">
            <!-- Image Preview -->
            <img
              v-if="isImage && file.url"
              :src="file.url"
              :alt="file.name"
              class="max-w-full max-h-[520px] object-contain rounded-lg shadow-sm"
            />

            <!-- PDF Preview Frame / Info -->
            <div
              v-else-if="isPdf"
              class="flex flex-col items-center justify-center gap-3 p-6 text-center"
            >
              <div class="w-16 h-16 rounded-2xl bg-error-6 text-error-100 flex items-center justify-center shadow-xs">
                <Icon icon="solar:document-pdf-bold-duotone" class="w-8 h-8" />
              </div>
              <div class="flex flex-col items-center gap-1">
                <span class="text-sm font-bold text-primary-100 font-dots-1">
                  سند الکترونیکی PDF
                </span>
                <span class="text-xs text-primary-60">
                  جهت مطالعه یا چاپ، سند را در تب جدید باز کنید
                </span>
              </div>
              <a
                v-if="file.url"
                :href="file.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-100 text-white-100 text-xs font-semibold hover:bg-primary-90 transition-all shadow-xs"
              >
                <Icon icon="solar:arrow-up-linear" class="w-3.5 h-3.5 rotate-45" />
                <span>مشاهده کامل در تب جدید</span>
              </a>
            </div>

            <!-- Fallback generic preview -->
            <div v-else class="flex flex-col items-center justify-center gap-2 text-primary-60 text-xs">
              <Icon icon="solar:file-text-bold-duotone" class="w-12 h-12 text-primary-40" />
              <span>پیش‌نمایش برای این نوع فایل در دسترس نیست</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { UploadedFileItem } from '@/types/fileUpload'

interface Props {
  file: UploadedFileItem | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const isImage = computed(() => {
  if (!props.file) return false
  return (
    props.file.type.startsWith('image/') ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(props.file.name)
  )
})

const isPdf = computed(() => {
  if (!props.file) return false
  return (
    props.file.type === 'application/pdf' ||
    /\.pdf$/i.test(props.file.name)
  )
})

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '۰ بایت'
  const k = 1024
  const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const val = (bytes / Math.pow(k, i)).toFixed(1)
  return `${val} ${sizes[i]}`
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
