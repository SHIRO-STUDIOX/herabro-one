<template>
  <main class="flex-1 flex flex-col relative overflow-hidden bg-[#1e1e1e] font-sans">
    <!-- Viewport Workspace Frame Container -->
    <div
      class="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto"
      :style="canvasBgPatternStyle"
    >
      <!-- Figma Frame Container -->
      <div
        class="flex flex-col gap-2 items-start transition-all duration-300 shadow-2xl"
        :class="activeViewportStyle"
        :style="frameHeightStyle"
      >
        <!-- Figma Frame Title Badge (Top of Canvas) -->
        <div
          class="flex items-center justify-between w-full px-3 py-1.5 rounded-t-xl bg-[#2c2c2c] border border-b-0 border-[#383838] text-white-100 text-2xs font-mono font-bold shadow-sm"
          dir="ltr"
        >
          <div class="flex items-center gap-2">
            <span class="text-[#0d99ff]">❖ {{ activeComponent?.name }}</span>
            <span class="px-1.5 py-0.5 bg-[#0d99ff]/20 text-[#0d99ff] rounded text-[10px]">
              {{ currentStatus?.label || 'Default' }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Layout Mode Switcher for Full App Pages -->
            <div
              v-if="isPageActive"
              class="flex items-center bg-[#1e1e1e] p-0.5 rounded-md border border-[#383838]"
              dir="rtl"
            >
              <button
                type="button"
                @click="pageLayoutMode = 'shell'"
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1',
                  pageLayoutMode === 'shell'
                    ? 'bg-[#0d99ff] text-white-100 font-bold'
                    : 'text-white-40 hover:text-white-80',
                ]"
                title="نمایش با پوسته اصلی پلتفرم (هدر و سایدبارها)"
              >
                <Icon icon="solar:sidebar-minimalistic-bold-duotone" class="w-3 h-3" />
                <span>پوسته پلتفرم</span>
              </button>
              <button
                type="button"
                @click="pageLayoutMode = 'content'"
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-all cursor-pointer flex items-center gap-1',
                  pageLayoutMode === 'content'
                    ? 'bg-[#0d99ff] text-white-100 font-bold'
                    : 'text-white-40 hover:text-white-80',
                ]"
                title="نمایش خالص محتوای صفحه"
              >
                <Icon icon="solar:maximize-square-minimalistic-bold-duotone" class="w-3 h-3" />
                <span>فقط صفحه</span>
              </button>
            </div>

            <span class="opacity-60 text-white-40">
              ({{ currentViewportWidth }} × {{ currentViewportHeight }})
            </span>
          </div>
        </div>

        <!-- Active Component Rendering Area -->
        <div
          :class="[
            'w-full h-full rounded-b-2xl border border-[#383838] shadow-2xl overflow-hidden relative flex flex-col transition-colors duration-200',
            canvasBgInnerStyle,
          ]"
        >
          <!-- ======================================================== -->
          <!-- 0. DESIGN SYSTEM TOKENS                                  -->
          <!-- ======================================================== -->

          <!-- 0.1 Hesabro Brand Palette -->
          <template v-if="activeComponentId === 'tokens-hesabro-palette'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-8 bg-surface-100"
              dir="rtl"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black-12"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-2xl bg-hesabro-primary-12 text-hesabro-primary-100 flex items-center justify-center shrink-0"
                  >
                    <Icon icon="solar:palette-2-bold-duotone" class="w-6 h-6" />
                  </div>
                  <div>
                    <h2 class="text-base font-black text-black-100 font-dots-1">
                      پالت اختصاصی برند حسابرو (Hesabro Brand Palette)
                    </h2>
                    <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                      استخراج‌شده از توکن‌های حسابرو با ۱۱ سطح شفافیت. برای کپی کلاس Tailwind کلیک
                      کنید.
                    </p>
                  </div>
                </div>

                <!-- Live Theme Toggle Button -->
                <button
                  type="button"
                  @click="toggleHesabroTheme"
                  class="px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer shadow-sm border shrink-0 font-dots-1"
                  :class="
                    isHesabroThemeActive
                      ? 'bg-hesabro-primary-100 text-white-100 border-hesabro-primary-100 ring-4 ring-hesabro-primary-12'
                      : 'bg-primary-12 text-primary-100 border-primary-24 hover:bg-primary-24'
                  "
                >
                  <Icon icon="solar:palette-2-bold-duotone" class="w-4 h-4" />
                  <span>{{
                    isHesabroThemeActive ? 'تم حسابرو (فعال)' : 'تم پیش‌فرض پاندورا'
                  }}</span>
                </button>
              </div>

              <!-- Color Families Display based on activeStatusId -->
              <div class="flex flex-col gap-8">
                <template v-for="(colorData, colorKey) in displayedHesabroColors" :key="colorKey">
                  <div v-if="colorData" class="flex flex-col gap-3">
                    <div class="flex justify-between items-center px-1 font-dots-1">
                      <span class="text-sm font-bold text-black-100 flex items-center gap-2">
                        <span
                          class="w-3.5 h-3.5 rounded-full border border-black-12"
                          :style="{ backgroundColor: 'var(--color-' + colorKey + '-100)' }"
                        ></span>
                        {{ colorData.label }}
                      </span>
                      <span class="text-2xs text-black-40 font-mono">{{ colorData.hex }}</span>
                    </div>

                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2.5">
                      <button
                        v-for="op in opacities"
                        :key="op"
                        type="button"
                        @click="copyTokenClass(`bg-${colorKey}-${op}`)"
                        class="group relative h-20 rounded-2xl border border-black-12 transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 flex flex-col justify-between p-2.5 text-right overflow-hidden cursor-pointer"
                        style="
                          background-image: repeating-conic-gradient(
                            var(--color-surface-100) 0% 25%,
                            #ffffff 0% 50%
                          );
                          background-size: 12px 12px;
                        "
                      >
                        <!-- Color Fill Layer -->
                        <div
                          class="absolute inset-0 transition-colors duration-150"
                          :style="{ backgroundColor: 'var(--color-' + colorKey + '-' + op + ')' }"
                        ></div>

                        <!-- Info text -->
                        <span
                          class="text-2xs font-extrabold transition-colors duration-150 relative z-10 text-black-100 opacity-80 font-mono"
                        >
                          {{ op }}%
                        </span>

                        <span
                          class="text-2xs font-mono tracking-tight transition-colors duration-150 relative z-10 truncate text-black-60"
                        >
                          bg-{{ colorKey }}-{{ op }}
                        </span>

                        <!-- Copy Overlay hover -->
                        <div
                          class="absolute inset-0 bg-black-80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-150 z-20 text-white-100 gap-1 text-[10px] font-mono"
                        >
                          <Icon icon="solar:copy-bold" class="w-4 h-4" />
                          <span>کپی</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <!-- 0.2 Colors & Opacities -->
          <template v-else-if="activeComponentId === 'tokens-colors'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-8 bg-surface-100"
              dir="rtl"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black-12"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-2xl bg-primary-12 text-primary-100 flex items-center justify-center shrink-0"
                  >
                    <Icon icon="solar:palette-bold-duotone" class="w-6 h-6" />
                  </div>
                  <div>
                    <h2 class="text-base font-black text-black-100 font-dots-1">
                      پالت رنگ‌ها و شفافیت‌ها (Pandora360 Colors)
                    </h2>
                    <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                      ۹۰ توکن رنگی با ۱۱ سطح شفافیت. جهت کپی کلاس Tailwind روی پالت کلیک نمایید.
                    </p>
                  </div>
                </div>
                <span
                  class="text-2xs font-bold bg-black-6 px-3 py-1.5 rounded-lg text-black-60 font-dots-1 shrink-0"
                >
                  وضعیت فعال: {{ currentStatus?.label }}
                </span>
              </div>

              <!-- Colors Grid filtered by Status -->
              <div class="flex flex-col gap-8">
                <template v-for="(colorData, colorKey) in displayedPandoraColors" :key="colorKey">
                  <div v-if="colorData" class="flex flex-col gap-3">
                    <div class="flex justify-between items-center px-1 font-dots-1">
                      <span
                        class="text-sm font-bold text-black-100 capitalize flex items-center gap-2"
                      >
                        <span
                          class="w-3.5 h-3.5 rounded-full border border-black-12"
                          :style="{ backgroundColor: 'var(--color-' + colorKey + '-100)' }"
                        ></span>
                        {{ colorKey }}
                      </span>
                      <span class="text-2xs text-black-40 font-mono">{{ colorData.hex }}</span>
                    </div>

                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2.5">
                      <button
                        v-for="op in opacities"
                        :key="op"
                        type="button"
                        @click="copyTokenClass(`bg-${colorKey}-${op}`)"
                        class="group relative h-20 rounded-2xl border border-black-12 transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 flex flex-col justify-between p-2.5 text-right overflow-hidden cursor-pointer"
                        style="
                          background-image: repeating-conic-gradient(
                            var(--color-surface-100) 0% 25%,
                            #ffffff 0% 50%
                          );
                          background-size: 12px 12px;
                        "
                      >
                        <div
                          class="absolute inset-0 transition-colors duration-150"
                          :style="{ backgroundColor: 'var(--color-' + colorKey + '-' + op + ')' }"
                        ></div>

                        <span
                          class="text-2xs font-extrabold transition-colors duration-150 relative z-10 font-mono"
                          :class="
                            shouldUseWhiteText(colorKey, op)
                              ? 'text-white-100 opacity-90'
                              : 'text-black-100 opacity-80'
                          "
                        >
                          {{ op }}%
                        </span>

                        <span
                          class="text-2xs font-mono tracking-tight transition-colors duration-150 relative z-10 truncate"
                          :class="
                            shouldUseWhiteText(colorKey, op) ? 'text-white-60' : 'text-black-40'
                          "
                        >
                          bg-{{ colorKey }}-{{ op }}
                        </span>

                        <div
                          class="absolute inset-0 bg-black-80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-150 z-20 text-white-100 gap-1 text-[10px] font-mono"
                        >
                          <Icon icon="solar:copy-bold" class="w-4 h-4" />
                          <span>کپی</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <!-- 0.3 Typography -->
          <template v-else-if="activeComponentId === 'tokens-typography'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-8 bg-surface-100"
              dir="rtl"
            >
              <div class="flex items-center gap-3 pb-4 border-b border-black-12">
                <div
                  class="w-10 h-10 rounded-2xl bg-secondary-12 text-secondary-100 flex items-center justify-center shrink-0"
                >
                  <Icon icon="solar:text-bold-duotone" class="w-6 h-6" />
                </div>
                <div>
                  <h2 class="text-base font-black text-black-100 font-dots-1">
                    تایپوگرافی و قلم متغیر (IRANYekanXVF)
                  </h2>
                  <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                    آزمایشگاه سایزها، وزن‌ها و محور استایل نقاط (dots) متغیر
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Interactive Controller Sandbox -->
                <div
                  class="lg:col-span-7 flex flex-col gap-5 bg-white-100 p-6 rounded-3xl border border-black-12 shadow-sm"
                >
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-black-60 font-dots-1"
                      >متن نمونه دلخواه جهت تست تایپوگرافی:</label
                    >
                    <input
                      v-model="sampleTypographyText"
                      type="text"
                      class="w-full px-4 py-2.5 bg-surface-100 border border-black-12 rounded-xl text-xs font-medium focus:outline-none focus:border-secondary-100 font-dots-1 transition-colors"
                    />
                  </div>

                  <!-- Variable Weight Slider -->
                  <div class="flex flex-col gap-2.5">
                    <div class="flex justify-between items-center">
                      <span class="text-xs font-bold text-black-60 font-dots-1"
                        >وزن قلم متغیر (Weight Slider):</span
                      >
                      <span class="text-xs font-black text-secondary-100 font-mono">{{
                        typographyWeight
                      }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-2xs text-black-40 font-mono">100 (Thin)</span>
                      <input
                        v-model="typographyWeight"
                        type="range"
                        min="100"
                        max="900"
                        step="50"
                        class="flex-1 accent-secondary-100 h-1.5 bg-black-12 rounded-lg appearance-none cursor-pointer"
                      />
                      <span class="text-2xs text-black-40 font-mono">900 (Black)</span>
                    </div>
                  </div>

                  <!-- Font Dots Selector -->
                  <div class="flex flex-col gap-2">
                    <label class="text-xs font-bold text-black-60 font-dots-1"
                      >استایل نقطه‌های فونت متغیر (Font Dots Style):</label
                    >
                    <div class="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        @click="typographyDots = 0"
                        class="px-3 py-2 rounded-xl text-2xs font-bold border transition-all cursor-pointer font-dots-0"
                        :class="
                          typographyDots === 0
                            ? 'bg-secondary-100 text-white-100 border-secondary-100 shadow-sm'
                            : 'bg-surface-100 text-black-60 border-black-12 hover:bg-black-6'
                        "
                      >
                        نقاط ساده (dots 0)
                      </button>
                      <button
                        type="button"
                        @click="typographyDots = 1"
                        class="px-3 py-2 rounded-xl text-2xs font-bold border transition-all cursor-pointer font-dots-1"
                        :class="
                          typographyDots === 1
                            ? 'bg-secondary-100 text-white-100 border-secondary-100 shadow-sm'
                            : 'bg-surface-100 text-black-60 border-black-12 hover:bg-black-6'
                        "
                      >
                        نقاط گرد فیگما (dots 1)
                      </button>
                      <button
                        type="button"
                        @click="typographyDots = 2"
                        class="px-3 py-2 rounded-xl text-2xs font-bold border transition-all cursor-pointer font-dots-2"
                        :class="
                          typographyDots === 2
                            ? 'bg-secondary-100 text-white-100 border-secondary-100 shadow-sm'
                            : 'bg-surface-100 text-black-60 border-black-12 hover:bg-black-6'
                        "
                      >
                        نقاط تیز (dots 2)
                      </button>
                    </div>
                  </div>

                  <!-- Live Rendering Preview Box -->
                  <div
                    class="p-6 bg-surface-100 rounded-2xl border border-black-12 min-h-[140px] flex items-center justify-center text-center overflow-hidden transition-all shadow-inner"
                  >
                    <p
                      class="transition-all duration-150 leading-relaxed text-black-100"
                      :style="{
                        fontWeight: typographyWeight,
                        fontSize: typographySize + 'px',
                        fontVariationSettings: '\'dots\' ' + typographyDots,
                      }"
                    >
                      {{ sampleTypographyText }}
                    </p>
                  </div>

                  <!-- Text Size Controller -->
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="size in fontSizes"
                      :key="size.name"
                      type="button"
                      @click="typographySize = size.px"
                      class="px-2.5 py-1.5 rounded-lg text-2xs font-bold transition-all border cursor-pointer font-mono"
                      :class="
                        typographySize === size.px
                          ? 'bg-secondary-100 text-white-100 border-secondary-100'
                          : 'bg-surface-100 text-black-60 border-black-12 hover:bg-black-6'
                      "
                    >
                      {{ size.name }} ({{ size.px }}px)
                    </button>
                  </div>
                </div>

                <!-- Font Sizes Scale Table -->
                <div class="lg:col-span-5 flex flex-col gap-3">
                  <h3 class="text-xs font-bold text-black-60 font-dots-1 px-1">
                    مقیاس رسمی سایزهای تایپوگرافی:
                  </h3>
                  <div class="flex flex-col gap-2">
                    <div
                      v-for="size in fontSizes"
                      :key="size.name"
                      class="flex justify-between items-center p-3 bg-white-100 hover:bg-surface-100 border border-black-12 rounded-2xl transition-all group cursor-pointer"
                      @click="typographySize = size.px"
                    >
                      <div class="flex items-center gap-3">
                        <span class="w-16 text-2xs font-mono font-bold text-secondary-100"
                          >text-{{ size.name }}</span
                        >
                        <span
                          class="text-black-100 font-bold font-dots-1"
                          :class="'text-' + size.name"
                          >{{ size.label }}</span
                        >
                      </div>
                      <span class="text-2xs text-black-40 font-mono group-hover:text-black-60"
                        >{{ size.px }}px / {{ size.cssVal }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- 0.4 Solar Icons -->
          <template v-else-if="activeComponentId === 'tokens-icons'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-6 bg-surface-100"
              dir="rtl"
            >
              <div class="flex items-center gap-3 pb-4 border-b border-black-12">
                <div
                  class="w-10 h-10 rounded-2xl bg-accent-12 text-accent-100 flex items-center justify-center shrink-0"
                >
                  <Icon icon="solar:star-bold-duotone" class="w-6 h-6" />
                </div>
                <div>
                  <h2 class="text-base font-black text-black-100 font-dots-1">
                    نمایشگاه آیکون‌های سولار (Solar Icons Showroom)
                  </h2>
                  <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                    ۲۰ آیکون شاخص پلتفرم. تغییر سایز، تغییر رنگ و جستجوی بلادرنگ.
                  </p>
                </div>
              </div>

              <!-- Modifiers Bar -->
              <div
                class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white-100 p-5 rounded-3xl border border-black-12 shadow-sm font-dots-1"
              >
                <!-- Search -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-black-60">جستجوی آیکون:</label>
                  <div class="relative">
                    <input
                      v-model="iconSearchQuery"
                      type="text"
                      placeholder="مثال: settings, home, chart..."
                      class="w-full pl-4 pr-9 py-2 bg-surface-100 border border-black-12 rounded-xl text-xs font-medium focus:outline-none focus:border-accent-100"
                    />
                    <Icon
                      icon="solar:magnifer-bold"
                      class="absolute right-3 top-2.5 w-4 h-4 text-black-40"
                    />
                  </div>
                </div>

                <!-- Size Slider -->
                <div class="flex flex-col gap-1.5">
                  <div class="flex justify-between items-center">
                    <label class="text-xs font-bold text-black-60">اندازه آیکون‌ها:</label>
                    <span class="text-2xs font-mono font-bold text-accent-100"
                      >{{ iconPreviewDimension }}px</span
                    >
                  </div>
                  <input
                    v-model="iconPreviewDimension"
                    type="range"
                    min="16"
                    max="64"
                    step="4"
                    class="accent-accent-100 h-1.5 bg-black-12 rounded-lg appearance-none cursor-pointer my-auto"
                  />
                </div>

                <!-- Color Selector -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-black-60">رنگ آیکون‌ها:</label>
                  <select
                    v-model="iconPreviewColor"
                    class="w-full px-3 py-2 bg-surface-100 border border-black-12 rounded-xl text-xs font-medium focus:outline-none focus:border-accent-100"
                  >
                    <option value="black-100">سیاه دودی (Default)</option>
                    <option value="primary-100">سرمه‌ای اصلی (Primary)</option>
                    <option value="secondary-100">آبی ثانویه (Secondary)</option>
                    <option value="accent-100">سبز یشم / اکسنت (Accent)</option>
                    <option value="success-100">سبز موفقیت (Success)</option>
                    <option value="error-100">قرمز خطا (Error)</option>
                    <option value="warning-100">نارنجی هشدار (Warning)</option>
                  </select>
                </div>
              </div>

              <!-- Icons Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
                <button
                  v-for="icon in filteredSolarIcons"
                  :key="icon"
                  type="button"
                  @click="copyTokenClass(icon, 'نام آیکون')"
                  class="group p-4 bg-white-100 border border-black-12 hover:border-accent-100 hover:shadow-md rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <div class="flex-1 flex items-center justify-center min-h-[64px]">
                    <Icon
                      :icon="icon"
                      :style="{
                        width: iconPreviewDimension + 'px',
                        height: iconPreviewDimension + 'px',
                        color: 'var(--color-' + iconPreviewColor + ')',
                      }"
                      class="transition-all duration-200 group-hover:scale-110"
                    />
                  </div>

                  <div class="w-full text-center">
                    <div
                      class="text-3xs font-mono text-black-60 group-hover:text-accent-100 truncate"
                      dir="ltr"
                    >
                      {{ icon.replace('solar:', '') }}
                    </div>
                    <div
                      class="text-[10px] text-black-40 mt-1 flex items-center justify-center gap-1 group-hover:text-accent-60 font-dots-1"
                    >
                      <Icon icon="solar:copy-bold" class="w-3 h-3" />
                      <span>کپی نام</span>
                    </div>
                  </div>
                </button>

                <div
                  v-if="filteredSolarIcons.length === 0"
                  class="col-span-full py-12 text-center text-black-40 text-xs font-dots-1"
                >
                  آیکونی با این نام یافت نشد.
                </div>
              </div>
            </div>
          </template>

          <!-- 0.5 Border Radius -->
          <template v-else-if="activeComponentId === 'tokens-radius'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-6 bg-surface-100"
              dir="rtl"
            >
              <div class="flex items-center gap-3 pb-4 border-b border-black-12">
                <div
                  class="w-10 h-10 rounded-2xl bg-warning-12 text-warning-100 flex items-center justify-center shrink-0"
                >
                  <Icon icon="solar:mask-square-bold-duotone" class="w-6 h-6" />
                </div>
                <div>
                  <h2 class="text-base font-black text-black-100 font-dots-1">
                    شعاع گوشه‌ها (Border Radius Tokens)
                  </h2>
                  <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                    ۱۱ ردیوس رسمی دیزاین سیستم با نشانگر گوشه فیگما در زمان هاور
                  </p>
                </div>
              </div>

              <!-- Radius Cards Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                  v-for="rad in displayedRadiusList"
                  :key="rad.name"
                  class="group relative bg-white-100 border border-black-12 hover:border-warning-100 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 shadow-sm"
                >
                  <!-- Shape showing radius -->
                  <div
                    class="w-full h-28 bg-surface-100 border border-black-12 flex items-center justify-center relative shadow-sm overflow-hidden"
                    :style="{ borderRadius: rad.cssVal }"
                  >
                    <!-- Inner grid helper -->
                    <div
                      class="absolute inset-0 bg-[radial-gradient(var(--color-black-6)_1px,transparent_1px)] [background-size:12px_12px] opacity-40"
                    ></div>

                    <!-- Corner Inspect Highlight (Figma Style) -->
                    <div
                      class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-warning-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end"
                      :style="{ borderTopRightRadius: rad.cssVal }"
                    >
                      <div
                        class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-warning-100 rounded-full"
                      ></div>
                      <div
                        class="absolute top-3 right-3 bg-warning-100 text-white-100 font-mono text-[9px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap z-20"
                      >
                        R: {{ rad.px }}
                      </div>
                    </div>

                    <span
                      class="text-xs font-mono font-bold text-black-40 group-hover:text-black-100 transition-colors relative z-10"
                    >
                      {{ rad.px }}
                    </span>
                  </div>

                  <!-- Info text -->
                  <div class="flex flex-col gap-0.5 text-right">
                    <span class="text-xs font-bold text-black-100 font-mono"
                      >rounded-{{ rad.name }}</span
                    >
                    <span class="text-3xs font-mono text-black-40">{{ rad.cssVal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- 0.6 Spacings & Inspect Simulator -->
          <template v-else-if="activeComponentId === 'tokens-spacings'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-10 flex flex-col gap-6 bg-surface-100"
              dir="rtl"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black-12"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-2xl bg-info-12 text-info-100 flex items-center justify-center shrink-0"
                  >
                    <Icon icon="solar:ruler-angular-bold-duotone" class="w-6 h-6" />
                  </div>
                  <div>
                    <h2 class="text-base font-black text-black-100 font-dots-1">
                      فواصل و اینسپکتور فیگما (Spacings & Figma Inspect)
                    </h2>
                    <p class="text-xs text-black-60 font-dots-1 mt-0.5">
                      توکن‌های فاصله‌گذاری استاندارد همراه با شبیه‌ساز بازرسی Figma Dev Mode
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  @click="isInspectSimulatorActive = !isInspectSimulatorActive"
                  class="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer font-dots-1 shadow-sm"
                  :class="
                    isInspectSimulatorActive
                      ? 'bg-primary-100 text-white-100 hover:bg-primary-80 ring-4 ring-primary-12'
                      : 'bg-primary-12 text-primary-100 hover:bg-primary-24'
                  "
                >
                  <Icon
                    :icon="isInspectSimulatorActive ? 'solar:eye-bold' : 'solar:eye-linear'"
                    class="w-4 h-4"
                  />
                  <span>{{
                    isInspectSimulatorActive ? 'خروج از اینسپکتور' : 'فعالسازی اینسپکتور فیگما'
                  }}</span>
                </button>
              </div>

              <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <!-- Spacing Tokens Table -->
                <div
                  class="xl:col-span-5 flex flex-col gap-3 bg-white-100 p-5 rounded-3xl border border-black-12 shadow-sm"
                >
                  <h3 class="text-xs font-bold text-black-60 font-dots-1">
                    توکن‌های فاصله (Spacing Tokens):
                  </h3>
                  <div class="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
                    <div
                      v-for="space in spacingsList"
                      :key="space.name"
                      class="flex items-center justify-between p-2.5 bg-surface-100 rounded-xl border border-black-12 hover:border-info-32 transition-colors cursor-pointer"
                      @click="copyTokenClass(`p-${space.name}`, 'کلاس پدینگ')"
                    >
                      <div class="flex items-center gap-3 w-28">
                        <span class="text-2xs font-mono font-bold text-info-100"
                          >w-{{ space.name }}</span
                        >
                        <span class="text-2xs text-black-60 font-mono">({{ space.px }})</span>
                      </div>
                      <div
                        class="flex-1 h-3 bg-info-12 rounded-sm"
                        :style="{ width: space.px, maxWidth: '180px' }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Figma-Style Inspect Simulator -->
                <div class="xl:col-span-7 flex flex-col gap-4">
                  <div class="flex justify-between items-center">
                    <h3 class="text-xs font-bold text-black-60 font-dots-1">
                      شبیه‌ساز بازرسی کارت (Inspect Simulator):
                    </h3>
                    <span
                      v-if="isInspectSimulatorActive"
                      class="text-3xs font-extrabold bg-primary-12 text-primary-100 px-2.5 py-1 rounded-md animate-pulse font-dots-1"
                    >
                      ماوس را روی بخش‌های کارت حرکت دهید
                    </span>
                  </div>

                  <!-- Interactive Card Container -->
                  <div
                    class="relative bg-white-100 border border-black-12 rounded-3xl p-8 flex flex-col gap-6 select-none overflow-hidden shadow-sm"
                    :class="{ 'cursor-crosshair': isInspectSimulatorActive }"
                  >
                    <!-- Figma Grid Overlay in Inspect Mode -->
                    <div
                      v-if="isInspectSimulatorActive"
                      class="absolute inset-0 bg-[linear-gradient(var(--color-primary-1)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary-1)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
                    ></div>

                    <!-- 1. CARD PADDING OVERLAYS -->
                    <div
                      v-if="isInspectSimulatorActive && hoveredInspectElem === 'card'"
                      class="absolute inset-0 border-[32px] border-primary-24 pointer-events-none rounded-3xl flex items-center justify-center transition-all z-20"
                    >
                      <div
                        class="absolute top-2 right-1/2 translate-x-1/2 bg-primary-100 text-white-100 text-[10px] px-1.5 py-0.5 rounded font-mono shadow-sm"
                      >
                        p-8 (32px)
                      </div>
                      <div
                        class="absolute bottom-2 right-1/2 translate-x-1/2 bg-primary-100 text-white-100 text-[10px] px-1.5 py-0.5 rounded font-mono shadow-sm"
                      >
                        p-8 (32px)
                      </div>
                      <div
                        class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-100 text-white-100 text-[10px] px-1.5 py-0.5 rounded font-mono shadow-sm"
                      >
                        p-8 (32px)
                      </div>
                      <div
                        class="absolute left-2 top-1/2 -translate-y-1/2 bg-primary-100 text-white-100 text-[10px] px-1.5 py-0.5 rounded font-mono shadow-sm"
                      >
                        p-8 (32px)
                      </div>
                    </div>

                    <!-- Inner Card Wrapper -->
                    <div
                      @mouseenter="setHoveredInspect('card')"
                      @mouseleave="clearHoveredInspect"
                      class="flex flex-col gap-8 relative z-10"
                    >
                      <!-- Profile Header -->
                      <div
                        @mouseenter.stop="setHoveredInspect('profile')"
                        @mouseleave.stop="setHoveredInspect('card')"
                        class="relative flex justify-between items-center p-3 rounded-xl transition-all"
                        :class="{
                          'outline-dashed outline-1 outline-primary-60 bg-primary-1':
                            isInspectSimulatorActive && hoveredInspectElem === 'profile',
                        }"
                      >
                        <div
                          v-if="isInspectSimulatorActive && hoveredInspectElem === 'profile'"
                          class="absolute inset-x-0 -bottom-6 h-6 bg-secondary-24 flex items-center justify-center pointer-events-none"
                        >
                          <div class="w-full border-t border-dashed border-secondary-100"></div>
                          <span
                            class="absolute bg-secondary-100 text-white-100 text-[9px] px-1 py-0.2 rounded font-mono"
                            >gap-3 (12px)</span
                          >
                        </div>

                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 rounded-2xl bg-primary-100 text-white-100 flex items-center justify-center font-black shadow-md font-dots-1"
                          >
                            ح
                          </div>
                          <div class="flex flex-col gap-1">
                            <h4 class="font-extrabold text-sm text-black-100 font-dots-1">
                              سامانه جامع مالی حسابرو
                            </h4>
                            <p class="text-2xs text-black-60 font-dots-1">
                              آخرین ورود: ۵ دقیقه پیش
                            </p>
                          </div>
                        </div>

                        <span
                          class="px-2.5 py-1 text-2xs font-extrabold bg-success-12 text-success-100 rounded-lg font-dots-1"
                          >فعال</span
                        >
                      </div>

                      <!-- Actions Row -->
                      <div
                        @mouseenter.stop="setHoveredInspect('actions')"
                        @mouseleave.stop="setHoveredInspect('card')"
                        class="flex items-center justify-between pt-4 border-t border-black-12"
                        :class="{
                          'outline-dashed outline-1 outline-primary-60 bg-primary-1':
                            isInspectSimulatorActive && hoveredInspectElem === 'actions',
                        }"
                      >
                        <span class="text-2xs text-black-40 font-dots-1"
                          >موجودي کل: ۱۵۰,۰۰۰,۰۰۰ ریال</span
                        >
                        <BaseButton variant="primary" size="sm">مشاهده گزارش</BaseButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- ======================================================== -->
          <!-- 1. BASE UI PRIMITIVES                                    -->
          <!-- ======================================================== -->

          <!-- 1.1 BaseButton -->
          <template v-else-if="activeComponentId === 'base-button'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-8"
              dir="rtl"
            >
              <div class="text-center flex flex-col gap-1.5">
                <h2 class="text-base font-bold text-primary-100 font-dots-1">
                  کامپوننت دکمه پایه (BaseButton)
                </h2>
                <p class="text-xs text-primary-60 font-dots-1">
                  وفادار به سیستم طراحی پاندورا ۳۶۰ با وضعیت‌های مختلف تعاملی
                </p>
              </div>

              <!-- Status: Variants -->
              <div
                v-if="activeStatusId === 'variants'"
                class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <BaseButton variant="primary" size="md">Primary</BaseButton>
                <BaseButton variant="secondary" size="md">Secondary</BaseButton>
                <BaseButton variant="ghost" size="md">Ghost</BaseButton>
                <BaseButton variant="error" size="md">Error</BaseButton>
                <BaseButton variant="outline" size="md">Outline</BaseButton>
                <BaseButton variant="fill" size="md">Fill</BaseButton>
              </div>

              <!-- Status: Sizes -->
              <div
                v-else-if="activeStatusId === 'sizes'"
                class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <BaseButton variant="primary" size="sm">دکمه کوچک (sm)</BaseButton>
                <BaseButton variant="primary" size="md">دکمه استاندارد (md)</BaseButton>
                <BaseButton variant="primary" size="lg">دکمه بزرگ (lg)</BaseButton>
                <BaseButton variant="primary" size="xl">دکمه خیلی بزرگ (xl)</BaseButton>
              </div>

              <!-- Status: Loading -->
              <div
                v-else-if="activeStatusId === 'loading'"
                class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <BaseButton variant="primary" size="md" loading>درحال ارسال اطلاعات...</BaseButton>
                <BaseButton variant="secondary" size="md" loading>ذخیره پیش‌نویس</BaseButton>
                <BaseButton variant="error" size="md" loading>حذف سند</BaseButton>
              </div>

              <!-- Status: Disabled -->
              <div
                v-else-if="activeStatusId === 'disabled'"
                class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <BaseButton variant="primary" size="md" disabled>دکمه غیرفعال</BaseButton>
                <BaseButton variant="secondary" size="md" disabled>Secondary غیرفعال</BaseButton>
                <BaseButton variant="outline" size="md" disabled>Outline غیرفعال</BaseButton>
              </div>

              <!-- Status: Icons -->
              <div
                v-else-if="activeStatusId === 'icons'"
                class="flex flex-wrap items-center justify-center gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <BaseButton variant="primary" size="md" startIcon="solar:add-circle-bold-duotone"
                  >افزودن سند جدید</BaseButton
                >
                <BaseButton variant="secondary" size="md" endIcon="solar:alt-arrow-down-bold"
                  >انتخاب عملیات</BaseButton
                >
                <BaseButton
                  variant="outline"
                  size="md"
                  isRoundedFull
                  startIcon="solar:printer-bold-duotone"
                  >چاپ فاکتور</BaseButton
                >
              </div>
            </div>
          </template>

          <!-- 1.2 BaseInput -->
          <template v-else-if="activeComponentId === 'base-input'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-full max-w-md bg-white-80 backdrop-blur-md p-6 rounded-2xl border border-primary-8 flex flex-col gap-4"
              >
                <div v-if="activeStatusId === 'default'" class="flex flex-col gap-4">
                  <BaseInput
                    v-model="mockInputText"
                    label="نام کامل"
                    placeholder="مثال: علی احمدی"
                  />
                  <BaseInput
                    v-model="mockInputPhone"
                    label="شماره تلفن همراه"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>
                <div v-else-if="activeStatusId === 'with-icons'" class="flex flex-col gap-4">
                  <BaseInput
                    v-model="mockInputSearch"
                    label="جستجوی طرف‌حساب"
                    placeholder="جستجو..."
                    startIcon="solar:magnifer-linear"
                    clearable
                  />
                  <BaseInput
                    v-model="mockInputAmount"
                    label="مبلغ پرداختی (ریال)"
                    placeholder="۱۰,۰۰۰,۰۰۰"
                    endIcon="solar:wallet-money-bold-duotone"
                  />
                </div>
                <div v-else-if="activeStatusId === 'error'" class="flex flex-col gap-4">
                  <BaseInput
                    v-model="mockInputError"
                    label="کد ملی ده رقمی"
                    placeholder="۰۰۱۲۳۴۵۶۷۸"
                    error="کد ملی وارد شده نامعتبر است."
                  />
                  <BaseInput
                    label="رمز عبور"
                    placeholder="••••••••"
                    error="رمز عبور باید حداقل ۸ کاراکتر باشد."
                  />
                </div>
                <div v-else-if="activeStatusId === 'disabled'" class="flex flex-col gap-4">
                  <BaseInput modelValue="کاربر غیرقابل ویرایش" label="نام کاربری سیستم" disabled />
                  <BaseInput modelValue="۱۴۰۴/۰۱/۰۱" label="تاریخ ثبت اولیه" disabled />
                </div>
                <div v-else-if="activeStatusId === 'ltr-mono'" class="flex flex-col gap-4">
                  <BaseInput
                    v-model="mockInputIban"
                    label="شماره شبا بانکی (بدون IR)"
                    placeholder="012345678901234567890123"
                    dir="ltr"
                    class="font-mono"
                  />
                  <BaseInput
                    v-model="mockInputCard"
                    label="شماره کارت ۱۶ رقمی"
                    placeholder="6037-9918-1234-5678"
                    dir="ltr"
                    class="font-mono"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- 1.3 BaseDropdown -->
          <template v-else-if="activeComponentId === 'base-dropdown'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-full max-w-sm bg-white-80 backdrop-blur-md p-6 rounded-2xl border border-primary-8 flex flex-col gap-4"
              >
                <BaseDropdown
                  v-model="mockDropdownValue"
                  :options="mockDropdownOptions"
                  label="انتخاب سرفصل مالی"
                  placeholder="یک حساب را انتخاب نمایید..."
                  :searchable="activeStatusId === 'searchable'"
                  :disabled="activeStatusId === 'disabled'"
                />
                <span class="text-2xs font-mono text-primary-60"
                  >مقدار انتخابی: {{ mockDropdownValue || 'خالی' }}</span
                >
              </div>
            </div>
          </template>

          <!-- 1.4 BaseDropdownItem -->
          <template v-else-if="activeComponentId === 'base-dropdown-item'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-full max-w-sm bg-surface-100 p-6 rounded-2xl border border-primary-12 flex flex-col gap-2"
              >
                <BaseDropdownItem
                  label="حساب جاری بانک ملت (عادی)"
                  icon="solar:card-bold-duotone"
                />
                <BaseDropdownItem
                  label="حساب پس‌انداز (فعال / انتخاب‌شده)"
                  :active="true"
                  icon="solar:wallet-bold-duotone"
                />
                <BaseDropdownItem
                  label="حساب مسدود (غیرفعال)"
                  :disabled="true"
                  icon="solar:forbidden-circle-bold-duotone"
                />
              </div>
            </div>
          </template>

          <!-- 1.5 BaseSelect & BaseSelectItem -->
          <template
            v-else-if="
              activeComponentId === 'base-select' || activeComponentId === 'base-select-item'
            "
          >
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-full max-w-sm bg-white-80 backdrop-blur-md p-6 rounded-2xl border border-primary-8 flex flex-col gap-4"
              >
                <BaseSelect v-model="mockSelectVal" label="انتخاب شعبه کسب‌وکار">
                  <BaseSelectItem value="branch-1" label="شعبه ۱ - مرکزی تهران" />
                  <BaseSelectItem value="branch-2" label="شعبه ۲ - بازار بزرگ" />
                  <BaseSelectItem value="branch-3" label="شعبه ۳ - غرب صادقیه" />
                </BaseSelect>
                <span class="text-2xs font-mono text-primary-60"
                  >شعبه انتخابی: {{ mockSelectVal }}</span
                >
              </div>
            </div>
          </template>

          <!-- 1.6 BaseBadge -->
          <template v-else-if="activeComponentId === 'base-badge'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-wrap items-center justify-center gap-3"
              >
                <template v-if="activeStatusId === 'colors-soft'">
                  <BaseBadge type="primary" style-type="soft">اصلی (Primary)</BaseBadge>
                  <BaseBadge type="success" style-type="soft">موفق (Success)</BaseBadge>
                  <BaseBadge type="warning" style-type="soft">هشدار (Warning)</BaseBadge>
                  <BaseBadge type="error" style-type="soft">خطا (Error)</BaseBadge>
                  <BaseBadge type="secondary" style-type="soft">ثانویه (Secondary)</BaseBadge>
                </template>
                <template v-else-if="activeStatusId === 'colors-solid'">
                  <BaseBadge type="primary" style-type="fill">Primary Fill</BaseBadge>
                  <BaseBadge type="success" style-type="fill">Success Fill</BaseBadge>
                  <BaseBadge type="warning" style-type="fill">Warning Fill</BaseBadge>
                  <BaseBadge type="error" style-type="fill">Error Fill</BaseBadge>
                </template>
                <template v-else-if="activeStatusId === 'sizes'">
                  <BaseBadge type="primary" size="2xs">سایز 2xs</BaseBadge>
                  <BaseBadge type="primary" size="xs">سایز xs</BaseBadge>
                  <BaseBadge type="primary" size="sm">سایز sm</BaseBadge>
                  <BaseBadge type="primary" size="lg">سایز lg</BaseBadge>
                </template>
                <template v-else-if="activeStatusId === 'badge-field'">
                  <div class="w-full max-w-md flex flex-col gap-3">
                    <BaseBadgeField
                      v-model="canvasSelectedBadgeIds"
                      :badges="mockCanvasBadges"
                      label="فیلد الصاق برچسب و نشان (BaseBadgeField)"
                      placeholder="الصاق برچسب..."
                      hint="اسکرول افقی با پروگرسیو بلور"
                      @create-badge="handleCanvasCreateBadge"
                    />
                  </div>
                </template>
              </div>
            </div>
          </template>

          <!-- 1.6.1 BaseBadgeField -->
          <template v-else-if="activeComponentId === 'base-badge-field'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-12 hover:border-primary-24 transition-all duration-200 flex flex-col gap-5 w-full max-w-lg shadow-2xs group"
              >
                <div class="flex items-center justify-between pb-3 border-b border-primary-6">
                  <div>
                    <h3 class="text-sm font-bold text-primary-100 font-dots-1">
                      کامپوننت فیلد برچسب (BaseBadgeField)
                    </h3>
                    <p class="text-2xs text-primary-60 font-dots-1 mt-0.5">
                      هم‌اندازه فیلدهای متن (h-10)، بوردر خط‌چین، دکمه افزودن در راست و اسکرول افقی
                    </p>
                  </div>
                  <span
                    class="text-2xs px-2 py-0.5 rounded-lg bg-primary-6 text-primary-80 font-mono font-bold"
                  >
                    {{ activeStatusId }}
                  </span>
                </div>

                <template v-if="activeStatusId === 'interactive'">
                  <BaseBadgeField
                    v-model="canvasSelectedBadgeIds"
                    :badges="mockCanvasBadges"
                    :removable="false"
                    label="برچسب‌های فاکتور یا سند (تمیز - بدون ضربدر)"
                    placeholder="انتخاب یا ایجاد برچسب..."
                    hint="حالت پیش‌فرض تمیز بدون ضربدر — مدیریت از طریق منو"
                    @create-badge="handleCanvasCreateBadge"
                  />
                </template>
                <template v-else-if="activeStatusId === 'removable'">
                  <BaseBadgeField
                    v-model="canvasSelectedBadgeIds"
                    :badges="mockCanvasBadges"
                    :removable="true"
                    label="برچسب‌های فاکتور یا سند (همراه با ضربدر حذف)"
                    placeholder="انتخاب یا ایجاد برچسب..."
                    hint="حالت با ضربدر روی هر برچسب جهت حذف سریع"
                    @create-badge="handleCanvasCreateBadge"
                  />
                </template>
                <template v-else-if="activeStatusId === 'empty'">
                  <BaseBadgeField
                    :model-value="[]"
                    :badges="mockCanvasBadges"
                    label="فیلد خالی (پلیس‌هولدر)"
                    placeholder="الصاق برچسب (کلیک کنید)..."
                    hint="در حالت خالی آیکون + نمایش داده می‌شود"
                  />
                </template>
                <template v-else-if="activeStatusId === 'overflow'">
                  <BaseBadgeField
                    :model-value="mockCanvasBadges.map((b) => b.id)"
                    :badges="mockCanvasBadges"
                    label="تراکم بالا (Overflow Scroll)"
                    hint="برای مشاهده دکمه‌های اسکرول روی فیلد هاور کنید"
                  />
                </template>
                <template v-else-if="activeStatusId === 'error'">
                  <BaseBadgeField
                    v-model="canvasSelectedBadgeIds"
                    :badges="mockCanvasBadges"
                    label="برچسب‌های الزامی"
                    error="انتخاب حداقل یک برچسب الزامی است"
                    required
                  />
                </template>
                <template v-else-if="activeStatusId === 'disabled'">
                  <BaseBadgeField
                    :model-value="['cb-1', 'cb-2']"
                    :badges="mockCanvasBadges"
                    label="فیلد قفل‌شده (Disabled)"
                    disabled
                    hint="تعامل با فیلد غیرفعال است"
                  />
                </template>
              </div>
            </div>
          </template>

          <!-- 1.7 BaseSwitch -->
          <template v-else-if="activeComponentId === 'base-switch'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-4 w-full max-w-sm"
              >
                <BaseSwitch
                  v-model="mockSwitchVal"
                  label="فعال‌سازی ارسال پیامک تراکنش"
                  :disabled="activeStatusId.includes('disabled')"
                />
                <span class="text-2xs font-mono text-primary-60"
                  >وضعیت سوئیچ: {{ mockSwitchVal ? 'فعال (True)' : 'خاموش (False)' }}</span
                >
              </div>
            </div>
          </template>

          <!-- 1.8 BaseCheckbox -->
          <template v-else-if="activeComponentId === 'base-checkbox'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-4 w-full max-w-sm"
              >
                <BaseCheckbox
                  v-model="mockCheckboxVal"
                  label="پذیرش قوانین و شرایط سامانه مالی"
                  :indeterminate="activeStatusId === 'indeterminate'"
                  :disabled="activeStatusId === 'disabled'"
                />
                <span class="text-2xs font-mono text-primary-60"
                  >وضعیت چک‌باکس: {{ mockCheckboxVal }}</span
                >
              </div>
            </div>
          </template>

          <!-- 1.9 BaseRadio -->
          <template v-else-if="activeComponentId === 'base-radio'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-3 w-full max-w-sm"
              >
                <BaseRadio
                  v-model="mockRadioVal"
                  value="retail"
                  label="فروشگاه خرده‌فروشی"
                  :disabled="activeStatusId === 'disabled'"
                />
                <BaseRadio
                  v-model="mockRadioVal"
                  value="wholesale"
                  label="عمده‌فروشی و بازرگانی"
                  :disabled="activeStatusId === 'disabled'"
                />
                <BaseRadio
                  v-model="mockRadioVal"
                  value="service"
                  label="شرکت خدماتی و پیمانکاری"
                  :disabled="activeStatusId === 'disabled'"
                />
                <span class="text-2xs font-mono text-primary-60 mt-2"
                  >گزینه انتخاب شده: {{ mockRadioVal }}</span
                >
              </div>
            </div>
          </template>

          <!-- 1.10 BaseChip -->
          <template v-else-if="activeComponentId === 'base-chip'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-wrap gap-3"
              >
                <BaseChip label="شعبه اصلی تهران" :removable="activeStatusId === 'removable'" />
                <BaseChip label="سال مالی ۱۴۰۴" :removable="activeStatusId === 'removable'" />
                <BaseChip label="حساب جاری بانک ملت" :removable="activeStatusId === 'removable'" />
              </div>
            </div>
          </template>

          <!-- 1.10b BaseBottomSurface -->
          <template v-else-if="activeComponentId === 'base-bottom-surface'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div class="flex flex-col gap-4 w-full max-w-lg">
                <BaseBottomSurface
                  v-if="activeStatusId !== 'pagination-only'"
                  label="ثبت عملیات جدید"
                  icon="solar:add-bold"
                  tooltip="ثبت رویداد جدید خزانه‌داری"
                />
                <BaseBottomSurface v-else :show-action="false">
                  <div
                    class="w-full h-10 rounded-xl bg-primary-6 flex items-center justify-center text-2xs font-bold text-primary-60 font-dots-1"
                  >
                    اسلات پیجینیشن
                  </div>
                </BaseBottomSurface>
              </div>
            </div>
          </template>

          <!-- 1.10c BaseInnerHeader -->
          <template v-else-if="activeComponentId === 'base-inner-header'">
            <div
              class="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-start gap-8"
              dir="rtl"
            >

              <!-- Top Mode Switcher & Overview -->
              <div class="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 bg-white-60 backdrop-blur-md p-3.5 rounded-2xl border border-primary-12">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-primary-100 text-white-100 flex items-center justify-center shadow-xs">
                    <Icon icon="solar:sidebar-minimalistic-bold-duotone" class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-primary-100 font-dots-1">تفکیک محیط تست دسکتاپ و موبایل</h3>
                    <p class="text-2xs text-primary-60">پراپ‌ها، کانتینرها و رفتارهای مجزا برای حالت دسکتاپ (سرچ افقی) و حالت موبایل (سرچ شناور)</p>
                  </div>
                </div>

                <div class="flex items-center gap-1.5 bg-primary-6 p-1 rounded-xl">
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    :class="activeStatusId === 'desktop-mode' || activeStatusId === 'default' ? 'bg-white-100 text-primary-100 shadow-xs' : 'text-primary-60 hover:text-primary-100'"
                    @click="activeStatusId = 'desktop-mode'"
                  >
                    <Icon icon="solar:laptop-minimalistic-bold-duotone" class="w-4 h-4" />
                    <span>دسکتاپ</span>
                  </button>
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    :class="activeStatusId === 'mobile-mode' || activeStatusId === 'mobile-search' ? 'bg-white-100 text-primary-100 shadow-xs' : 'text-primary-60 hover:text-primary-100'"
                    @click="activeStatusId = 'mobile-mode'"
                  >
                    <Icon icon="solar:smartphone-bold-duotone" class="w-4 h-4" />
                    <span>موبایل</span>
                  </button>
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    :class="activeStatusId === 'comparison' ? 'bg-white-100 text-primary-100 shadow-xs' : 'text-primary-60 hover:text-primary-100'"
                    @click="activeStatusId = 'comparison'"
                  >
                    <Icon icon="solar:devices-bold-duotone" class="w-4 h-4" />
                    <span>مقایسه همزمان</span>
                  </button>
                </div>
              </div>

              <!-- SECTION 1: DESKTOP DEMO (Shown in desktop-mode, comparison, default, filter-active, create-only) -->
              <div
                v-if="activeStatusId === 'desktop-mode' || activeStatusId === 'comparison' || activeStatusId === 'default' || activeStatusId === 'filter-active' || activeStatusId === 'create-only'"
                class="w-full max-w-4xl flex flex-col gap-3"
              >
                <!-- Desktop Header Label & Props Info -->
                <div class="flex items-center justify-between px-1">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-secondary-100" />
                    <span class="text-xs font-bold text-primary-100 font-dots-1">نسخه دسکتاپ (Desktop Viewport)</span>
                    <BaseBadge size="2xs" type="primary">عرض کامل / انیمیشن افقی</BaseBadge>
                  </div>
                  <span class="text-3xs text-primary-40 font-mono">:floating-search="false"</span>
                </div>

                <!-- Desktop Canvas Card -->
                <div class="p-6 bg-white-100 rounded-2xl border border-primary-12 shadow-sm">
                  <BaseInnerHeader
                    :title="desktopInnerHeaderProps.title"
                    :parent-title="desktopInnerHeaderProps.parentTitle"
                    :parent-path="desktopInnerHeaderProps.parentPath"
                    :show-home="desktopInnerHeaderProps.showHome"
                    :show-search="desktopInnerHeaderProps.showSearch"
                    :search-placeholder="desktopInnerHeaderProps.searchPlaceholder"
                    :search-label="desktopInnerHeaderProps.searchLabel"
                    :search-tooltip="desktopInnerHeaderProps.searchTooltip"
                    :floating-search="false"
                    :mobile-floating-search="false"
                    :show-create="activeStatusId !== 'filter-active'"
                    :create-label="desktopInnerHeaderProps.createLabel"
                    :show-filter="activeStatusId !== 'create-only'"
                    :filter-label="desktopInnerHeaderProps.filterLabel"
                    :filter-active="activeStatusId === 'filter-active'"
                    :show-menu="activeStatusId !== 'create-only'"
                    @create="handleInnerHeaderCreate('desktop')"
                    @filter="handleInnerHeaderFilter('desktop')"
                    @menu="handleInnerHeaderMenu('desktop')"
                    @search-submit="(q) => handleInnerHeaderSearchSubmit(q, 'desktop')"
                  />
                </div>

                <!-- Desktop Helper Note -->
                <div class="flex items-center gap-2 px-3.5 py-2 bg-primary-6 rounded-xl text-3xs text-primary-60">
                  <Icon icon="solar:info-circle-linear" class="w-4 h-4 text-primary-80 shrink-0" />
                  <span>در دسکتاپ، کلیک روی ذره‌بین کادر جستجو را به صورت افقی در خود نوار ابزار باز می‌کند و نیازی به پاپ‌آپ شناور نیست.</span>
                </div>
              </div>

              <!-- SECTION 2: MOBILE DEMO (Shown in mobile-mode, comparison, mobile-search) -->
              <div
                v-if="activeStatusId === 'mobile-mode' || activeStatusId === 'comparison' || activeStatusId === 'mobile-search'"
                class="w-full max-w-4xl flex flex-col items-center gap-3"
              >
                <!-- Mobile Header Label & Props Info -->
                <div class="w-full max-w-sm flex items-center justify-between px-1">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-accent-100" />
                    <span class="text-xs font-bold text-primary-100 font-dots-1">نسخه موبایل (Mobile Frame: 380px)</span>
                    <BaseBadge size="2xs" type="accent">پاپ‌آپ شناور با نتایج</BaseBadge>
                  </div>
                  <span class="text-3xs text-primary-40 font-mono">:floating-search="true"</span>
                </div>

                <!-- Mobile Smartphone Mockup Frame -->
                <div class="w-full max-w-sm bg-white-100 rounded-[32px] border-4 border-primary-24 shadow-2xl p-4 flex flex-col gap-4 relative">
                  <!-- Mobile Top Notch & Speaker Bar Mock -->
                  <div class="flex items-center justify-between px-2 pt-1 text-3xs text-primary-40 font-mono dir-ltr select-none">
                    <span>9:41</span>
                    <div class="w-16 h-1.5 bg-primary-24 rounded-full" />
                    <div class="flex items-center gap-1">
                      <Icon icon="solar:wifi-bold" class="w-3 h-3" />
                      <Icon icon="solar:battery-charge-bold" class="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <!-- The Mobile BaseInnerHeader with dedicated mobile props -->
                  <div class="bg-primary-4 p-3 rounded-2xl border border-primary-8">
                    <BaseInnerHeader
                      :title="mobileInnerHeaderProps.title"
                      :parent-title="mobileInnerHeaderProps.parentTitle"
                      :parent-path="mobileInnerHeaderProps.parentPath"
                      :show-home="mobileInnerHeaderProps.showHome"
                      :show-search="mobileInnerHeaderProps.showSearch"
                      :search-placeholder="mobileInnerHeaderProps.searchPlaceholder"
                      :search-label="mobileInnerHeaderProps.searchLabel"
                      :search-tooltip="mobileInnerHeaderProps.searchTooltip"
                      :floating-search="true"
                      :mobile-floating-search="true"
                      :search-results="innerHeaderSearchResults"
                      :search-empty-text="mobileInnerHeaderProps.searchEmptyText"
                      :show-create="true"
                      :create-label="mobileInnerHeaderProps.createLabel"
                      :show-filter="true"
                      :filter-label="mobileInnerHeaderProps.filterLabel"
                      :show-menu="true"
                      @create="handleInnerHeaderCreate('mobile')"
                      @filter="handleInnerHeaderFilter('mobile')"
                      @menu="handleInnerHeaderMenu('mobile')"
                      @search-submit="(q) => handleInnerHeaderSearchSubmit(q, 'mobile')"
                      @select-result="handleInnerHeaderResultSelect"
                    />
                  </div>

                  <!-- Simulated Mobile Content Rows Inside the Frame -->
                  <div class="flex flex-col gap-2 opacity-60">
                    <div class="text-3xs text-primary-40 font-bold px-1">اسناد اخیر در گوشی</div>
                    <div
                      v-for="item in innerHeaderSearchResults.slice(0, 3)"
                      :key="item.id"
                      class="flex items-center justify-between p-2 rounded-xl bg-primary-6 text-2xs"
                    >
                      <div class="flex items-center gap-2 truncate">
                        <Icon :icon="item.icon" class="w-4 h-4 text-primary-80 shrink-0" />
                        <span class="truncate text-primary-100 font-bold">{{ item.title }}</span>
                      </div>
                      <BaseBadge size="2xs" :type="item.badgeType">{{ item.badge }}</BaseBadge>
                    </div>
                  </div>

                  <!-- Mobile Bottom Home Indicator Bar Mock -->
                  <div class="w-24 h-1 bg-primary-24 rounded-full mx-auto mt-2" />
                </div>

                <!-- Mobile Helper Note -->
                <div class="w-full max-w-sm flex items-center gap-2 px-3.5 py-2 bg-accent-100/10 rounded-xl text-3xs text-accent-100 border border-accent-100/20 text-center">
                  <Icon icon="solar:info-circle-bold-duotone" class="w-4 h-4 shrink-0" />
                  <span>روی آیکون ذره‌بین در موبایل کلیک کنید تا پنجره جستجوی شناور با ۵ نتیجه آماده باز شود.</span>
                </div>
              </div>

              <!-- SECTION 3: PROPS COMPARISON TABLE -->
              <div class="w-full max-w-4xl bg-white-80 backdrop-blur-md rounded-2xl border border-primary-12 p-4 flex flex-col gap-3">
                <div class="flex items-center gap-2">
                  <Icon icon="solar:tuning-bold-duotone" class="w-4 h-4 text-secondary-100" />
                  <span class="text-xs font-bold text-primary-100 font-dots-1">جدول تفکیک پراپ‌های نسخه دسکتاپ و موبایل</span>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-right text-2xs text-primary-80 border-collapse">
                    <thead>
                      <tr class="border-b border-primary-12 text-primary-60">
                        <th class="py-1.5 px-3">نام پراپ</th>
                        <th class="py-1.5 px-3">مقدار در دسکتاپ</th>
                        <th class="py-1.5 px-3">مقدار در موبایل</th>
                        <th class="py-1.5 px-3">توضیح رفتار</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-primary-6 font-mono text-3xs">
                      <tr>
                        <td class="py-2 px-3 font-bold text-primary-100">floatingSearch</td>
                        <td class="py-2 px-3 text-secondary-100">false</td>
                        <td class="py-2 px-3 text-accent-100">true</td>
                        <td class="py-2 px-3 font-sans text-primary-60">اجبار به استفاده از مدال شناور به جای انبساط افقی</td>
                      </tr>
                      <tr>
                        <td class="py-2 px-3 font-bold text-primary-100">mobileFloatingSearch</td>
                        <td class="py-2 px-3 text-secondary-100">false</td>
                        <td class="py-2 px-3 text-accent-100">true</td>
                        <td class="py-2 px-3 font-sans text-primary-60">فعالسازی خودکار شناور در صفحات با عرض زیر ۶۴۰ پیکسل</td>
                      </tr>
                      <tr>
                        <td class="py-2 px-3 font-bold text-primary-100">searchResults</td>
                        <td class="py-2 px-3 text-primary-40">[]</td>
                        <td class="py-2 px-3 text-accent-100">[5 items]</td>
                        <td class="py-2 px-3 font-sans text-primary-60">لیست نتایج آماده برای نمایش در کارت شناور</td>
                      </tr>
                      <tr>
                        <td class="py-2 px-3 font-bold text-primary-100">searchPlaceholder</td>
                        <td class="py-2 px-3 text-secondary-100">"جستجو در اسناد (دسکتاپ)..."</td>
                        <td class="py-2 px-3 text-accent-100">"جستجوی شناور موبایل..."</td>
                        <td class="py-2 px-3 font-sans text-primary-60">متن نگهدارنده سفارشی برای هر محیط</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </template>

          <!-- 1.11 BaseSkeleton -->
          <template v-else-if="activeComponentId === 'base-skeleton'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-4 w-full max-w-md"
              >
                <div class="flex items-center gap-3">
                  <BaseSkeleton width="48px" height="48px" rounded="full" />
                  <div class="flex flex-col gap-2 flex-1">
                    <BaseSkeleton width="60%" height="16px" rounded="md" />
                    <BaseSkeleton width="40%" height="12px" rounded="md" />
                  </div>
                </div>
                <BaseSkeleton width="100%" height="36px" rounded="lg" />
                <BaseSkeleton width="80%" height="24px" rounded="md" />
              </div>
            </div>
          </template>

          <!-- 1.12 BaseTabs & BaseTabPill -->
          <template
            v-else-if="activeComponentId === 'base-tabs' || activeComponentId === 'base-tab-pill'"
          >          >            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-4 w-full max-w-lg"
              >
                <BaseTabs v-model="mockActiveTab" :tabs="mockTabList" />
                <div class="flex items-center gap-2 mt-2">
                  <BaseTabPill label="اسناد تایید شده" :active="true" :count="12" />
                  <BaseTabPill label="اسناد معلق" :active="false" :count="3" />
                </div>
                <div
                  class="p-4 bg-surface-100 rounded-xl border border-primary-12 text-xs font-dots-1 text-primary-80 mt-2"
                >
                  محتوای نمایشی تب انتخاب شده: {{ mockActiveTab }}
                </div>
              </div>
            </div>
          </template>

          <!-- 1.12b BaseSegmentedTabs (neutral segmented control) -->
          <template v-else-if="activeComponentId === 'base-segmented-tabs'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-col gap-4 w-full max-w-lg"
              >
                <BaseSegmentedTabs v-model="mockSegmentedMode" :options="mockSegmentedOptions" />
                <div
                  class="p-4 bg-surface-100 rounded-xl border border-primary-12 text-xs font-dots-1 text-primary-80 mt-2"
                >
                  حالت نمایشی انتخاب شده: {{ mockSegmentedMode }}
                </div>
              </div>
            </div>
          </template>

          <!-- 1.13 BaseToast -->
          <template v-else-if="activeComponentId === 'base-toast'">
            <div
              class="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col gap-6 bg-surface-100"
              dir="rtl"
            >
              <!-- STATUS: ANIMATION & PROGRESS TEST -->
              <template v-if="activeStatusId === 'animation'">
                <div class="flex flex-col gap-6 max-w-2xl mx-auto w-full">
                  <div class="flex items-center justify-between pb-3 border-b border-black-12">
                    <div class="flex items-center gap-2.5">
                      <div class="w-9 h-9 rounded-xl bg-primary-12 text-primary-100 flex items-center justify-center">
                        <Icon icon="solar:play-circle-bold-duotone" class="w-5 h-5" />
                      </div>
                      <div>
                        <h3 class="text-sm font-bold text-black-100 font-dots-1">
                          تست انیمیشن و نوار پیشرفت (Animation & Loading Bar)
                        </h3>
                        <p class="text-2xs text-black-60 font-dots-1">
                          بررسی انیمیشن تایمر، نوار لودینگ ظریف (۲px) و عدم بیرون‌زدگی از لبه‌های گرد کانتینر
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      @click="triggerToastAnimation"
                      class="px-3.5 py-1.5 rounded-xl bg-primary-100 hover:bg-primary-80 text-white-100 text-xs font-bold font-dots-1 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Icon icon="solar:restart-bold" class="w-3.5 h-3.5" />
                      <span>اجرای مجدد انیمیشن</span>
                    </button>
                  </div>

                  <!-- Controls Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white-100 p-4 rounded-2xl border border-black-12 shadow-sm font-dots-1">
                    <div class="flex flex-col gap-1">
                      <label class="text-2xs font-bold text-black-60">مدت زمان (تایمر):</label>
                      <select
                        v-model="toastSandboxDuration"
                        @change="triggerToastAnimation"
                        class="p-2 rounded-lg bg-surface-100 border border-black-12 text-xs font-medium text-black-100 outline-none"
                      >
                        <option :value="2000">۲ ثانیه (سریع)</option>
                        <option :value="4000">۴ ثانیه (استاندارد)</option>
                        <option :value="8000">۸ ثانیه (طولانی)</option>
                      </select>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-2xs font-bold text-black-60">استایل (styleType):</label>
                      <select
                        v-model="toastSandboxStyleType"
                        class="p-2 rounded-lg bg-surface-100 border border-black-12 text-xs font-medium text-black-100 outline-none"
                      >
                        <option value="glass">glass (شیشه‌ای)</option>
                        <option value="soft">soft (سافت ملایم)</option>
                        <option value="fill">fill (رنگ توپر)</option>
                        <option value="outline">outline (کادر خطی)</option>
                      </select>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-2xs font-bold text-black-60">تم رنگی (type):</label>
                      <select
                        v-model="toastSandboxType"
                        class="p-2 rounded-lg bg-surface-100 border border-black-12 text-xs font-medium text-black-100 outline-none"
                      >
                        <option value="success">success (موفقیت)</option>
                        <option value="error">error (خطا)</option>
                        <option value="warning">warning (هشدار)</option>
                        <option value="info">info (اطلاعات)</option>
                        <option value="primary">primary (رنگ اصلی)</option>
                      </select>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-2xs font-bold text-black-60">اندازه (size):</label>
                      <select
                        v-model="toastSandboxSize"
                        class="p-2 rounded-lg bg-surface-100 border border-black-12 text-xs font-medium text-black-100 outline-none"
                      >
                        <option value="sm">sm (کوچک)</option>
                        <option value="md">md (متوسط)</option>
                        <option value="lg">lg (بزرگ)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Live Toast Canvas Preview -->
                  <div
                    class="p-8 rounded-3xl bg-white-100 border border-black-12 flex flex-col items-center justify-center min-h-[180px] shadow-sm relative overflow-hidden"
                    style="
                      background-image: repeating-conic-gradient(
                        var(--color-surface-100) 0% 25%,
                        #ffffff 0% 50%
                      );
                      background-size: 16px 16px;
                    "
                  >
                    <div class="w-full max-w-md">
                      <BaseToast
                        v-if="toastSandboxVisible"
                        :key="toastSandboxKey"
                        v-model="toastSandboxVisible"
                        :type="toastSandboxType"
                        :style-type="toastSandboxStyleType"
                        :size="toastSandboxSize"
                        :title="
                          toastSandboxType === 'success'
                            ? 'عملیات با موفقیت انجام شد'
                            : toastSandboxType === 'error'
                              ? 'خطا در برقراری ارتباط با سرور'
                              : toastSandboxType === 'warning'
                                ? 'هشدار مغایرت مالی'
                                : 'اعلان سیستمی'
                        "
                        message="نوار لودینگ ۲ پیکسلی در پایین کامپوننت بدون خروج از لبه‌های گرد در حال اجراست."
                        :duration="toastSandboxDuration"
                        :show-progress="toastSandboxShowProgress"
                        :closable="toastSandboxClosable"
                        action-label="بررسی جزئیات"
                        action-icon="solar:eye-linear"
                      />
                      <div
                        v-else
                        class="text-center py-6 text-xs text-black-40 font-dots-1 flex flex-col items-center gap-2"
                      >
                        <span>اعلان به پایان رسید یا بسته شد.</span>
                        <button
                          type="button"
                          @click="triggerToastAnimation"
                          class="text-xs text-primary-100 font-bold hover:underline"
                        >
                          نمایش دوباره
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="bg-primary-6 border border-primary-24 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-primary-100 font-dots-1">
                    <Icon icon="solar:info-circle-bold-duotone" class="w-4 h-4 shrink-0 mt-0.5 text-primary-100" />
                    <span>
                      نوار پیشرفت با ضخامت بهینه ۲ پیکسل درون کانتینر ایزوله شده و متن دسکریپشن با اندازه استاندارد text-xs نمایش داده می‌شود.
                    </span>
                  </div>
                </div>
              </template>

              <!-- STATUS: STYLES COMPARISON -->
              <template v-else-if="activeStatusId === 'styles'">
                <div class="flex flex-col gap-6 max-w-2xl mx-auto w-full">
                  <div class="pb-2 border-b border-black-12">
                    <h3 class="text-sm font-bold text-black-100 font-dots-1">
                      استایل‌های چهارگانه BaseToast همراه با نوار لودینگ زنده
                    </h3>
                    <p class="text-2xs text-black-60 font-dots-1">
                      بررسی تطابق نوار لودینگ و متن دسکریپشن در هر ۴ سبک طراحی
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Glass -->
                    <div class="flex flex-col gap-1.5">
                      <span class="text-3xs font-mono font-bold text-black-60">۱. استایل شیشه‌ای (styleType="glass"):</span>
                      <BaseToast
                        :model-value="true"
                        type="primary"
                        style-type="glass"
                        title="طراحی شیشه‌ای مدرن"
                        message="پس‌زمینه بلور نیمه‌شفاف با نوار لودینگ باریک سرمه‌ای"
                        :duration="8000"
                        :closable="false"
                      />
                    </div>

                    <!-- Soft -->
                    <div class="flex flex-col gap-1.5">
                      <span class="text-3xs font-mono font-bold text-black-60">۲. استایل سافت ملایم (styleType="soft"):</span>
                      <BaseToast
                        :model-value="true"
                        type="success"
                        style-type="soft"
                        title="طراحی ملایم (Soft)"
                        message="رنگ تم ملایم با نوار لودینگ سبز رنگ بدون بیرون‌زدگی"
                        :duration="8000"
                        :closable="false"
                      />
                    </div>

                    <!-- Fill -->
                    <div class="flex flex-col gap-1.5">
                      <span class="text-3xs font-mono font-bold text-black-60">۳. استایل توپر (styleType="fill"):</span>
                      <BaseToast
                        :model-value="true"
                        type="error"
                        style-type="fill"
                        title="طراحی توپر پرکنتراست"
                        message="رنگ توپر با نوار لودینگ سفید شفاف هماهنگ"
                        :duration="8000"
                        :closable="false"
                      />
                    </div>

                    <!-- Outline -->
                    <div class="flex flex-col gap-1.5">
                      <span class="text-3xs font-mono font-bold text-black-60">۴. استایل خطی (styleType="outline"):</span>
                      <BaseToast
                        :model-value="true"
                        type="warning"
                        style-type="outline"
                        title="طراحی خطی (Outline)"
                        message="کادر ۲ پیکسلی زرد با فونت دسکریپشن مناسب"
                        :duration="8000"
                        :closable="false"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <!-- STATUS: SIZES -->
              <template v-else-if="activeStatusId === 'sizes'">
                <div class="flex flex-col gap-6 max-w-2xl mx-auto w-full">
                  <div class="pb-2 border-b border-black-12">
                    <h3 class="text-sm font-bold text-black-100 font-dots-1">
                      سایزبندی‌های استاندارد BaseToast (sm, md, lg)
                    </h3>
                    <p class="text-2xs text-black-60 font-dots-1">
                      مقایسه اندازه فونت دسکریپشن و نوار پیشرفت در سایزهای مختلف
                    </p>
                  </div>

                  <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-3xs font-mono font-bold text-black-60">size="sm" (کوچک و فشرده):</span>
                      <BaseToast
                        :model-value="true"
                        type="primary"
                        size="sm"
                        title="اعلان فشرده"
                        message="متن دسکریپشن با سایز کوچک text-2xs/text-xs"
                        :duration="6000"
                        :closable="true"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <span class="text-3xs font-mono font-bold text-black-60">size="md" (استاندارد):</span>
                      <BaseToast
                        :model-value="true"
                        type="success"
                        size="md"
                        title="اعلان اندازه استاندارد"
                        message="متن دسکریپشن بهینه‌شده با سایز text-xs متناسب با عنوان"
                        :duration="6000"
                        :closable="true"
                      />
                    </div>

                    <div class="flex flex-col gap-1">
                      <span class="text-3xs font-mono font-bold text-black-60">size="lg" (بزرگ و با جزئیات):</span>
                      <BaseToast
                        :model-value="true"
                        type="secondary"
                        size="lg"
                        title="اعلان تفصیلی بزرگ"
                        message="متن دسکریپشن بزرگ‌تر با پدینگ و نوار پیشرفت ۲ پیکسلی"
                        :duration="6000"
                        :closable="true"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <!-- STATUS: SUCCESS / ERROR / WARNING -->
              <template v-else>
                <div class="w-full max-w-md mx-auto my-auto flex flex-col gap-4">
                  <BaseToast
                    :model-value="true"
                    :type="
                      activeStatusId === 'error'
                        ? 'error'
                        : activeStatusId === 'warning'
                          ? 'warning'
                          : 'success'
                    "
                    :title="
                      activeStatusId === 'error'
                        ? 'خطا در ثبت سند'
                        : activeStatusId === 'warning'
                          ? 'هشدار مالی'
                          : 'عملیات موفق'
                    "
                    message="این یک پیام پیش‌نمایش استاندارد توست دیزاین سیستم پاندورا ۳۶۰ همراه با نوار پیشرفت است."
                    :duration="5000"
                    :closable="true"
                  />
                </div>
              </template>
            </div>
          </template>

          <!-- 1.14 BaseBreadcrumb -->
          <template v-else-if="activeComponentId === 'base-breadcrumb'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 w-full max-w-lg"
              >
                <BaseBreadcrumb
                  :items="[
                    { title: 'داشبورد اصلی', path: '/' },
                    { title: 'اسناد حسابداری', path: '/documents' },
                    { title: 'سند شماره ۱۰۴۲' },
                  ]"
                />
              </div>
            </div>
          </template>

          <!-- 1.14b BaseTooltip -->
          <template v-else-if="activeComponentId === 'base-tooltip'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-10 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex flex-wrap items-center justify-center gap-8"
              >
                <template v-if="activeStatusId === 'sizes'">
                  <BaseTooltip text="تول‌تیپ کوچک (sm)" placement="top" size="sm">
                    <BaseButton variant="primary" size="md">سایز sm</BaseButton>
                  </BaseTooltip>
                  <BaseTooltip text="تول‌تیپ متوسط (md)" placement="top" size="md">
                    <BaseButton variant="primary" size="md">سایز md</BaseButton>
                  </BaseTooltip>
                </template>
                <template v-else-if="activeStatusId === 'variants'">
                  <BaseTooltip text="تم مشکی پیش‌فرض" placement="top" variant="dark">
                    <BaseButton variant="primary" size="md">مشکی (Dark)</BaseButton>
                  </BaseTooltip>
                  <BaseTooltip text="تم روشن" placement="top" variant="light">
                    <BaseButton variant="secondary" size="md">روشن (Light)</BaseButton>
                  </BaseTooltip>
                </template>
                <template v-else>
                  <BaseTooltip text="راهنمای بالای دکمه" placement="top">
                    <BaseButton variant="primary" size="md">بالا (Top)</BaseButton>
                  </BaseTooltip>
                  <BaseTooltip text="راهنمای پایین دکمه" placement="bottom">
                    <BaseButton variant="secondary" size="md">پایین (Bottom)</BaseButton>
                  </BaseTooltip>
                  <BaseTooltip text="راهنمای سمت راست" placement="right">
                    <BaseButton variant="outline" size="md">راست</BaseButton>
                  </BaseTooltip>
                  <BaseTooltip text="راهنمای سمت چپ" placement="left">
                    <BaseButton variant="ghost" size="md">چپ</BaseButton>
                  </BaseTooltip>
                </template>
              </div>
              <span class="text-2xs font-dots-1 text-white-40"
                >برای مشاهده تول‌تیپ، روی دکمه‌ها هاور کنید یا فوکوس کنید</span
              >
            </div>
          </template>

          <!-- 1.15 CardLoadingOverlay -->
          <template v-else-if="activeComponentId === 'card-loading-overlay'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-full max-w-md h-64 bg-white-80 rounded-2xl border border-primary-8 p-6 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <h3 class="text-sm font-bold text-primary-100 font-dots-1">
                    کارت خلاصه سود و زیان
                  </h3>
                  <p class="text-xs text-primary-60 mt-1 font-dots-1">
                    گزارش تراز آزمایشی دوره جاری
                  </p>
                </div>
                <CardLoadingOverlay :visible="true" />
              </div>
            </div>
          </template>

          <!-- 1.16 SelectAllPill -->
          <template v-else-if="activeComponentId === 'select-all-pill'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 rounded-2xl border border-primary-8 flex items-center gap-4"
              >
                <SelectAllPill
                  :selected="mockSelectAll"
                  :count="mockSelectCount"
                  :total="25"
                  @click="
                    mockSelectAll = !mockSelectAll;
                    mockSelectCount = mockSelectAll ? 25 : 0;
                  "
                />
                <span class="text-xs font-dots-1 text-primary-80"
                  >تعداد انتخاب شده: {{ mockSelectCount }} از ۲۵ سطر</span
                >
              </div>
            </div>
          </template>

          <!-- 1.17 SidebarItem & SidebarItemBadge -->
          <template
            v-else-if="
              activeComponentId === 'sidebar-item' || activeComponentId === 'sidebar-item-badge'
            "
          >
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="w-64 bg-[#1e1e1e] p-4 rounded-2xl border border-[#383838] flex flex-col gap-2 text-white-100"
              >
                <SidebarItem
                  label="داشبورد مالی"
                  icon="solar:home-smile-bold-duotone"
                  :active="true"
                />
                <SidebarItem
                  label="اسناد و فاکتورها"
                  icon="solar:document-text-bold-duotone"
                  :active="false"
                >
                  <template #badge>
                    <SidebarItemBadge :count="8" />
                  </template>
                </SidebarItem>
                <SidebarItem
                  label="خزانه‌داری"
                  icon="solar:safe-square-bold-duotone"
                  :active="false"
                />
              </div>
            </div>
          </template>

          <!-- 1.18 QuickActionButton -->
          <template v-else-if="activeComponentId === 'quick-action-button'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 backdrop-blur-md rounded-2xl border border-primary-8 flex items-center gap-4"
              >
                <QuickActionButton
                  variant="main"
                  label="سند جدید"
                  icon="solar:document-add-linear"
                />
                <QuickActionButton
                  variant="hover"
                  label="طرف‌حساب جدید"
                  icon="solar:user-plus-linear"
                />
                <QuickActionButton
                  variant="soon"
                  label="خروجی اکسل"
                  icon="solar:file-download-linear"
                  isSoon
                />
              </div>
            </div>
          </template>

          <!-- 1.19 QuickMenuTrigger -->
          <template v-else-if="activeComponentId === 'quick-menu-trigger'">
            <div
              class="w-full h-full overflow-y-auto p-4 md:p-8 bg-surface-100 flex flex-col items-center justify-start gap-6"
              dir="rtl"
            >
              <div
                v-if="activeStatusId === 'all-three-states'"
                class="w-full max-w-[760px] flex flex-col gap-6 py-4"
              >
                <div class="flex items-center justify-between px-1">
                  <span class="text-xs font-bold text-primary-80 font-dots-1"
                    >مقایسه همزمان ۳ استاتوس فیگما (Node 474:90421):</span
                  >
                  <BaseBadge type="secondary" size="2xs" style-type="soft"
                    >3 Variants Side-by-Side</BaseBadge
                  >
                </div>
                <div
                  class="w-full bg-white-60 backdrop-blur-md rounded-2xl p-6 border border-primary-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center"
                >
                  <div class="flex flex-col items-center gap-3">
                    <span
                      class="text-2xs font-bold text-primary-60 font-dots-1 bg-white-80 px-2.5 py-1 rounded-full border border-primary-8"
                      >۱. حالت عادی (Main)</span
                    >
                    <div
                      class="p-6 bg-surface-100 rounded-2xl border border-primary-12 flex items-center justify-center"
                    >
                      <QuickMenuTrigger variant="main" />
                    </div>
                  </div>
                  <div class="flex flex-col items-center gap-3">
                    <span
                      class="text-2xs font-bold text-primary-60 font-dots-1 bg-white-80 px-2.5 py-1 rounded-full border border-primary-8"
                      >۲. حالت هاور شناور (Hover)</span
                    >
                    <div
                      class="p-6 bg-surface-100 rounded-2xl border border-primary-12 flex items-center justify-center"
                    >
                      <QuickMenuTrigger variant="hover" />
                    </div>
                  </div>
                  <div class="flex flex-col items-center gap-3">
                    <span
                      class="text-2xs font-bold text-primary-60 font-dots-1 bg-white-80 px-2.5 py-1 rounded-full border border-primary-8"
                      >۳. حالت فعال / باز (Active)</span
                    >
                    <div
                      class="p-6 bg-surface-100 rounded-2xl border border-primary-12 flex items-center justify-center"
                    >
                      <QuickMenuTrigger variant="active" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="w-full max-w-[680px] flex flex-col gap-6 py-4">
                <div
                  class="w-full bg-white-60 backdrop-blur-md rounded-2xl p-6 border border-primary-8 flex flex-col items-center gap-6"
                >
                  <QuickMenuTrigger v-model:is-open="quickMenuOpen" />
                  <span class="text-xs font-dots-1 text-primary-60"
                    >کلیک کنید تا انیمیشن باز و بسته شدن منو را آزمایش کنید</span
                  >
                </div>
              </div>
            </div>
          </template>

          <!-- 1.20 DatePickerModal & InfoBoxCard -->
          <template v-else-if="activeComponentId === 'date-picker-modal'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div
                class="p-6 bg-white-80 rounded-2xl border border-primary-8 flex flex-col gap-4 items-center"
              >
                <BaseButton
                  variant="primary"
                  size="md"
                  startIcon="solar:calendar-date-bold-duotone"
                  @click="datePickerOpen = true"
                >
                  باز کردن مودال تقویم فارسی
                </BaseButton>
                <span class="text-xs font-mono text-primary-80"
                  >تاریخ انتخابی: {{ selectedDateVal }}</span
                >
                <DatePickerModal
                  v-model:is-open="datePickerOpen"
                  v-model="selectedDateVal"
                  label="انتخاب تاریخ فاکتور"
                />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'info-box-card'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-6"
              dir="rtl"
            >
              <div class="w-full max-w-md flex flex-col gap-4">
                <InfoBoxCard
                  title="اطلاعات فروشگاه و شعبه"
                  :status="activeStatusId === 'complete' ? 'complete' : 'incomplete'"
                  :percentage="activeStatusId === 'complete' ? 100 : 60"
                />
              </div>
            </div>
          </template>

          <!-- 1.21 BaseInlineDelete -->
          <template v-else-if="activeComponentId === 'base-inline-delete'">
            <div
              class="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center gap-8"
              dir="rtl"
            >
              <div class="text-center flex flex-col gap-1.5">
                <h2 class="text-base font-bold text-primary-100 font-dots-1">
                  کامپوننت کپسولی تایید حذف (BaseInlineDelete)
                </h2>
                <p class="text-xs text-primary-60 font-dots-1">
                  جایگزین نوآورانه مودال با کپسول افقی لایت پریمری، آیکون قرمز ۲۴px و انیمیشن روان
                  به سمت راست
                </p>
              </div>

              <!-- Status: Interactive -->
              <div
                v-if="activeStatusId === 'interactive'"
                class="flex flex-col items-center gap-4 p-8 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8 max-w-md w-full"
              >
                <div
                  class="flex items-center justify-between w-full p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80"
                    >تست حذف ردیف با تایمر ۳ ثانیه‌ای:</span
                  >
                  <BaseInlineDelete
                    tooltip="حذف کاربر"
                    confirm-text="آیا مطمئنید؟"
                    :timeout="3000"
                    @confirm="handleInlineDeleteSandboxDemo"
                  />
                </div>
                <span
                  v-if="inlineDeleteDemoToast"
                  class="text-2xs font-bold text-success-100 font-dots-1"
                >
                  {{ inlineDeleteDemoToast }}
                </span>
                <span v-else class="text-2xs text-primary-40 font-dots-1">
                  روی آیکون سطل زباله کلیک کنید تا کپسول به سمت راست باز شود.
                </span>
              </div>

              <!-- Status: Timeouts -->
              <div
                v-else-if="activeStatusId === 'timeouts'"
                class="flex flex-col gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8 max-w-lg w-full"
              >
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80">تایمر سریع (۱.۵ ثانیه):</span>
                  <BaseInlineDelete
                    tooltip="حذف سریع"
                    confirm-text="مطمئنید؟"
                    :timeout="1500"
                    @confirm="handleInlineDeleteSandboxDemo"
                  />
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80"
                    >تایمر استاندارد (۳ ثانیه):</span
                  >
                  <BaseInlineDelete
                    tooltip="حذف استاندارد"
                    confirm-text="آیا مطمئنید؟"
                    :timeout="3000"
                    @confirm="handleInlineDeleteSandboxDemo"
                  />
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80">تایمر طولانی (۵ ثانیه):</span>
                  <BaseInlineDelete
                    tooltip="حذف ۵ ثانیه‌ای"
                    confirm-text="حذف نهایی؟"
                    :timeout="5000"
                    @confirm="handleInlineDeleteSandboxDemo"
                  />
                </div>
              </div>

              <!-- Status: Disabled -->
              <div
                v-else-if="activeStatusId === 'disabled'"
                class="flex items-center justify-center gap-4 p-8 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8"
              >
                <div class="flex items-center gap-3">
                  <span class="text-xs font-dots-1 text-primary-60">وضعیت غیرفعال:</span>
                  <BaseInlineDelete disabled tooltip="غیرقابل حذف" />
                </div>
              </div>

              <!-- Status: Approve (check icon + «تایید شود؟») -->
              <div
                v-else-if="activeStatusId === 'approve'"
                class="flex flex-col gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8 max-w-lg w-full"
              >
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80">نسخه مستقیم با variant:</span>
                  <BaseInlineDelete
                    variant="approve"
                    tooltip="تایید فاکتور"
                    confirm-text="تایید شود؟"
                    :timeout="3000"
                    @confirm="handleInlineApproveSandboxDemo"
                  />
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80"
                    >کامپوننت آماده BaseInlineApprove:</span
                  >
                  <BaseInlineApprove
                    tooltip="تایید فاکتور"
                    confirm-text="تایید شود؟"
                    :timeout="3000"
                    @confirm="handleInlineApproveSandboxDemo"
                  />
                </div>
                <span
                  v-if="inlineApproveDemoToast"
                  class="text-2xs font-bold text-success-100 font-dots-1 text-center"
                >
                  {{ inlineApproveDemoToast }}
                </span>
                <span v-else class="text-2xs text-primary-40 font-dots-1 text-center">
                  روی آیکون تیک کلیک کنید تا کپسول سبز «تایید شود؟» باز شود.
                </span>
              </div>

              <!-- Status: Undo (restart icon + previous status label) -->
              <div
                v-else-if="activeStatusId === 'undo'"
                class="flex flex-col gap-4 p-6 bg-white-60 backdrop-blur-md rounded-2xl border border-primary-8 max-w-lg w-full"
              >
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80">نسخه مستقیم با variant:</span>
                  <BaseInlineDelete
                    variant="undo"
                    tooltip="لغو تایید و بازگشت"
                    confirm-text="بازگشت به پیش‌نویس؟"
                    :timeout="3000"
                    @confirm="handleInlineUndoSandboxDemo"
                  />
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80"
                    >کامپوننت آماده با target-label:</span
                  >
                  <BaseInlineUndo
                    target-label="پیش‌نویس"
                    tooltip="لغو تایید و بازگشت"
                    :timeout="3000"
                    @confirm="handleInlineUndoSandboxDemo"
                  />
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white-80 rounded-xl border border-primary-6"
                >
                  <span class="text-xs font-dots-1 text-primary-80">وضعیت قبلی سفارشی:</span>
                  <BaseInlineUndo
                    target-label="وضعیت بررسی"
                    tooltip="لغو تایید و بازگشت"
                    :timeout="3000"
                    @confirm="handleInlineUndoSandboxDemo"
                  />
                </div>
                <span
                  v-if="inlineUndoDemoToast"
                  class="text-2xs font-bold text-warning-100 font-dots-1 text-center"
                >
                  {{ inlineUndoDemoToast }}
                </span>
                <span v-else class="text-2xs text-primary-40 font-dots-1 text-center">
                  روی آیکون بازگشت کلیک کنید تا کپسول «بازگشت به ...؟» باز شود.
                </span>
              </div>
            </div>
          </template>

          <!-- ======================================================== -->
          <!-- 2. DOMAIN & COMPOSITE MODULES                            -->
          <!-- ======================================================== -->

          <!-- 2.0 FinancialKeypad Module -->
          <template v-else-if="activeComponentId === 'financial-keypad'">
            <div class="h-full w-full overflow-y-auto">
              <FinancialKeypadSandboxView :status-id="activeStatusId" />
            </div>
          </template>

          <!-- 2.0 Inventory Module -->
          <template v-else-if="activeComponentId === 'inventory-management'">
            <div class="h-full w-full overflow-y-auto">
              <InventorySandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.1 Treasury Module -->
          <template v-else-if="activeComponentId === 'treasury-management'">
            <div class="h-full w-full overflow-y-auto">
              <TreasurySandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.1b Cheques Module -->
          <template v-else-if="activeComponentId === 'cheques-management'">
            <div class="h-full w-full overflow-y-auto">
              <ChequesSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.2 Members Module -->
          <template v-else-if="activeComponentId === 'members-management'">
            <div class="h-full w-full overflow-y-auto">
              <MembersSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.3 Accounts Module -->
          <template v-else-if="activeComponentId === 'accounts-management'">
            <div class="h-full w-full overflow-y-auto">
              <AccountsSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.4 Settings Module (businesses & fiscal years test bench) -->
          <template v-else-if="activeComponentId === 'settings-management'">
            <div class="h-full w-full overflow-y-auto">
              <SettingsLegacySandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.5 Ledger Sandbox -->
          <template v-else-if="activeComponentId === 'ledger-sandbox'">
            <div class="h-full w-full overflow-y-auto">
              <LedgerSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.5b Sales Module -->
          <template v-else-if="activeComponentId === 'sales-management'">
            <div class="h-full w-full overflow-y-auto">
              <SalesSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.5c Badges & Tags Module -->
          <template v-else-if="activeComponentId === 'badges-management'">
            <div class="h-full w-full overflow-y-auto">
              <BadgeSandboxView :key="activeStatusId" />
            </div>
          </template>

          <!-- 2.5d Profile Module (per-tab statuses) -->
          <template v-else-if="activeComponentId === 'profile-management'">
            <div class="h-full w-full overflow-y-auto">
              <SettingsSandboxView
                :key="activeStatusId"
                :initial-tab="['profile', 'business', 'team', 'invoice', 'subscription'].includes(activeStatusId) ? activeStatusId : 'profile'"
              />
            </div>
          </template>

          <!-- 2.6 Login Flow -->
          <template v-else-if="activeComponentId === 'login-interactive-flow'">
            <div class="h-full w-full overflow-y-auto">
              <LoginView
                :key="activeStatusId"
                :initialStep="activeStatusId === 'step-2' ? 'otp' : 'phone'"
                :initialLoading="activeStatusId === 'loading'"
              />
            </div>
          </template>

          <!-- 2.7 Layout Headers & Sidebars -->
          <template v-else-if="activeComponentId === 'page-header'">
            <div class="w-full h-full p-6 bg-surface-100" dir="rtl">
              <PageHeader
                title="داشبورد مالی و حسابداری"
                subtitle="خلاصه‌ای از اسناد، مانده‌ها و تراکنش‌های اخیر"
              />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'business-selector-dropdown'">
            <div
              class="w-full h-full p-8 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <BusinessSelectorDropdown />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'user-profile-dropdown'">
            <div
              class="w-full h-full p-8 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <UserProfileDropdown />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'app-sidebar'">
            <div class="h-full w-full flex justify-start items-stretch" dir="rtl">
              <AppSidebar class="shrink-0" :isCollapsed="activeStatusId === 'collapsed'" />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'app-header'">
            <div class="w-full h-full flex flex-col" dir="rtl">
              <AppHeader class="border-b border-primary-12" />
              <div
                class="flex-1 p-6 flex items-center justify-center text-primary-60 text-xs font-dots-1"
              >
                محتوای نمونه فضای کاری اصلی حسابرو وان (وضعیت فعلی هدر: {{ currentStatus?.label }})
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'app-secondary-sidebar'">
            <div class="h-full w-full flex justify-start items-stretch" dir="rtl">
              <AppSecondarySidebar />
            </div>
          </template>

          <!-- 2.8 Onboard Cards -->
          <template v-else-if="activeComponentId === 'shop-info-card'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-lg">
                <ShopInfoCard :isOpen="activeStatusId === 'open'" />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'personal-info-card'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-lg">
                <PersonalInfoCard :isOpen="activeStatusId === 'open'" />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'fiscal-year-card'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-lg">
                <FiscalYearCard :isOpen="activeStatusId === 'open'" />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'onboarding-modal'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <OnboardingModal :isOpen="true" />
            </div>
          </template>

          <!-- 2.9 Account Components -->
          <template v-else-if="activeComponentId === 'create-account-card'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-lg">
                <CreateAccountCard
                  :type="
                    activeStatusId === 'expense'
                      ? 'expense'
                      : activeStatusId === 'income'
                        ? 'income'
                        : 'person'
                  "
                />
              </div>
            </div>
          </template>

          <!-- 2.10 Document Components -->
          <template v-else-if="activeComponentId === 'create-document-modal'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <CreateDocumentModal :isOpen="true" />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'documents-table'">
            <div class="h-full w-full overflow-y-auto p-4 md:p-6 bg-surface-100">
              <DocumentsTable :loading="activeStatusId === 'loading'" />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'document-row-mobile'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-sm">
                <DocumentRowMobile :row="sampleMobileRow" />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'create-document-mobile'">
            <div class="h-full w-full overflow-y-auto p-4 bg-surface-100">
              <CreateDocumentMobile />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'document-details-modal'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <DocumentDetailsModal :isOpen="true" />
            </div>
          </template>

          <!-- 2.11 Dashboard Components -->
          <template v-else-if="activeComponentId === 'dashboard-data-grid'">
            <div class="h-full w-full overflow-y-auto p-4 md:p-6 bg-surface-100">
              <DashboardDataGrid :key="activeStatusId" />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'dashboard-kpi-cards'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <DashboardCard
                  title="فروش ماه جاری"
                  value="۱,۴۵۰,۰۰۰,۰۰۰"
                  change="+۱۲.۵٪"
                  icon="solar:chart-2-bold-duotone"
                />
                <DashboardCard
                  title="مطالبات وصول نشده"
                  value="۳۲۰,۰۰۰,۰۰۰"
                  change="-۳.۲٪"
                  icon="solar:wallet-money-bold-duotone"
                />
                <DashboardCard
                  title="هزینه‌های عملیاتی"
                  value="۲۱۰,۰۰۰,۰۰۰"
                  change="+۱.۸٪"
                  icon="solar:bag-heart-bold-duotone"
                />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'dashboard-bar-chart'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-2xl bg-white-80 p-6 rounded-2xl border border-primary-8">
                <DashboardCompareBarChart />
              </div>
            </div>
          </template>

          <template v-else-if="activeComponentId === 'dashboard-pie-donut-charts'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-md bg-white-80 p-6 rounded-2xl border border-primary-8">
                <DashboardPaymentPieChart />
              </div>
            </div>
          </template>

          <!-- 2.12 Transaction & Treasury Modals -->
          <template v-else-if="activeComponentId === 'transaction-form-modal'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <TransactionFormModal
                :isOpen="true"
                :mode="
                  activeStatusId === 'payment'
                    ? 'payment'
                    : activeStatusId === 'expense'
                      ? 'expense'
                      : 'receive'
                "
              />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'treasury-line-item-modal'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <TreasuryLineItemModal
                :isOpen="true"
                :initial-mode="
                  activeStatusId === 'payment'
                    ? 'payment'
                    : activeStatusId === 'expense'
                      ? 'expense'
                      : 'receive'
                "
                :mode="treasuryStore.previewViewMode"
              />
            </div>
          </template>

          <template v-else-if="activeComponentId === 'business-card'">
            <div
              class="w-full h-full p-6 flex items-center justify-center bg-surface-100"
              dir="rtl"
            >
              <div class="w-full max-w-md">
                <BusinessCard :business="sampleBusinessData" />
              </div>
            </div>
          </template>

          <!-- ======================================================== -->
          <!-- 3. FULL APP PAGES (Directly Rendering Real Views)         -->
          <!-- ======================================================== -->
          <!-- 3.1 Home Dashboard Page -->
          <template v-else-if="activeComponentId === 'page-home'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <HomeView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <HomeView />
            </div>
          </template>

          <!-- 3.2 Login View (Blank Layout in App) -->
          <template v-else-if="activeComponentId === 'page-login'">
            <div class="h-full w-full overflow-y-auto">
              <LoginView
                :key="activeStatusId"
                :initialStep="activeStatusId === 'step-2' ? 'otp' : 'phone'"
              />
            </div>
          </template>

          <!-- 3.3 Treasury Page -->
          <template v-else-if="activeComponentId === 'page-treasury'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <TreasuryView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <TreasuryView />
            </div>
          </template>

          <!-- 3.4 Documents Page -->
          <template v-else-if="activeComponentId === 'page-documents'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <DocumentsView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <DocumentsView />
            </div>
          </template>

          <!-- 3.5 Accounts Page -->
          <template v-else-if="activeComponentId === 'page-accounts'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <AccountsView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <AccountsView />
            </div>
          </template>

          <!-- 3.6 Turnover Page -->
          <template v-else-if="activeComponentId === 'page-turnover'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <TurnoverView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <TurnoverView />
            </div>
          </template>

          <!-- 3.7 Account Ledger Page -->
          <template v-else-if="activeComponentId === 'page-ledger'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <AccountLedgerView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <AccountLedgerView />
            </div>
          </template>

          <!-- 3.8 Users Management Page -->
          <template v-else-if="activeComponentId === 'page-users'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <UsersView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <UsersView />
            </div>
          </template>

          <!-- 3.9 Onboarding Page (Blank Layout in App) -->
          <template v-else-if="activeComponentId === 'page-onboarding'">
            <div class="h-full w-full overflow-y-auto">
              <OnboardingView />
            </div>
          </template>

          <!-- 3.10 Businesses Settings Page -->
          <template v-else-if="activeComponentId === 'page-businesses'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <BusinessesView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <BusinessesView />
            </div>
          </template>

          <!-- 3.11 Fiscal Years Settings Page -->
          <template v-else-if="activeComponentId === 'page-fiscal-years'">
            <div v-if="pageLayoutMode === 'shell'" class="h-full w-full overflow-hidden">
              <AppLayout>
                <FiscalYearsView />
              </AppLayout>
            </div>
            <div v-else class="h-full w-full overflow-y-auto bg-surface-100">
              <FiscalYearsView />
            </div>
          </template>

          <!-- Default Fallback -->
          <template v-else>
            <div
              class="h-full w-full flex items-center justify-center text-primary-60 text-xs font-dots-1 p-6 text-center"
            >
              کامپوننت انتخاب شده در حال آماده‌سازی برای رندر است.
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type {
  ViewportId,
  HeightId,
  CanvasBgType,
  ComponentRegistryItem,
  ViewportItem,
  HeightItem,
} from '../types/sandbox'
import type { BusinessItem } from '@/types/settings'
import type { DocumentRowItem } from '@/components/document/DocumentRowMobile.vue'

// Base UI Components (src/components/ui/ & src/components/base/)
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import BaseDropdownItem from '@/components/ui/BaseDropdownItem.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseSelectItem from '@/components/ui/BaseSelectItem.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseBadgeField from '@/components/ui/BaseBadgeField.vue'
import type { BadgeItem, BadgeColorToken } from '@/types/badge'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseRadio from '@/components/ui/BaseRadio.vue'
import BaseChip from '@/components/ui/BaseChip.vue'
import BaseBottomSurface from '@/components/ui/BaseBottomSurface.vue'
import BaseInnerHeader from '@/components/ui/BaseInnerHeader.vue'
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'
import BaseTabPill from '@/components/ui/BaseTabPill.vue'
import BaseSegmentedTabs from '@/components/ui/BaseSegmentedTabs.vue'
import BaseToast from '@/components/ui/BaseToast.vue'
import { useToast } from '@/composables/useToast'
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import CardLoadingOverlay from '@/components/ui/CardLoadingOverlay.vue'
import SelectAllPill from '@/components/ui/SelectAllPill.vue'
import SidebarItem from '@/components/ui/SidebarItem.vue'
import SidebarItemBadge from '@/components/ui/SidebarItemBadge.vue'
import QuickActionButton from '@/components/ui/QuickActionButton.vue'
import QuickMenuTrigger from '@/components/ui/QuickMenuTrigger.vue'
import BaseInlineDelete from '@/components/ui/BaseInlineDelete.vue'
import BaseInlineApprove from '@/components/ui/BaseInlineApprove.vue'
import BaseInlineUndo from '@/components/ui/BaseInlineUndo.vue'
import DatePickerModal from '@/components/base/DatePickerModal.vue'
import InfoBoxCard from '@/components/base/InfoBoxCard.vue'

// Layout Components
import PageHeader from '@/components/layout/PageHeader.vue'
import BusinessSelectorDropdown from '@/components/layout/BusinessSelectorDropdown.vue'
import UserProfileDropdown from '@/components/layout/UserProfileDropdown.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSecondarySidebar from '@/components/layout/AppSecondarySidebar.vue'

// Onboard & Account Components
import ShopInfoCard from '@/components/onboard/ShopInfoCard.vue'
import PersonalInfoCard from '@/components/onboard/PersonalInfoCard.vue'
import FiscalYearCard from '@/components/onboard/FiscalYearCard.vue'
import OnboardingModal from '@/components/onboard/OnboardingModal.vue'
import CreateAccountCard from '@/components/account/CreateAccountCard.vue'

// Document Components
import CreateDocumentModal from '@/components/document/CreateDocumentModal.vue'
import DocumentsTable from '@/components/document/DocumentsTable.vue'
import DocumentRowMobile from '@/components/document/DocumentRowMobile.vue'
import CreateDocumentMobile from '@/components/document/CreateDocumentMobile.vue'
import DocumentDetailsModal from '@/components/document/DocumentDetailsModal.vue'

// Dashboard & Transaction Components
import DashboardDataGrid from '@/components/dashboard/DashboardDataGrid.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import DashboardCompareBarChart from '@/components/dashboard/DashboardCompareBarChart.vue'
import DashboardPaymentPieChart from '@/components/dashboard/DashboardPaymentPieChart.vue'
import TransactionFormModal from '@/components/transaction/TransactionFormModal.vue'
import TreasuryLineItemModal from '@/components/treasury/TreasuryLineItemModal.vue'
import BusinessCard from '@/components/settings/BusinessCard.vue'

// Domain Sandbox Views
import InventorySandboxView from '@/views/sandbox/InventorySandboxView.vue'
import TreasurySandboxView from '@/views/sandbox/TreasurySandboxView.vue'
import ChequesSandboxView from '@/views/sandbox/ChequesSandboxView.vue'
import MembersSandboxView from '@/views/sandbox/MembersSandboxView.vue'
import AccountsSandboxView from '@/views/sandbox/AccountsSandboxView.vue'
import SettingsSandboxView from '@/views/sandbox/SettingsSandboxView.vue'
import SettingsLegacySandboxView from '@/views/sandbox/SettingsLegacySandboxView.vue'
import LedgerSandboxView from '@/views/sandbox/LedgerSandboxView.vue'
import SalesSandboxView from '@/views/sandbox/SalesSandboxView.vue'
import BadgeSandboxView from '@/views/sandbox/BadgeSandboxView.vue'
import FinancialKeypadSandboxView from '@/views/sandbox/FinancialKeypadSandboxView.vue'

// Full Application Pages
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TreasuryView from '@/views/TreasuryView.vue'
import DocumentsView from '@/views/DocumentsView.vue'
import AccountsView from '@/views/AccountsView.vue'
import TurnoverView from '@/views/TurnoverView.vue'
import AccountLedgerView from '@/views/AccountLedgerView.vue'
import UsersView from '@/views/UsersView.vue'
import OnboardingView from '@/views/OnboardingView.vue'
import BusinessesView from '@/views/settings/BusinessesView.vue'
import FiscalYearsView from '@/views/settings/FiscalYearsView.vue'
import AppLayout from '@/components/layout/AppLayout.vue'

import { useTreasurySandboxStore } from '@/stores/treasurySandbox'

const treasuryStore = useTreasurySandboxStore()

const props = defineProps<{
  activeComponent?: ComponentRegistryItem
  activeComponentId: string
  activeStatusId: string
  activeViewport: ViewportId
  activeHeight: HeightId
  canvasBg: CanvasBgType
  viewports: ViewportItem[]
  heightOptions: HeightItem[]
}>()

// Page Layout Mode: 'shell' (Full AppLayout with AppSidebar & AppHeader) vs 'content' (Only View Content)
const pageLayoutMode = ref<'shell' | 'content'>('shell')

const inlineDeleteDemoToast = ref('')
const handleInlineDeleteSandboxDemo = () => {
  inlineDeleteDemoToast.value = 'عملیات حذف با موفقیت تایید شد!'
  toast.error('عملیات حذف با موفقیت تایید شد!', {
    title: 'عملیات حذف',
    icon: 'solar:trash-bin-trash-bold-duotone',
  })
  setTimeout(() => {
    inlineDeleteDemoToast.value = ''
  }, 2500)
}

const inlineApproveDemoToast = ref('')
const handleInlineApproveSandboxDemo = () => {
  inlineApproveDemoToast.value = 'عملیات با موفقیت تایید شد!'
  toast.success('عملیات با موفقیت تایید شد!', {
    title: 'تایید عملیات',
    icon: 'solar:check-circle-bold-duotone',
  })
  setTimeout(() => {
    inlineApproveDemoToast.value = ''
  }, 2500)
}

const inlineUndoDemoToast = ref('')
const handleInlineUndoSandboxDemo = () => {
  inlineUndoDemoToast.value = 'وضعیت با موفقیت به مرحله قبلی بازگشت!'
  toast.warning('وضعیت با موفقیت به مرحله قبلی بازگشت!', {
    title: 'بازگشت عملیات',
    icon: 'solar:restart-bold',
  })
  setTimeout(() => {
    inlineUndoDemoToast.value = ''
  }, 2500)
}

// ==========================================================
// BASE TOAST SANDBOX INTERACTIVE PLAYGROUND & ANIMATION
// ==========================================================
const toastSandboxKey = ref(0)
const toastSandboxVisible = ref(true)
const toastSandboxDuration = ref(4000)
const toastSandboxStyleType = ref<'glass' | 'soft' | 'fill' | 'outline'>('glass')
const toastSandboxType = ref<'success' | 'error' | 'warning' | 'info' | 'primary'>('success')
const toastSandboxSize = ref<'sm' | 'md' | 'lg'>('md')
const toastSandboxClosable = ref(true)
const toastSandboxShowProgress = ref(true)

const triggerToastAnimation = () => {
  toastSandboxVisible.value = false
  setTimeout(() => {
    toastSandboxKey.value++
    toastSandboxVisible.value = true
  }, 100)
}

// Separated Props for Desktop InnerHeader Demo
const desktopInnerHeaderProps = reactive({
  title: 'لیست فاکتورها و اسناد',
  parentTitle: 'ماژول خزانه و دریافت',
  parentPath: '/treasury',
  showHome: true,
  showSearch: true,
  searchPlaceholder: 'جستجو در اسناد (دسکتاپ)...',
  searchLabel: 'جستجو',
  searchTooltip: 'جستجوی سریع دسکتاپ',
  floatingSearch: false,
  mobileFloatingSearch: false,
  showCreate: true,
  createLabel: 'سند جدید',
  showFilter: true,
  filterLabel: 'فیلترها',
  filterActive: false,
  showMenu: true,
})

// Separated Props for Mobile InnerHeader Demo
const mobileInnerHeaderProps = reactive({
  title: 'اسناد دریافتنی',
  parentTitle: 'خزانه',
  parentPath: '/treasury',
  showHome: true,
  showSearch: true,
  searchPlaceholder: 'جستجوی شناور موبایل...',
  searchLabel: 'جستجو',
  searchTooltip: 'جستجوی شناور موبایل',
  floatingSearch: true,
  mobileFloatingSearch: true,
  searchEmptyText: 'سندی با این مشخصات یافت نشد',
  searchLoading: false,
  showCreate: true,
  createLabel: 'ایجاد',
  showFilter: true,
  filterLabel: 'فیلتر',
  filterActive: false,
  showMenu: true,
})

const innerHeaderSearchResults = [
  {
    id: '1',
    title: 'فاکتور شماره ۱۰۸۴',
    subtitle: '۱۲۵,۰۰۰,۰۰۰ ریال',
    badge: 'تسویه شده',
    badgeType: 'success' as const,
    icon: 'solar:bill-list-bold-duotone',
  },
  {
    id: '2',
    title: 'شرکت مهندسی رایان',
    subtitle: 'کد حساب: ۱۰۲-۳۰۴',
    badge: 'بدهکار',
    badgeType: 'error' as const,
    icon: 'solar:user-bold-duotone',
  },
  {
    id: '3',
    title: 'چک دریافتنی ۴۴۸۹۲۰',
    subtitle: 'سررسید: ۱۴۰۳/۰۸/۱۵',
    badge: 'در انتظار وصول',
    badgeType: 'warning' as const,
    icon: 'solar:card-recive-bold-duotone',
  },
  {
    id: '4',
    title: 'سند افتتاحیه سال ۱۴۰۳',
    subtitle: 'شماره سند: ۱',
    badge: 'تایید نهایی',
    badgeType: 'info' as const,
    icon: 'solar:document-text-bold-duotone',
  },
  {
    id: '5',
    title: 'قطعات الکترونیک انبار',
    subtitle: '۳۴۰ قلم کالا',
    badge: 'فعال',
    badgeType: 'primary' as const,
    icon: 'solar:box-minimalistic-bold-duotone',
  },
]

const toast = useToast()

const handleInnerHeaderResultSelect = (item: any) => {
  toast.success(`آیتم «${item.title}» با موفقیت انتخاب شد`, {
    title: 'نتیجه جستجو',
    icon: item.icon || 'solar:check-circle-bold-duotone',
  })
}

const handleInnerHeaderCreate = (mode: 'desktop' | 'mobile') => {
  toast.info(`کلیک روی دکمه ایجاد (${mode === 'desktop' ? 'دسکتاپ' : 'موبایل'})`, {
    title: 'عملیات هدر داخلی',
    icon: 'solar:add-bold',
  })
}

const handleInnerHeaderFilter = (mode: 'desktop' | 'mobile') => {
  toast.primary(`کلیک روی دکمه فیلتر (${mode === 'desktop' ? 'دسکتاپ' : 'موبایل'})`, {
    title: 'عملیات هدر داخلی',
    icon: 'solar:filter-bold-duotone',
  })
}

const handleInnerHeaderMenu = (mode: 'desktop' | 'mobile') => {
  toast.info(`کلیک روی دکمه منو / عملیات بیشتر (${mode === 'desktop' ? 'دسکتاپ' : 'موبایل'})`, {
    title: 'عملیات هدر داخلی',
    icon: 'solar:menu-dots-bold',
  })
}

const handleInnerHeaderSearchSubmit = (query: string, mode: 'desktop' | 'mobile') => {
  toast.success(`جستجو برای عبارت «${query}» ثبت شد`, {
    title: `جستجوی ${mode === 'desktop' ? 'دسکتاپ' : 'موبایل'}`,
    icon: 'solar:magnifer-bold-duotone',
  })
}

const isPageActive = computed(() => {
  return (
    props.activeComponent?.category === 'pages' &&
    props.activeComponentId !== 'page-login' &&
    props.activeComponentId !== 'page-onboarding'
  )
})

// ==========================================================
// DESIGN SYSTEM TOKEN STATES & HELPERS
// ==========================================================
const opacities = ['100', '80', '60', '40', '32', '24', '12', '8', '6', '1', '0']

const isHesabroThemeActive = ref(true)
const toggleHesabroTheme = () => {
  isHesabroThemeActive.value = !isHesabroThemeActive.value
  if (isHesabroThemeActive.value) {
    document.documentElement.setAttribute('data-theme', 'hesabro')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

const copyTokenClass = (token: string, label: string = 'کلاس توکن') => {
  navigator.clipboard.writeText(token)
}

const hesabroColorsList: Record<string, { hex: string; label: string }> = {
  'hesabro-primary': { hex: '#2D424C', label: 'Hesabro Primary (سرمه‌ای دودی)' },
  'hesabro-secondary': { hex: '#287D9D', label: 'Hesabro Secondary (آبی دریایی)' },
  'hesabro-accent': { hex: '#689975', label: 'Hesabro Accent (سبز یشم)' },
  'hesabro-surface': { hex: '#DAF1F8', label: 'Hesabro Surface (فیروزه‌ای ملایم)' },
}

const displayedHesabroColors = computed(() => {
  if (props.activeStatusId === 'primary') {
    return { 'hesabro-primary': hesabroColorsList['hesabro-primary'] }
  }
  if (props.activeStatusId === 'secondary') {
    return { 'hesabro-secondary': hesabroColorsList['hesabro-secondary'] }
  }
  if (props.activeStatusId === 'accent') {
    return { 'hesabro-accent': hesabroColorsList['hesabro-accent'] }
  }
  if (props.activeStatusId === 'surface') {
    return { 'hesabro-surface': hesabroColorsList['hesabro-surface'] }
  }
  return hesabroColorsList
})

const pandoraColorsList: Record<string, { hex: string }> = {
  primary: { hex: '#49406d' },
  secondary: { hex: '#b84279' },
  accent: { hex: '#186d7a' },
  info: { hex: '#2590b8' },
  success: { hex: '#41a375' },
  warning: { hex: '#b88c49' },
  error: { hex: '#b84242' },
  black: { hex: '#282828' },
  white: { hex: '#ffffff' },
  surface: { hex: '#f6f6f6' },
}

const displayedPandoraColors = computed(() => {
  if (props.activeStatusId === 'brand') {
    return {
      primary: pandoraColorsList.primary,
      secondary: pandoraColorsList.secondary,
      accent: pandoraColorsList.accent,
    }
  }
  if (props.activeStatusId === 'status-colors') {
    return {
      info: pandoraColorsList.info,
      success: pandoraColorsList.success,
      warning: pandoraColorsList.warning,
      error: pandoraColorsList.error,
    }
  }
  if (props.activeStatusId === 'neutrals') {
    return {
      black: pandoraColorsList.black,
      white: pandoraColorsList.white,
      surface: pandoraColorsList.surface,
    }
  }
  return pandoraColorsList
})

const shouldUseWhiteText = (color: string, opacity: string) => {
  const op = parseInt(opacity)
  if (color === 'white' || color === 'surface') return false
  return op >= 60
}

// Typography Token State
const sampleTypographyText = ref('دیزاین سیستم مدیریت یکپارچه حسابرو با قلم استاندارد IRANYekanXVF')
const typographyWeight = ref(500)
const typographySize = ref(16)
const typographyDots = ref(1)

const fontSizes = [
  { name: '2xs', px: 10, cssVal: '10px', label: 'بسیار ریز (2xs)' },
  { name: 'xs', px: 12, cssVal: '12px', label: 'کپشن و برچسب (xs)' },
  { name: 'sm', px: 14, cssVal: '14px', label: 'متن بدنه فرعی (sm)' },
  { name: 'base', px: 16, cssVal: '16px', label: 'متن اصلی سیستم (base)' },
  { name: 'lg', px: 18, cssVal: '18px', label: 'زیر عنوان‌ها (lg)' },
  { name: 'xl', px: 20, cssVal: '20px', label: 'عنوان کارت‌ها (xl)' },
  { name: '2xl', px: 24, cssVal: '24px', label: 'عنوان‌های اصلی (2xl)' },
  { name: '3xl', px: 32, cssVal: '32px', label: 'عنوان صفحه بزرگ (3xl)' },
]

// Solar Icons State
const iconSearchQuery = ref('')
const iconPreviewDimension = ref(32)
const iconPreviewColor = ref('primary-100')

const solarIconsList = [
  'solar:home-smile-bold-duotone',
  'solar:user-circle-bold-duotone',
  'solar:settings-bold-duotone',
  'solar:bell-bing-bold-duotone',
  'solar:heart-bold-duotone',
  'solar:bag-3-bold-duotone',
  'solar:shield-check-bold-duotone',
  'solar:map-point-bold-duotone',
  'solar:camera-bold-duotone',
  'solar:rocket-bold-duotone',
  'solar:chat-dot-round-bold-duotone',
  'solar:card-transfer-bold-duotone',
  'solar:magnifer-bold-duotone',
  'solar:trash-bin-trash-bold-duotone',
  'solar:calendar-date-bold-duotone',
  'solar:document-text-bold-duotone',
  'solar:chart-square-bold-duotone',
  'solar:logout-bold-duotone',
  'solar:phone-calling-bold-duotone',
  'solar:share-circle-bold-duotone',
]

const filteredSolarIcons = computed(() => {
  if (!iconSearchQuery.value) return solarIconsList
  const q = iconSearchQuery.value.toLowerCase()
  return solarIconsList.filter((icon) => icon.toLowerCase().includes(q))
})

// Radius List
const radiusList = [
  { name: 'none', px: '0px', cssVal: '0px' },
  { name: 'sm', px: '2px', cssVal: '2px' },
  { name: 'default', px: '4px', cssVal: '4px' },
  { name: 'md', px: '6px', cssVal: '6px' },
  { name: 'lg', px: '8px', cssVal: '8px' },
  { name: '2lg', px: '10px', cssVal: '10px' },
  { name: 'xl', px: '12px', cssVal: '12px' },
  { name: '2xl', px: '16px', cssVal: '16px' },
  { name: '3xl', px: '20px', cssVal: '20px' },
  { name: '4xl', px: '24px', cssVal: '24px' },
  { name: 'full', px: '999px', cssVal: '999px' },
]

const displayedRadiusList = computed(() => {
  if (props.activeStatusId === 'rounded-cards') {
    return radiusList.filter((r) => ['md', 'lg', '2xl', '3xl'].includes(r.name))
  }
  if (props.activeStatusId === 'rounded-pills') {
    return radiusList.filter((r) => ['full'].includes(r.name))
  }
  return radiusList
})

// Spacings List & Inspect Simulator
const spacingsList = [
  { name: '0.5', px: '2px' },
  { name: '1', px: '4px' },
  { name: '1.5', px: '6px' },
  { name: '2', px: '8px' },
  { name: '2.5', px: '10px' },
  { name: '3', px: '12px' },
  { name: '3.5', px: '14px' },
  { name: '4', px: '16px' },
  { name: '5', px: '20px' },
  { name: '6', px: '24px' },
  { name: '7', px: '28px' },
  { name: '8', px: '32px' },
  { name: '9', px: '40px' },
  { name: '10', px: '48px' },
]

const isInspectSimulatorActive = ref(false)
const hoveredInspectElem = ref<'card' | 'profile' | 'actions' | null>(null)

const setHoveredInspect = (elem: 'card' | 'profile' | 'actions') => {
  if (!isInspectSimulatorActive.value) return
  hoveredInspectElem.value = elem
}

const clearHoveredInspect = () => {
  hoveredInspectElem.value = null
}

// Watch activeStatusId for tokens to synchronize interactive controls automatically
watch(
  () => props.activeStatusId,
  (newStatus: string) => {
    if (props.activeComponentId === 'tokens-typography') {
      if (newStatus === 'dots-0') typographyDots.value = 0
      else if (newStatus === 'dots-1') typographyDots.value = 1
      else if (newStatus === 'dots-2') typographyDots.value = 2
    } else if (props.activeComponentId === 'tokens-icons') {
      if (newStatus === 'primary-color') iconPreviewColor.value = 'primary-100'
      else if (newStatus === 'accent-color') iconPreviewColor.value = 'accent-100'
      else if (newStatus === 'large-size') iconPreviewDimension.value = 48
    } else if (props.activeComponentId === 'tokens-spacings') {
      if (newStatus === 'figma-inspect-card') isInspectSimulatorActive.value = true
      else if (newStatus === 'spacing-scale') isInspectSimulatorActive.value = false
    } else if (props.activeComponentId === 'base-segmented-tabs') {
      if (newStatus === 'card' || newStatus === 'list') mockSegmentedMode.value = newStatus
    }
  },
)

// Mock Reactive States
const mockInputText = ref('')
const mockInputPhone = ref('')
const mockInputSearch = ref('')
const mockInputAmount = ref('')
const mockInputError = ref('123')
const mockInputIban = ref('IR120120000000001234567890')
const mockInputCard = ref('6037-9918-1234-5678')

const mockDropdownValue = ref('')
const mockDropdownOptions = [
  { id: 'acc_1', label: 'حساب جاری بانک ملت - شعبه مرکزی', value: '101' },
  { id: 'acc_2', label: 'صندوق نقدی فروشگاه', value: '102' },
  { id: 'acc_3', label: 'تنخواه‌گردان مدیریت', value: '103' },
  { id: 'acc_4', label: 'حساب قرض‌الحسنه رسالت', value: '104' },
]

const mockSelectVal = ref('branch-1')
const mockSwitchVal = ref(true)
const mockCheckboxVal = ref(true)
const mockRadioVal = ref('retail')
const mockSelectAll = ref(false)
const mockSelectCount = ref(0)

const canvasSelectedBadgeIds = ref<string[]>(['cb-1', 'cb-2'])
const mockCanvasBadges = ref<BadgeItem[]>([
  { id: 'cb-1', title: 'خوش‌حساب', color: 'primary', usageCount: 19 },
  { id: 'cb-2', title: 'تسویه‌شده', color: 'success', usageCount: 42 },
  { id: 'cb-3', title: 'اقساطی', color: 'warning', usageCount: 8 },
  { id: 'cb-4', title: 'بدهکار سررسید', color: 'error', usageCount: 5 },
  { id: 'cb-5', title: 'مشتری طلایی', color: 'primary', usageCount: 12 },
  { id: 'cb-6', title: 'حواله ارزی', color: 'info', usageCount: 7 },
])

const handleCanvasCreateBadge = (newBadge: { title: string; color: BadgeColorToken }) => {
  const id = 'cb-' + Date.now()
  mockCanvasBadges.value.push({
    id,
    title: newBadge.title,
    color: newBadge.color,
    usageCount: 1,
  })
  canvasSelectedBadgeIds.value.push(id)
}

const mockActiveTab = ref('اطلاعات مالی')
const mockTabList = [
  { id: 'tab1', label: 'اطلاعات مالی' },
  { id: 'tab2', label: 'گردش حساب' },
  { id: 'tab3', label: 'تنظیمات' },
]

const mockSegmentedMode = ref('card')
const mockSegmentedOptions = [
  { id: 'card', label: 'کارتی', icon: 'solar:widget-2-bold-duotone', tooltip: 'نمایش کارتی' },
  {
    id: 'list',
    label: 'لیستی',
    icon: 'solar:checklist-minimalistic-linear',
    tooltip: 'نمایش لیستی',
  },
]

const quickMenuOpen = ref(false)
const datePickerOpen = ref(false)
const selectedDateVal = ref('۱۴۰۴/۰۱/۱۵')

const sampleBusinessData: BusinessItem = {
  id: 'biz_1',
  name: 'فروشگاه مرکزی حسابرو',
  category: 'retail',
  categoryLabel: 'خرده‌فروشی',
  structure: 'independent',
  structureLabel: 'کسب‌وکار مستقل',
  userRole: 'مالک',
  membersCount: 4,
  activeFiscalYear: '۱۴۰۴',
  icon: 'solar:shop-bold-duotone',
  branchName: 'شعبه اصلی',
  createdAt: '۱۴۰۴/۰۱/۰۱',
}

const sampleMobileRow: DocumentRowItem = {
  id: 'row_1',
  accountId: 'acc_101',
  accountName: 'حساب جاری بانک ملت',
  debit: 15000000,
  credit: 0,
  description: 'دریافت نقدی از مشتری',
}

const currentStatus = computed(() => {
  return props.activeComponent?.statuses.find((st) => st.id === props.activeStatusId)
})

const currentViewportWidth = computed(() => {
  const vp = props.viewports.find((v) => v.id === props.activeViewport)
  return vp ? vp.width : '100%'
})

const currentViewportHeight = computed(() => {
  const h = props.heightOptions.find((opt) => opt.id === props.activeHeight)
  return h ? h.height : '982px'
})

const activeViewportStyle = computed(() => {
  switch (props.activeViewport) {
    case 'mobile':
      return 'w-[375px] max-w-full'
    case 'tablet':
      return 'w-[768px] max-w-full'
    case 'laptop':
      return 'w-[1024px] max-w-full'
    case 'desktop':
    default:
      return 'w-full'
  }
})

const frameHeightStyle = computed(() => {
  const h = currentViewportHeight.value
  if (h === '100%') return { height: '100%' }
  return { height: h, maxHeight: '100%' }
})

const canvasBgPatternStyle = computed(() => {
  if (props.canvasBg === 'grid') {
    return {
      backgroundImage: `radial-gradient(#383838 1px, transparent 1px)`,
      backgroundSize: `16px 16px`,
    }
  }
  return {}
})

const canvasBgInnerStyle = computed(() => {
  switch (props.canvasBg) {
    case 'white':
      return 'bg-white-100 text-black-100'
    case 'surface':
      return 'bg-surface-100 text-black-100'
    case 'grid':
    default:
      return 'bg-surface-100 text-black-100'
  }
})
</script>
