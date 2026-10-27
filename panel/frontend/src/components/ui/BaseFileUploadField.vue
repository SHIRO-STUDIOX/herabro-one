<template>
  <div
    class="flex flex-col w-full text-right font-sans select-none"
    :class="{ 'opacity-60 pointer-events-none': disabled }"
    dir="rtl"
  >
    <!-- Hidden File Input -->
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="maxFiles > 1"
      @change="handleFileInputChange"
    />

    <!-- 1. Label and Header Hints (outside) -->
    <div
      v-if="label || $slots.label || hint || $slots.hint"
      class="flex items-center justify-between mb-1.5 w-full select-none"
    >
      <label
        class="text-xs font-semibold text-primary-80 font-dots-1 flex items-center gap-1"
        :class="labelClass"
      >
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-error-100 font-bold leading-none select-none">*</span>
      </label>

      <span v-if="hint || $slots.hint" class="text-2xs text-primary-40 font-dots-1">
        <slot name="hint">{{ hint }}</slot>
      </span>
    </div>

    <!-- 2. COMPACT VARIANT (Single Line, h-10, dashed border, matching BaseBadgeField) -->
    <div
      v-if="variant === 'compact'"
      class="relative flex items-center gap-2 w-full h-10 min-h-[40px] px-2 rounded-xl bg-primary-6/60 hover:bg-primary-6/80 border border-dashed transition-all duration-200 overflow-hidden"
      :class="[
        isDragging ? 'border-secondary-100 bg-secondary-6/40 ring-2 ring-secondary-100/20' : '',
        error
          ? 'border-error-100 bg-error-6/20'
          : 'border-primary-16 hover:border-primary-24 focus-within:border-primary-60',
      ]"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <!-- Action Button (Right in RTL): Browse / Upload Trigger -->
      <button
        type="button"
        class="shrink-0 h-7 px-2 rounded-lg bg-white-100 hover:bg-primary-6 active:scale-95 text-primary-100 border border-primary-12 text-2xs font-bold font-dots-1 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs outline-none"
        :disabled="isMaxReached || disabled || readonly"
        @click="triggerBrowse"
      >
        <Icon icon="solar:paperclip-2-bold-duotone" class="w-3.5 h-3.5 text-secondary-100" />
        <span>پیوست فایل</span>
        <span
          v-if="files.length > 0"
          class="w-4 h-4 rounded-full bg-secondary-100 text-white-100 text-3xs font-mono font-bold flex items-center justify-center leading-none"
        >
          {{ files.length }}
        </span>
      </button>

      <!-- Scrollable File Chips Strip -->
      <div class="flex-1 min-w-0 flex items-center">
        <BadgeScrollStrip v-if="files.length > 0" class="w-full">
          <div
            v-for="f in files"
            :key="f.id"
            class="inline-flex items-center gap-1.5 group/file shrink-0 pl-1"
          >
            <!-- File Chip -->
            <div
              class="h-6.5 px-2 rounded-lg bg-white-100 hover:bg-primary-6/60 border border-primary-12 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs max-w-[200px]"
              :title="`${f.name} (${formatSize(f.size)})`"
              @click.stop="openPreview(f)"
            >
              <!-- Icon -->
              <Icon
                :icon="getFileIcon(f)"
                class="w-3.5 h-3.5 shrink-0"
                :class="getFileIconColor(f)"
              />

              <!-- File Name -->
              <span class="text-2xs font-semibold text-primary-90 truncate font-dots-1">
                {{ f.name }}
              </span>

              <!-- Size badge -->
              <span class="text-3xs text-primary-40 font-mono hidden sm:inline-block shrink-0">
                {{ formatSize(f.size) }}
              </span>

              <!-- Delete Button -->
              <button
                v-if="!disabled && !readonly"
                type="button"
                class="w-4 h-4 rounded-full hover:bg-error-6 text-primary-40 hover:text-error-100 flex items-center justify-center transition-all cursor-pointer ml-[-2px] shrink-0 outline-none"
                title="حذف فایل"
                @click.stop="removeFile(f.id)"
              >
                <Icon icon="solar:close-circle-linear" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </BadgeScrollStrip>

        <!-- Empty State Placeholder -->
        <span
          v-else
          class="text-xs text-primary-40 font-dots-1 cursor-pointer hover:text-primary-60 transition-colors select-none truncate"
          @click="triggerBrowse"
        >
          {{ placeholder || 'انتخاب یا رهاسازی تصاویر و فایل‌های PDF...' }}
        </span>
      </div>

      <!-- Quick Clear All Button -->
      <button
        v-if="files.length > 1 && !disabled && !readonly"
        type="button"
        class="shrink-0 w-5 h-5 rounded-full hover:bg-primary-12 active:scale-95 text-primary-40 hover:text-error-100 flex items-center justify-center transition-all cursor-pointer outline-none"
        title="حذف همه فایل‌ها"
        @click.stop="clearAll"
      >
        <Icon icon="solar:trash-bin-trash-bold-duotone" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- 3. DROPZONE VARIANT (Extended area for dedicated upload panels) -->
    <div
      v-else-if="variant === 'dropzone'"
      class="flex flex-col gap-2.5 w-full"
    >
      <div
        class="w-full p-4 rounded-2xl bg-primary-6/60 hover:bg-primary-6/80 border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
        :class="[
          isDragging ? 'border-secondary-100 bg-secondary-6/40 ring-2 ring-secondary-100/20' : '',
          error
            ? 'border-error-100 bg-error-6/20'
            : 'border-primary-16 hover:border-primary-24',
          disabled || readonly ? 'cursor-not-allowed opacity-60' : '',
        ]"
        @click="triggerBrowse"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <div class="w-10 h-10 rounded-full bg-white-100 text-secondary-100 shadow-xs flex items-center justify-center border border-primary-8">
          <Icon icon="solar:cloud-upload-bold-duotone" class="w-5 h-5" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="text-xs font-bold text-primary-100 font-dots-1">
            {{ placeholder || 'فایل‌های خود را اینجا بکشید یا برای انتخاب کلیک کنید' }}
          </span>
          <span class="text-2xs text-primary-50">
            فرمت‌های مجاز: تصاویر (PNG، JPG، WEBP) و اسناد PDF (حداکثر {{ maxFileSizeMB }} مگابایت)
          </span>
        </div>
      </div>

      <!-- Attached files grid in dropzone mode -->
      <div v-if="files.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div
          v-for="f in files"
          :key="f.id"
          class="flex items-center justify-between p-2 rounded-xl bg-white-100 border border-primary-12 shadow-2xs group/card"
        >
          <div
            class="flex items-center gap-2 min-w-0 cursor-pointer flex-1"
            @click="openPreview(f)"
          >
            <!-- Thumbnail / Icon -->
            <div
              v-if="isImageFile(f) && f.url"
              class="w-9 h-9 rounded-lg overflow-hidden border border-primary-12 bg-primary-6 shrink-0"
            >
              <img :src="f.url" :alt="f.name" class="w-full h-full object-cover" />
            </div>
            <div
              v-else
              class="w-9 h-9 rounded-lg bg-primary-6 flex items-center justify-center shrink-0"
              :class="getFileIconColor(f)"
            >
              <Icon :icon="getFileIcon(f)" class="w-5 h-5" />
            </div>

            <div class="flex flex-col min-w-0 text-right">
              <span class="text-xs font-bold text-primary-100 font-dots-1 truncate">
                {{ f.name }}
              </span>
              <span class="text-3xs text-primary-50 font-mono">
                {{ formatSize(f.size) }}
              </span>
            </div>
          </div>

          <button
            v-if="!disabled && !readonly"
            type="button"
            class="p-1 rounded-lg text-primary-40 hover:text-error-100 hover:bg-error-6 transition-all cursor-pointer outline-none shrink-0"
            title="حذف"
            @click.stop="removeFile(f.id)"
          >
            <Icon icon="solar:trash-bin-trash-linear" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- 4. Error Message below input -->
    <span v-if="error || localError" class="text-2xs text-error-80 font-medium font-dots-1 mt-1 flex items-center gap-1">
      <Icon icon="solar:danger-circle-bold" class="w-3.5 h-3.5 shrink-0" />
      <span>{{ error || localError }}</span>
    </span>

    <!-- Preview Modal -->
    <FilePreviewModal
      :file="activePreviewFile"
      :is-open="isPreviewOpen"
      @close="closePreview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import BadgeScrollStrip from '@/components/ui/BadgeScrollStrip.vue'
import FilePreviewModal from '@/components/ui/FilePreviewModal.vue'
import type { UploadedFileItem, FileUploadVariant } from '@/types/fileUpload'

interface Props {
  modelValue?: UploadedFileItem[]
  label?: string
  labelClass?: string
  hint?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  variant?: FileUploadVariant
  accept?: string
  maxFiles?: number
  maxFileSizeMB?: number
  showPreviewModal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  label: '',
  labelClass: '',
  hint: '',
  placeholder: '',
  error: '',
  required: false,
  disabled: false,
  readonly: false,
  variant: 'compact',
  accept: 'image/*,application/pdf',
  maxFiles: 10,
  maxFileSizeMB: 10,
  showPreviewModal: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: UploadedFileItem[]): void
  (e: 'change', files: UploadedFileItem[]): void
  (e: 'file-added', file: UploadedFileItem): void
  (e: 'file-removed', fileId: string): void
  (e: 'error', errorMsg: string): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const localError = ref('')
const activePreviewFile = ref<UploadedFileItem | null>(null)
const isPreviewOpen = ref(false)

const files = computed(() => props.modelValue || [])
const isMaxReached = computed(() => files.value.length >= props.maxFiles)

const triggerBrowse = () => {
  if (props.disabled || props.readonly || isMaxReached.value) return
  localError.value = ''
  fileInputRef.value?.click()
}

const handleFileInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  processFiles(Array.from(target.files))
  target.value = ''
}

const onDragOver = () => {
  if (props.disabled || props.readonly) return
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  if (props.disabled || props.readonly) return
  if (!event.dataTransfer?.files || event.dataTransfer.files.length === 0) return
  processFiles(Array.from(event.dataTransfer.files))
}

const isImageFile = (file: UploadedFileItem): boolean => {
  return file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name)
}

const isPdfFile = (file: UploadedFileItem): boolean => {
  return file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
}

const getFileIcon = (file: UploadedFileItem): string => {
  if (isImageFile(file)) return 'solar:gallery-bold-duotone'
  if (isPdfFile(file)) return 'solar:document-pdf-bold-duotone'
  return 'solar:file-text-bold-duotone'
}

const getFileIconColor = (file: UploadedFileItem): string => {
  if (isPdfFile(file)) return 'text-error-100'
  if (isImageFile(file)) return 'text-secondary-100'
  return 'text-primary-80'
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '۰ بایت'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const val = (bytes / Math.pow(k, i)).toFixed(1)
  return `${val} ${sizes[i]}`
}

const validateFile = (file: File): string | null => {
  const maxBytes = props.maxFileSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return `حجم فایل "${file.name}" بیشتر از حد مجاز (${props.maxFileSizeMB} مگابایت) است.`
  }

  // Type validation: accept image and pdf
  const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name)
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)

  if (!isImage && !isPdf) {
    return `فرمت فایل "${file.name}" مجاز نیست. فقط تصویر و PDF پذیرفته می‌شود.`
  }

  return null
}

const processFiles = (rawFiles: File[]) => {
  localError.value = ''
  const availableSlots = props.maxFiles - files.value.length

  if (availableSlots <= 0) {
    const msg = `حداکثر تعداد فایل مجاز (${props.maxFiles} عدد) تکمیل شده است.`
    localError.value = msg
    emit('error', msg)
    return
  }

  const filesToAdd = rawFiles.slice(0, availableSlots)
  if (rawFiles.length > availableSlots) {
    localError.value = `فقط ${availableSlots} فایل اضافه شد (محدودیت سقف ${props.maxFiles} فایل).`
  }

  const newItems: UploadedFileItem[] = []

  for (const raw of filesToAdd) {
    const errorMsg = validateFile(raw)
    if (errorMsg) {
      localError.value = errorMsg
      emit('error', errorMsg)
      continue
    }

    const item: UploadedFileItem = {
      id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: raw.name,
      size: raw.size,
      type: raw.type || (raw.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'),
      url: URL.createObjectURL(raw),
      file: raw,
      status: 'success',
      progress: 100,
    }

    newItems.push(item)
    emit('file-added', item)
  }

  if (newItems.length > 0) {
    const updated = [...files.value, ...newItems]
    emit('update:modelValue', updated)
    emit('change', updated)
  }
}

const removeFile = (id: string) => {
  const fileToRemove = files.value.find((f) => f.id === id)
  if (fileToRemove?.url && fileToRemove.url.startsWith('blob:')) {
    URL.revokeObjectURL(fileToRemove.url)
  }
  const updated = files.value.filter((f) => f.id !== id)
  emit('update:modelValue', updated)
  emit('change', updated)
  emit('file-removed', id)
}

const clearAll = () => {
  files.value.forEach((f) => {
    if (f.url && f.url.startsWith('blob:')) {
      URL.revokeObjectURL(f.url)
    }
  })
  emit('update:modelValue', [])
  emit('change', [])
}

const openPreview = (file: UploadedFileItem) => {
  if (!props.showPreviewModal) return
  activePreviewFile.value = file
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
  activePreviewFile.value = null
}

defineExpose({
  triggerBrowse,
  clearAll,
  removeFile,
})
</script>
