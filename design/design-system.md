# Visual Design System: Kati Enterprise CRM (Sales Module)

> **Document Version:** 1.0.0  
> **Target Application:** Kati CRM — Enterprise Banking Sales Module (Diamond Trust Bank Africa)  
> **Source Documents:** `design/screen-inventory.md`, `design/ux-architecture.md`, `design/user-flows.md`, `design/navigation-model.md`, `design/responsive-strategy.md`  
> **Status:** Reusable Enterprise Design System (Mobile & Responsive Web)  

---

## 1. Executive Summary & Design System Foundations

The Kati CRM Visual Design System provides a cohesive, accessible, and high-performance design language tailored specifically for tier-1 enterprise banking environments. It bridges the operational rigor of Diamond Trust Bank (DTB) Africa with modern mobile-first usability standards.

### 1.1 Core Design Philosophy
1. **Clarity & Usability Over Decoration:** Every visual element, color token, and elevation layer serves an operational purpose. We strictly avoid superfluous gradients, random accent colors, non-standard corner radii, artificial glassmorphism, or AI-generated dashboard clutter.
2. **Deterministic Information Hierarchy:** Dense financial and lead data is structured using consistent typographic weights, subdued neutral surfaces, and intentional semantic color coding.
3. **Ergonomic Touch Targets:** All interactive mobile elements (buttons, inputs, chips, icons) strictly enforce a minimum touch target bounding box of **$\ge 48 \times 48\,\text{px}$** with generous touch-padding.
4. **WCAG 2.1 AA Compliance:** All text and interactive state combinations guarantee a minimum contrast ratio of **4.5:1** for normal text and **3.0:1** for large text and graphical UI components.

---

## 2. Color System & Semantic Palette

The color system is rooted in the dual identity of the application: Diamond Trust Bank's institutional heritage paired with Kati CRM's operational action palette.

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  PRIMARY ACTION  │  │  INSTITUTIONAL   │  │  SURFACE / BASE  │  │  STATUS SYSTEM   │
│  Kati Orange     │  │  DTB Maroon      │  │  Slate Neutral   │  │  7 Lifecycle     │
│  #EA580C (600)   │  │  #8B1D41 (600)   │  │  #F8FAFC (50)    │  │  Color Badges    │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 2.1 Primary Color (Kati Operational Orange)
Used for primary calls-to-action (Create Lead, Update Status, Submit), active bottom navigation indicators, primary tabs, and interactive focus rings.

| Token Name | Hex Code | RGB | HSL | Intended Usage |
|---|---|---|---|---|
| `color-primary-50` | `#FFF7ED` | `255, 247, 237` | `33, 100%, 96%` | Card selection tint, hover fill |
| `color-primary-100` | `#FFEDD5` | `255, 237, 213` | `34, 100%, 92%` | `Warm` status pill background |
| `color-primary-200` | `#FED7AA` | `254, 215, 170` | `32, 98%, 83%` | Active border highlight |
| `color-primary-500` | `#F97316` | `249, 115, 22` | `25, 95%, 53%` | Bright icon accents, badge counter |
| `color-primary-600` | `#EA580C` | `234, 88, 12` | `21, 90%, 48%` | **Base Primary:** Main buttons, FAB, active tabs |
| `color-primary-700` | `#C2410C` | `194, 65, 12` | `17, 88%, 40%` | Button active / pressed state |
| `color-primary-800` | `#9A3412` | `154, 52, 18` | `15, 79%, 34%` | High-contrast text on orange tints |

### 2.2 Secondary Color (DTB Institutional Burgundy / Maroon)
Used for institutional branding, corporate SSO authentication buttons, header branding accents, and enterprise tenant tags.

| Token Name | Hex Code | RGB | HSL | Intended Usage |
|---|---|---|---|---|
| `color-secondary-50` | `#FDF2F4` | `253, 242, 244` | `349, 69%, 97%` | Subtle corporate card tint |
| `color-secondary-100` | `#FCE7EB` | `252, 231, 235` | `349, 70%, 95%` | Corporate badge background |
| `color-secondary-600` | `#8B1D41` | `139, 29, 65` | `340, 65%, 33%` | **Base Secondary:** SSO button, DTB logo mark |
| `color-secondary-700` | `#731433` | `115, 20, 51` | `340, 70%, 26%` | Secondary button pressed state |
| `color-secondary-900` | `#4A0B20` | `74, 11, 32` | `340, 74%, 17%` | Deep institutional footer / drawer header |

### 2.3 Neutral & Surface Colors (Slate Gray System)
Neutral tones are meticulously calibrated with a subtle cool undertone to prevent visual glare and ensure crisp card separation.

| Token Name | Hex Code | Contrast on White | Intended Usage |
|---|---|---|---|
| `color-neutral-0` | `#FFFFFF` | 1.0:1 | Pure surface: card backgrounds, modals, sheets |
| `color-neutral-50` | `#F8FAFC` | 1.05:1 | **Canvas Background:** Main page body underlay |
| `color-neutral-100` | `#F1F5F9` | 1.13:1 | Subtle fill: input inactive fill, table zebra striping |
| `color-neutral-200` | `#E2E8F0` | 1.25:1 | **Default Border:** Card borders, sheet dividers, separators |
| `color-neutral-300` | `#CBD5E1` | 1.48:1 | Interactive border: default input field borders |
| `color-neutral-400` | `#94A3B8` | 2.12:1 | Disabled state, placeholder text, inactive icons |
| `color-neutral-500` | `#64748B` | 3.38:1 | Secondary icons, helper text, breadcrumbs |
| `color-neutral-600` | `#475569` | 5.38:1 | **Body Secondary:** Field labels, timestamps, metadata |
| `color-neutral-700` | `#334155` | 7.64:1 | Table headers, card subheadings, active icon fill |
| `color-neutral-800` | `#1E293B` | 11.2:1 | Section titles, prominent values, modal titles |
| `color-neutral-900` | `#0F172A` | 15.6:1 | **Body Primary:** Main customer names, headings |

### 2.4 Semantic Feedback Palette

| Semantic Role | Level | Hex Code | Background Tint | Usage in Kati CRM |
|---|---|---|---|---|
| **Success** | `600` / `50` | `#16A34A` | `#DCFCE7` | `Converted` leads, verified badges, active accounts |
| **Warning** | `600` / `50` | `#D97706` | `#FEF3C7` | `New` status pill, OTP notifications, pending sync |
| **Error / Alert** | `600` / `50` | `#DC2626` | `#FEE2E2` | `Hot` leads, validation errors, delete action |
| **Information** | `600` / `50` | `#0284C7` | `#E0F2FE` | `Cold` leads, Nylas sync notice, informational tips |

### 2.5 Seven Lead Lifecycle Status Badges (Source Parity)
In strict alignment with source PDF Screens 1.0 and 2.0, the 7 pipeline stages utilize distinct, accessible color pairs:

```
[ New ]        Text: #B45309  │  Bg: #FEF3C7  │  Border: #FDE68A  (Amber)
[ Cold ]       Text: #0369A1  │  Bg: #E0F2FE  │  Border: #BAE6FD  (Blue)
[ Warm ]       Text: #C2410C  │  Bg: #FFEDD5  │  Border: #FED7AA  (Orange)
[ Hot ]        Text: #B91C1C  │  Bg: #FEE2E2  │  Border: #FECACA  (Red/Coral)
[ Nurturing ]  Text: #6D28D9  │  Bg: #EDE9FE  │  Border: #DDD6FE  (Purple)
[ Converted ]  Text: #15803D  │  Bg: #DCFCE7  │  Border: #BBF7D0  (Green)
[ Lost ]       Text: #374151  │  Bg: #F3F4F6  │  Border: #E5E7EB  (Slate Gray)
```

---

## 3. Typography System

The typography system uses a clean, highly legible enterprise sans-serif stack:
`font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`

### 3.1 Typographic Hierarchy Scale

| Type Style | Font Size | Line Height | Weight | Letter Spacing | Contextual Usage |
|---|---|---|---|---|---|
| **Display 1** | `24px` (`1.5rem`) | `32px` (`1.33`) | `700` (Bold) | `-0.02em` | Main Dashboard Greeting, Login Title |
| **Heading 2** | `20px` (`1.25rem`) | `28px` (`1.40`) | `600` (SemiBold) | `-0.01em` | Screen Titles (Leads, Customer 360) |
| **Heading 3** | `16px` (`1.00rem`) | `24px` (`1.50`) | `600` (SemiBold) | `0.00em` | Card Titles, Section Headers, Modal Titles |
| **Body Large** | `15px` (`0.9375rem`) | `22px` (`1.46`) | `500` (Medium) | `0.00em` | Customer Name on Lead Cards, Emphasized Values |
| **Body Regular** | `14px` (`0.875rem`) | `20px` (`1.42`) | `400` (Regular) | `0.00em` | Standard text, form inputs, metadata rows |
| **Body Semibold**| `14px` (`0.875rem`) | `20px` (`1.42`) | `600` (SemiBold) | `0.00em` | Primary button text, active tab labels |
| **Caption / Meta**| `12px` (`0.75rem`) | `16px` (`1.33`) | `500` (Medium) | `0.01em` | Helper text, validation messages, timestamps |
| **Micro / Overline**| `11px` (`0.6875rem`)| `14px` (`1.27`) | `600` (SemiBold) | `0.04em` | Status badges, table column headers (UPPERCASE)|

---

## 4. Spacing Scale & Spatial System

All layout dimensions, paddings, and margins strictly follow an **8pt modular spatial grid** (with a 4pt sub-grid for tight groupings):

```
Token       Value    Visual Representation
space-2     2px      ▪
space-4     4px      ▪▪
space-8     8px      ▪▪▪▪
space-12    12px     ▪▪▪▪▪▪
space-16    16px     ▪▪▪▪▪▪▪▪          (Standard mobile screen padding)
space-20    20px     ▪▪▪▪▪▪▪▪▪▪
space-24    24px     ▪▪▪▪▪▪▪▪▪▪▪▪      (Section divider space)
space-32    32px     ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪  (Major card gap)
space-48    48px     ================  (Mandatory touch target boundary)
space-64    64px     ================  (Persistent bottom nav bar height)
```

* **Standard Screen Edge Padding:** `16px` on Mobile (`< 600px`), `24px` on Tablet, `32px` on Desktop.
* **Vertical Gap Between Cards:** `12px` on Mobile lists.
* **Internal Card Padding:** `16px` uniform.

---

## 5. Border Radius System

To maintain geometric consistency and avoid chaotic mixed corners, the design system defines **4 strict radius tokens**:

| Token Name | Value | Applicable Components |
|---|---|---|
| `radius-sm` | `4px` | Status badges, micro tags, tooltips |
| `radius-md` | `8px` | Form text inputs, dropdown triggers, standard buttons, search bars |
| `radius-lg` | `12px` | Lead cards, account cards, modals, dialogs, bottom sheets (top corners) |
| `radius-full` | `9999px` | Circular user avatars, round icon action buttons, floating action buttons (FAB), filter pills |

---

## 6. Shadows & Elevation System

Elevations use refined, multi-layered neutral shadows with zero colored glows:

| Elevation Level | CSS Box Shadow Definition | Usage in Interface |
|---|---|---|
| **Level 0 (Flat)** | `none` (1px solid `color-neutral-200`) | Standard form inputs, table rows, resting inactive cards |
| **Level 1 (Card)** | `0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)` | Resting lead cards, account cards, KPI overview cards |
| **Level 2 (Float)**| `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` | Sticky search header, active dropdown lists, card hover |
| **Level 3 (Overlay)**| `0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -4px rgba(15, 23, 42, 0.05)` | Bottom action sheets, dialog modals, multi-attribute filter drawer |
| **Level 4 (Sticky)**| `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` | Extended Floating Action Button (FAB), sticky bottom form action docks |

---

## 7. Iconography Guidelines

* **Icon Library:** Lucide Icons / Material Symbols (Rounded variant).
* **Grid & Stroke:** Designed on a **24x24px grid** with a consistent **1.75px stroke width**.
* **Visual Weights:**
  - Active/Selected icons: Filled or enhanced stroke (`2.0px`).
  - Standard/Inactive icons: Regular outline (`1.75px`).
* **Standard Icon Sizes:**
  - Micro: `16x16px` (Badge icons, inline input alerts).
  - Standard: `20x20px` (List row items, dropdown chevrons, button icons).
  - Primary Navigation: `24x24px` (Bottom navigation tabs, top app bar icons).
  - Empty State / Hero: `48x48px` (Empty list illustrations).

---

## 8. Interactive Component Specifications

### 8.1 Buttons

```
┌────────────────────────────────────────────────────────┐
│  [ + Create Lead ]    Solid Primary Button (Orange)     │
│  [  Schedule Meeting ] Outlined Secondary Button       │
│  [ 🗑 Delete Assignee ] Destructive Text Button (Red)  │
│  ( + )                 Extended FAB (Bottom-Right)     │
└────────────────────────────────────────────────────────┘
```

| Button Variant | Background | Text / Icon | Border | Min Height | Min Touch Area |
|---|---|---|---|---|---|
| **Primary Solid** | `color-primary-600` | `#FFFFFF` | None | `48px` | `48 x 48px` |
| **Primary Pressed** | `color-primary-700` | `#FFFFFF` | None | `48px` | `48 x 48px` |
| **Secondary Outlined**| `color-neutral-0` | `color-primary-600` | 1.5px `color-primary-600` | `48px` | `48 x 48px` |
| **Secondary Soft** | `color-primary-50` | `color-primary-700` | None | `48px` | `48 x 48px` |
| **Destructive** | `color-error-50` | `color-error-600` | 1px `color-error-200` | `44px` | `48 x 48px` |
| **Ghost / Icon Button**| Transparent | `color-neutral-700` | None | `40px` | `48 x 48px` |
| **Floating Action (FAB)**| `color-primary-600` | `#FFFFFF` | None | `56px` | `56 x 56px` |

### 8.2 Form Inputs & Data Entry Controls

```
  Customer Name *
┌────────────────────────────────────────────────────────┐
│ Allan Branson                                          │
└────────────────────────────────────────────────────────┘
  Must match government ID (Helper text)

  Lead Source *
┌────────────────────────────────────────────────────────┐
│ Referral                                             ▾ │
└────────────────────────────────────────────────────────┘

  Phone Number * (Validation Error State)
┌────────────────────────────────────────────────────────┐
│ 075080                                               ⚠ │
└────────────────────────────────────────────────────────┘
  Please enter a valid 10-digit MSISDN (Error text)
```

1. **Labels:**
   - Position: Always top-aligned above input (never floating or placeholder-only).
   - Typography: `14px`, Weight `600`, Color `color-neutral-700`.
   - Mandatory Indicator: Red asterisk ` *` (`color-error-600`).
2. **Input Fields:**
   - Height: `48px` standard (multi-line `min-height: 96px`).
   - Padding: `12px 16px`.
   - Border: `1px solid color-neutral-300`. Radius: `radius-md` (`8px`).
   - Typography: `14px`, Color `color-neutral-900`.
3. **State Rules:**
   - **Default:** Border `color-neutral-300`, background `#FFFFFF`.
   - **Focus / Active:** Border `color-primary-600`, box-shadow `0 0 0 3px color-primary-100`.
   - **Error:** Border `color-error-600`, background `color-error-50`, box-shadow `0 0 0 3px color-error-100`. Error message rendered below in `12px` red with exclamation icon.
   - **Disabled:** Background `color-neutral-100`, border `color-neutral-200`, text `color-neutral-400`.
4. **Dropdowns & Selectors:**
   - On mobile, clicking a dropdown trigger opens a **Searchable Bottom Sheet Picker** with large 48px selectable list items, rather than native tiny select menus.
5. **Date & Time Pickers:**
   - Form inputs display formatted date string (`19-Sep-2026`).
   - Tapping deploys the mobile-optimized calendar bottom sheet or native OS date wheel.

### 8.3 Search Fields
* Height: `44px`. Border radius: `radius-md` (`8px`).
* Background: `#FFFFFF` (on `color-neutral-50` canvas).
* Left element: Magnifying glass icon (`20px`, `color-neutral-400`).
* Right element: Clear (`✕`) button appears dynamically when input is non-empty.
* Real-time debounced search (300ms) with elevated shadow on focus (`elevation-2`).

### 8.4 Cards & Data Display Surfaces

```
┌────────────────────────────────────────────────────────┐
│  ZAMZAM HASSAN MOHAMED                       [ Warm ]  │
│  Lead ID: L-2026-000184           Priority: (●) Low    │
├────────────────────────────────────────────────────────┤
│  📞 +254 712 345 678      📍 Griffindor Branch (042)    │
│  💼 Retail / Individual   💰 KES 6,666                 │
├────────────────────────────────────────────────────────┤
│  [ Savings Account ]                                   │
│  Assigned to: Branson Allann, Derrick Ombaki       ⋯  │
└────────────────────────────────────────────────────────┘
```

1. **Lead Card Structure (Screen 2.0 Mobile Adaptation):**
   - Container: Background `#FFFFFF`, border `1px solid color-neutral-200`, radius `radius-lg` (`12px`), elevation `elevation-1`.
   - Padding: `16px`.
   - Header Row: Customer Name (`15px`, bold, `color-neutral-900`) and Status Badge right-aligned.
   - Metadata Grid: 2-column key-value grid for Phone, Branch, Segment, and Estimated Value.
   - Footer Row: Product tags, Assignee avatar pills, and 48x48px Action Ellipsis button (`⋯`).
2. **Account Cards (Customer 360):**
   - Displays Account Title (`Salary Account`), Masked Account Number (`5501117002`), Currency/Balance, and Branch Code (`041`).
   - Tapping the card expands the active product checklist directly inside the card container.

### 8.5 Lists & Tables

* **Mobile Paradigm:** Strict card-stream approach. Wide 14-column tables are NEVER crammed into mobile viewports.
* **Tablet / Desktop Paradigm:** High-density data table with:
  - Header height: `44px`, background `color-neutral-50`, typography `11px` uppercase tracking.
  - Row height: `52px` (standard) or `64px` (dense multi-line).
  - Alternating rows: White `#FFFFFF` with hover highlight `color-primary-50`.
  - Pinned frozen columns on horizontal scroll: `Lead ID` and `Customer Name`.

### 8.6 Tabs & Segmented Switchers

1. **Bottom Navigation Bar (Mobile):**
   - Height: `64px` + safe-area bottom inset.
   - Background: `#FFFFFF`, top border `1px solid color-neutral-200`.
   - 4 Items: `Dashboard`, `Leads`, `Engagements`, `More`.
   - Active Tab: `color-primary-600` icon and text. Inactive Tab: `color-neutral-500`.
2. **In-Page Segmented Switcher (Lead Details & Lead Capture):**
   - Container: Background `color-neutral-100`, radius `radius-md` (`8px`), padding `4px`.
   - Active Pill: Background `#FFFFFF`, radius `6px`, box-shadow `elevation-1`, text `color-neutral-900` bold.
   - Inactive Pill: Transparent background, text `color-neutral-600`.
   - Height: `40px` (touch target padded to `48px`).

### 8.7 Chips & Badges

1. **Status Badges:**
   - Padding: `4px 10px`. Radius: `radius-sm` (`4px`). Typography: `11px`, Weight `600`.
2. **Product Tags:**
   - Background: `color-neutral-100`, text `color-neutral-800`.
   - Form state: includes red trash icon (`🗑`) or `✕` with touch padding $\ge 44\text{px}$.
3. **Assignee User Chips:**
   - Displays user avatar circle (`24px`), user name, and role badge (e.g. `[Collections Manager]`).
   - Remove button (`✕`) formatted with explicit `44x44px` hit area.

### 8.8 Bottom Sheets & Modals

1. **Modal Bottom Sheet (Mobile):**
   - Width: `100%`. Top border radius: `16px 16px 0 0`.
   - Background: `#FFFFFF`. Elevation: `elevation-3`.
   - Handle Bar: Centered grey pill (`36px x 4px`, color `color-neutral-300`, margin `8px auto 12px`).
   - Dismissal: Swipe down on handle, tap background scrim (`rgba(15, 23, 42, 0.4)`), or tap header `✕`.
2. **Desktop Dialog Modal:**
   - Max Width: `560px` (standard) or `720px` (Event scheduler).
   - Border radius: `radius-lg` (`12px`). Elevation: `elevation-3`.
   - Header with title and close icon, scrollable body, and sticky footer with action buttons.

---

## 9. Comprehensive State Architecture

### 9.1 Empty States

```
┌────────────────────────────────────────────────────────┐
│                       [ 🔍 ]                           │
│                 No Leads Discovered                    │
│   No records match your active filters (Status: Cold)  │
│                                                        │
│                 [ Reset All Filters ]                  │
└────────────────────────────────────────────────────────┘
```

* **Visual Construction:**
  - Icon: Centered `48x48px` outlined icon in circle (`color-neutral-400` on `color-neutral-100`).
  - Headline: `16px` Semibold `color-neutral-800`.
  - Description: `14px` Regular `color-neutral-500` (max-width `280px`).
  - Action: Prominent secondary or primary button (`[ Reset Filters ]` or `[ + Create First Lead ]`).

### 9.2 Loading States (Skeleton Loaders)
* **Shimmer Effect:** Subtle gradient translation from `color-neutral-100` to `color-neutral-200` to `color-neutral-100` over `1.5s` duration.
* **Component Skeletons:**
  - Lead Card Skeleton: Exact dimensions of real card with grey placeholder blocks for title, metadata grid, and chips.
  - Button Loading State: Active button displays centered spinning ring (`20px`, color `#FFFFFF`), text hidden, button disabled to prevent duplicate taps.

### 9.3 Error States
* **Form Field Error:** Input border highlights red (`color-error-600`), background tints light red (`color-error-50`), error message renders immediately beneath input with alert icon.
* **Network Disconnect Banner:** Sticky banner beneath top header (`color-warning-50` with amber border): *"Offline mode active — Lead changes will synchronize when connection resumes"*.
* **Full-Page Error View:** 48px warning icon, error description, and `[ Retry Request ]` button.

### 9.4 Confirmation States (Snackbars & Toasts)
* **Mobile Snackbar:**
  - Position: Anchored above bottom navigation bar (`bottom: 76px, left: 16px, right: 16px`).
  - Container: Background `color-neutral-900`, radius `radius-md` (`8px`), text `#FFFFFF`.
  - Icon: Green checkmark circle for success.
  - Duration: `3000ms` auto-dismiss with swipe-to-dismiss gesture.

---

## 10. CSS Custom Property Design Tokens

To ensure immediate, error-free implementation in future phases, the tokens are codified into standard CSS custom properties:

```css
:root {
  /* Primary Action Colors (Kati Orange) */
  --color-primary-50: #FFF7ED;
  --color-primary-100: #FFEDD5;
  --color-primary-200: #FED7AA;
  --color-primary-500: #F97316;
  --color-primary-600: #EA580C;
  --color-primary-700: #C2410C;
  --color-primary-800: #9A3412;

  /* Secondary Institutional Colors (DTB Maroon) */
  --color-secondary-50: #FDF2F4;
  --color-secondary-100: #FCE7EB;
  --color-secondary-600: #8B1D41;
  --color-secondary-700: #731433;
  --color-secondary-900: #4A0B20;

  /* Neutrals & Surfaces */
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-900: #0F172A;

  /* Semantics */
  --color-success: #16A34A;
  --color-success-bg: #DCFCE7;
  --color-warning: #D97706;
  --color-warning-bg: #FEF3C7;
  --color-error: #DC2626;
  --color-error-bg: #FEE2E2;
  --color-info: #0284C7;
  --color-info-bg: #E0F2FE;

  /* Spacing Scale */
  --space-2: 2px;
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;

  /* Border Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -4px rgba(15, 23, 42, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04);

  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-h1: 1.5rem;    /* 24px */
  --font-size-h2: 1.25rem;   /* 20px */
  --font-size-h3: 1.00rem;   /* 16px */
  --font-size-body-lg: 0.9375rem; /* 15px */
  --font-size-body: 0.875rem;    /* 14px */
  --font-size-caption: 0.75rem;  /* 12px */
  --font-size-micro: 0.6875rem;  /* 11px */
}
```

---

## 11. Conclusion & Implementation Readiness

The Kati CRM Visual Design System establishes an unambiguous, mathematically sound, and ergonomically rigorous foundation for the mobile and responsive web application. It ensures that subsequent screen design, UI mockups, and client-side implementations will deliver a consistent, world-class enterprise banking experience.
