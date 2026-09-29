<template>
  <div class="w-full flex flex-col gap-6 font-sans select-none text-right" dir="rtl">
    <!-- Studio Header & Plan Selector Tabs -->
    <div class="p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-6 text-primary-100 flex items-center justify-center shrink-0">
          <Icon icon="solar:layers-minimalistic-bold-duotone" class="w-5 h-5 text-primary-100" />
        </div>
        <div class="flex flex-col">
          <h2 class="text-sm font-extrabold text-primary-100">استودیوی داینامیک طراحی پلن‌ها و تعرفه‌ها</h2>
          <span class="text-2xs text-primary-60">پیکربندی هوشمند بسته‌ها، سهمیه‌ها، ماژول‌ها و ماتریس قیمت‌های ریالی</span>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Switch Existing Plans -->
        <button
          v-for="p in existingPlans"
          :key="p.id"
          type="button"
          class="px-3 py-1.5 rounded-xl border text-xs font-bold transition-all"
          :class="currentPlan.slug === p.slug ? 'bg-primary-100 text-white-100 border-primary-100' : 'bg-primary-1/40 border-primary-8 text-primary-80 hover:bg-primary-6'"
          @click="selectPlan(p)"
        >
          <span v-if="p.is_featured" class="ml-1 text-warning-100">⭐</span>
          {{ p.title }}
        </button>

        <BaseButton
          size="sm"
          variant="secondary"
          start-icon="solar:add-circle-linear"
          @click="initNewPlan"
        >
          پلن جدید
        </BaseButton>
      </div>
    </div>

    <!-- Main Canvas Layout: Form & DropZone on Right, Live Preview on Left -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left (Col 8): Studio Form, Quotas, Dropzone & Cycles -->
      <div class="lg:col-span-8 flex flex-col gap-5">
        <!-- Basic Info & Featured Switch -->
        <div class="p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-4 shadow-2xs">
          <div class="flex items-center justify-between border-b border-primary-6 pb-3">
            <span class="text-xs font-extrabold text-primary-80">مشخصات اصلی پلن</span>

            <!-- Set Featured Switch -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold" :class="currentPlan.is_featured ? 'text-primary-100' : 'text-primary-60'">
                پلن برگزیده و پیشنهادی سیستم
              </span>
              <BaseSwitch
                v-model="currentPlan.is_featured"
                size="md"
                @update:model-value="onFeaturedToggle"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="currentPlan.title"
              title="عنوان پلن تجاری"
              placeholder="مثلاً پلن استاندارد مغازه و فروشگاه"
              required
            />
            <BaseInput
              v-model="currentPlan.slug"
              title="شناسه انگلیسی یکتا (Slug)"
              placeholder="مثلاً shop-standard"
              class="font-mono"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="currentPlan.featured_badge_text"
              title="متن روبان / نشان برگزیده (اختیاری)"
              placeholder="مثلاً پیشنهاد ویژه اصناف"
            />
            <BaseInput
              v-model="currentPlan.description"
              title="توضیح کوتاه ویترین خریدار"
              placeholder="توضیح کاربرد پلن برای مشتریان..."
            />
          </div>
        </div>

        <!-- Quotas Matrix Inputs -->
        <div class="p-5 bg-white-100 rounded-2xl border border-primary-6 flex flex-col gap-4 shadow-2xs">
          <span class="text-xs font-extrabold text-primary-80">سقف سهمیه‌ها و ظرفیت‌ها (خالی = نامحدود)</span>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <BaseInput
              :model-value="currentPlan.max_invoices_monthly ?? undefined"
              type="number"
              title="فاکتور ماهانه"
              placeholder="نامحدود"
              class="font-mono"
              @update:model-value="currentPlan.max_invoices_monthly = $event ? Number($event) : null"
            />
            <BaseInput
              :model-value="currentPlan.max_warehouses ?? undefined"
              type="number"
              title="تعداد انبارها"
              placeholder="نامحدود"
              class="font-mono"
              @update:model-value="currentPlan.max_warehouses = $event ? Number($event) : null"
            />
            <BaseInput
              :model-value="currentPlan.max_users ?? undefined"
              type="number"
              title="کاربران همزمان"
              placeholder="نامحدود"
              class="font-mono"
              @update:model-value="currentPlan.max_users = $event ? Number($event) : null"
            />
            <BaseInput
              :model-value="currentPlan.max_cheques ?? undefined"
              type="number"
              title="سقف چک‌ها"
              placeholder="نامحدود"
              class="font-mono"
              @update:model-value="currentPlan.max_cheques = $event ? Number($event) : null"
            />
          </div>
        </div>

        <!-- Drag & Drop Modules Palette -->
        <div class="p-5 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs">
          <PlanModuleDropZone
            :model-value="currentPlan.active_features_json || []"
            @update:model-value="currentPlan.active_features_json = $event"
          />
        </div>

        <!-- Billing Cycles Table -->
        <div class="p-5 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs">
          <PlanBillingCyclesTable
            :cycles="currentPlan.billing_cycles || []"
            @update:cycles="currentPlan.billing_cycles = $event"
          />
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 p-4 bg-white-100 rounded-2xl border border-primary-6 shadow-2xs">
          <BaseButton
            size="md"
            variant="secondary"
            @click="initNewPlan"
          >
            ریست فرم
          </BaseButton>

          <BaseButton
            size="md"
            variant="primary"
            :loading="saving"
            start-icon="solar:disk-bold-duotone"
            @click="savePlan"
          >
            ذخیره و انتشار پلن
          </BaseButton>
        </div>
      </div>

      <!-- Right (Col 4): Sticky Real-time Buyer Showcase Preview -->
      <div class="lg:col-span-4 sticky top-6 flex flex-col gap-3">
        <!-- View Mode Switcher -->
        <div class="flex items-center justify-between p-1 bg-white-80 border border-primary-8 rounded-full">
          <button
            type="button"
            class="flex-1 py-1 px-2.5 rounded-full text-2xs font-bold transition-all cursor-pointer"
            :class="previewMode === 'card' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100'"
            @click="previewMode = 'card'"
          >
            کارت ویترین خریدار
          </button>
          <button
            type="button"
            class="flex-1 py-1 px-2.5 rounded-full text-2xs font-bold transition-all cursor-pointer"
            :class="previewMode === 'matrix' ? 'bg-primary-100 text-white-100 shadow-2xs' : 'text-primary-60 hover:text-primary-100'"
            @click="previewMode = 'matrix'"
          >
            ماتریس امکانات
          </button>
        </div>

        <PlanPreviewCard v-if="previewMode === 'card'" :plan="currentPlan" />
        <div v-else class="w-full bg-white-100 border border-primary-8 rounded-2xl p-3 shadow-2xs overflow-x-auto">
          <FeatureMatrixTable :plans="PLAN_DEFINITIONS" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSwitch from '@/components/ui/BaseSwitch.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import FeatureMatrixTable from '@/components/subscription/FeatureMatrixTable.vue';
import PlanModuleDropZone from './PlanModuleDropZone.vue';
import PlanBillingCyclesTable from './PlanBillingCyclesTable.vue';
import PlanPreviewCard from './PlanPreviewCard.vue';
import { PLAN_DEFINITIONS } from '@/types/subscription';
import type { AdminPlanItem, PlanBillingCycleItem } from '@/types/admin';

const previewMode = ref<'card' | 'matrix'>('card');

const props = defineProps<{
  existingPlans: AdminPlanItem[];
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', plan: Partial<AdminPlanItem>): void;
  (e: 'setFeatured', planId: number, badgeText: string): void;
}>();

const currentPlan = reactive<Partial<AdminPlanItem>>({
  id: undefined,
  slug: 'shop-standard',
  title: 'پلن استاندارد مغازه و فروشگاه',
  description: 'کامل‌ترین بسته برای فروشگاه‌ها و اصناف با قابلیت انبارداری و اتصال به کارتخوان',
  is_featured: true,
  featured_badge_text: 'پیشنهاد ویژه اصناف',
  max_invoices_monthly: null,
  max_warehouses: 5,
  max_users: 5,
  max_cheques: null,
  active_features_json: ['sales', 'inventory', 'pos_integration', 'tax_system', 'multi_user'],
  billing_cycles: [
    { months_count: 1, base_price_rial: 9900000, discount_percent: 0, final_price_rial: 9900000 },
    { months_count: 3, base_price_rial: 29700000, discount_percent: 10, final_price_rial: 26730000 },
    { months_count: 6, base_price_rial: 59400000, discount_percent: 15, final_price_rial: 50490000 },
    { months_count: 12, base_price_rial: 118800000, discount_percent: 20, final_price_rial: 95040000 },
  ],
  is_active: true,
});

function selectPlan(plan: AdminPlanItem) {
  Object.assign(currentPlan, JSON.parse(JSON.stringify(plan)));
}

function initNewPlan() {
  currentPlan.id = undefined;
  currentPlan.slug = '';
  currentPlan.title = '';
  currentPlan.description = '';
  currentPlan.is_featured = false;
  currentPlan.featured_badge_text = '';
  currentPlan.max_invoices_monthly = 500;
  currentPlan.max_warehouses = 1;
  currentPlan.max_users = 1;
  currentPlan.max_cheques = 20;
  currentPlan.active_features_json = ['sales'];
  currentPlan.billing_cycles = [
    { months_count: 1, base_price_rial: 5000000, discount_percent: 0, final_price_rial: 5000000 },
    { months_count: 3, base_price_rial: 15000000, discount_percent: 10, final_price_rial: 13500000 },
    { months_count: 12, base_price_rial: 60000000, discount_percent: 20, final_price_rial: 48000000 },
  ];
  currentPlan.is_active = true;
}

function onFeaturedToggle(val: boolean) {
  if (val && currentPlan.id) {
    emit('setFeatured', currentPlan.id, currentPlan.featured_badge_text || '');
  }
}

function savePlan() {
  emit('save', JSON.parse(JSON.stringify(currentPlan)));
}
</script>
