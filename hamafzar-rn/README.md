# Hamafzar Release Notes & Changelog Widget (`hamafzar-rn`)

ماژول آماده و ایزوله سایدبار و دراور «یادداشت‌های انتشار و تغییرات اخیر» برای تمامی پروژه‌های مبتنی بر Vue 3.

---

## ویژگی‌ها (Features)
- 🚀 **نصب آسان و مستقل**: بدون وابستگی به Pinia، Tailwind یا هر پکیج جانبی دیگر (کامپوننت‌ها به همراه استایل‌ها خودکفا هستند).
- 🔄 **اتصال داینامیک به API هم‌افزا**: قابلیت تنظیم `appSlug` برای هر پروژه به‌صورت اختصاصی (`hesabro-one`, `panel`, و غیره).
- 🔔 **دکمه تریگر سایدبار آماده**: دارای آیکون زنگوله، انیمیشن بازگشایی و بج هشدار (Unread Badge) خودکار برای نسخه‌های جدید.
- 📐 **پنل شناور با ابعاد سه‌گانه**: کوچک (Small)، متوسط (Medium) و تمام‌صفحه (Large) به همراه ترنزیشن‌های نرم و دکمه رفرش.
- ✨ **صفحه جزئیات مدرن با View Transitions**: تفکیک تغییرات در ۴ دسته (قابلیت‌های جدید، بهبودها، رفع خطاها و یادداشت‌ها) به همراه کانکتورهای SVG.
- 📱 **واکنش‌گرایی کامل**: پشتیبانی از حالت موبایل با دکمه‌های بستن و رفرش تاچ‌فرندلی.

---

## نحوه نصب (Installation)

```bash
npm install hamafzar-rn
```

یا در صورت استفاده از فایل tarball محلی در ریپو:
```bash
npm install ./hamafzar-rn-0.1.0.tgz
```

---

## راه‌اندازی سریع (Quick Start)

### ۱. ثبت پلاگین در `main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import HamafzarRN from 'hamafzar-rn'
import 'hamafzar-rn/style.css'

const app = createApp(App)

app.use(HamafzarRN, {
  // شناسه پروژه در سامانه هم‌افزا (پیش‌فرض: 'hesabro-one')
  appSlug: 'hesabro-one',

  // یا آدرس سفارشی کامل (اختیاری)
  // apiUrl: 'https://backend-hamafzar.avapardaz.ir/api/avapardaz/hesabro-one/changelog/',

  // مدیریت رویداد کلیک روی لینک‌های داخل چنج‌لاگ
  onNavigate: (path) => {
    // هماهنگی با روتر پروژه شما
    // router.push(path)
  },
})

app.mount('#app')
```

---

### ۲. استفاده در قالب کامپوننت

#### حالت اول: استفاده از دکمه سایدبار آماده (`ChangelogTriggerButton`)
کافیست دکمه را در سایدبار و دراور را در لایوت یا انتهای صفحه قرار دهید:

```vue
<template>
  <!-- در سایدبار پروژه: -->
  <aside class="sidebar">
    <ChangelogTriggerButton />
  </aside>

  <!-- دراور در سطح ریشه یا لایوت: -->
  <ChangelogDrawer />
</template>
```

#### حالت دوم: کنترل دستی با دکمه سفارشی و `v-model:open`
```vue
<template>
  <div>
    <button @click="isOpen = true">
      تغییرات سیستم
      <span v-if="hasUnread" class="badge">جدید</span>
    </button>

    <ChangelogDrawer v-model:open="isOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChangelogDrawer, useChangelog } from 'hamafzar-rn'

const isOpen = ref(false)
const { hasUnread } = useChangelog()
</script>
```

---

## تنظیمات کانفیگ (Configuration Options)

| گزینه | تایپ | مقدار پیش‌فرض | توضیحات |
| :--- | :--- | :--- | :--- |
| `appSlug` | `string` | `'hesabro-one'` | شناسه پروژه جهت ساخت آدرس پیش‌فرض API هم‌افزا |
| `apiUrl` | `string` | `undefined` | آدرس کامل و اختصاصی جهت دریافت لیست تغییرات (در صورت تعریف، جایگزین `appSlug` می‌شود) |
| `detailApiUrl` | `string` | `undefined` | الگوی آدرس دریافت جزئیات با پارامتر `:id` |
| `storageKey` | `string` | `'hamafzar_last_seen_changelog_version'` | کلید ذخیره نسخه خوانده‌شده در `localStorage` |
| `onNavigate` | `(url: string) => void` | `undefined` | متد کال‌بک هنگام کلیک کاربر روی لینک‌های ماژولار در صفحه جزئیات |

---

## استایل و تم‌پذیری (Theming)
پکیج دارای متغیرهای پیش‌فرض مستقل است، اما شما می‌توانید با اورراید کردن متغیرهای CSS زیر، رنگ‌ها را با دیزاین سیستم پروژه خود منطبق کنید:

```css
:root {
  --primary-rgb: 73, 64, 109;
  --secondary-rgb: 57, 106, 204;
  --success-rgb: 65, 163, 117;
  --error-rgb: 184, 66, 66;
  --warning-rgb: 184, 140, 73;
}
```

---

## لایسنس
MIT
