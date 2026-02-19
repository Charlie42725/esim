# eSIM 官網 — 完整 UI/UX 設計規格書

> 專為台灣出國旅客設計 | Mobile First | Conversion Driven
> Tech Stack: Next.js 14 (App Router) + Tailwind CSS 3.4
> 最後更新: 2026-02-20

---

## 目錄

1. [設計系統：顏色](#1-顏色系統)
2. [設計系統：字級](#2-字級系統)
3. [設計系統：間距](#3-間距系統)
4. [首頁結構 Section by Section](#4-首頁結構)
5. [每個區塊 UI 排版說明](#5-區塊-ui-排版說明)
6. [手機版版面說明](#6-手機版版面說明)
7. [CTA 設計邏輯](#7-cta-設計邏輯)
8. [轉換率優化設計理由](#8-轉換率優化設計理由)
9. [結帳頁 UX 設計](#9-結帳頁-ux-設計)
10. [訂單完成頁設計](#10-訂單完成頁設計)
11. [技術實作指引](#11-技術實作指引)

---

## 1. 顏色系統

### 設計理念

結合「科技信任感」與「旅遊冒險感」。以深藍為品牌主色建立信任，
橘色 CTA 製造強烈視覺對比驅動點擊，淺藍背景保持通透清爽。

### 色票表

| 角色 | 色名 | HEX | Tailwind Token | 用途 |
|------|------|-----|----------------|------|
| **Primary** | Sky Blue | `#0EA5E9` | `primary` | 品牌色、標題強調、連結 |
| **Primary Dark** | Deep Blue | `#0369A1` | `primary-dark` | Hover 狀態、深色文字強調 |
| **Primary Light** | Ice Blue | `#E0F2FE` | `primary-light` | 卡片背景、Tag 背景 |
| **CTA** | Tangerine | `#F97316` | `cta` | 所有行動按鈕、價格標記 |
| **CTA Hover** | Deep Orange | `#EA580C` | `cta-hover` | CTA Hover 狀態 |
| **Background** | Snow | `#F8FAFC` | `bg-base` | 頁面底色 |
| **Surface** | White | `#FFFFFF` | `bg-surface` | 卡片、表單背景 |
| **Text Primary** | Slate 900 | `#0F172A` | `text-primary` | 主要文字 |
| **Text Secondary** | Slate 600 | `#475569` | `text-secondary` | 輔助說明文字 |
| **Text Muted** | Slate 400 | `#94A3B8` | `text-muted` | 最低層級提示文字 |
| **Border** | Slate 200 | `#E2E8F0` | `border-default` | 卡片邊框、分隔線 |
| **Success** | Green 500 | `#22C55E` | `success` | 成功狀態、安裝完成 |
| **Error** | Red 500 | `#EF4444` | `error` | 錯誤提示 |

### Tailwind 設定

```js
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#0EA5E9',
    dark: '#0369A1',
    light: '#E0F2FE',
  },
  cta: {
    DEFAULT: '#F97316',
    hover: '#EA580C',
  },
  surface: '#FFFFFF',
  base: '#F8FAFC',
}
```

### 對比度檢查

| 組合 | 對比度 | 結果 |
|------|--------|------|
| `#0F172A` on `#F8FAFC` | 17.4:1 | PASS AAA |
| `#FFFFFF` on `#F97316` | 3.2:1 | 大字 PASS（按鈕用 16px+ Bold） |
| `#FFFFFF` on `#0EA5E9` | 3.5:1 | 大字 PASS |
| `#0F172A` on `#E0F2FE` | 14.8:1 | PASS AAA |

> CTA 按鈕使用白色粗體文字 + 大字體確保可讀性

---

## 2. 字級系統

### 字體選擇

| 用途 | 字體 | 備選 | 說明 |
|------|------|------|------|
| **英文標題** | Space Grotesk | sans-serif | 科技感、幾何、現代 |
| **英文內文** | DM Sans | sans-serif | 高可讀性、乾淨 |
| **中文** | Noto Sans TC | sans-serif | 台灣繁體中文最佳支援 |

### Google Fonts 載入

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&display=swap');
```

### Tailwind Config

```js
fontFamily: {
  heading: ['Space Grotesk', 'Noto Sans TC', 'sans-serif'],
  body: ['DM Sans', 'Noto Sans TC', 'sans-serif'],
}
```

### 字級規格表

| Token | 手機 (< 768px) | 桌面 (>= 768px) | Weight | Line Height | 用途 |
|-------|----------------|-----------------|--------|-------------|------|
| **H1** | 28px / `text-[28px]` | 48px / `text-5xl` | 700 | 1.2 | Hero 主標題（僅一處） |
| **H2** | 22px / `text-[22px]` | 36px / `text-4xl` | 600 | 1.3 | Section 標題 |
| **H3** | 18px / `text-lg` | 24px / `text-2xl` | 600 | 1.4 | 卡片標題、子標題 |
| **Body** | 16px / `text-base` | 16px / `text-base` | 400 | 1.6 | 內文（最小字級） |
| **Body Bold** | 16px / `text-base` | 16px / `text-base` | 700 | 1.6 | 價格、重點 |
| **Small** | 14px / `text-sm` | 14px / `text-sm` | 400 | 1.5 | 標籤、註腳（僅輔助） |
| **Button** | 16px / `text-base` | 16px / `text-base` | 700 | 1 | 按鈕文字 |
| **Price** | 28px / `text-[28px]` | 32px / `text-[32px]` | 700 | 1.1 | 價格數字 |

> 嚴格規則：手機上不得出現小於 16px 的主要內容文字。14px 僅限標籤/註腳。

---

## 3. 間距系統

### 設計原則

基於 **8px grid**，所有間距為 8 的倍數，確保一致的視覺節奏。

### 間距規格

| Token | 值 | Tailwind | 用途 |
|-------|-----|---------|------|
| `space-xs` | 4px | `p-1` | 圖標與文字間隙 |
| `space-sm` | 8px | `p-2` | 元素內部緊湊間距 |
| `space-md` | 16px | `p-4` | 卡片內部 padding |
| `space-lg` | 24px | `p-6` | Section 內部間距 |
| `space-xl` | 32px | `p-8` | 區塊間分隔 |
| `space-2xl` | 48px | `p-12` | Section 上下間距（手機） |
| `space-3xl` | 64px | `p-16` | Section 上下間距（桌面） |
| `space-4xl` | 80px | `p-20` | Hero 區間距 |

### 頁面結構間距

```
手機版:
├── 頁面左右 padding: 16px (px-4)
├── Section 間距: 48px (py-12)
├── 卡片間距: 16px (gap-4)
├── 卡片內 padding: 16px (p-4)
└── 元素間距: 16px-24px (space-y-4 / space-y-6)

桌面版:
├── 最大寬度: 1200px (max-w-6xl mx-auto)
├── 頁面左右 padding: 24px (px-6)
├── Section 間距: 64px-80px (py-16 / py-20)
├── 卡片間距: 24px (gap-6)
├── 卡片內 padding: 24px (p-6)
└── 元素間距: 24px-32px (space-y-6 / space-y-8)
```

### Z-Index 管理

| 層級 | z-index | 用途 |
|------|---------|------|
| Base | `z-0` | 一般內容 |
| Card Hover | `z-10` | 卡片提升效果 |
| Sticky Header | `z-40` | 固定導覽列 |
| Floating CTA | `z-40` | 浮動按鈕 |
| Line Button | `z-50` | 浮動客服按鈕 |
| Modal/Overlay | `z-50` | 彈窗 |

---

## 4. 首頁結構

### 轉換漏斗思維 — 由上到下的說服邏輯

```
秒數    Section                     說服目的
────────────────────────────────────────────────
0-3s    [1] Hero                    → 知道賣什麼、能解決什麼
3-10s   [2] 熱門國家卡片             → 看到產品與價格
10-20s  [3] 為什麼選我們             → 建立信任
20-30s  [4] 三步驟使用流程           → 消除疑慮（很簡單）
30s+    [5] 安裝教學入口             → 預先解答「怎麼用」
30s+    [6] FAQ                     → 清除最後障礙
30s+    [7] 最後強 CTA              → 最終推動
────────────────────────────────────────────────
全程     浮動 Line 客服按鈕          → 隨時救援
全程     Sticky Bottom CTA Bar      → 隨時可買（手機）
```

### 頁面路由結構

```
/                    首頁
/country/[slug]      國家方案頁（如 /country/japan）
/checkout            結帳頁
/order-complete      訂單完成頁
/install-guide       安裝教學頁
```

---

## 5. 區塊 UI 排版說明

### Section 1: Hero 區

**目的**：3 秒內傳達價值主張，讓使用者立即行動

```
┌─────────────────────────────────┐
│  [Logo]           [安裝教學]    │  ← 極簡導覽列
├─────────────────────────────────┤
│                                 │
│    出國上網                      │  ← H1 主標題
│    3 分鐘搞定                    │
│                                 │
│    免換卡・掃碼即用               │  ← 副標題 Body
│    日韓東南亞超過 50 國           │
│                                 │
│  ┌─────────────────────────┐    │
│  │  🔍 你要去哪個國家？     │    │  ← 搜尋框（核心互動）
│  └─────────────────────────┘    │
│                                 │
│  ★ 4.9 | 10,000+ 旅客使用      │  ← 信任指標（一行）
│                                 │
└─────────────────────────────────┘
```

**排版規格**：
- 背景：淺藍漸層 `bg-gradient-to-b from-primary-light to-base`
- 主標題：H1，`font-heading font-bold`，`text-primary-dark`
- 副標題：Body，`text-secondary`
- 搜尋框：全寬 `w-full`，高度 56px，圓角 `rounded-xl`，有放大鏡 icon
- 信任指標：`text-sm text-secondary`，星星用 SVG icon（不用 emoji）
- 手機 padding-top: 80px（為 sticky header 讓路）

**互動邏輯**：
- 搜尋框 focus 時展開下拉建議清單（熱門國家）
- 也可直接點擊下方國家卡片

---

### Section 2: 熱門國家卡片

**目的**：10 秒內看到產品與價格

```
手機版 (2 欄):
┌───────┐ ┌───────┐
│ 🇯🇵    │ │ 🇰🇷    │   ← 國旗用 SVG/圖片
│ 日本   │ │ 韓國   │   ← 國家名 H3
│ NT$149 │ │ NT$129 │   ← 起始價（醒目）
│  起    │ │  起    │
└───────┘ └───────┘
┌───────┐ ┌───────┐
│ 🇹🇭    │ │ 🇻🇳    │
│ 泰國   │ │ 越南   │
│ NT$99  │ │ NT$89  │
│  起    │ │  起    │
└───────┘ └───────┘

      [ 查看全部國家 → ]        ← 文字連結
```

**排版規格**：
- Section 標題：H2「熱門目的地」置中
- 卡片容器：`grid grid-cols-2 gap-4`（手機）`grid-cols-4 gap-6`（桌面）
- 卡片：`bg-surface rounded-2xl p-4 border border-default`
- 卡片 hover：`hover:border-primary hover:shadow-md transition-all duration-200`
- 國旗：40x40 圓形圖片
- 國家名：H3 `font-heading font-semibold`
- 價格：Price token `text-cta font-bold text-[28px]`
- 「起」字：`text-sm text-secondary`
- 整張卡片可點擊 `cursor-pointer`
- 點擊導向 `/country/[slug]`

---

### Section 3: 為什麼選我們

**目的**：建立信任，消除「會不會是詐騙」的疑慮

```
┌─────────────────────────────────┐
│      為什麼旅客都選我們？         │  ← H2 置中
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │ [icon]   │  │ [icon]   │    │  ← 2 欄（手機）
│  │ 免換 SIM │  │ 即買即用  │    │
│  │ 卡        │  │          │    │
│  │ 保留原號.. │  │ 下單後3分 │    │
│  └──────────┘  │ 鐘內啟用  │    │
│                 └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │ [icon]   │  │ [icon]   │    │
│  │ 穩定網路  │  │ 中文客服  │    │
│  │ 當地電信.. │  │ LINE即時  │    │
│  └──────────┘  │ 回覆..    │    │
│                 └──────────┘    │
└─────────────────────────────────┘
```

**排版規格**：
- 背景：`bg-surface`（白色區段做區隔）
- 容器：`grid grid-cols-2 gap-4`（手機）`grid-cols-4 gap-6`（桌面）
- 圖標：Lucide icon，32x32，`text-primary`
- 標題：H3 `font-semibold`
- 說明：Body `text-secondary`，2-3 行以內
- 4 個賣點：免換卡、即買即用、穩定網路、中文客服

---

### Section 4: 三步驟使用流程

**目的**：讓使用者覺得「這很簡單我一定會」

```
┌─────────────────────────────────┐
│       只要 3 步驟                │  ← H2
│                                 │
│     ①                           │
│     [icon: ShoppingCart]        │
│     選擇國家方案                 │
│     挑選目的地與天數              │
│          ↓                      │
│     ②                           │
│     [icon: CreditCard]          │
│     線上付款                     │
│     支援信用卡、LINE Pay         │
│          ↓                      │
│     ③                           │
│     [icon: QrCode]              │
│     掃碼安裝                     │
│     掃描 QR Code 即完成          │
│                                 │
│  ┌─────────────────────────┐    │
│  │     立即選購 eSIM →      │    │  ← CTA 按鈕
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**排版規格**：
- 手機：垂直排列，用虛線連接步驟
- 桌面：水平 3 欄 `grid-cols-3 gap-8`
- 步驟編號：48px 圓形 `bg-primary text-white rounded-full` 內含數字
- 圖標：Lucide icon 40x40 `text-primary`
- 步驟名：H3 `font-semibold`
- 說明：Body `text-secondary`
- 底部 CTA 按鈕

---

### Section 5: 安裝教學入口

**目的**：預先回答「eSIM 怎麼裝？」降低知識門檻

```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │   [手機安裝示意圖]        │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│    不會安裝？看這篇就懂          │  ← H2
│    圖文教學帶你一步步完成         │  ← Body
│                                 │
│  ┌─────────────────────────┐    │
│  │   查看安裝教學 →          │    │  ← 次要按鈕
│  └─────────────────────────┘    │
│                                 │
│  支援 iPhone / Android          │  ← Small 文字
└─────────────────────────────────┘
```

**排版規格**：
- 背景：`bg-primary-light`
- 示意圖：`next/image`，`priority={false}`，`loading="lazy"`
- 按鈕：outlined style `border-2 border-primary text-primary`
- 手機上圖片在上方、文字在下方

---

### Section 6: FAQ

**目的**：清除最後購買障礙

```
┌─────────────────────────────────┐
│        常見問題                  │  ← H2
│                                 │
│  ┌─────────────────────────┐    │
│  │ 什麼是 eSIM？         ＞ │    │  ← Accordion
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 我的手機支援 eSIM 嗎？ ＞ │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 可以退款嗎？          ＞ │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 到當地要怎麼啟用？    ＞ │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ 流量用完怎麼辦？      ＞ │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**排版規格**：
- Accordion 元件，一次只展開一個
- 每個項目最小高度 56px（touch friendly）
- 展開區域：`text-secondary text-base leading-relaxed`
- 分隔線：`border-b border-default`
- 箭頭圖標：Lucide `ChevronDown`，展開時旋轉 180°
- `transition-transform duration-200`

---

### Section 7: 最後強 CTA

**目的**：最後一推，驅動猶豫者下單

```
┌─────────────────────────────────┐
│                                 │
│    準備好出發了嗎？              │  ← H2
│    選好國家，3 分鐘搞定上網      │  ← Body
│                                 │
│  ┌─────────────────────────┐    │
│  │    立即選購 eSIM →       │    │  ← Primary CTA
│  └─────────────────────────┘    │
│                                 │
│  有問題？LINE 我們 💬           │  ← 文字連結
│                                 │
└─────────────────────────────────┘
```

**排版規格**：
- 背景：`bg-gradient-to-b from-primary-light to-base`
- 文字置中
- CTA 同 Hero 規格
- LINE 連結：`text-primary underline`

---

## 6. 手機版版面說明

### 核心原則

```
拇指操作熱區（Thumb Zone）:

  ┌──────────────┐
  │  😫 難觸及    │  ← 放純展示內容（標題、圖片）
  │              │
  │  👍 舒適區    │  ← 放捲動內容
  │              │
  │  ✅ 最佳區    │  ← 放 CTA 按鈕、主要互動
  └──────────────┘
```

### 全局手機版規則

| 項目 | 規格 |
|------|------|
| Viewport | `width=device-width, initial-scale=1` |
| 頁面 padding | `px-4`（16px 左右） |
| 最小 touch target | 48px（我們比標準 44px 更寬鬆） |
| touch target 間距 | 至少 `gap-2`（8px） |
| 按鈕寬度 | `w-full`（全寬） |
| 按鈕高度 | `h-12`（48px）至 `h-14`（56px） |
| 最小字體 | 16px（`text-base`） |
| 水平捲動 | 禁止（`overflow-x-hidden`） |
| tap delay | `touch-action: manipulation` 全域套用 |
| overscroll | `overscroll-behavior: contain` |
| Section 高度 | 不超過 1.2 個螢幕高度（約 780px @ 667px vh） |

### Sticky Bottom CTA Bar（手機專用）

```
┌──────────────────────────────────┐
│  NT$149 起        [立即選購 →]   │  ← 固定底部
└──────────────────────────────────┘
  48px 高度 | safe-area-inset-bottom
```

**規格**：
- 位置：`fixed bottom-0 left-0 right-0`
- 高度：`h-16`（64px 含 padding）
- `pb-[env(safe-area-inset-bottom)]`（iPhone 底部安全區域）
- 背景：`bg-surface border-t border-default shadow-lg`
- 顯示時機：當 Hero CTA 捲出視窗時才顯示
- 桌面版隱藏：`md:hidden`

### 浮動 LINE 客服按鈕

```
                    ┌────┐
                    │LINE│  ← 右下角浮動
                    └────┘
```

**規格**：
- 位置：`fixed bottom-24 right-4`（在 sticky CTA 上方）
- 大小：`w-14 h-14`（56px 圓形）
- `rounded-full bg-[#06C755] text-white shadow-lg`
- 使用 LINE 官方 SVG icon
- `z-50`

### 各 Section 手機版高度控制

| Section | 預估高度 | 是否超過 1.2 vh |
|---------|---------|----------------|
| Hero | ~400px | 否（0.6vh） |
| 熱門國家 | ~500px（4 國） | 否（0.75vh） |
| 為什麼選我們 | ~400px | 否（0.6vh） |
| 三步驟 | ~500px | 否（0.75vh） |
| 安裝教學 | ~350px | 否（0.5vh） |
| FAQ | ~400px（收合） | 否（0.6vh） |
| 最後 CTA | ~250px | 否（0.4vh） |

---

## 7. CTA 設計邏輯

### CTA 層級系統

| 層級 | 樣式 | 使用場景 |
|------|------|---------|
| **Primary CTA** | `bg-cta text-white font-bold h-14 rounded-xl w-full` | 立即選購、結帳付款 |
| **Secondary CTA** | `border-2 border-primary text-primary font-bold h-12 rounded-xl w-full` | 查看教學、查看全部 |
| **Ghost CTA** | `text-primary font-medium underline` | LINE 聯繫、查看詳情 |

### Primary CTA 完整 Tailwind Class

```html
<button class="
  w-full h-14
  bg-cta hover:bg-cta-hover active:bg-cta-hover
  text-white text-base font-bold
  rounded-xl
  transition-colors duration-200
  touch-action-manipulation
  cursor-pointer
  flex items-center justify-center gap-2
">
  立即選購 eSIM
  <ArrowRight class="w-5 h-5" />
</button>
```

### CTA 出現位置

```
Hero 區:              搜尋框（變體 CTA）
熱門國家:              國家卡片本身可點擊
三步驟:                底部 Primary CTA
安裝教學:              Secondary CTA
最後 CTA:             Primary CTA
Sticky Bottom:        Primary CTA（手機）
每個國家方案頁:         Primary CTA
結帳頁:                Primary CTA（付款）
```

### CTA 文案規則

| 場景 | 文案 | 理由 |
|------|------|------|
| Hero | 你要去哪個國家？（搜尋框） | 行動導向，降低決策門檻 |
| 三步驟底部 | 立即選購 eSIM → | 明確行動 |
| 最後 CTA | 立即選購 eSIM → | 重複強化 |
| Sticky Bottom | 立即選購 → | 簡短 + 箭頭 |
| 結帳頁 | 確認付款 NT$XXX | 金額透明 |

> 規則：CTA 文案必須包含動詞 + 箭頭（→），讓使用者知道點了會發生什麼

---

## 8. 轉換率優化設計理由

### 3 秒原則：知道賣什麼

| 設計決策 | 理由 |
|----------|------|
| Hero 標題「出國上網 3 分鐘搞定」 | 一句話概括核心價值 |
| 搜尋框放最顯眼位置 | 立即引導行動，跳過瀏覽 |
| 無漢堡選單、無複雜導覽 | 減少分心，專注轉換 |
| 信任指標（4.9 星 + 人數）放 Hero | 第一眼建立信任 |

### 10 秒原則：看到價格

| 設計決策 | 理由 |
|----------|------|
| 熱門國家卡片直接顯示「NT$XXX 起」 | 價格透明降低焦慮 |
| 卡片排在 Hero 正下方 | 不需要捲太久就能看到產品 |
| 2 欄卡片（手機）一次看到 4 個國家 | 資訊密度最佳化 |
| 價格用 CTA 色（橘色）+ 大字 | 視覺層級最高 |

### 30 秒原則：可完成下單

| 設計決策 | 理由 |
|----------|------|
| 國家卡片直接連到方案頁 | 最短路徑：首頁 → 方案 → 結帳 |
| 不需要會員系統 | 零摩擦，不需要註冊 |
| 結帳頁單頁完成 | 不拆步驟，減少流失 |
| 表單只要 Email + 付款 | 最少欄位原則 |

### 信任建立策略

| 位置 | 信任元素 |
|------|----------|
| Hero | ★ 4.9 評分 + 10,000+ 使用者 |
| 為什麼選我們 | 中文客服 + LINE 即時回覆 |
| FAQ | 退款政策透明 |
| Footer | 公司名稱 + 統一編號 |
| 全站 | 浮動 LINE 按鈕（隨時可問） |
| 結帳頁 | SSL 安全標誌 + 付款 Logo |

### 減少認知負擔策略

| 策略 | 實作 |
|------|------|
| 不要讓使用者思考 | 預設推薦最熱門方案 |
| 減少選擇 | 每個國家最多 3-4 個方案 |
| 視覺引導 | 用「最受歡迎」標籤標記推薦方案 |
| 漸進式揭露 | FAQ 折疊、教學獨立頁 |
| 一致的互動模式 | 全站按鈕樣式統一 |

---

## 9. 結帳頁 UX 設計

### 設計目標

> 單頁結帳、零帳號、最少欄位、30 秒完成

### 頁面結構

```
┌──────────────────────────────────┐
│  ← 返回        結帳              │  ← 極簡 Header
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐  │
│  │ 🇯🇵 日本 7天 3GB eSIM      │  │  ← 訂單摘要卡片
│  │                            │  │
│  │ 天數: 7 天                  │  │
│  │ 流量: 3GB                   │  │
│  │ ──────────────             │  │
│  │ 小計         NT$299        │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 聯絡資訊                    │  │  ← 表單區塊
│  │                            │  │
│  │ Email *                    │  │  ← 只要 Email
│  │ ┌────────────────────────┐ │  │
│  │ │ your@email.com         │ │  │  ← inputmode="email"
│  │ └────────────────────────┘ │  │
│  │ （QR Code 會寄到此信箱）    │  │  ← 說明文字
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 付款方式                    │  │  ← 付款區塊
│  │                            │  │
│  │ ┌─────┐ ┌─────┐ ┌─────┐  │  │
│  │ │ 信用 │ │ LINE│ │ Apple│  │  │  ← 付款選項
│  │ │ 卡   │ │ Pay │ │ Pay │  │  │
│  │ └─────┘ └─────┘ └─────┘  │  │
│  │                            │  │
│  │ 卡號                       │  │
│  │ ┌────────────────────────┐ │  │
│  │ │                        │ │  │  ← inputmode="numeric"
│  │ └────────────────────────┘ │  │
│  │ 到期日        CVV          │  │
│  │ ┌──────────┐ ┌──────────┐ │  │
│  │ │ MM/YY    │ │ ***      │ │  │
│  │ └──────────┘ └──────────┘ │  │
│  └────────────────────────────┘  │
│                                  │
│  ☐ 我同意服務條款及隱私政策       │  │
│                                  │
│  ┌────────────────────────────┐  │
│  │     確認付款 NT$299 →      │  │  ← Primary CTA
│  └────────────────────────────┘  │
│                                  │
│  🔒 SSL 安全加密 | 付款由XX處理  │  ← 信任標記
│                                  │
└──────────────────────────────────┘
```

### 結帳頁設計規格

**表單欄位**：

| 欄位 | 必填 | inputmode | autocomplete | 說明 |
|------|------|-----------|--------------|------|
| Email | 是 | `email` | `email` | QR Code 寄送用 |
| 卡號 | 是 | `numeric` | `cc-number` | 16 碼自動分隔 |
| 到期日 | 是 | `numeric` | `cc-exp` | MM/YY 格式 |
| CVV | 是 | `numeric` | `cc-csc` | 3 碼 |

**表單 UX 規則**：
- 每個 input 高度：`h-12`（48px）
- Label 在 input 上方（非 placeholder only）
- 即時驗證（失焦時驗證，非送出後）
- 錯誤訊息紅色 `text-error text-sm`，出現在欄位下方
- Email 欄位下方灰字提示用途
- 卡號自動格式化：`XXXX XXXX XXXX XXXX`
- 表單用 `autocomplete` 屬性加速填寫

**付款按鈕**：
- 禁止連點：`disabled` + loading spinner during submit
- 文案包含金額：「確認付款 NT$299 →」
- Loading 狀態：「處理中...」+ spinner
- 成功後導向 `/order-complete`

**信任元素**：
- SSL 鎖頭 icon + 文字
- 付款處理商 Logo（如 Stripe/綠界）
- 服務條款連結

---

## 10. 訂單完成頁設計

### 設計目標

> 給使用者「搞定了！」的安心感 + 立即引導安裝

### 頁面結構

```
┌──────────────────────────────────┐
│            [Logo]                │
├──────────────────────────────────┤
│                                  │
│         ✓ 購買成功！              │  ← 成功 icon + H1
│                                  │
│  ┌────────────────────────────┐  │
│  │                            │  │
│  │    ┌──────────────────┐    │  │
│  │    │                  │    │  │
│  │    │   [QR Code]      │    │  │  ← QR Code 顯示
│  │    │                  │    │  │
│  │    └──────────────────┘    │  │
│  │                            │  │
│  │  日本 7天 3GB eSIM         │  │  ← 方案名稱
│  │  訂單編號: #ES20260220001 │  │
│  │                            │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │   查看安裝教學 →            │  │  ← Primary CTA
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │   下載 QR Code 圖片        │  │  ← Secondary CTA
│  └────────────────────────────┘  │
│                                  │
│  📧 QR Code 已寄送至           │
│     user@email.com              │
│                                  │
│  ──────────────────────────────  │
│                                  │
│  接下來怎麼做？                  │  ← H3
│                                  │
│  1. 到手機設定 > 行動網路        │
│  2. 新增 eSIM                   │
│  3. 掃描上方 QR Code            │
│  4. 到達目的地後開啟 eSIM       │
│                                  │
│  ──────────────────────────────  │
│                                  │
│  有問題？                        │
│  ┌────────────────────────────┐  │
│  │   LINE 聯繫客服             │  │  ← LINE 按鈕
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

### 訂單完成頁規格

**成功狀態**：
- 圓形打勾 icon：`w-16 h-16 bg-success rounded-full` 內含白色 Check icon
- 「購買成功！」：H1 `text-primary-dark`
- 輕微動畫：checkmark 的 scale from 0 → 1（`duration-300`，僅此一處動畫）

**QR Code 區域**：
- 白色卡片 `bg-surface rounded-2xl p-6 shadow-sm`
- QR Code 圖片：200x200（手機）/ 240x240（桌面）
- 下方顯示方案名稱 + 訂單編號

**行動引導**：
- Primary CTA：「查看安裝教學 →」— 最重要的下一步
- Secondary CTA：「下載 QR Code 圖片」— 備份用
- Email 通知確認文字
- 簡化版安裝步驟（4 步）

**注意事項**：
- 此頁不顯示返回首頁的導覽（避免誤觸離開）
- 底部提供 LINE 客服入口
- QR Code 要可以直接被手機相機掃描（高對比、足夠大）

---

## 11. 技術實作指引

### Next.js 架構

```
app/
├── layout.tsx              ← 全域 Layout（字型、Metadata）
├── page.tsx                ← 首頁
├── country/
│   └── [slug]/
│       └── page.tsx        ← 國家方案頁
├── checkout/
│   └── page.tsx            ← 結帳頁
├── order-complete/
│   └── page.tsx            ← 訂單完成頁
├── install-guide/
│   └── page.tsx            ← 安裝教學
└── components/
    ├── Header.tsx           ← 極簡導覽列
    ├── StickyBottomCTA.tsx  ← 手機固定底部 CTA
    ├── LineFloatingBtn.tsx  ← 浮動 LINE 按鈕
    ├── CountryCard.tsx      ← 國家卡片
    ├── PlanCard.tsx         ← 方案卡片（國家頁用）
    ├── FAQ.tsx              ← 折疊 FAQ
    ├── StepFlow.tsx         ← 三步驟流程
    └── Footer.tsx           ← Footer
```

### 效能要求

| 項目 | 目標 |
|------|------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Hero 圖片 | `priority` + WebP |
| 國旗圖片 | SVG 或 small PNG，lazy load |
| 字型 | `display=swap`，preconnect Google Fonts |
| 頁面 bundle | < 100KB (gzipped) per page |

### Metadata / SEO

```tsx
// app/layout.tsx
export const metadata = {
  title: 'eSIM 出國上網 | 日韓泰越 3分鐘搞定',
  description: '免換卡、掃碼即用。日本、韓國、泰國、越南 eSIM，NT$89 起。',
  openGraph: {
    images: ['/og.png'],
  },
}
```

### 全域 CSS 設定

```css
/* globals.css */
* {
  touch-action: manipulation; /* 消除 300ms tap delay */
}

html {
  overscroll-behavior: contain; /* 防止意外 pull-to-refresh */
  -webkit-tap-highlight-color: transparent;
}

input, select, textarea {
  font-size: 16px; /* 防止 iOS zoom on focus */
}
```

### 元件規範速查

| 元件 | 必要 Class |
|------|-----------|
| 所有按鈕 | `cursor-pointer touch-action-manipulation` |
| 可點擊卡片 | `cursor-pointer transition-all duration-200` |
| 圖片 | `next/image` + `alt` text |
| 輸入框 | `h-12 text-base rounded-lg` + `inputmode` + `autocomplete` |
| icon | Lucide React，`w-5 h-5` 或 `w-6 h-6` |
| 連結 | `focus:outline-2 focus:outline-primary` |

---

## 附錄：Pre-Delivery Checklist

在交付前逐項檢查：

- [ ] 所有按鈕高度 >= 48px
- [ ] 所有主要文字 >= 16px
- [ ] 沒有使用 emoji 作為 icon（全部用 SVG）
- [ ] 所有可點擊元素有 `cursor-pointer`
- [ ] 所有圖片有 `alt` 文字
- [ ] 手機版無水平捲動
- [ ] Sticky CTA 有 safe-area-inset-bottom
- [ ] 表單 input 有正確 `inputmode`
- [ ] 表單 input 有正確 `autocomplete`
- [ ] 375px 寬度下測試通過
- [ ] `prefers-reduced-motion` 有處理
- [ ] 焦點狀態（Focus ring）可見
- [ ] 顏色對比度 >= 4.5:1
- [ ] OpenGraph 圖片已設定
- [ ] LINE 浮動按鈕不遮擋內容
