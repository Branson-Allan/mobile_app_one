# Mobile UI Design System & Component Foundations: Kati Enterprise Sales Module

> **Document Version:** 1.0.0  
> **Source Baseline:** `reference/sales-module-source.pdf` / `design/screen-inventory.md`  
> **Target Platform:** Mobile (iOS / Android / Flutter Cross-Platform, 360px–430px viewports)  
> **Status:** Phase 2 Design Specification (Architecture & Tokens)

---

## 1. Design System Overview & Goals

The Kati Mobile Design System translates the enterprise desktop CRM experience into a clean, highly functional, thumb-friendly mobile interface. It preserves the authentic corporate visual identity of **Diamond Trust Bank Africa (DTB)** and **Kati CRM** while enforcing modern mobile ergonomic and accessibility standards.

### Core Objectives:
1. **100% Data Preservation:** Provide dedicated mobile homes for all enterprise data attributes without sacrificing scannability.
2. **Touch-First Ergonomics:** Eliminate all sub-24px tap targets; enforce a strict **minimum 48x48px hit area** across all interactive elements.
3. **Thumb-Zone Optimization:** Anchor primary actions, filters, search triggers, and navigation tabs within easy reach of the user's thumb (bottom 40% of viewport).
4. **Cognitive Clarity:** Replace dense 14-column tables and multi-card visual overload with structured, scannable card hierarchies and native sheet interactions.

---

## 2. Design Tokens & Variables

### 2.1 Color Palette

```
Brand Primary (DTB Orange)
┌────────────────────────────────────────────────────────┐
│ #EA580C (Orange 600 - Primary Brand & CTA)            │
│ #F97316 (Orange 500 - Interactive Hover/Focus)         │
│ #FFF7ED (Orange 50  - Light Brand Surface & Pill BG)   │
└────────────────────────────────────────────────────────┘

Application Shell & Structure (Dark Navy & Slates)
┌────────────────────────────────────────────────────────┐
│ #0F172A (Slate 900 - Top Header, Contrast Text)        │
│ #1E293B (Slate 800 - Nav Shell, Active Tab Indicators) │
│ #334155 (Slate 700 - Primary Body Text)                │
│ #64748B (Slate 500 - Secondary/Muted Text & Icons)     │
│ #CBD5E1 (Slate 300 - Dividers, Inactive Borders)       │
│ #F1F5F9 (Slate 100 - Sub-surface, Input Fill)          │
│ #F8FAFC (Slate 50  - Main Screen Background)           │
│ #FFFFFF (Pure White- Card Surfaces, Modal Backgrounds) │
└────────────────────────────────────────────────────────┘
```

#### Detailed Token Mapping:

| Token Name | Hex Code | Semantic Role & UI Application |
|---|---|---|
| `color-brand-primary` | `#EA580C` | Primary buttons (`Create Lead`, `Update`), active tab indicators, major branding elements. |
| `color-brand-accent` | `#F97316` | Secondary buttons, focus outlines, high-contrast highlights. |
| `color-brand-subtle` | `#FFF7ED` | Tinted background for primary lead badges, selected list tiles, and active filters. |
| `color-surface-bg` | `#F8FAFC` | Primary scaffold background color behind cards and lists. |
| `color-surface-card` | `#FFFFFF` | Background for lead cards, metric tiles, sheet dialogs, and form containers. |
| `color-surface-input` | `#F1F5F9` | Default background fill for text inputs and dropdown triggers. |
| `color-border-subtle` | `#E2E8F0` | 1px card borders, list item separators, and non-active input borders. |
| `color-border-focus` | `#EA580C` | Active border for focused inputs and selected cards. |
| `color-text-primary` | `#0F172A` | Customer names, lead IDs, financial values, screen titles (WCAG AAA contrast). |
| `color-text-secondary` | `#475569` | Field labels, metadata strings, dates, helper text. |
| `color-text-muted` | `#94A3B8` | Input placeholders, inactive icons, disabled states. |
| `color-text-inverse` | `#FFFFFF` | Text rendered on dark navy bars and solid brand orange buttons. |

### 2.2 Semantic Pipeline Status Colors

The source application uses distinct color-coded badges for pipeline stages. The mobile design system formalizes these into accessible text-and-background token pairs:

| Pipeline Status | Badge Background | Badge Text | Border Color | Visual Semantics |
|---|---|---|---|---|
| **New** | `#FEF9C3` (Yellow 100) | `#854D0E` (Yellow 800) | `#FDE047` | Unassigned or newly created lead awaiting first touch. |
| **Cold** | `#E0F2FE` (Sky 100) | `#075985` (Sky 800) | `#7DD3FC` | Low engagement, long gestation period. |
| **Warm** | `#FFEDD5` (Orange 100) | `#9A3412` (Orange 800) | `#FDBA74` | Active interest, ongoing qualification discussions. |
| **Hot** | `#FFE4E6` (Rose 100) | `#9F1239` (Rose 800) | `#FDA4AF` | Immediate purchase intent, imminent closing. |
| **Nurturing** | `#F3E8FF` (Purple 100) | `#6B21A8` (Purple 800) | `#D8B4FE` | Long-term relationship building, scheduled check-ins. |
| **Converted** | `#DCFCE7` (Green 100) | `#166534` (Green 800) | `#86EFAC` | Successfully closed and converted into revenue. |
| **Lost** | `#F1F5F9` (Slate 100) | `#475569` (Slate 700) | `#CBD5E1` | Disqualified or lost to competition. |

---

### 2.3 Typography Scale (Mobile Viewport Optimized)

The type system is based on system fonts (`SF Pro` for iOS, `Roboto` for Android, with fallback to `Inter`).

| Style Name | Font Size | Line Height | Weight | Letter Spacing | Usage in Mobile App |
|---|---|---|---|---|---|
| **Display / Header** | 22px | 28px | Bold (700) | -0.3px | Screen Titles (`Sales Dashboard`, `Customer 360`) |
| **Title 1** | 18px | 24px | Semi-Bold (600) | -0.2px | Section Headers, Modal Sheet Titles, Customer Name |
| **Title 2** | 16px | 22px | Semi-Bold (600) | 0.0px | Card Titles, Financial Amounts (`KES 1,000,000`) |
| **Body 1 (Default)** | 14px | 20px | Regular (400) | 0.0px | Input text, primary descriptions, table values |
| **Body 1 Medium** | 14px | 20px | Medium (500) | 0.0px | Buttons, active tab labels, key attributes |
| **Body 2** | 12px | 16px | Regular (400) | +0.1px | Secondary metadata, phone numbers, timestamps |
| **Caption / Badge** | 11px | 14px | Semi-Bold (600) | +0.2px | Status pills, count badges, role tags |
| **Micro** | 10px | 12px | Medium (500) | +0.3px | Bottom nav tab labels, fine-print disclaimers |

---

### 2.4 Spacing & Spatial Grid System

* **Base Unit:** 8pt grid with a 4pt sub-grid for tight alignments.
* **Tokens:**
  * `space-1` = `4px` (Tag inner spacing, icon-to-label gaps)
  * `space-2` = `8px` (Element margins, stack spacing)
  * `space-3` = `12px` (Card inner padding, input field padding)
  * `space-4` = `16px` (Standard screen horizontal margin / gutter)
  * `space-5` = `20px` (Section spacing)
  * `space-6` = `24px` (Major container separation)
  * `space-8` = `32px` (Modal tops, floating action offsets)

---

### 2.5 Elevation, Corners & Shadows

* **Border Radius:**
  * Small (`radius-sm` = `4px`): Badges, role tags, compact chips.
  * Medium (`radius-md` = `8px`): Form inputs, dropdown selectors, secondary buttons.
  * Large (`radius-lg` = `12px`): Cards, dashboard tiles, list items.
  * Extra Large (`radius-xl` = `16px`): Bottom sheets, modal containers.
  * Pill (`radius-full` = `9999px`): Status pills, avatar circles, filter chips.
* **Shadows:**
  * `elevation-0`: Flat with 1px border (`#E2E8F0`).
  * `elevation-1` (Cards): `0px 1px 3px rgba(15, 23, 42, 0.08), 0px 1px 2px rgba(15, 23, 42, 0.04)`.
  * `elevation-2` (Floating elements): `0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -2px rgba(15, 23, 42, 0.06)`.
  * `elevation-3` (Bottom sheets / Overlays): `0px 10px 25px -5px rgba(15, 23, 42, 0.25)`.

---

## 3. Core Mobile Component Specifications

---

### 3.1 Mobile Lead Card Component (`Comp-LeadCard`)
*Replaces the 14-column desktop table row with a rich, scannable, thumb-friendly card.*

```
┌────────────────────────────────────────────────────────┐
│ L-2026-000180                  [ Converted ]    [ ⋮ ]  │
│ JEREMIAH VINCENT AKWIRI                                │
│ 📞 254742121445  •  📍 Kakamega  •  Retail             │
│                                                        │
│ 💼 Salary Account              💰 KES 1,200 (KES 12K)  │
│ 👤 Demo Account, Mutai         📅 01-Sep-2026          │
└────────────────────────────────────────────────────────┘
```

#### Structure & Data Slots:
1. **Header Row (Height 28px):**
   * **Lead ID:** Monospace font, muted color (`L-2026-000180`).
   * **Status Badge:** Semantic status pill (`[ Converted ]`).
   * **Action Trigger:** Three-dot button with **48x48px touch bounding box** triggering Screen M-4.0.
2. **Customer Title Row (Height 24px):**
   * **Customer Name:** Bold 16px text (`JEREMIAH VINCENT AKWIRI`). Tapping navigates to Lead Details.
3. **Contact & Demographic Meta Row (Height 18px):**
   * Phone number with direct tap-to-call icon (`📞 254742121445`).
   * Location summary (`📍 Kakamega`).
   * Customer Segment tag (`Retail`).
4. **Divider:** Subtle 1px divider (`#F1F5F9`).
5. **Commercial Details Row (Height 20px):**
   * Product Interest badge (`💼 Salary Account`).
   * Estimated Value (`💰 KES 1,200`) paired with Converted Value (`KES 12,000.00`).
6. **Footer Row (Height 18px):**
   * Assigned Staff (`👤 Demo Account, Mutai`).
   * Created Date (`📅 01-Sep-2026`).

---

### 3.2 Mobile Status Badge (`Comp-StatusPill`)
*Compact, accessible status indicator used on cards, headers, and modals.*
* **Dimensions:** Height 24px, minimum width 64px, horizontal padding 8px.
* **Corner Radius:** `radius-full` (12px).
* **Typography:** `Caption / Badge` (11px, Semi-Bold, uppercase tracking).
* **States:** Supported across all 7 statuses (`New`, `Cold`, `Warm`, `Hot`, `Nurturing`, `Converted`, `Lost`).

---

### 3.3 Mobile KPI Metric Card (`Comp-MetricCard`)
*Mobile adaptation of the desktop dashboard performance cards.*
* **Dimensions:** Width 140px (in horizontal carousel) or 50% flex width (in 2x2 grid), Height 76px.
* **Content:**
  * Top: Metric Title (12px, Muted Slate e.g., `Total Leads`, `Hot Leads`).
  * Bottom: Numeric Value (22px, Bold, Brand Dark Navy e.g., `36`, `1`, `4`).
  * Indicator: Optional trend dot or status color bar along the left edge.

---

### 3.4 Mobile Action Sheet Component (`Comp-ActionSheet`)
*Replaces the desktop floating row ellipsis menu (Screen 4.0).*
* **Pattern:** Native Modal Bottom Sheet sliding up from viewport bottom.
* **Header:** Drag handle bar (36x4px), Lead ID & Customer Title, Close button (`✕`).
* **Menu Items (Each 56px height with 48px touch target):**
  1. `Schedule Meeting` (Calendar-plus icon) -> Opens Screen M-4.1.
  2. `Update Status` (Pencil-edit icon) -> Opens Screen M-4.2.
  3. `Reassign Lead` (Target/user icon) -> Opens Screen M-4.3.
  4. `View Details` (Eye icon) -> Opens Screen M-4.4.1.
  5. `View Customer 360` (User-circle icon) -> Direct link to Customer 360!
  6. `Export as PDF` (Download tray icon) -> Triggers device download.
  7. `Export as PDF via Email` (Envelope icon) -> Dispatches email.

---

### 3.5 Mobile Filter Bottom Sheet (`Comp-FilterSheet`)
*Replaces the 9-field desktop filter drawer.*
* **Pattern:** Full-height or 85% height draggable bottom sheet.
* **Sticky Top Bar:** "Filter Leads" title, "Reset All" text button, Close (`✕`).
* **Scrollable Body:**
  * Search Input: Customer Name / Keyword.
  * Status Filter: Horizontal scrollable chips (`All`, `New`, `Warm`, `Hot`, `Cold`, etc.).
  * Segment Filter: Chips (`Retail`, `Corporate`, `Business`).
  * Priority Filter: Chips (`High`, `Medium`, `Low`).
  * Employee & Branch: Clean bottom picker sheets.
  * Date Range: Native date range picker wheels.
* **Sticky Bottom Bar (Elevation 3):**
  * Solid Orange Button: `Apply Filters (36 Results)` — Full width, height 48px.

---

### 3.6 Multi-Select Tag with Accessible Remove Hitbox (`Comp-DeletableChip`)
*Used for products and assigned team members in forms (Screens 3.1, 3.2, 4.3).*
* **Dimensions:** Height 36px, horizontal padding 10px.
* **Layout:** Tag label + Role tag (e.g., `Collections Manager`) + **Dedicated 32x32px hit-target delete button** containing the `✕` icon.
* **Ergonomics:** Prevents accidental deletion by isolating the delete icon hit box from the chip surface.

---

### 3.7 Segmented Control Bar (`Comp-SegmentedControl`)
*Used for tabbed switching in Lead Details (Profile vs. Activity Log) and Customer 360 (Accounts, Mobile Banking, Bancassurance, Credit Card).*
* **Dimensions:** Height 44px, full container width, pill background (`#F1F5F9`).
* **Active Indicator:** White elevated pill with soft shadow (`elevation-1`) sliding smoothly between segments.
* **Typography:** 13px Semi-Bold.
