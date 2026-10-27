<template>
  <aside
    class="w-72 bg-[#2c2c2c] border-l border-[#383838] flex flex-col shrink-0 p-3 gap-3 overflow-y-auto z-20 font-sans select-none"
    dir="rtl"
  >
    <!-- Active Component Info Header -->
    <div class="bg-[#1e1e1e] p-3 rounded-xl border border-[#383838] flex flex-col gap-2.5">
      <div class="flex items-center justify-between">
        <span class="text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >کامپوننت فعال</span
        >
        <span
          class="px-1.5 py-0.5 rounded bg-[#0d99ff]/20 text-[#0d99ff] text-2xs font-mono font-bold"
        >
          {{ activeComponent?.tag || 'Component' }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-[#0d99ff] font-mono text-sm">❖</span>
        <h2 class="text-xs font-bold text-white-100 font-dots-1 truncate flex-1">
          {{ activeComponent?.name || 'انتخاب نشده' }}
        </h2>
      </div>

      <!-- Copy Component Name Button -->
      <button
        type="button"
        @click="handleCopyName"
        class="w-full py-1.5 px-3 rounded-lg bg-[#2c2c2c] hover:bg-[#383838] border border-[#383838] text-white-80 hover:text-white-100 text-xs font-medium flex items-center justify-between transition-all cursor-pointer group"
        title="کپی نام فارسی کامپوننت"
      >
        <div
          class="flex items-center gap-1.5 text-2xs font-mono text-white-60 group-hover:text-white-100 truncate"
        >
          <Icon icon="solar:copy-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          <span class="truncate">{{ activeComponent?.name }}</span>
        </div>

        <span
          v-if="copiedName"
          class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0d99ff] text-white-100 shrink-0 flex items-center gap-1"
        >
          <Icon icon="solar:check-read-bold" class="w-3 h-3" />
          کپی شد
        </span>
        <span
          v-else
          class="text-[10px] font-medium text-white-40 group-hover:text-white-80 shrink-0"
        >
          کپی نام
        </span>
      </button>
    </div>

    <!-- Statuses Selection Section -->
    <div class="flex flex-col gap-2 flex-1">
      <div
        class="flex items-center justify-between px-1 py-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
      >
        <span>وضعیت‌های کامپوننت (Status)</span>
        <Icon icon="solar:tuning-square-2-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
      </div>

      <!-- Status Options -->
      <div class="flex flex-col gap-1.5">
        <button
          v-for="st in activeComponent?.statuses || []"
          :key="st.id"
          type="button"
          @click="$emit('update:activeStatusId', st.id)"
          :class="[
            'w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-right cursor-pointer border',
            activeStatusId === st.id
              ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-md scale-[1.01]'
              : 'bg-[#1e1e1e]/60 text-white-60 border-[#383838] hover:text-white-100 hover:bg-[#1e1e1e] hover:border-white-12',
          ]"
        >
          <div class="flex items-center gap-2 truncate">
            <Icon v-if="st.icon" :icon="st.icon" class="w-4 h-4 shrink-0" />
            <span class="font-dots-1 truncate">{{ st.label }}</span>
          </div>
          <Icon
            v-if="activeStatusId === st.id"
            icon="solar:check-circle-bold"
            class="w-3.5 h-3.5 text-white-100 shrink-0"
          />
        </button>
      </div>

      <!-- Active Status Description Card -->
      <div
        v-if="currentStatus?.description"
        class="mt-1 p-2.5 rounded-xl bg-[#1e1e1e] border border-[#383838] flex flex-col gap-1 text-2xs"
      >
        <div class="flex items-center gap-1.5 text-[#0d99ff] font-bold font-dots-1">
          <Icon icon="solar:info-square-bold-duotone" class="w-3.5 h-3.5" />
          <span>توضیحات وضعیت:</span>
        </div>
        <p class="text-white-60 leading-relaxed font-dots-1">
          {{ currentStatus.description }}
        </p>
      </div>

      <!-- Specialized BaseBadge / BaseBadgeField Controls (در سایدبار سمت راست سندباکس برای تست) -->
      <template
        v-if="
          activeComponent?.id === 'base-badge' ||
          activeComponent?.id === 'base-badge-field' ||
          activeComponent?.id === 'badges-management'
        "
      >
        <div class="mt-2 flex flex-col gap-2 pt-2 border-t border-[#383838]">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>تست زنده BaseBadgeField</span>
            <Icon icon="solar:tag-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>

          <!-- Live Interactive BaseBadgeField inside the dark sidebar -->
          <div class="p-2.5 bg-[#1e1e1e] rounded-xl border border-[#383838] flex flex-col gap-2">
            <BaseBadgeField
              v-model="sidebarSelectedBadgeIds"
              :badges="mockSidebarBadges"
              label="برچسب‌های سند"
              placeholder="انتخاب یا ایجاد برچسب..."
              hint="اسکرول افقی با پروگرسیو بلور"
              @create-badge="handleSidebarCreateBadge"
            >
              <template #label>
                <span class="text-white-90 font-bold">برچسب‌های سند</span>
              </template>
              <template #hint>
                <span class="text-white-40">اسکرول افقی</span>
              </template>
            </BaseBadgeField>
          </div>

          <!-- Quick Test Actions -->
          <div class="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              @click="populateAllSidebarBadges"
              class="py-1.5 px-2 rounded-lg bg-[#1e1e1e] hover:bg-[#383838] border border-[#383838] text-white-80 hover:text-white-100 text-2xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <Icon icon="solar:checklist-minimalistic-linear" class="w-3.5 h-3.5 text-[#0d99ff]" />
              <span>تست Overflow (همه)</span>
            </button>
            <button
              type="button"
              @click="sidebarSelectedBadgeIds = []"
              class="py-1.5 px-2 rounded-lg bg-[#1e1e1e] hover:bg-rose-500/10 border border-[#383838] hover:border-rose-500/30 text-white-60 hover:text-rose-400 text-2xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <Icon icon="solar:trash-bin-trash-linear" class="w-3.5 h-3.5" />
              <span>خالی کردن (Empty)</span>
            </button>
          </div>

          <div class="px-1 text-2xs text-white-40 font-dots-1 leading-relaxed">
            تعداد برچسب‌های انتخابی:
            <span class="text-[#0d99ff] font-mono font-bold">{{ sidebarSelectedBadgeIds.length }}</span>
          </div>
        </div>
      </template>

      <!-- Specialized FinancialKeypad Controls (Clean Sandbox Dark Theme) -->
      <template v-if="activeComponent?.id === 'financial-keypad'">
        <div class="mt-2 flex flex-col gap-2 pt-2 border-t border-[#383838]">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>سناریوهای تست شست</span>
            <Icon icon="solar:hand-stars-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>

          <div class="flex flex-col gap-1.5 p-1 bg-[#1e1e1e] rounded-xl border border-[#383838]">
            <button
              type="button"
              @click="$emit('update:activeStatusId', 'single-thumb')"
              :class="[
                'h-8 px-2.5 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-between transition-all cursor-pointer border',
                activeStatusId === 'single-thumb'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:hand-stars-bold-duotone" class="w-3.5 h-3.5" />
                <span>۴ لمس: ۴,۸۵۰,۰۰۰ ریال</span>
              </div>
              <span class="text-3xs font-mono opacity-60">تک‌شست</span>
            </button>

            <button
              type="button"
              @click="$emit('update:activeStatusId', 'calculation')"
              :class="[
                'h-8 px-2.5 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-between transition-all cursor-pointer border',
                activeStatusId === 'calculation'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:calculator-bold-duotone" class="w-3.5 h-3.5" />
                <span>خرید ترکیبی: ۲۵k + ۴۰k</span>
              </div>
              <span class="text-3xs font-mono opacity-60">محاسبه</span>
            </button>

            <button
              type="button"
              @click="$emit('update:activeStatusId', 'edge-cases')"
              :class="[
                'h-8 px-2.5 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-between transition-all cursor-pointer border',
                activeStatusId === 'edge-cases'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:danger-triangle-bold-duotone" class="w-3.5 h-3.5" />
                <span>سرریز ۱۲ رقم / ÷ بر صفر</span>
              </div>
              <span class="text-3xs font-mono opacity-60">خطاها</span>
            </button>

            <button
              type="button"
              @click="$emit('update:activeStatusId', 'inline-mode')"
              :class="[
                'h-8 px-2.5 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-between transition-all cursor-pointer border',
                activeStatusId === 'inline-mode'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:widget-3-bold-duotone" class="w-3.5 h-3.5" />
                <span>کیپد درجا (بدون شیت)</span>
              </div>
              <span class="text-3xs font-mono opacity-60">Inline</span>
            </button>
          </div>
        </div>
      </template>

      <!-- Specialized Inventory Controls (Clean Sandbox Dark Theme) -->
      <template v-if="activeComponent?.id === 'inventory-management'">
        <!-- Navigation Section Switcher -->
        <div class="mt-2 flex flex-col gap-1.5 pt-2 border-t border-[#383838]">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>بخش‌های ماژول انبار</span>
            <Icon icon="solar:widget-5-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>

          <div class="grid grid-cols-2 gap-1.5 p-1 bg-[#1e1e1e] rounded-xl border border-[#383838]">
            <button
              type="button"
              @click="inventoryStore.setTab('vouchers')"
              :class="[
                'h-8 px-2 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border',
                inventoryStore.currentTab === 'vouchers'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:document-text-bold-duotone" class="w-3.5 h-3.5" />
              <span>حواله‌ها</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setTab('warehouses')"
              :class="[
                'h-8 px-2 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border',
                inventoryStore.currentTab === 'warehouses'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:warehouse-bold-duotone" class="w-3.5 h-3.5" />
              <span>انبارها</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setTab('products')"
              :class="[
                'h-8 px-2 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border',
                inventoryStore.currentTab === 'products'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:box-minimalistic-bold-duotone" class="w-3.5 h-3.5" />
              <span>کالاها</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setTab('categories')"
              :class="[
                'h-8 px-2 rounded-lg text-xs font-bold font-dots-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border',
                inventoryStore.currentTab === 'categories'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:folder-bold-duotone" class="w-3.5 h-3.5" />
              <span>دسته‌ها</span>
            </button>
          </div>
        </div>

        <!-- Voucher Type Filters (When in Vouchers Tab) -->
        <div v-if="inventoryStore.currentTab === 'vouchers'" class="mt-1 flex flex-col gap-1.5">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>فیلتر نوع سند حواله</span>
            <Icon icon="solar:filter-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>

          <div class="grid grid-cols-2 gap-1.5 p-1 bg-[#1e1e1e] rounded-xl border border-[#383838]">
            <button
              type="button"
              @click="inventoryStore.setVoucherTypeFilter('all')"
              :class="[
                'h-7 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                inventoryStore.voucherActiveType === 'all'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <span>همه اسناد</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setVoucherTypeFilter('inbound')"
              :class="[
                'h-7 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                inventoryStore.voucherActiveType === 'inbound'
                  ? 'bg-emerald-600 text-white-100 border-emerald-500 shadow-xs'
                  : 'bg-transparent text-emerald-400 border-transparent hover:text-emerald-300 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:arrow-down-left-linear" class="w-3 h-3" />
              <span>ورود کالا</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setVoucherTypeFilter('outbound')"
              :class="[
                'h-7 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                inventoryStore.voucherActiveType === 'outbound'
                  ? 'bg-rose-600 text-white-100 border-rose-500 shadow-xs'
                  : 'bg-transparent text-rose-400 border-transparent hover:text-rose-300 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:arrow-up-right-linear" class="w-3 h-3" />
              <span>خروج کالا</span>
            </button>

            <button
              type="button"
              @click="inventoryStore.setVoucherTypeFilter('transfer')"
              :class="[
                'h-7 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                inventoryStore.voucherActiveType === 'transfer'
                  ? 'bg-sky-600 text-white-100 border-sky-500 shadow-xs'
                  : 'bg-transparent text-sky-400 border-transparent hover:text-sky-300 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:transfer-horizontal-bold-duotone" class="w-3 h-3" />
              <span>انتقال بین‌انبار</span>
            </button>
          </div>
        </div>

        <!-- Simulation Modal Triggers -->
        <div class="mt-1 flex flex-col gap-1.5 pt-2 border-t border-[#383838]">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>تست و بازکردن مودال‌ها</span>
            <Icon
              icon="solar:layers-minimalistic-bold-duotone"
              class="w-3.5 h-3.5 text-[#0d99ff]"
            />
          </div>

          <div class="flex flex-col gap-1">
            <button
              type="button"
              @click="inventoryStore.openVoucherModal('inbound')"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-emerald-500/50 text-emerald-400 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:import-linear" class="w-3.5 h-3.5" />
                <span>مودال ورود به انبار</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              @click="inventoryStore.openVoucherModal('outbound')"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-rose-500/50 text-rose-400 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:export-linear" class="w-3.5 h-3.5" />
                <span>مودال خروج از انبار</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              @click="inventoryStore.openVoucherModal('transfer')"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-sky-500/50 text-sky-400 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:transfer-horizontal-bold-duotone" class="w-3.5 h-3.5" />
                <span>مودال انتقال بین‌انبار</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              @click="inventoryStore.openWarehouseModal()"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-[#0d99ff]/50 text-white-80 hover:text-white-100 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:warehouse-linear" class="w-3.5 h-3.5 text-[#0d99ff]" />
                <span>تعریف انبار جدید</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              @click="inventoryStore.openProductModal()"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-[#0d99ff]/50 text-white-80 hover:text-white-100 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:box-minimalistic-linear" class="w-3.5 h-3.5 text-[#0d99ff]" />
                <span>تعریف کالای جدید</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              @click="inventoryStore.openCategoryModal()"
              class="w-full py-1.5 px-2.5 rounded-lg bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#383838] hover:border-[#0d99ff]/50 text-white-80 hover:text-white-100 text-2xs font-bold flex items-center justify-between transition-all cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <Icon icon="solar:folder-linear" class="w-3.5 h-3.5 text-[#0d99ff]" />
                <span>تعریف دسته‌بندی</span>
              </div>
              <Icon icon="solar:arrow-left-bold" class="w-3 h-3 opacity-60" />
            </button>
          </div>
        </div>

        <!-- Reset Mock Data Button -->
        <button
          type="button"
          @click="inventoryStore.resetAll"
          class="w-full mt-1 py-1.5 px-2.5 rounded-lg bg-[#1e1e1e] hover:bg-rose-500/10 border border-[#383838] hover:border-rose-500/40 text-white-60 hover:text-rose-400 text-2xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Icon icon="solar:restart-bold" class="w-3.5 h-3.5" />
          <span>بازنشانی داده‌های ماک</span>
        </button>
      </template>

      <!-- Specialized Treasury Viewport Switcher (Desktop Modal / Mobile Page) -->
      <template
        v-if="
          activeComponent?.id === 'treasury-line-item-modal' ||
          activeComponent?.id === 'treasury-management'
        "
      >
        <div class="mt-2 flex flex-col gap-1.5 pt-2 border-t border-[#383838]">
          <div
            class="flex items-center justify-between px-1 text-2xs font-bold text-white-40 uppercase tracking-wider font-dots-1"
          >
            <span>نمای مودال دریافت / پرداخت / هزینه</span>
            <Icon icon="solar:smartphone-bold-duotone" class="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>

          <div class="grid grid-cols-3 gap-1.5 p-1 bg-[#1e1e1e] rounded-xl border border-[#383838]">
            <button
              type="button"
              @click="treasuryStore.setPreviewViewMode('auto')"
              :class="[
                'h-8 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                treasuryStore.previewViewMode === 'auto'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:monitor-smartphone-bold-duotone" class="w-3.5 h-3.5" />
              <span>خودکار</span>
            </button>

            <button
              type="button"
              @click="treasuryStore.setPreviewViewMode('desktop')"
              :class="[
                'h-8 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                treasuryStore.previewViewMode === 'desktop'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:monitor-bold-duotone" class="w-3.5 h-3.5" />
              <span>دسکتاپ</span>
            </button>

            <button
              type="button"
              @click="treasuryStore.setPreviewViewMode('mobile')"
              :class="[
                'h-8 px-2 rounded-lg text-2xs font-bold font-dots-1 flex items-center justify-center gap-1 transition-all cursor-pointer border',
                treasuryStore.previewViewMode === 'mobile'
                  ? 'bg-[#0d99ff] text-white-100 border-[#0d99ff] shadow-xs'
                  : 'bg-transparent text-white-60 border-transparent hover:text-white-100 hover:bg-white-6',
              ]"
            >
              <Icon icon="solar:smartphone-bold-duotone" class="w-3.5 h-3.5" />
              <span>موبایل</span>
            </button>
          </div>

          <p class="px-1 text-2xs leading-relaxed text-white-40 font-dots-1">
            حالت موبایل صفحه جداست (تمام‌صفحه، پس‌زمینه surface) و مودال دسکتاپ را نشان نمی‌دهد.
          </p>
        </div>
      </template>
    </div>

    <!-- Quick Vue Code Copy Button -->
    <button
      type="button"
      @click="handleCopyCode"
      class="w-full py-2 px-3 bg-[#0d99ff] text-white-100 hover:bg-primary-80 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm mt-auto"
    >
      <Icon
        :icon="copiedCode ? 'solar:check-read-bold' : 'solar:code-square-bold-duotone'"
        class="w-4 h-4"
      />
      <span>{{ copiedCode ? 'کد Vue کپی شد' : 'کپی کد کامپوننت Vue' }}</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { ComponentRegistryItem } from '../types/sandbox'
import { useInventorySandboxStore } from '@/stores/inventorySandbox'
import { useTreasurySandboxStore } from '@/stores/treasurySandbox'
import BaseBadgeField from '@/components/ui/BaseBadgeField.vue'
import type { BadgeItem, BadgeColorToken } from '@/types/badge'

const inventoryStore = useInventorySandboxStore()
const treasuryStore = useTreasurySandboxStore()

// State for live BaseBadgeField testing inside the right sidebar
const sidebarSelectedBadgeIds = ref<string[]>(['sb-1', 'sb-2'])
const mockSidebarBadges = ref<BadgeItem[]>([
  { id: 'sb-1', title: 'تسویه‌شده', color: 'success', usageCount: 42 },
  { id: 'sb-2', title: 'خوش‌حساب', color: 'primary', usageCount: 19 },
  { id: 'sb-3', title: 'اقساطی', color: 'warning', usageCount: 8 },
  { id: 'sb-4', title: 'ارجاعی', color: 'error', usageCount: 3 },
  { id: 'sb-5', title: 'VIP ویژه', color: 'primary', usageCount: 15 },
  { id: 'sb-6', title: 'صادراتی', color: 'info', usageCount: 6 },
])

const handleSidebarCreateBadge = (newBadge: { title: string; color: BadgeColorToken }) => {
  const id = 'sb-' + Date.now()
  mockSidebarBadges.value.push({
    id,
    title: newBadge.title,
    color: newBadge.color,
    usageCount: 1,
  })
  sidebarSelectedBadgeIds.value.push(id)
}

const populateAllSidebarBadges = () => {
  sidebarSelectedBadgeIds.value = mockSidebarBadges.value.map((b) => b.id)
}

const props = defineProps<{
  activeComponent?: ComponentRegistryItem
  activeStatusId: string
}>()

const emit = defineEmits<{
  'update:activeStatusId': [value: string]
}>()

const copiedName = ref(false)
const copiedCode = ref(false)

const currentStatus = computed(() => {
  return props.activeComponent?.statuses.find((st) => st.id === props.activeStatusId)
})

const handleCopyName = () => {
  if (!props.activeComponent) return
  navigator.clipboard.writeText(props.activeComponent.name)
  copiedName.value = true
  setTimeout(() => {
    copiedName.value = false
  }, 2000)
}

const handleCopyCode = () => {
  if (!props.activeComponent) return
  navigator.clipboard.writeText(props.activeComponent.codeSnippet)
  copiedCode.value = true
  setTimeout(() => {
    copiedCode.value = false
  }, 2000)
}
</script>
