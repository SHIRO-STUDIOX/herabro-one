var st = Object.defineProperty;
var it = (e, t, n) => t in e ? st(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var de = (e, t, n) => it(e, typeof t != "symbol" ? t + "" : t, n);
import { ref as I, computed as E, defineComponent as q, h as Se, openBlock as g, createElementBlock as m, normalizeClass as A, createElementVNode as a, createBlock as le, unref as x, createCommentVNode as C, toDisplayString as _, renderSlot as lt, createVNode as T, withCtx as Re, withModifiers as X, Fragment as D, renderList as H, createStaticVNode as rt, withDirectives as at, vShow as ct, onMounted as He, onUnmounted as ut, watch as dt, Teleport as ft } from "vue";
const ht = {
  HIGH: "error",
  MEDIUM: "warning",
  LOW: "info"
};
function fe(e) {
  const t = [], n = [], s = [], o = [];
  (e.details || []).forEach((r, c) => {
    const d = String(r.type || "").toUpperCase(), u = {
      id: r.id ?? c + 1,
      module: r.module_name || "سیستم",
      moduleIcon: r.module_icon || "solar:widget-2-bold-duotone",
      title: r.title || "",
      description: r.explanation || "",
      linkText: r.path_name || r.path || "",
      linkUrl: r.path || ""
    };
    switch (d) {
      case "NEW_FEATURE":
        t.push(u);
        break;
      case "IMPROVEMENT":
        n.push(u);
        break;
      case "BUGFIX":
        s.push(u);
        break;
      case "NOTE":
        o.push(u);
        break;
      default:
        n.push(u);
        break;
    }
  });
  const i = String(e.priority || "").toUpperCase(), l = ht[i] || "info";
  return {
    id: e.id,
    version: e.version || "",
    date: e.release_date || "",
    title: e.title || (e.version ? `انتشار نسخه ${e.version}` : "تغییرات اخیر"),
    description: e.introduction || e.summary || "",
    thumbnail: e.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    caption: e.thumbnail_caption || "پیش‌نمایش تغییرات نسخه جدید",
    intro: e.introduction || "",
    type: l,
    priority: e.priority,
    features: t,
    improvements: n,
    bugfixes: s,
    notes: o,
    summary: e.summary || ""
  };
}
const gt = [
  {
    id: "v2-4-0",
    version: "2.4.0",
    date: "۲۵ مهر ۱۴۰۵",
    title: "نسخه ۲.۴.۰ - بازطراحی ماژول اسناد، مالیات و بهینه‌سازی سرعت",
    description: "در این به‌روزرسانی زیرساخت ارتباطی به پروتکل WebSocket ارتقا یافته و ثبت سند دوبل با سرعت ۲ برابری ممکن شده است.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    caption: "داشبورد جامع مالی و گزارش‌های فصلی هوشمند",
    intro: "نسخه ۲.۴.۰ با تمرکز ویژه بر بهبود تجربه کاربری حسابداران حرفه‌ای، سرعت گردش کار و جلوگیری از خطاهای ثبتی در عملیات پایان سال مالی عرضه شده است.",
    type: "success",
    priority: "HIGH",
    features: [
      {
        id: 1,
        module: "اسناد حسابداری",
        moduleIcon: "solar:document-bold-duotone",
        title: "ثبت سند دوبل با بالانس خودکار آرتیکل‌ها",
        description: "امکان تعریف ردیف‌های نامحدود بدهکار و بستانکار با بررسی لحظه‌ای تراز، ثبت میانبرهای کیبورد (Ctrl+Enter) و پیوست فایل مدارک ضمیمه.",
        linkText: "مشاهده ماژول اسناد",
        linkUrl: "/documents"
      },
      {
        id: 2,
        module: "گزارشات فصلی",
        moduleIcon: "solar:chart-square-bold-duotone",
        title: "خروجی اکسل و PDF مطابق فرمت ماده ۱۶۹ مکرر",
        description: "محاسبه بلادرنگ مالیات بر ارزش افزوده و گزارش سود و زیان تجمیعی دوره‌ای با استاندارد سازمان امور مالیاتی.",
        linkText: "گزارش سود و زیان",
        linkUrl: "/reports/profit-loss"
      }
    ],
    improvements: [
      {
        id: 3,
        module: "سرعت و عملکرد",
        moduleIcon: "solar:bolt-circle-bold-duotone",
        title: "بارگذاری تنبل (Lazy Loading) در جداول اسناد بالای ۱۰،۰۰۰ ردیف",
        description: "کاهش زمان پاسخ اولیه سرور از ۱.۲ ثانیه به ۲۴۰ میلی‌ثانیه به وسیله ایندکس‌گذاری پیشرفته دیتابیس.",
        linkText: "",
        linkUrl: ""
      }
    ],
    bugfixes: [
      {
        id: 4,
        module: "فاکتور فروش",
        moduleIcon: "solar:bill-list-bold-duotone",
        title: "رفع خطای گردکردن ارقام اعشاری در تخفیفات سطری",
        description: "تصحیح الگوریتم تسهیم تخفیف نقدی و درصدی در سطرهای فاکتورهای ترکیبی ارزی و ریالی.",
        linkText: "",
        linkUrl: ""
      }
    ],
    notes: [
      {
        id: 5,
        module: "پشتیبانی مرورگرها",
        moduleIcon: "solar:shield-warning-bold-duotone",
        title: "خاتمه پشتیبانی رسمی از مرورگرهای فاقد قابلیت CSS Subgrid",
        description: "جهت استفاده از نهایت سرعت رابط کاربری، پیشنهاد می‌شود مرورگر کروم یا فایرفاکس خود را به آخرین نسخه به‌روزرسانی فرمایید.",
        linkText: "",
        linkUrl: ""
      }
    ],
    summary: "این نسخه برای تمام مشترکین فعال به‌صورت رایگان و خودکار فعال گردیده است."
  },
  {
    id: "v2-3-1",
    version: "2.3.1",
    date: "۲ مهر ۱۴۰۵",
    title: "نسخه ۲.۳.۱ - ارتقای پایداری درگاه پرداخت و تسویه حساب‌ها",
    description: "بهبود استانداردهای امنیتی تراکنش‌های خزانه‌داری، تصحیح خطای چاپ فیش و سازگاری با توکن‌های پاندورا ۳۶۰.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    caption: "ماژول مالیات و گزارش ارزش افزوده فصلی",
    intro: "به‌روزرسانی دوره‌ای پاییزه با هدف انطباق فرمت‌های خروجی سامانه مودیان و تسهیل گزارش‌گیری مالیاتی ارائه گردید.",
    type: "info",
    priority: "MEDIUM",
    features: [
      {
        id: 11,
        module: "فاکتور و فروش",
        moduleIcon: "solar:document-text-bold-duotone",
        title: "محاسبه ۱۰٪ مالیات بر ارزش افزوده طبق مصوبه جدید",
        description: "تفکیک نرخ مالیات در اقلام مشمول و معاف با قابلیت تولید فایل اکسل استاندارد جهت بارگذاری در سامانه مودیان.",
        linkText: "مدیریت فاکتورها",
        linkUrl: "/sales"
      }
    ],
    improvements: [
      {
        id: 12,
        module: "رابط کاربری",
        moduleIcon: "solar:palette-2-bold-duotone",
        title: "ارتقای کنتراست رنگی و سازگاری با تم تیره و روشن",
        description: "بهبود خوانایی جداول با توکن‌های پاندورا ۳۶۰ و اصلاح پدینگ‌های نمای موبایل.",
        linkText: "صفحه اصلی",
        linkUrl: "/"
      }
    ],
    bugfixes: [
      {
        id: 13,
        module: "خزانه‌داری",
        moduleIcon: "solar:card-transfer-bold-duotone",
        title: "رفع خطای چاپ برگه دریافت نقدی در مرورگر سافاری",
        description: "استایل‌های خروجی پرینت استانداردسازی شده و حاشیه‌های برگه A5 تصحیح گردید.",
        linkText: "خزانه‌داری",
        linkUrl: "/treasury"
      }
    ],
    notes: [],
    summary: "این نسخه شامل پایداری بیشتر در ارتباط با درگاه‌های بانکی است."
  }
];
class pt {
  constructor(t = {}) {
    de(this, "_config");
    de(this, "_detailCache", /* @__PURE__ */ new Map());
    this._config = {
      appSlug: "hesabro-one",
      ...t
    };
  }
  setConfig(t) {
    this._config = {
      ...this._config,
      ...t
    };
  }
  getConfig() {
    return this._config;
  }
  getListUrl() {
    return this._config.apiUrl ? this._config.apiUrl : `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${this._config.appSlug || "hesabro-one"}/changelog/`;
  }
  getDetailUrl(t) {
    return this._config.detailApiUrl ? this._config.detailApiUrl.replace(":id", String(t)) : `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${this._config.appSlug || "hesabro-one"}/changelog/detail/${t}/`;
  }
  getDetailByChangelogUrl(t) {
    return `https://backend-hamafzar.avapardaz.ir/api/avapardaz/${this._config.appSlug || "hesabro-one"}/changelog/detail/?changelog=${t}`;
  }
  async getChangelogs(t) {
    const n = t || this.getListUrl();
    try {
      const s = await fetch(n, {
        headers: { Accept: "application/json" }
      });
      if (s.ok) {
        const o = await s.json(), r = (Array.isArray(o) ? o : o.results || []).filter(
          (c) => c.is_visible !== !1
        ).map(fe);
        return r.forEach((c) => {
          (c.features.length > 0 || c.improvements.length > 0 || c.bugfixes.length > 0 || c.notes.length > 0) && this._detailCache.set(c.id, c);
        }), { items: r, nextUrl: o.next || null };
      }
      console.warn(`[hamafzar-rn] Changelog API returned HTTP ${s.status}`);
    } catch (s) {
      console.warn("[hamafzar-rn] Failed to fetch changelogs from API:", s);
    }
    return typeof window < "u" && window.__HAMAFZAR_MOCK__ ? { items: gt, nextUrl: null } : { items: [], nextUrl: null };
  }
  async getChangelogDetail(t, n, s) {
    var l, r, c, d;
    const o = this._detailCache.get(t);
    if (o)
      return { ...o };
    if (n && (((l = n.features) == null ? void 0 : l.length) > 0 || ((r = n.improvements) == null ? void 0 : r.length) > 0 || ((c = n.bugfixes) == null ? void 0 : c.length) > 0 || ((d = n.notes) == null ? void 0 : d.length) > 0))
      return this._detailCache.set(t, n), { ...n };
    const i = s || this.getDetailUrl(t);
    try {
      const u = await fetch(i, {
        headers: { Accept: "application/json" }
      });
      if (u.ok) {
        const v = await u.json(), p = fe(v);
        return !p.title && (n != null && n.title) && (p.title = n.title), this._detailCache.set(t, p), p;
      }
    } catch (u) {
      console.warn(`[hamafzar-rn] Detail fetch failed for ID ${t}:`, u);
    }
    try {
      const u = this.getDetailByChangelogUrl(t), v = await fetch(u, {
        headers: { Accept: "application/json" }
      });
      if (v.ok) {
        const p = await v.json(), w = Array.isArray(p) ? p : p.results || [];
        if (w.length > 0 && n) {
          const $ = {
            id: n.id,
            version: n.version,
            release_date: n.date,
            title: n.title,
            introduction: n.intro,
            thumbnail: n.thumbnail,
            thumbnail_caption: n.caption,
            priority: n.priority,
            summary: n.summary,
            details: w
          }, h = fe($);
          return this._detailCache.set(t, h), h;
        }
      }
    } catch {
    }
    if (n) {
      const u = {
        ...n,
        features: n.features || [],
        improvements: n.improvements || [],
        bugfixes: n.bugfixes || [],
        notes: n.notes || []
      };
      return this._detailCache.set(t, u), u;
    }
    return null;
  }
}
const Ve = new pt(), vt = "hamafzar_last_seen_changelog_version", J = I(!1), Te = I("small"), F = I([]), P = I(null), B = I(null), ee = I(!1), te = I(!1), he = I(!1), ge = I(null), R = I(!1), N = I(null), Q = I(!1), re = I(vt), me = I(
  typeof localStorage < "u" ? localStorage.getItem(re.value) : null
), ne = I({
  appSlug: "hesabro-one"
});
function mt(e) {
  ne.value = { ...ne.value, ...e }, Ve.setConfig(ne.value), e.storageKey && (re.value = e.storageKey, typeof localStorage < "u" && (me.value = localStorage.getItem(re.value)));
}
function xe(e) {
  const t = e || Ve, n = E(() => {
    var h;
    return ((h = F.value[0]) == null ? void 0 : h.version) || null;
  }), s = E(() => n.value ? me.value !== n.value : !1);
  function o() {
    n.value && (me.value = n.value, typeof localStorage < "u" && localStorage.setItem(re.value, n.value));
  }
  function i(h) {
    Te.value = h;
  }
  function l() {
    J.value = !0, o(), F.value.length === 0 && d();
  }
  function r() {
    J.value = !1, P.value = null, B.value = null;
  }
  function c() {
    J.value ? r() : l();
  }
  async function d(h = !1) {
    if (!(F.value.length > 0 && !h)) {
      ee.value = !0, ge.value = null, Q.value = !1, N.value = null, R.value = !1;
      try {
        const f = await t.getChangelogs();
        F.value = f.items, N.value = f.nextUrl, Q.value = !f.nextUrl;
      } catch (f) {
        ge.value = f.message || "خطا در دریافت لیست تغییرات اخیر", F.value = [];
      } finally {
        ee.value = !1;
      }
    }
  }
  async function u() {
    if (!(!N.value || te.value || ee.value || R.value)) {
      te.value = !0, R.value = !1;
      try {
        const h = await t.getChangelogs(N.value);
        h.items.length === 0 ? (Q.value = !0, N.value = null) : (F.value.push(...h.items), N.value = h.nextUrl, Q.value = !h.nextUrl);
      } catch (h) {
        console.error("[hamafzar-rn] Failed to load more changelogs:", h), R.value = !0;
      } finally {
        te.value = !1;
      }
    }
  }
  function v() {
    R.value = !1, u();
  }
  async function p(h) {
    B.value = h, he.value = !0, typeof document < "u" && "startViewTransition" in document ? document.startViewTransition(() => {
      P.value = h;
    }) : P.value = h;
    try {
      const f = await t.getChangelogDetail(h.id, h);
      f && (P.value = f);
    } catch (f) {
      console.error("[hamafzar-rn] Failed to fetch full changelog detail:", f);
    } finally {
      he.value = !1;
    }
  }
  function w() {
    var h;
    if (typeof document < "u" && "startViewTransition" in document) {
      const f = document.startViewTransition(() => {
        P.value = null;
      });
      (h = f == null ? void 0 : f.finished) == null || h.then(() => {
        B.value = null;
      });
    } else
      P.value = null, B.value = null;
  }
  function $() {
    P.value ? p(B.value || P.value) : d(!0);
  }
  return {
    isOpen: J,
    panelSize: Te,
    changelogs: F,
    selectedChangelog: P,
    clickedItem: B,
    loading: ee,
    loadingMore: te,
    detailLoading: he,
    error: ge,
    loadMoreError: R,
    nextUrl: N,
    reachedEnd: Q,
    hasUnread: s,
    latestVersion: n,
    activeConfig: ne,
    markAsRead: o,
    setPanelSize: i,
    openDrawer: l,
    closeDrawer: r,
    toggleDrawer: c,
    fetchChangelogs: d,
    fetchNextPage: u,
    retryLoadMore: v,
    selectChangelog: p,
    goBack: w,
    refresh: $
  };
}
const qe = /^[a-z0-9]+(-[a-z0-9]+)*$/, ce = (e, t, n, s = "") => {
  const o = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (o.length < 2 || o.length > 3)
      return null;
    s = o.shift().slice(1);
  }
  if (o.length > 3 || !o.length)
    return null;
  if (o.length > 1) {
    const r = o.pop(), c = o.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: o.length > 0 ? o[0] : s,
      prefix: c,
      name: r
    };
    return t && !oe(d) ? null : d;
  }
  const i = o[0], l = i.split("-");
  if (l.length > 1) {
    const r = {
      provider: s,
      prefix: l.shift(),
      name: l.join("-")
    };
    return t && !oe(r) ? null : r;
  }
  if (n && s === "") {
    const r = {
      provider: s,
      prefix: "",
      name: i
    };
    return t && !oe(r, n) ? null : r;
  }
  return null;
}, oe = (e, t) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && e.prefix === "" || e.prefix) && e.name) : !1, We = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ae = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ue = Object.freeze({
  ...We,
  ...ae
}), ye = Object.freeze({
  ...ue,
  body: "",
  hidden: !1
});
function yt(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const s = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return s && (n.rotate = s), n;
}
function $e(e, t) {
  const n = yt(e, t);
  for (const s in ye)
    s in ae ? s in e && !(s in n) && (n[s] = ae[s]) : s in t ? n[s] = t[s] : s in e && (n[s] = e[s]);
  return n;
}
function bt(e, t) {
  const n = e.icons, s = e.aliases || /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  function i(l) {
    if (n[l])
      return o[l] = [];
    if (!(l in o)) {
      o[l] = null;
      const r = s[l] && s[l].parent, c = r && i(r);
      c && (o[l] = [r].concat(c));
    }
    return o[l];
  }
  return Object.keys(n).concat(Object.keys(s)).forEach(i), o;
}
function wt(e, t, n) {
  const s = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function l(r) {
    i = $e(
      s[r] || o[r],
      i
    );
  }
  return l(t), n.forEach(l), $e(e, i);
}
function Ge(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return n;
  e.not_found instanceof Array && e.not_found.forEach((o) => {
    t(o, null), n.push(o);
  });
  const s = bt(e);
  for (const o in s) {
    const i = s[o];
    i && (t(o, wt(e, o, i)), n.push(o));
  }
  return n;
}
const kt = {
  provider: "",
  aliases: {},
  not_found: {},
  ...We
};
function pe(e, t) {
  for (const n in t)
    if (n in e && typeof e[n] != typeof t[n])
      return !1;
  return !0;
}
function Qe(e) {
  if (typeof e != "object" || e === null)
    return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !pe(e, kt))
    return null;
  const n = t.icons;
  for (const o in n) {
    const i = n[o];
    if (
      // Name cannot be empty
      !o || // Must have body
      typeof i.body != "string" || // Check other props
      !pe(
        i,
        ye
      )
    )
      return null;
  }
  const s = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const o in s) {
    const i = s[o], l = i.parent;
    if (
      // Name cannot be empty
      !o || // Parent must be set and point to existing icon
      typeof l != "string" || !n[l] && !s[l] || // Check other props
      !pe(
        i,
        ye
      )
    )
      return null;
  }
  return t;
}
const Ee = /* @__PURE__ */ Object.create(null);
function xt(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function V(e, t) {
  const n = Ee[e] || (Ee[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = xt(e, t));
}
function Ke(e, t) {
  return Qe(t) ? Ge(t, (n, s) => {
    s ? e.icons[n] = s : e.missing.add(n);
  }) : [];
}
function Ct(e, t, n) {
  try {
    if (typeof n.body == "string")
      return e.icons[t] = { ...n }, !0;
  } catch {
  }
  return !1;
}
let Y = !1;
function Ze(e) {
  return typeof e == "boolean" && (Y = e), Y;
}
function _t(e) {
  const t = typeof e == "string" ? ce(e, !0, Y) : e;
  if (t) {
    const n = V(t.provider, t.prefix), s = t.name;
    return n.icons[s] || (n.missing.has(s) ? null : void 0);
  }
}
function It(e, t) {
  const n = ce(e, !0, Y);
  if (!n)
    return !1;
  const s = V(n.provider, n.prefix);
  return t ? Ct(s, n.name, t) : (s.missing.add(n.name), !0);
}
function St(e, t) {
  if (typeof e != "object")
    return !1;
  if (typeof t != "string" && (t = e.provider || ""), Y && !t && !e.prefix) {
    let o = !1;
    return Qe(e) && (e.prefix = "", Ge(e, (i, l) => {
      It(i, l) && (o = !0);
    })), o;
  }
  const n = e.prefix;
  if (!oe({
    prefix: n,
    name: "a"
  }))
    return !1;
  const s = V(t, n);
  return !!Ke(s, e);
}
const Xe = Object.freeze({
  width: null,
  height: null
}), Ye = Object.freeze({
  // Dimensions
  ...Xe,
  // Transformations
  ...ae
}), Tt = /(-?[0-9.]*[0-9]+[0-9.]*)/g, $t = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Le(e, t, n) {
  if (t === 1)
    return e;
  if (n = n || 100, typeof e == "number")
    return Math.ceil(e * t * n) / n;
  if (typeof e != "string")
    return e;
  const s = e.split(Tt);
  if (s === null || !s.length)
    return e;
  const o = [];
  let i = s.shift(), l = $t.test(i);
  for (; ; ) {
    if (l) {
      const r = parseFloat(i);
      isNaN(r) ? o.push(i) : o.push(Math.ceil(r * t * n) / n);
    } else
      o.push(i);
    if (i = s.shift(), i === void 0)
      return o.join("");
    l = !l;
  }
}
function Et(e, t = "defs") {
  let n = "";
  const s = e.indexOf("<" + t);
  for (; s >= 0; ) {
    const o = e.indexOf(">", s), i = e.indexOf("</" + t);
    if (o === -1 || i === -1)
      break;
    const l = e.indexOf(">", i);
    if (l === -1)
      break;
    n += e.slice(o + 1, i).trim(), e = e.slice(0, s).trim() + e.slice(l + 1);
  }
  return {
    defs: n,
    content: e
  };
}
function Lt(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function Ut(e, t, n) {
  const s = Et(e);
  return Lt(s.defs, t + s.content + n);
}
const At = (e) => e === "unset" || e === "undefined" || e === "none";
function Mt(e, t) {
  const n = {
    ...ue,
    ...e
  }, s = {
    ...Ye,
    ...t
  }, o = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let i = n.body;
  [n, s].forEach((h) => {
    const f = [], j = h.hFlip, M = h.vFlip;
    let S = h.rotate;
    j ? M ? S += 2 : (f.push(
      "translate(" + (o.width + o.left).toString() + " " + (0 - o.top).toString() + ")"
    ), f.push("scale(-1 1)"), o.top = o.left = 0) : M && (f.push(
      "translate(" + (0 - o.left).toString() + " " + (o.height + o.top).toString() + ")"
    ), f.push("scale(1 -1)"), o.top = o.left = 0);
    let L;
    switch (S < 0 && (S -= Math.floor(S / 4) * 4), S = S % 4, S) {
      case 1:
        L = o.height / 2 + o.top, f.unshift(
          "rotate(90 " + L.toString() + " " + L.toString() + ")"
        );
        break;
      case 2:
        f.unshift(
          "rotate(180 " + (o.width / 2 + o.left).toString() + " " + (o.height / 2 + o.top).toString() + ")"
        );
        break;
      case 3:
        L = o.width / 2 + o.left, f.unshift(
          "rotate(-90 " + L.toString() + " " + L.toString() + ")"
        );
        break;
    }
    S % 2 === 1 && (o.left !== o.top && (L = o.left, o.left = o.top, o.top = L), o.width !== o.height && (L = o.width, o.width = o.height, o.height = L)), f.length && (i = Ut(
      i,
      '<g transform="' + f.join(" ") + '">',
      "</g>"
    ));
  });
  const l = s.width, r = s.height, c = o.width, d = o.height;
  let u, v;
  l === null ? (v = r === null ? "1em" : r === "auto" ? d : r, u = Le(v, c / d)) : (u = l === "auto" ? c : l, v = r === null ? Le(u, d / c) : r === "auto" ? d : r);
  const p = {}, w = (h, f) => {
    At(f) || (p[h] = f.toString());
  };
  w("width", u), w("height", v);
  const $ = [o.left, o.top, c, d];
  return p.viewBox = $.join(" "), {
    attributes: p,
    viewBox: $,
    body: i
  };
}
const Pt = /\sid="(\S+)"/g, Dt = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let jt = 0;
function zt(e, t = Dt) {
  const n = [];
  let s;
  for (; s = Pt.exec(e); )
    n.push(s[1]);
  if (!n.length)
    return e;
  const o = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((i) => {
    const l = typeof t == "function" ? t(i) : t + (jt++).toString(), r = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + r + ')([")]|\\.[a-z])', "g"),
      "$1" + l + o + "$3"
    );
  }), e = e.replace(new RegExp(o, "g"), ""), e;
}
const be = /* @__PURE__ */ Object.create(null);
function Ot(e, t) {
  be[e] = t;
}
function we(e) {
  return be[e] || be[""];
}
function Ce(e) {
  let t;
  if (typeof e.resources == "string")
    t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const _e = /* @__PURE__ */ Object.create(null), K = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], se = [];
for (; K.length > 0; )
  K.length === 1 || Math.random() > 0.5 ? se.push(K.shift()) : se.push(K.pop());
_e[""] = Ce({
  resources: ["https://api.iconify.design"].concat(se)
});
function Ft(e, t) {
  const n = Ce(t);
  return n === null ? !1 : (_e[e] = n, !0);
}
function Ie(e) {
  return _e[e];
}
const Nt = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let Ue = Nt();
function Bt(e, t) {
  const n = Ie(e);
  if (!n)
    return 0;
  let s;
  if (!n.maxURL)
    s = 0;
  else {
    let o = 0;
    n.resources.forEach((l) => {
      o = Math.max(o, l.length);
    });
    const i = t + ".json?icons=";
    s = n.maxURL - o - n.path.length - i.length;
  }
  return s;
}
function Rt(e) {
  return e === 404;
}
const Ht = (e, t, n) => {
  const s = [], o = Bt(e, t), i = "icons";
  let l = {
    type: i,
    provider: e,
    prefix: t,
    icons: []
  }, r = 0;
  return n.forEach((c, d) => {
    r += c.length + 1, r >= o && d > 0 && (s.push(l), l = {
      type: i,
      provider: e,
      prefix: t,
      icons: []
    }, r = c.length), l.icons.push(c);
  }), s.push(l), s;
};
function Vt(e) {
  if (typeof e == "string") {
    const t = Ie(e);
    if (t)
      return t.path;
  }
  return "/";
}
const qt = (e, t, n) => {
  if (!Ue) {
    n("abort", 424);
    return;
  }
  let s = Vt(t.provider);
  switch (t.type) {
    case "icons": {
      const i = t.prefix, r = t.icons.join(","), c = new URLSearchParams({
        icons: r
      });
      s += i + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const i = t.uri;
      s += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let o = 503;
  Ue(e + s).then((i) => {
    const l = i.status;
    if (l !== 200) {
      setTimeout(() => {
        n(Rt(l) ? "abort" : "next", l);
      });
      return;
    }
    return o = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? n("abort", i) : n("next", o);
      });
      return;
    }
    setTimeout(() => {
      n("success", i);
    });
  }).catch(() => {
    n("next", o);
  });
}, Wt = {
  prepare: Ht,
  send: qt
};
function Gt(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((o, i) => o.provider !== i.provider ? o.provider.localeCompare(i.provider) : o.prefix !== i.prefix ? o.prefix.localeCompare(i.prefix) : o.name.localeCompare(i.name));
  let s = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((o) => {
    if (s.name === o.name && s.prefix === o.prefix && s.provider === o.provider)
      return;
    s = o;
    const i = o.provider, l = o.prefix, r = o.name, c = n[i] || (n[i] = /* @__PURE__ */ Object.create(null)), d = c[l] || (c[l] = V(i, l));
    let u;
    r in d.icons ? u = t.loaded : l === "" || d.missing.has(r) ? u = t.missing : u = t.pending;
    const v = {
      provider: i,
      prefix: l,
      name: r
    };
    u.push(v);
  }), t;
}
function Je(e, t) {
  e.forEach((n) => {
    const s = n.loaderCallbacks;
    s && (n.loaderCallbacks = s.filter((o) => o.id !== t));
  });
}
function Qt(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let n = !1;
    const s = e.provider, o = e.prefix;
    t.forEach((i) => {
      const l = i.icons, r = l.pending.length;
      l.pending = l.pending.filter((c) => {
        if (c.prefix !== o)
          return !0;
        const d = c.name;
        if (e.icons[d])
          l.loaded.push({
            provider: s,
            prefix: o,
            name: d
          });
        else if (e.missing.has(d))
          l.missing.push({
            provider: s,
            prefix: o,
            name: d
          });
        else
          return n = !0, !0;
        return !1;
      }), l.pending.length !== r && (n || Je([e], i.id), i.callback(
        l.loaded.slice(0),
        l.missing.slice(0),
        l.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let Kt = 0;
function Zt(e, t, n) {
  const s = Kt++, o = Je.bind(null, n, s);
  if (!t.pending.length)
    return o;
  const i = {
    id: s,
    icons: t,
    callback: e,
    abort: o
  };
  return n.forEach((l) => {
    (l.loaderCallbacks || (l.loaderCallbacks = [])).push(i);
  }), o;
}
function Xt(e, t = !0, n = !1) {
  const s = [];
  return e.forEach((o) => {
    const i = typeof o == "string" ? ce(o, t, n) : o;
    i && s.push(i);
  }), s;
}
var Yt = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Jt(e, t, n, s) {
  const o = e.resources.length, i = e.random ? Math.floor(Math.random() * o) : e.index;
  let l;
  if (e.random) {
    let y = e.resources.slice(0);
    for (l = []; y.length > 1; ) {
      const b = Math.floor(Math.random() * y.length);
      l.push(y[b]), y = y.slice(0, b).concat(y.slice(b + 1));
    }
    l = l.concat(y);
  } else
    l = e.resources.slice(i).concat(e.resources.slice(0, i));
  const r = Date.now();
  let c = "pending", d = 0, u, v = null, p = [], w = [];
  typeof s == "function" && w.push(s);
  function $() {
    v && (clearTimeout(v), v = null);
  }
  function h() {
    c === "pending" && (c = "aborted"), $(), p.forEach((y) => {
      y.status === "pending" && (y.status = "aborted");
    }), p = [];
  }
  function f(y, b) {
    b && (w = []), typeof y == "function" && w.push(y);
  }
  function j() {
    return {
      startTime: r,
      payload: t,
      status: c,
      queriesSent: d,
      queriesPending: p.length,
      subscribe: f,
      abort: h
    };
  }
  function M() {
    c = "failed", w.forEach((y) => {
      y(void 0, u);
    });
  }
  function S() {
    p.forEach((y) => {
      y.status === "pending" && (y.status = "aborted");
    }), p = [];
  }
  function L(y, b, k) {
    const O = b !== "success";
    switch (p = p.filter((z) => z !== y), c) {
      case "pending":
        break;
      case "failed":
        if (O || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (b === "abort") {
      u = k, M();
      return;
    }
    if (O) {
      u = k, p.length || (l.length ? G() : M());
      return;
    }
    if ($(), S(), !e.random) {
      const z = e.resources.indexOf(y.resource);
      z !== -1 && z !== e.index && (e.index = z);
    }
    c = "completed", w.forEach((z) => {
      z(k);
    });
  }
  function G() {
    if (c !== "pending")
      return;
    $();
    const y = l.shift();
    if (y === void 0) {
      if (p.length) {
        v = setTimeout(() => {
          $(), c === "pending" && (S(), M());
        }, e.timeout);
        return;
      }
      M();
      return;
    }
    const b = {
      status: "pending",
      resource: y,
      callback: (k, O) => {
        L(b, k, O);
      }
    };
    p.push(b), d++, v = setTimeout(G, e.rotate), n(y, t, b.callback);
  }
  return setTimeout(G), j;
}
function et(e) {
  const t = {
    ...Yt,
    ...e
  };
  let n = [];
  function s() {
    n = n.filter((r) => r().status === "pending");
  }
  function o(r, c, d) {
    const u = Jt(
      t,
      r,
      c,
      (v, p) => {
        s(), d && d(v, p);
      }
    );
    return n.push(u), u;
  }
  function i(r) {
    return n.find((c) => r(c)) || null;
  }
  return {
    query: o,
    find: i,
    setIndex: (r) => {
      t.index = r;
    },
    getIndex: () => t.index,
    cleanup: s
  };
}
function Ae() {
}
const ve = /* @__PURE__ */ Object.create(null);
function en(e) {
  if (!ve[e]) {
    const t = Ie(e);
    if (!t)
      return;
    const n = et(t), s = {
      config: t,
      redundancy: n
    };
    ve[e] = s;
  }
  return ve[e];
}
function tn(e, t, n) {
  let s, o;
  if (typeof e == "string") {
    const i = we(e);
    if (!i)
      return n(void 0, 424), Ae;
    o = i.send;
    const l = en(e);
    l && (s = l.redundancy);
  } else {
    const i = Ce(e);
    if (i) {
      s = et(i);
      const l = e.resources ? e.resources[0] : "", r = we(l);
      r && (o = r.send);
    }
  }
  return !s || !o ? (n(void 0, 424), Ae) : s.query(t, o, n)().abort;
}
function Me() {
}
function nn(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, Qt(e);
  }));
}
function on(e) {
  const t = [], n = [];
  return e.forEach((s) => {
    (s.match(qe) ? t : n).push(s);
  }), {
    valid: t,
    invalid: n
  };
}
function Z(e, t, n) {
  function s() {
    const o = e.pendingIcons;
    t.forEach((i) => {
      o && o.delete(i), e.icons[i] || e.missing.add(i);
    });
  }
  if (n && typeof n == "object")
    try {
      if (!Ke(e, n).length) {
        s();
        return;
      }
    } catch (o) {
      console.error(o);
    }
  s(), nn(e);
}
function Pe(e, t) {
  e instanceof Promise ? e.then((n) => {
    t(n);
  }).catch(() => {
    t(null);
  }) : t(e);
}
function sn(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: n, prefix: s } = e, o = e.iconsToLoad;
    if (delete e.iconsToLoad, !o || !o.length)
      return;
    const i = e.loadIcon;
    if (e.loadIcons && (o.length > 1 || !i)) {
      Pe(
        e.loadIcons(o, s, n),
        (u) => {
          Z(e, o, u);
        }
      );
      return;
    }
    if (i) {
      o.forEach((u) => {
        const v = i(u, s, n);
        Pe(v, (p) => {
          const w = p ? {
            prefix: s,
            icons: {
              [u]: p
            }
          } : null;
          Z(e, [u], w);
        });
      });
      return;
    }
    const { valid: l, invalid: r } = on(o);
    if (r.length && Z(e, r, null), !l.length)
      return;
    const c = s.match(qe) ? we(n) : null;
    if (!c) {
      Z(e, l, null);
      return;
    }
    c.prepare(n, s, l).forEach((u) => {
      tn(n, u, (v) => {
        Z(e, u.icons, v);
      });
    });
  }));
}
const ln = (e, t) => {
  const n = Xt(e, !0, Ze()), s = Gt(n);
  if (!s.pending.length) {
    let c = !0;
    return t && setTimeout(() => {
      c && t(
        s.loaded,
        s.missing,
        s.pending,
        Me
      );
    }), () => {
      c = !1;
    };
  }
  const o = /* @__PURE__ */ Object.create(null), i = [];
  let l, r;
  return s.pending.forEach((c) => {
    const { provider: d, prefix: u } = c;
    if (u === r && d === l)
      return;
    l = d, r = u, i.push(V(d, u));
    const v = o[d] || (o[d] = /* @__PURE__ */ Object.create(null));
    v[u] || (v[u] = []);
  }), s.pending.forEach((c) => {
    const { provider: d, prefix: u, name: v } = c, p = V(d, u), w = p.pendingIcons || (p.pendingIcons = /* @__PURE__ */ new Set());
    w.has(v) || (w.add(v), o[d][u].push(v));
  }), i.forEach((c) => {
    const d = o[c.provider][c.prefix];
    d.length && sn(c, d);
  }), t ? Zt(t, s, i) : Me;
};
function rn(e, t) {
  const n = {
    ...e
  };
  for (const s in t) {
    const o = t[s], i = typeof o;
    s in Xe ? (o === null || o && (i === "string" || i === "number")) && (n[s] = o) : i === typeof n[s] && (n[s] = s === "rotate" ? o % 4 : o);
  }
  return n;
}
const an = /[\s,]+/;
function cn(e, t) {
  t.split(an).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function un(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function s(o) {
    for (; o < 0; )
      o += 4;
    return o % 4;
  }
  if (n === "") {
    const o = parseInt(e);
    return isNaN(o) ? 0 : s(o);
  } else if (n !== e) {
    let o = 0;
    switch (n) {
      case "%":
        o = 25;
        break;
      case "deg":
        o = 90;
    }
    if (o) {
      let i = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(i) ? 0 : (i = i / o, i % 1 === 0 ? s(i) : 0);
    }
  }
  return t;
}
function dn(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const s in t)
    n += " " + s + '="' + t[s] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function fn(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function hn(e) {
  return "data:image/svg+xml," + fn(e);
}
function gn(e) {
  return 'url("' + hn(e) + '")';
}
const De = {
  ...Ye,
  inline: !1
}, pn = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, vn = {
  display: "inline-block"
}, ke = {
  backgroundColor: "currentColor"
}, tt = {
  backgroundColor: "transparent"
}, je = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, ze = {
  webkitMask: ke,
  mask: ke,
  background: tt
};
for (const e in ze) {
  const t = ze[e];
  for (const n in je)
    t[e + n] = je[n];
}
const ie = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  ie[e + "-flip"] = t, ie[e.slice(0, 1) + "-flip"] = t, ie[e + "Flip"] = t;
});
function Oe(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Fe = (e, t) => {
  const n = rn(De, t), s = { ...pn }, o = t.mode || "svg", i = {}, l = t.style, r = typeof l == "object" && !(l instanceof Array) ? l : {};
  for (let h in t) {
    const f = t[h];
    if (f !== void 0)
      switch (h) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          n[h] = f === !0 || f === "true" || f === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof f == "string" && cn(n, f);
          break;
        // Color: override style
        case "color":
          i.color = f;
          break;
        // Rotation as string
        case "rotate":
          typeof f == "string" ? n[h] = un(f) : typeof f == "number" && (n[h] = f);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          f !== !0 && f !== "true" && delete s["aria-hidden"];
          break;
        default: {
          const j = ie[h];
          j ? (f === !0 || f === "true" || f === 1) && (n[j] = !0) : De[h] === void 0 && (s[h] = f);
        }
      }
  }
  const c = Mt(e, n), d = c.attributes;
  if (n.inline && (i.verticalAlign = "-0.125em"), o === "svg") {
    s.style = {
      ...i,
      ...r
    }, Object.assign(s, d);
    let h = 0, f = t.id;
    return typeof f == "string" && (f = f.replace(/-/g, "_")), s.innerHTML = zt(c.body, f ? () => f + "ID" + h++ : "iconifyVue"), Se("svg", s);
  }
  const { body: u, width: v, height: p } = e, w = o === "mask" || (o === "bg" ? !1 : u.indexOf("currentColor") !== -1), $ = dn(u, {
    ...d,
    width: v + "",
    height: p + ""
  });
  return s.style = {
    ...i,
    "--svg": gn($),
    width: Oe(d.width),
    height: Oe(d.height),
    ...vn,
    ...w ? ke : tt,
    ...r
  }, Se("span", s);
};
Ze(!0);
Ot("", Wt);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((s) => {
      try {
        // Check if item is an object and not null/array
        (typeof s != "object" || s === null || s instanceof Array || // Check for 'icons' and 'prefix'
        typeof s.icons != "object" || typeof s.prefix != "string" || // Add icon set
        !St(s)) && console.error(n);
      } catch {
        console.error(n);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const s = "IconifyProviders[" + n + "] is invalid.";
        try {
          const o = t[n];
          if (typeof o != "object" || !o || o.resources === void 0)
            continue;
          Ft(n, o) || console.error(s);
        } catch {
          console.error(s);
        }
      }
  }
}
const mn = {
  ...ue,
  body: ""
}, U = q({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: !1,
  // Set initial data
  data() {
    return {
      // Current icon name
      _name: "",
      // Loading
      _loadingIcon: null,
      // Mounted status
      iconMounted: !1,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this.iconMounted = !0;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      this._loadingIcon && (this._loadingIcon.abort(), this._loadingIcon = null);
    },
    // Get data for icon to render or null
    getIcon(e, t, n) {
      if (typeof e == "object" && e !== null && typeof e.body == "string")
        return this._name = "", this.abortLoading(), {
          data: e
        };
      let s;
      if (typeof e != "string" || (s = ce(e, !1, !0)) === null)
        return this.abortLoading(), null;
      let o = _t(s);
      if (!o)
        return (!this._loadingIcon || this._loadingIcon.name !== e) && (this.abortLoading(), this._name = "", o !== null && (this._loadingIcon = {
          name: e,
          abort: ln([s], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== e && (this._name = e, t && t(e)), n) {
        o = Object.assign({}, o);
        const l = n(o.body, s.name, s.prefix, s.provider);
        typeof l == "string" && (o.body = l);
      }
      const i = ["iconify"];
      return s.prefix !== "" && i.push("iconify--" + s.prefix), s.provider !== "" && i.push("iconify--" + s.provider), { data: o, classes: i };
    }
  },
  // Render icon
  render() {
    this.counter;
    const e = this.$attrs, t = this.iconMounted || e.ssr ? this.getIcon(e.icon, e.onLoad, e.customise) : null;
    if (!t)
      return Fe(mn, e);
    let n = e;
    return t.classes && (n = {
      ...e,
      class: (typeof e.class == "string" ? e.class + " " : "") + t.classes.join(" ")
    }), Fe({
      ...ue,
      ...t.data
    }, n);
  }
}), yn = ["innerHTML"], bn = { class: "header-content" }, wn = { class: "text-title" }, kn = { class: "text-subtitle" }, xn = {
  key: 0,
  class: "header-extra"
}, Cn = /* @__PURE__ */ q({
  __name: "ComplexCardHeader",
  props: {
    startIcon: {},
    startIconBgColor: { default: "bg-secondary-8" },
    startIconTextColor: { default: "text-secondary-100" },
    title: { default: "" },
    subtitle: { default: "" },
    clickable: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e) {
    const t = e, n = E(() => typeof t.startIcon == "string" ? t.startIcon.trim().startsWith("<") || t.startIcon.includes("<svg") || t.startIcon.includes("<path") : !1), s = E(() => typeof t.startIcon == "string" ? t.startIcon.includes(":") ? t.startIcon : t.startIcon === "arrowRightBold" ? "solar:arrow-right-bold" : t.startIcon === "alarmBold" ? "solar:bell-bold" : `solar:${t.startIcon}` : "solar:bell-bold");
    return (o, i) => (g(), m("div", {
      class: A(["hrn-complex-card-header", { "has-extra": o.$slots.default }]),
      style: { direction: "rtl" }
    }, [
      a("div", {
        class: A([
          e.startIconBgColor,
          e.startIconTextColor,
          "start-header-icon",
          { "clickable-icon": e.clickable }
        ]),
        onClick: i[0] || (i[0] = (l) => e.clickable && o.$emit("click"))
      }, [
        n.value ? (g(), m("span", {
          key: 0,
          class: "svg",
          innerHTML: t.startIcon
        }, null, 8, yn)) : t.startIcon ? (g(), le(x(U), {
          key: 1,
          icon: s.value
        }, null, 8, ["icon"])) : C("", !0)
      ], 2),
      a("div", bn, [
        a("span", wn, _(t.title), 1),
        a("div", kn, _(t.subtitle), 1)
      ]),
      o.$slots.default ? (g(), m("div", xn, [
        lt(o.$slots, "default", {}, void 0, !0)
      ])) : C("", !0)
    ], 2));
  }
}), W = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, nt = /* @__PURE__ */ W(Cn, [["__scopeId", "data-v-5c2c2353"]]), _n = {}, In = {
  width: "21",
  height: "9",
  viewBox: "0 0 21 9",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-5 h-[9px] shrink-0 transform-gpu"
};
function Sn(e, t) {
  return g(), m("svg", In, [...t[0] || (t[0] = [
    a("path", {
      d: "M20.5 0C20.5 2.20489 19.9798 3.90904 19.0283 5.20898C18.0779 6.50729 16.7324 7.35475 15.167 7.90918C12.0684 9.00658 7.97021 9 4 9H0V8H4C8.02977 8 11.9316 7.9934 14.833 6.96582C16.2674 6.45778 17.4221 5.71134 18.2217 4.61914C19.0201 3.52848 19.5 2.04499 19.5 0H20.5Z",
      fill: "currentColor"
    }, null, -1)
  ])]);
}
const Tn = /* @__PURE__ */ W(_n, [["render", Sn]]), $n = { class: "detail-wrapper" }, En = { class: "detail-header-left" }, Ln = { class: "header-mobile-actions" }, Un = { class: "detail-container hide-scrollbar" }, An = {
  key: 0,
  class: "detail-media"
}, Mn = { class: "detail-thumbnail" }, Pn = ["src", "alt"], Dn = {
  key: 0,
  class: "detail-caption"
}, jn = { class: "detail-section-content" }, zn = { class: "detail-section-list" }, On = {
  key: 0,
  class: "detail-intro"
}, Fn = { class: "detail-section-content" }, Nn = { class: "detail-section-header" }, Bn = { class: "detail-section-timeline" }, Rn = { class: "detail-section-icon-badge" }, Hn = { class: "detail-section-title" }, Vn = { class: "detail-section-list" }, qn = { class: "cluster-link-svg-wrapper" }, Wn = { class: "detail-item-content-box" }, Gn = { class: "detail-item-node" }, Qn = { class: "detail-item-number" }, Kn = {
  key: 0,
  class: "detail-item-module-badge"
}, Zn = ["src"], Xn = { class: "detail-item-module-text" }, Yn = { class: "detail-item-content" }, Jn = { class: "detail-item-title" }, eo = { class: "detail-item-desc" }, to = ["href", "onClick"], no = {
  key: 1,
  class: "detail-item-button",
  style: { cursor: "default" }
}, oo = {
  key: 1,
  class: "detail-summary"
}, so = "solar:arrow-right-bold", io = "solar:star-bold", lo = "solar:chart-2-bold", ro = "solar:bug-minimalistic-bold", ao = "solar:notes-minimalistic-bold", co = /* @__PURE__ */ q({
  __name: "ChangelogDetail",
  props: {
    selectedChangelog: {},
    detailLoading: { type: Boolean }
  },
  emits: ["back", "navigate", "close", "refresh"],
  setup(e, { emit: t }) {
    const n = t, { activeConfig: s } = xe(), o = [
      {
        key: "features",
        title: "قابلیت‌های جدید",
        icon: io,
        type: "success"
      },
      {
        key: "improvements",
        title: "بهبودها",
        icon: lo,
        type: "info"
      },
      {
        key: "bugfixes",
        title: "رفع خطا و باگ‌ها",
        icon: ro,
        type: "error"
      },
      {
        key: "notes",
        title: "یادداشت‌ها",
        icon: ao,
        type: "warning"
      }
    ], i = (r) => {
      if (!r) return "";
      if (r.startsWith("http://") || r.startsWith("https://")) return r;
      const c = r.startsWith("/") ? r.slice(1) : r;
      if (typeof window < "u") {
        const d = window.location.origin, v = window.location.pathname.split("/").filter(Boolean), p = v.findIndex((w) => w.startsWith("@"));
        if (p !== -1) {
          const w = v.slice(0, p + 1);
          return `${d}/${w.join("/")}/${c}`;
        }
        return `${d}/${c}`;
      }
      return `/${c}`;
    }, l = (r) => {
      if (r) {
        if (r.startsWith("http://") || r.startsWith("https://")) {
          window.open(r, "_blank");
          return;
        }
        s.value.onNavigate && s.value.onNavigate(r), n("navigate", r);
      }
    };
    return (r, c) => (g(), m("div", $n, [
      T(nt, {
        "start-icon": so,
        "start-icon-bg-color": "bg-info-8",
        "start-icon-text-color": "text-info-100",
        title: e.selectedChangelog.title || `انتشار نسخه ${e.selectedChangelog.version}`,
        subtitle: e.selectedChangelog.date,
        clickable: !0,
        style: { margin: "20px !important" },
        onClick: c[2] || (c[2] = (d) => r.$emit("back"))
      }, {
        default: Re(() => [
          a("div", En, [
            a("span", {
              class: A(["detail-header-badge", `type-${e.selectedChangelog.type}`])
            }, " نسخه " + _(e.selectedChangelog.version), 3),
            a("div", Ln, [
              a("button", {
                type: "button",
                class: "mobile-action-btn refresh-btn",
                onClick: c[0] || (c[0] = X((d) => r.$emit("refresh"), ["stop"])),
                title: "به‌روزرسانی"
              }, [
                T(x(U), { icon: "solar:restart-bold" })
              ]),
              a("button", {
                type: "button",
                class: "mobile-action-btn close-btn",
                onClick: c[1] || (c[1] = X((d) => r.$emit("close"), ["stop"])),
                title: "بستن"
              }, [
                T(x(U), { icon: "solar:close-circle-bold-duotone" })
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["title", "subtitle"]),
      c[7] || (c[7] = a("div", { class: "hrn-divider" }, null, -1)),
      a("div", Un, [
        e.selectedChangelog.thumbnail ? (g(), m("div", An, [
          a("div", Mn, [
            a("img", {
              src: e.selectedChangelog.thumbnail,
              alt: e.selectedChangelog.title
            }, null, 8, Pn)
          ]),
          e.selectedChangelog.caption ? (g(), m("p", Dn, _(e.selectedChangelog.caption), 1)) : C("", !0)
        ])) : C("", !0),
        e.detailLoading ? (g(), m(D, { key: 1 }, [
          c[5] || (c[5] = a("div", { class: "detail-intro" }, [
            a("div", {
              class: "skeleton",
              style: { width: "100%", height: "16px" }
            }),
            a("div", {
              class: "skeleton",
              style: { width: "100%", height: "16px", "margin-top": "6px" }
            }),
            a("div", {
              class: "skeleton",
              style: { width: "75%", height: "16px", "margin-top": "6px" }
            })
          ], -1)),
          (g(), m(D, null, H(2, (d) => a("div", {
            key: d,
            class: "detail-section"
          }, [
            a("div", jn, [
              c[4] || (c[4] = a("div", {
                class: "detail-section-header",
                style: { gap: "8px" }
              }, [
                a("div", { class: "detail-section-timeline" }, [
                  a("div", {
                    class: "skeleton",
                    style: { width: "24px", height: "24px", "border-radius": "50%" }
                  })
                ]),
                a("div", {
                  class: "skeleton",
                  style: { width: "120px", height: "24px" }
                })
              ], -1)),
              a("div", zn, [
                (g(), m(D, null, H(2, (u) => a("div", {
                  key: u,
                  class: "detail-item-wrapper",
                  style: { "padding-right": "12px" }
                }, [...c[3] || (c[3] = [
                  rt('<div class="detail-item-content-box" data-v-49ad5360><div class="detail-item-node" style="gap:4px;" data-v-49ad5360><div class="skeleton" style="width:24px;height:16px;border-radius:99px;" data-v-49ad5360></div><div class="skeleton" style="width:80px;height:16px;border-radius:99px;" data-v-49ad5360></div></div><div class="detail-item-content" style="margin-top:8px;" data-v-49ad5360><div class="skeleton" style="width:80%;height:18px;" data-v-49ad5360></div><div class="skeleton" style="width:100%;height:14px;margin-top:6px;" data-v-49ad5360></div><div class="skeleton" style="width:100%;height:14px;margin-top:4px;" data-v-49ad5360></div></div></div>', 1)
                ])])), 64))
              ])
            ])
          ])), 64))
        ], 64)) : (g(), m(D, { key: 2 }, [
          e.selectedChangelog.intro ? (g(), m("div", On, [
            a("p", null, _(e.selectedChangelog.intro), 1)
          ])) : C("", !0),
          (g(), m(D, null, H(o, (d) => at(a("div", {
            key: d.key,
            class: A(["detail-section", `type-${d.type}`])
          }, [
            a("div", Fn, [
              a("div", Nn, [
                a("div", Bn, [
                  a("div", Rn, [
                    T(x(U), {
                      icon: d.icon
                    }, null, 8, ["icon"])
                  ]),
                  c[6] || (c[6] = a("div", { class: "detail-section-bar" }, null, -1))
                ]),
                a("h4", Hn, _(d.title), 1)
              ]),
              a("div", Vn, [
                (g(!0), m(D, null, H(e.selectedChangelog[d.key], (u, v) => (g(), m("div", {
                  key: v,
                  class: "detail-item-wrapper"
                }, [
                  a("div", qn, [
                    T(Tn)
                  ]),
                  a("div", Wn, [
                    a("div", Gn, [
                      a("div", Qn, _(Number(v) + 1), 1),
                      u.module ? (g(), m("div", Kn, [
                        u.moduleIcon && (u.moduleIcon.startsWith("http") || u.moduleIcon.includes("/")) ? (g(), m("img", {
                          key: 0,
                          src: u.moduleIcon,
                          class: "detail-item-module-icon-img",
                          style: { width: "14px", height: "14px", "object-fit": "contain", "margin-left": "4px" }
                        }, null, 8, Zn)) : u.moduleIcon ? (g(), le(x(U), {
                          key: 1,
                          icon: u.moduleIcon,
                          class: "detail-item-module-icon"
                        }, null, 8, ["icon"])) : C("", !0),
                        a("span", Xn, _(u.module), 1)
                      ])) : C("", !0)
                    ]),
                    a("div", Yn, [
                      a("h5", Jn, _(u.title), 1),
                      a("p", eo, _(u.description), 1),
                      u.linkText && u.linkUrl ? (g(), m("a", {
                        key: 0,
                        href: i(u.linkUrl),
                        class: "detail-item-button",
                        style: { "text-decoration": "none" },
                        onClick: X((p) => l(u.linkUrl), ["prevent"])
                      }, [
                        a("span", null, _(u.linkText), 1)
                      ], 8, to)) : u.linkText ? (g(), m("div", no, [
                        a("span", null, _(u.linkText), 1)
                      ])) : C("", !0)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ], 2), [
            [
              ct,
              e.selectedChangelog[d.key] && e.selectedChangelog[d.key].length > 0
            ]
          ])), 64)),
          e.selectedChangelog.summary ? (g(), m("div", oo, [
            a("p", null, _(e.selectedChangelog.summary), 1)
          ])) : C("", !0)
        ], 64))
      ])
    ]));
  }
}), ot = /* @__PURE__ */ W(co, [["__scopeId", "data-v-49ad5360"]]);
function uo() {
  const e = I(typeof window < "u" ? window.innerWidth : 1200), t = I(typeof window < "u" ? window.innerHeight : 800), n = () => {
    typeof window < "u" && (e.value = window.innerWidth, t.value = window.innerHeight);
  };
  return He(() => {
    typeof window < "u" && window.addEventListener("resize", n);
  }), ut(() => {
    typeof window < "u" && window.removeEventListener("resize", n);
  }), {
    width: e,
    height: t
  };
}
const fo = { class: "hrn-actions-container" }, ho = {
  key: 0,
  class: "hrn-action-capsule"
}, go = {
  key: 1,
  class: "capsule-divider"
}, po = /* @__PURE__ */ q({
  __name: "ChangelogActions",
  props: {
    modelValue: { default: "small" },
    showNewTab: { type: Boolean, default: !1 },
    newTabLink: { default: "" },
    showRefresh: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "close", "refresh"],
  setup(e, { emit: t }) {
    const n = e, s = t, { width: o } = uo(), i = E(() => o.value > 768 ? !0 : n.showNewTab), l = (c) => {
      s("update:modelValue", c);
    }, r = () => {
      n.newTabLink && window.open(n.newTabLink, "_blank");
    };
    return (c, d) => (g(), m("div", fo, [
      a("div", {
        class: "hrn-action-button close-btn",
        onClick: d[0] || (d[0] = (u) => c.$emit("close")),
        title: "بستن"
      }, [
        T(x(U), {
          icon: "solar:close-circle-bold-duotone",
          class: "text-error-100"
        })
      ]),
      i.value ? (g(), m("div", ho, [
        x(o) > 768 ? (g(), m(D, { key: 0 }, [
          a("div", {
            class: A(["capsule-icon-wrapper", { active: e.modelValue === "small" }]),
            onClick: d[1] || (d[1] = (u) => l("small")),
            title: "سایز کوچک"
          }, [
            T(x(U), { icon: "solar:minimize-square-minimalistic-outline" })
          ], 2),
          a("div", {
            class: A(["capsule-icon-wrapper", { active: e.modelValue === "medium" }]),
            onClick: d[2] || (d[2] = (u) => l("medium")),
            title: "سایز متوسط"
          }, [
            T(x(U), { icon: "solar:maximize-square-minimalistic-outline" })
          ], 2),
          a("div", {
            class: A(["capsule-icon-wrapper", { active: e.modelValue === "large" }]),
            onClick: d[3] || (d[3] = (u) => l("large")),
            title: "سایز بزرگ"
          }, [
            T(x(U), { icon: "solar:maximize-square-3-outline" })
          ], 2)
        ], 64)) : C("", !0),
        e.showNewTab && x(o) > 768 ? (g(), m("div", go)) : C("", !0),
        e.showNewTab ? (g(), m("div", {
          key: 2,
          class: "capsule-icon-wrapper newtab-btn",
          onClick: r,
          title: "باز کردن در صفحه جدید"
        }, [
          T(x(U), { icon: "solar:square-share-line-outline" })
        ])) : C("", !0)
      ])) : C("", !0),
      e.showRefresh ? (g(), m("div", {
        key: 1,
        class: "hrn-action-button refresh-btn",
        onClick: d[4] || (d[4] = (u) => c.$emit("refresh")),
        title: "به‌روزرسانی"
      }, [
        T(x(U), {
          icon: "solar:restart-bold",
          class: "text-primary-100"
        })
      ])) : C("", !0)
    ]));
  }
}), vo = /* @__PURE__ */ W(po, [["__scopeId", "data-v-42d581c9"]]), mo = {
  key: 1,
  class: "list-wrapper"
}, yo = { class: "header-mobile-actions" }, bo = {
  key: 0,
  class: "changelog-content"
}, wo = { class: "changelog-items" }, ko = {
  key: 1,
  class: "hrn-error-box"
}, xo = {
  key: 2,
  class: "hrn-empty-box"
}, Co = {
  key: 3,
  class: "changelog-content"
}, _o = { class: "changelog-items" }, Io = ["onClick"], So = { class: "changelog-info" }, To = { class: "changelog-header" }, $o = { class: "changelog-date" }, Eo = { class: "changelog-badge" }, Lo = { class: "changelog-body" }, Uo = { class: "changelog-title" }, Ao = { class: "changelog-desc" }, Mo = {
  key: 0,
  class: "changelog-thumbnail"
}, Po = ["src", "alt"], Do = {
  key: 0,
  class: "changelog-item"
}, jo = {
  key: 1,
  class: "changelog-load-more-error"
}, zo = {
  key: 4,
  class: "changelog-reached-end",
  style: { "margin-top": "24px" }
}, Oo = "solar:bell-bold", Fo = /* @__PURE__ */ q({
  __name: "ChangelogDrawer",
  props: {
    open: { type: Boolean, default: void 0 },
    teleport: { type: Boolean, default: !0 },
    title: { default: "تغییرات اخیر" },
    subtitle: { default: "نمایش نسخه‌های منتشر شده و تغییرات آن" }
  },
  emits: ["update:open", "navigate"],
  setup(e, { emit: t }) {
    const n = e, s = t, o = xe(), i = E({
      get: () => n.open !== void 0 ? n.open : o.isOpen.value,
      set: (y) => {
        s("update:open", y), y ? o.openDrawer() : o.closeDrawer();
      }
    }), l = E({
      get: () => o.panelSize.value,
      set: (y) => o.setPanelSize(y)
    }), r = E(() => o.changelogs.value), c = E(() => o.selectedChangelog.value), d = E(() => o.loading.value), u = E(() => o.loadingMore.value), v = E(() => o.detailLoading.value), p = E(() => o.error.value), w = E(() => o.loadMoreError.value), $ = E(() => o.reachedEnd.value);
    He(() => {
      o.fetchChangelogs();
    }), dt(
      () => n.open,
      (y) => {
        y === !0 ? o.openDrawer() : y === !1 && o.closeDrawer();
      }
    );
    const h = () => {
      f();
    }, f = () => {
      i.value = !1, o.closeDrawer();
    }, j = (y) => {
      o.selectChangelog(y);
    }, M = () => {
      o.goBack();
    }, S = () => {
      o.refresh();
    }, L = () => {
      o.retryLoadMore();
    }, G = (y) => {
      const b = y.target;
      if (!b) return;
      b.scrollHeight - b.scrollTop - b.clientHeight <= 50 && o.fetchNextPage();
    };
    return (y, b) => (g(), le(ft, {
      to: "body",
      disabled: !e.teleport
    }, [
      i.value ? (g(), m("div", {
        key: 0,
        class: "hrn-global-blur-wrapper",
        onClick: h
      })) : C("", !0),
      a("div", {
        class: A(["hrn-drawer-root", {
          "is-open": i.value,
          [`size-${l.value}`]: !0
        }]),
        dir: "rtl"
      }, [
        a("div", {
          class: A(["hrn-drawer-content", `size-${l.value}`])
        }, [
          c.value ? (g(), le(ot, {
            key: 0,
            "selected-changelog": c.value,
            "detail-loading": v.value,
            onBack: M,
            onClose: f,
            onRefresh: S,
            onNavigate: b[0] || (b[0] = (k) => y.$emit("navigate", k))
          }, null, 8, ["selected-changelog", "detail-loading"])) : (g(), m("div", mo, [
            T(nt, {
              "start-icon": Oo,
              "start-icon-bg-color": "bg-info-8",
              "start-icon-text-color": "text-info-100",
              title: e.title,
              subtitle: e.subtitle,
              style: { margin: "20px !important" }
            }, {
              default: Re(() => [
                a("div", yo, [
                  a("button", {
                    type: "button",
                    class: "mobile-action-btn refresh-btn",
                    onClick: X(S, ["stop"]),
                    title: "به‌روزرسانی"
                  }, [
                    T(x(U), { icon: "solar:restart-bold" })
                  ]),
                  a("button", {
                    type: "button",
                    class: "mobile-action-btn close-btn",
                    onClick: X(f, ["stop"]),
                    title: "بستن"
                  }, [
                    T(x(U), { icon: "solar:close-circle-bold-duotone" })
                  ])
                ])
              ]),
              _: 1
            }, 8, ["title", "subtitle"]),
            b[8] || (b[8] = a("div", { class: "hrn-divider" }, null, -1)),
            a("div", {
              class: "changelog-container hide-scrollbar",
              onScroll: G
            }, [
              d.value && r.value.length === 0 ? (g(), m("div", bo, [
                b[3] || (b[3] = a("div", { class: "changelog-timeline" }, [
                  a("div", { class: "changelog-timeline-bar" })
                ], -1)),
                a("div", wo, [
                  (g(), m(D, null, H(3, (k) => a("div", {
                    key: k,
                    class: "changelog-item"
                  }, [...b[2] || (b[2] = [
                    a("div", { class: "changelog-info" }, [
                      a("div", {
                        class: "changelog-header",
                        style: { gap: "8px" }
                      }, [
                        a("span", {
                          class: "skeleton",
                          style: { width: "80px", height: "16px" }
                        }),
                        a("span", {
                          class: "skeleton",
                          style: { width: "60px", height: "16px", "border-radius": "999px" }
                        })
                      ]),
                      a("div", {
                        class: "changelog-body",
                        style: { "margin-top": "6px" }
                      }, [
                        a("div", {
                          class: "skeleton",
                          style: { width: "70%", height: "22px" }
                        }),
                        a("div", { style: { display: "flex", "flex-direction": "column", gap: "6px", "margin-top": "4px" } }, [
                          a("div", {
                            class: "skeleton",
                            style: { width: "100%", height: "14px" }
                          }),
                          a("div", {
                            class: "skeleton",
                            style: { width: "100%", height: "14px" }
                          }),
                          a("div", {
                            class: "skeleton",
                            style: { width: "60%", height: "14px" }
                          })
                        ])
                      ])
                    ], -1),
                    a("div", { class: "changelog-thumbnail" }, [
                      a("div", {
                        class: "skeleton",
                        style: { width: "100%", height: "100%", "border-radius": "12px" }
                      })
                    ], -1),
                    a("div", { class: "changelog-dot" }, [
                      a("div", {
                        class: "skeleton",
                        style: { width: "6px", height: "6px", "border-radius": "50%" }
                      })
                    ], -1)
                  ])])), 64))
                ])
              ])) : p.value && r.value.length === 0 ? (g(), m("div", ko, [
                a("span", null, _(p.value), 1),
                a("button", {
                  class: "btn-retry",
                  onClick: S
                }, "تلاش مجدد")
              ])) : r.value.length === 0 && !d.value ? (g(), m("div", xo, " تغییری برای نمایش وجود ندارد ")) : (g(), m("div", Co, [
                b[7] || (b[7] = a("div", { class: "changelog-timeline" }, [
                  a("div", { class: "changelog-timeline-bar" })
                ], -1)),
                a("div", _o, [
                  (g(!0), m(D, null, H(r.value, (k, O) => (g(), m("div", {
                    key: k.id ?? O,
                    class: A(["changelog-item", `type-${k.type}`]),
                    onClick: (z) => j(k)
                  }, [
                    a("div", So, [
                      a("div", To, [
                        a("span", $o, _(k.date), 1),
                        a("span", Eo, "نسخه " + _(k.version), 1)
                      ]),
                      a("div", Lo, [
                        a("h5", Uo, _(k.title), 1),
                        a("p", Ao, _(k.description), 1)
                      ])
                    ]),
                    k.thumbnail ? (g(), m("div", Mo, [
                      a("img", {
                        src: k.thumbnail,
                        alt: k.title
                      }, null, 8, Po)
                    ])) : C("", !0),
                    b[4] || (b[4] = a("div", { class: "changelog-dot" }, null, -1))
                  ], 10, Io))), 128)),
                  u.value ? (g(), m("div", Do, [...b[5] || (b[5] = [
                    a("div", { class: "changelog-info" }, [
                      a("div", {
                        class: "changelog-header",
                        style: { gap: "8px" }
                      }, [
                        a("span", {
                          class: "skeleton",
                          style: { width: "80px", height: "16px" }
                        }),
                        a("span", {
                          class: "skeleton",
                          style: { width: "60px", height: "16px", "border-radius": "999px" }
                        })
                      ]),
                      a("div", {
                        class: "changelog-body",
                        style: { "margin-top": "6px" }
                      }, [
                        a("div", {
                          class: "skeleton",
                          style: { width: "70%", height: "22px" }
                        }),
                        a("div", { style: { display: "flex", "flex-direction": "column", gap: "6px", "margin-top": "4px" } }, [
                          a("div", {
                            class: "skeleton",
                            style: { width: "100%", height: "14px" }
                          }),
                          a("div", {
                            class: "skeleton",
                            style: { width: "60%", height: "14px" }
                          })
                        ])
                      ])
                    ], -1),
                    a("div", { class: "changelog-thumbnail" }, [
                      a("div", {
                        class: "skeleton",
                        style: { width: "100%", height: "100%", "border-radius": "12px" }
                      })
                    ], -1),
                    a("div", { class: "changelog-dot" }, [
                      a("div", {
                        class: "skeleton",
                        style: { width: "6px", height: "6px", "border-radius": "50%" }
                      })
                    ], -1)
                  ])])) : C("", !0),
                  w.value ? (g(), m("div", jo, [
                    b[6] || (b[6] = a("span", null, "خطا در دریافت اطلاعات صفحات بعدی", -1)),
                    a("button", {
                      class: "btn-retry",
                      onClick: L
                    }, "تلاش مجدد")
                  ])) : C("", !0)
                ])
              ])),
              $.value && r.value.length > 0 ? (g(), m("div", zo, " به انتهای لیست رسیدید ")) : C("", !0)
            ], 32)
          ])),
          T(vo, {
            modelValue: l.value,
            "onUpdate:modelValue": b[1] || (b[1] = (k) => l.value = k),
            "show-refresh": !0,
            class: "hrn-floating-actions",
            onClose: f,
            onRefresh: S
          }, null, 8, ["modelValue"])
        ], 2)
      ], 2)
    ], 8, ["disabled"]));
  }
}), Ne = /* @__PURE__ */ W(Fo, [["__scopeId", "data-v-5555bbb7"]]), No = ["title"], Bo = {
  key: 0,
  class: "hrn-unread-indicator"
}, Ro = /* @__PURE__ */ q({
  __name: "ChangelogTriggerButton",
  props: {
    title: { default: "تغییرات اخیر و یادداشت‌های انتشار" }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t, { isOpen: s, hasUnread: o, toggleDrawer: i } = xe(), l = () => {
      i(), n("click");
    };
    return (r, c) => (g(), m("button", {
      type: "button",
      class: A(["hrn-trigger-btn", {
        "is-active": x(s),
        "has-unread": x(o)
      }]),
      title: e.title,
      onClick: l
    }, [
      T(x(U), {
        icon: x(s) ? "solar:bell-bold" : "solar:bell-bold-duotone",
        class: "hrn-trigger-icon"
      }, null, 8, ["icon"]),
      x(o) ? (g(), m("span", Bo, [...c[0] || (c[0] = [
        a("span", { class: "hrn-unread-ping" }, null, -1),
        a("span", { class: "hrn-unread-dot" }, null, -1)
      ])])) : C("", !0)
    ], 10, No));
  }
}), Be = /* @__PURE__ */ W(Ro, [["__scopeId", "data-v-ed12ebc0"]]), qo = {
  install(e, t) {
    t && mt(t), e.component("ChangelogDrawer", Ne), e.component("HamafzarRNDrawer", Ne), e.component("ChangelogTriggerButton", Be), e.component("HamafzarRNTrigger", Be), e.component("ChangelogDetail", ot);
  }
};
export {
  vo as ChangelogActions,
  ot as ChangelogDetail,
  Ne as ChangelogDrawer,
  pt as ChangelogService,
  Be as ChangelogTriggerButton,
  Tn as ClusterLinkSvg,
  nt as ComplexCardHeader,
  gt as MOCK_CHANGELOGS,
  Ve as changelogService,
  mt as configureHamafzarRN,
  qo as default,
  fe as mapRawToChangelog,
  xe as useChangelog,
  uo as useWindowSize
};
//# sourceMappingURL=index.js.map
