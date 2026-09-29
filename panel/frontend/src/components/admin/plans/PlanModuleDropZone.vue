<template>
  <div class="w-full flex flex-col gap-3 font-sans select-none text-right" dir="rtl">
    <div class="flex items-center justify-between">
      <label class="text-xs font-extrabold text-primary-80 flex items-center gap-1.5">
        <Icon icon="solar:box-minimalistic-bold-duotone" class="w-4 h-4 text-primary-100" />
        ماژول‌ها و قابلیت‌های فعال در پلن (Drag & Drop)
      </label>
      <span class="text-2xs text-primary-40">ماژول‌ها را برای افزودن به پلن بکشید یا کلیک کنید</span>
    </div>

    <!-- Container Grid: Available Modules Palette + Drop Zone Area -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 1. Available Modules Palette -->
      <div class="p-4 bg-primary-1/30 rounded-2xl border border-primary-6 flex flex-col gap-2.5">
        <span class="text-2xs font-bold text-primary-60">پالت ماژول‌های سیستم:</span>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="mod in availableModules"
            :key="mod.id"
            draggable="true"
            class="px-3 py-2 rounded-xl border border-primary-8 bg-white-100 text-xs font-medium text-primary-100 flex items-center gap-2 cursor-grab active:cursor-grabbing hover:border-primary-100 hover:shadow-2xs transition-all select-none"
            :class="{ 'opacity-40 pointer-events-none': modelValue.includes(mod.id) }"
            @dragstart="onDragStart($event, mod.id)"
            @click="addModule(mod.id)"
          >
            <Icon :icon="mod.icon" class="w-4 h-4 text-primary-60" />
            <span>{{ mod.label }}</span>
            <Icon icon="solar:add-circle-linear" class="w-3.5 h-3.5 text-primary-40 mr-1" />
          </div>
        </div>
      </div>

      <!-- 2. Active Drop Zone Area -->
      <div
        class="p-4 rounded-2xl border-2 border-dashed transition-all duration-200 min-h-[140px] flex flex-col gap-2.5 justify-start"
        :class="isDraggingOver ? 'border-primary-100 bg-primary-1/60 scale-[1.01]' : 'border-primary-12 bg-white-100'"
        @dragover.prevent="isDraggingOver = true"
        @dragleave.prevent="isDraggingOver = false"
        @drop.prevent="onDrop"
      >
        <div class="flex items-center justify-between">
          <span class="text-2xs font-bold text-primary-60">ماژول‌های انتخابی این پلن:</span>
          <span class="text-2xs font-mono font-bold text-primary-100">{{ modelValue.length }} ماژول</span>
        </div>

        <div v-if="modelValue.length === 0" class="flex-1 flex flex-col items-center justify-center text-primary-40 py-6 text-center">
          <Icon icon="solar:archive-down-minimlistic-linear" class="w-7 h-7 text-primary-20 mb-1" />
          <span class="text-2xs">ماژول‌ها را به این محفظه بکشید و رها کنید</span>
        </div>

        <!-- Selected Tags with Remove Action -->
        <div v-else class="flex flex-wrap gap-2">
          <div
            v-for="modId in modelValue"
            :key="modId"
            class="px-3 py-2 rounded-xl bg-primary-6 border border-primary-12 text-xs font-bold text-primary-100 flex items-center gap-2 transition-all shadow-2xs"
          >
            <Icon :icon="getModuleIcon(modId)" class="w-4 h-4 text-primary-100" />
            <span>{{ getModuleLabel(modId) }}</span>
            <button
              type="button"
              class="w-4 h-4 rounded-full bg-primary-12 text-primary-80 hover:text-error-100 hover:bg-error-6 flex items-center justify-center transition-colors cursor-pointer outline-none mr-1"
              @click.stop="removeModule(modId)"
            >
              <Icon icon="solar:close-circle-bold" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const isDraggingOver = ref(false);

const availableModules = [
  { id: 'sales', label: 'فروش و صدور فاکتور', icon: 'solar:bill-list-bold-duotone' },
  { id: 'inventory', label: 'انبارداری و چند انباری', icon: 'solar:box-minimalistic-bold-duotone' },
  { id: 'cheques', label: 'مدیریت چک‌های صیادی', icon: 'solar:card-2-bold-duotone' },
  { id: 'treasury', label: 'خزانه‌داری و گردش وجوه', icon: 'solar:wallet-2-bold-duotone' },
  { id: 'accounting_advanced', label: 'حسابداری دوبل پیشرفته', icon: 'solar:calculator-bold-duotone' },
  { id: 'pos_integration', label: 'اتصال به کارتخوان (POS)', icon: 'solar:card-receive-bold-duotone' },
  { id: 'tax_system', label: 'سامانه مودیان مالیاتی', icon: 'solar:document-text-bold-duotone' },
  { id: 'multi_user', label: 'کاربری تیمی و سطوح دسترسی', icon: 'solar:users-group-two-rounded-bold-duotone' },
  { id: 'sms_gateway', label: 'سامانه اطلاع‌رسانی پیامکی', icon: 'solar:chat-round-dots-bold-duotone' },
];

function getModuleLabel(id: string) {
  const m = availableModules.find((x) => x.id === id);
  return m ? m.label : id;
}

function getModuleIcon(id: string) {
  const m = availableModules.find((x) => x.id === id);
  return m ? m.icon : 'solar:widget-2-bold-duotone';
}

function onDragStart(event: DragEvent, moduleId: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', moduleId);
  }
}

function onDrop(event: DragEvent) {
  isDraggingOver.value = false;
  if (event.dataTransfer) {
    const moduleId = event.dataTransfer.getData('text/plain');
    if (moduleId && !props.modelValue.includes(moduleId)) {
      emit('update:modelValue', [...props.modelValue, moduleId]);
    }
  }
}

function addModule(id: string) {
  if (!props.modelValue.includes(id)) {
    emit('update:modelValue', [...props.modelValue, id]);
  }
}

function removeModule(id: string) {
  emit('update:modelValue', props.modelValue.filter((x) => x !== id));
}
</script>
