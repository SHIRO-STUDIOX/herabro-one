import type {
  ChangelogApiResponse,
  ChangelogApiItemRaw,
  ChangelogItem,
  ChangelogType,
  HamafzarRNConfig,
} from '../types'

const priorityToType: Record<string, ChangelogType> = {
  HIGH: 'error',
  MEDIUM: 'warning',
  LOW: 'info',
}

export function mapRawToChangelog(apiItem: ChangelogApiItemRaw): ChangelogItem {
  const features: ChangelogItem['features'] = []
  const improvements: ChangelogItem['improvements'] = []
  const bugfixes: ChangelogItem['bugfixes'] = []
  const notes: ChangelogItem['notes'] = []

  ;(apiItem.details || []).forEach((detail, idx) => {
    const rawType = String(detail.type || '').toUpperCase()
    const mapped = {
      id: detail.id ?? idx + 1,
      module: detail.module_name || 'سیستم',
      moduleIcon: detail.module_icon || 'solar:widget-2-bold-duotone',
      title: detail.title || '',
      description: detail.explanation || '',
      linkText: detail.path_name || detail.path || '',
      linkUrl: detail.path || '',
    }

    switch (rawType) {
      case 'NEW_FEATURE':
        features.push(mapped)
        break
      case 'IMPROVEMENT':
        improvements.push(mapped)
        break
      case 'BUGFIX':
        bugfixes.push(mapped)
        break
      case 'NOTE':
        notes.push(mapped)
        break
      default:
        improvements.push(mapped)
        break
    }
  })

  const rawPriority = String(apiItem.priority || '').toUpperCase()
  const resolvedType: ChangelogType = priorityToType[rawPriority] || 'info'

  return {
    id: apiItem.id,
    version: apiItem.version || '',
    date: apiItem.release_date || '',
    title:
      apiItem.title ||
      (apiItem.version ? `انتشار نسخه ${apiItem.version}` : 'تغییرات اخیر'),
    description: apiItem.introduction || apiItem.summary || '',
    thumbnail:
      apiItem.thumbnail ||
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    caption: apiItem.thumbnail_caption || 'پیش‌نمایش تغییرات نسخه جدید',
    intro: apiItem.introduction || '',
    type: resolvedType,
    priority: apiItem.priority,
    features,
    improvements,
    bugfixes,
    notes,
    summary: apiItem.summary || '',
  }
}

export const MOCK_CHANGELOGS: ChangelogItem[] = [
  {
    id: 'v2-4-0',
    version: '2.4.0',
    date: '۲۵ مهر ۱۴۰۵',
    title: 'نسخه ۲.۴.۰ - بازطراحی ماژول اسناد، مالیات و بهینه‌سازی سرعت',
    description:
      'در این به‌روزرسانی زیرساخت ارتباطی به پروتکل WebSocket ارتقا یافته و ثبت سند دوبل با سرعت ۲ برابری ممکن شده است.',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    caption: 'داشبورد جامع مالی و گزارش‌های فصلی هوشمند',
    intro:
      'نسخه ۲.۴.۰ با تمرکز ویژه بر بهبود تجربه کاربری حسابداران حرفه‌ای، سرعت گردش کار و جلوگیری از خطاهای ثبتی در عملیات پایان سال مالی عرضه شده است.',
    type: 'success',
    priority: 'HIGH',
    features: [
      {
        id: 1,
        module: 'اسناد حسابداری',
        moduleIcon: 'solar:document-bold-duotone',
        title: 'ثبت سند دوبل با بالانس خودکار آرتیکل‌ها',
        description:
          'امکان تعریف ردیف‌های نامحدود بدهکار و بستانکار با بررسی لحظه‌ای تراز، ثبت میانبرهای کیبورد (Ctrl+Enter) و پیوست فایل مدارک ضمیمه.',
        linkText: 'مشاهده ماژول اسناد',
        linkUrl: '/documents',
      },
      {
        id: 2,
        module: 'گزارشات فصلی',
        moduleIcon: 'solar:chart-square-bold-duotone',
        title: 'خروجی اکسل و PDF مطابق فرمت ماده ۱۶۹ مکرر',
        description:
          'محاسبه بلادرنگ مالیات بر ارزش افزوده و گزارش سود و زیان تجمیعی دوره‌ای با استاندارد سازمان امور مالیاتی.',
        linkText: 'گزارش سود و زیان',
        linkUrl: '/reports/profit-loss',
      },
    ],
    improvements: [
      {
        id: 3,
        module: 'سرعت و عملکرد',
        moduleIcon: 'solar:bolt-circle-bold-duotone',
        title: 'بارگذاری تنبل (Lazy Loading) در جداول اسناد بالای ۱۰،۰۰۰ ردیف',
        description:
          'کاهش زمان پاسخ اولیه سرور از ۱.۲ ثانیه به ۲۴۰ میلی‌ثانیه به وسیله ایندکس‌گذاری پیشرفته دیتابیس.',
        linkText: '',
        linkUrl: '',
      },
    ],
    bugfixes: [
      {
        id: 4,
        module: 'فاکتور فروش',
        moduleIcon: 'solar:bill-list-bold-duotone',
        title: 'رفع خطای گردکردن ارقام اعشاری در تخفیفات سطری',
        description:
          'تصحیح الگوریتم تسهیم تخفیف نقدی و درصدی در سطرهای فاکتورهای ترکیبی ارزی و ریالی.',
        linkText: '',
        linkUrl: '',
      },
    ],
    notes: [
      {
        id: 5,
        module: 'پشتیبانی مرورگرها',
        moduleIcon: 'solar:shield-warning-bold-duotone',
        title: 'خاتمه پشتیبانی رسمی از مرورگرهای فاقد قابلیت CSS Subgrid',
        description:
          'جهت استفاده از نهایت سرعت رابط کاربری، پیشنهاد می‌شود مرورگر کروم یا فایرفاکس خود را به آخرین نسخه به‌روزرسانی فرمایید.',
        linkText: '',
        linkUrl: '',
      },
    ],
    summary:
      'این نسخه برای تمام مشترکین فعال به‌صورت رایگان و خودکار فعال گردیده است.',
  },
  {
    id: 'v2-3-1',
    version: '2.3.1',
    date: '۲ مهر ۱۴۰۵',
    title: 'نسخه ۲.۳.۱ - ارتقای پایداری درگاه پرداخت و تسویه حساب‌ها',
    description:
      'بهبود استانداردهای امنیتی تراکنش‌های خزانه‌داری، تصحیح خطای چاپ فیش و سازگاری با توکن‌های پاندورا ۳۶۰.',
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    caption: 'ماژول مالیات و گزارش ارزش افزوده فصلی',
    intro:
      'به‌روزرسانی دوره‌ای پاییزه با هدف انطباق فرمت‌های خروجی سامانه مودیان و تسهیل گزارش‌گیری مالیاتی ارائه گردید.',
    type: 'info',
    priority: 'MEDIUM',
    features: [
      {
        id: 11,
        module: 'فاکتور و فروش',
        moduleIcon: 'solar:document-text-bold-duotone',
        title: 'محاسبه ۱۰٪ مالیات بر ارزش افزوده طبق مصوبه جدید',
        description:
          'تفکیک نرخ مالیات در اقلام مشمول و معاف با قابلیت تولید فایل اکسل استاندارد جهت بارگذاری در سامانه مودیان.',
        linkText: 'مدیریت فاکتورها',
        linkUrl: '/sales',
      },
    ],
    improvements: [
      {
        id: 12,
        module: 'رابط کاربری',
        moduleIcon: 'solar:palette-2-bold-duotone',
        title: 'ارتقای کنتراست رنگی و سازگاری با تم تیره و روشن',
        description:
          'بهبود خوانایی جداول با توکن‌های پاندورا ۳۶۰ و اصلاح پدینگ‌های نمای موبایل.',
        linkText: 'صفحه اصلی',
        linkUrl: '/',
      },
    ],
    bugfixes: [
      {
        id: 13,
        module: 'خزانه‌داری',
        moduleIcon: 'solar:card-transfer-bold-duotone',
        title: 'رفع خطای چاپ برگه دریافت نقدی در مرورگر سافاری',
        description:
          'استایل‌های خروجی پرینت استانداردسازی شده و حاشیه‌های برگه A5 تصحیح گردید.',
        linkText: 'خزانه‌داری',
        linkUrl: '/treasury',
      },
    ],
    notes: [],
    summary: 'این نسخه شامل پایداری بیشتر در ارتباط با درگاه‌های بانکی است.',
  },
]

export class ChangelogService {
  private _config: HamafzarRNConfig
  private _detailCache = new Map<string | number, ChangelogItem>()

  constructor(config: HamafzarRNConfig = {}) {
    this._config = {
      appSlug: 'hesabro-one',
      ...config,
    }
  }

  setConfig(config: Partial<HamafzarRNConfig>) {
    this._config = {
      ...this._config,
      ...config,
    }
  }

  getConfig(): HamafzarRNConfig {
    return this._config
  }

  getListUrl(): string {
    if (this._config.apiUrl) {
      return this._config.apiUrl
    }
    const slug = this._config.appSlug || 'hesabro-one'
    return `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${slug}/changelog/`
  }

  getDetailUrl(id: string | number): string {
    if (this._config.detailApiUrl) {
      return this._config.detailApiUrl.replace(':id', String(id))
    }
    const slug = this._config.appSlug || 'hesabro-one'
    return `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${slug}/changelog/detail/${id}/`
  }

  getDetailByChangelogUrl(id: string | number): string {
    const slug = this._config.appSlug || 'hesabro-one'
    return `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${slug}/changelog/detail/?changelog=${id}`
  }

  async getChangelogs(
    url?: string,
  ): Promise<{ items: ChangelogItem[]; nextUrl: string | null }> {
    const targetUrl = url || this.getListUrl()

    try {
      const res = await fetch(targetUrl, {
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        const data: ChangelogApiResponse = await res.json()
        const rawItems = Array.isArray(data) ? data : data.results || []
        const visibleItems = rawItems.filter(
          (item: any) => item.is_visible !== false,
        )
        const items = visibleItems.map(mapRawToChangelog)

        items.forEach((item) => {
          if (
            item.features.length > 0 ||
            item.improvements.length > 0 ||
            item.bugfixes.length > 0 ||
            item.notes.length > 0
          ) {
            this._detailCache.set(item.id, item)
          }
        })

        return { items, nextUrl: data.next || null }
      }
      console.warn(`[hamafzar-rn] Changelog API returned HTTP ${res.status}`)
    } catch (e) {
      console.warn('[hamafzar-rn] Failed to fetch changelogs from API:', e)
    }

    // Graceful fallback to mock data if in DEV mode or no data
    if (typeof window !== 'undefined' && (window as any).__HAMAFZAR_MOCK__) {
      return { items: MOCK_CHANGELOGS, nextUrl: null }
    }

    return { items: [], nextUrl: null }
  }

  async getChangelogDetail(
    id: string | number,
    existingItem?: ChangelogItem | null,
    customUrl?: string,
  ): Promise<ChangelogItem | null> {
    const cached = this._detailCache.get(id)
    if (cached) {
      return { ...cached }
    }

    if (
      existingItem &&
      (existingItem.features?.length > 0 ||
        existingItem.improvements?.length > 0 ||
        existingItem.bugfixes?.length > 0 ||
        existingItem.notes?.length > 0)
    ) {
      this._detailCache.set(id, existingItem)
      return { ...existingItem }
    }

    const primaryUrl = customUrl || this.getDetailUrl(id)

    try {
      const res = await fetch(primaryUrl, {
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        const data = await res.json()
        const mapped = mapRawToChangelog(data)
        if (!mapped.title && existingItem?.title) {
          mapped.title = existingItem.title
        }
        this._detailCache.set(id, mapped)
        return mapped
      }
    } catch (e) {
      console.warn(`[hamafzar-rn] Detail fetch failed for ID ${id}:`, e)
    }

    // Try query pattern fallback (?changelog=:id)
    try {
      const queryUrl = this.getDetailByChangelogUrl(id)
      const res = await fetch(queryUrl, {
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        const data = await res.json()
        const rawDetails = Array.isArray(data) ? data : data.results || []
        if (rawDetails.length > 0 && existingItem) {
          const mergedRaw: ChangelogApiItemRaw = {
            id: existingItem.id,
            version: existingItem.version,
            release_date: existingItem.date,
            title: existingItem.title,
            introduction: existingItem.intro,
            thumbnail: existingItem.thumbnail,
            thumbnail_caption: existingItem.caption,
            priority: existingItem.priority,
            summary: existingItem.summary,
            details: rawDetails,
          }
          const mapped = mapRawToChangelog(mergedRaw)
          this._detailCache.set(id, mapped)
          return mapped
        }
      }
    } catch {
      // ignore
    }

    // Gracefully preserve existingItem
    if (existingItem) {
      const gracefulItem: ChangelogItem = {
        ...existingItem,
        features: existingItem.features || [],
        improvements: existingItem.improvements || [],
        bugfixes: existingItem.bugfixes || [],
        notes: existingItem.notes || [],
      }
      this._detailCache.set(id, gracefulItem)
      return gracefulItem
    }

    return null
  }
}

export const changelogService = new ChangelogService()
