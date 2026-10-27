<template>
  <div
    class="w-full h-full min-h-screen overflow-y-auto p-3 sm:p-6 md:p-8 bg-surface-100 flex flex-col items-center justify-start gap-6 font-sans text-right select-none"
    dir="rtl"
  >
    <!-- Header & Sandbox Control Bar -->
    <header
      class="w-full max-w-[1100px] bg-white-80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-primary-8 flex flex-col gap-4 shadow-sm"
    >
      <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-primary-6">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-secondary-6 text-secondary-100 flex items-center justify-center">
            <Icon icon="solar:cloud-upload-bold-duotone" class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-sm sm:text-base font-extrabold text-primary-100 font-dots-1">
              محیط آزمایشی ماژول آپلود فایل (File Upload Field Sandbox)
            </h1>
            <p class="text-xs text-primary-60 font-dots-1 mt-0.5">
              آپلود همزمان تصویر (PNG, JPG, WEBP) و PDF با پیش‌نمایش، حالت کامپکت و دراپ‌زون
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-2xs font-mono font-bold bg-primary-6 text-primary-80 rounded-lg border border-primary-12">
            مجموع فایل‌های فرم ۱: {{ filesCompact.length }}
          </span>
          <span class="px-2.5 py-1 text-2xs font-mono font-bold bg-primary-6 text-primary-80 rounded-lg border border-primary-12">
            مجموع فایل‌های فرم ۲: {{ filesDropzone.length }}
          </span>
          <BaseButton
            type="primary"
            style-type="outline"
            size="sm"
            :show-start-icon="true"
            start-icon="solar:restart-bold"
            class="font-dots-1 text-xs font-semibold !h-8 px-2.5 !rounded-xl"
            @click="resetDemo"
          >
            <span>بازنشانی</span>
          </BaseButton>
        </div>
      </div>
    </header>

    <!-- Main Playground Grid -->
    <main class="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Card 1: Compact Mode (BaseBadgeField Style) -->
      <section class="bg-white-60 backdrop-blur-md rounded-2xl p-4 border border-primary-8 flex flex-col gap-4 shadow-xs">
        <div class="flex items-center justify-between pb-2 border-b border-primary-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-secondary-100" />
            <h2 class="text-xs font-bold text-primary-100 font-dots-1">
              ۱. حالت فشرده (Compact Field - ارتفاع ۴۰px)
            </h2>
          </div>
          <BaseBadge type="primary" style-type="soft" size="2xs" class="font-dots-1">
            مناسب تمام فرم‌ها
          </BaseBadge>
        </div>

        <p class="text-2xs text-primary-60 leading-relaxed font-dots-1">
          این حالت ساختاری مشابه فیلد برچسب‌ها با حاشیه خط‌چین و دکمه انتخاب سریع دارد. امکان دراگ و دراپ فایل یا کلیک روی دکمه پیوست وجود دارد.
        </p>

        <!-- Test Component Instance -->
        <div class="bg-white-80 p-3 rounded-xl flex flex-col gap-3">
          <BaseFileUploadField
            v-model="filesCompact"
            label="ضمایم و فاکتورهای پیوست"
            placeholder="انتخاب یا رهاسازی تصاویر و فایل‌های PDF..."
            hint="حداکثر ۵ فایل - تا ۱۰ مگابایت"
            :max-files="5"
            :max-file-size-m-b="10"
            variant="compact"
          />
        </div>

        <!-- JSON State View -->
        <div class="flex flex-col gap-1.5 mt-auto">
          <span class="text-3xs font-mono text-primary-50">لیست فایل‌های v-model:</span>
          <div class="p-2.5 rounded-xl bg-primary-6/60 text-3xs font-mono text-primary-80 max-h-36 overflow-auto">
            <pre>{{ filesCompact.map(f => ({ name: f.name, size: f.size, type: f.type })) }}</pre>
          </div>
        </div>
      </section>

      <!-- Card 2: Dropzone Mode (Expanded Area) -->
      <section class="bg-white-60 backdrop-blur-md rounded-2xl p-4 border border-primary-8 flex flex-col gap-4 shadow-xs">
        <div class="flex items-center justify-between pb-2 border-b border-primary-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-primary-100" />
            <h2 class="text-xs font-bold text-primary-100 font-dots-1">
              ۲. حالت دراپ‌زون (Dropzone Mode)
            </h2>
          </div>
          <BaseBadge type="neutral" style-type="soft" size="2xs" class="font-dots-1">
            محیط گسترده
          </BaseBadge>
        </div>

        <p class="text-2xs text-primary-60 leading-relaxed font-dots-1">
          برای فرم‌های اختصاصی که نیاز به باکس بزرگ دراگ و رهاسازی فایل‌ها با کارت‌های تصویری دارند.
        </p>

        <!-- Test Component Instance -->
        <div class="bg-white-80 p-3 rounded-xl flex flex-col gap-3">
          <BaseFileUploadField
            v-model="filesDropzone"
            label="مستندات حسابرسی و گزارشات"
            placeholder="فایل‌های تصویری یا PDF خود را اینجا رها کنید"
            hint="پشتیبانی از چندین فایل همزمان"
            :max-files="8"
            :max-file-size-m-b="20"
            variant="dropzone"
          />
        </div>

        <!-- JSON State View -->
        <div class="flex flex-col gap-1.5 mt-auto">
          <span class="text-3xs font-mono text-primary-50">لیست فایل‌های v-model:</span>
          <div class="p-2.5 rounded-xl bg-primary-6/60 text-3xs font-mono text-primary-80 max-h-36 overflow-auto">
            <pre>{{ filesDropzone.map(f => ({ name: f.name, size: f.size, type: f.type })) }}</pre>
          </div>
        </div>
      </section>
    </main>

    <!-- Card 3: Example Form Integration -->
    <section class="w-full max-w-[1100px] bg-white-60 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-primary-8 flex flex-col gap-3.5 shadow-xs">
      <div class="flex items-center justify-between pb-2 border-b border-primary-6">
        <div class="flex items-center gap-2">
          <Icon icon="solar:document-add-bold-duotone" class="w-4 h-4 text-secondary-100" />
          <h2 class="text-xs font-bold text-primary-100 font-dots-1">
            شبیه‌سازی استفاده در یک فرم واقعی سامانه (مثلاً ایجاد سند / ویرایش فاکتور)
          </h2>
        </div>
      </div>

      <div class="bg-white-80 p-4 rounded-xl flex flex-col gap-3 max-w-[600px] mx-auto w-full">
        <BaseInput
          model-value="سند پرداخت علی‌الحساب پیمانکار"
          title="شرح سند"
          title-state="out"
          size="sm"
          readonly
        />

        <!-- Integrated Upload Field -->
        <BaseFileUploadField
          v-model="formExampleFiles"
          label="پیوست‌های مالی سند"
          placeholder="افزودن رسید پرداخت، تصویر چک یا قرارداد..."
          variant="compact"
        />

        <div class="flex items-center justify-end gap-2 pt-2 border-t border-primary-8">
          <BaseButton
            type="primary"
            style-type="solid"
            size="sm"
            class="font-dots-1"
          >
            <span>ذخیره سند با پیوست‌ها</span>
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import BaseFileUploadField from '@/components/ui/BaseFileUploadField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import type { UploadedFileItem } from '@/types/fileUpload'

// Initial mock items for demo
const createMockFile = (name: string, size: number, type: string): UploadedFileItem => ({
  id: `mock_${Math.random().toString(36).substring(2, 8)}`,
  name,
  size,
  type,
  url: type.startsWith('image/')
    ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect fill="%232563eb" width="300" height="200"/><text fill="%23ffffff" font-family="sans-serif" font-size="20" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">تصویر آزمایشی</text></svg>'
    : undefined,
  status: 'success',
  progress: 100,
})

const filesCompact = ref<UploadedFileItem[]>([
  createMockFile('factore_kharid_1403.png', 485000, 'image/png'),
  createMockFile('gharardad_peymankar.pdf', 1240000, 'application/pdf'),
])

const filesDropzone = ref<UploadedFileItem[]>([
  createMockFile('resid_banki_mellat.jpg', 320000, 'image/jpeg'),
])

const formExampleFiles = ref<UploadedFileItem[]>([
  createMockFile('sanad_hesabdari.pdf', 850000, 'application/pdf'),
])

const resetDemo = () => {
  filesCompact.value = [
    createMockFile('factore_kharid_1403.png', 485000, 'image/png'),
    createMockFile('gharardad_peymankar.pdf', 1240000, 'application/pdf'),
  ]
  filesDropzone.value = [
    createMockFile('resid_banki_mellat.jpg', 320000, 'image/jpeg'),
  ]
  formExampleFiles.value = [
    createMockFile('sanad_hesabdari.pdf', 850000, 'application/pdf'),
  ]
}
</script>
