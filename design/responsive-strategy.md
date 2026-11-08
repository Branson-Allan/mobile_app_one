# Responsive Web Strategy: Kati CRM Sales Module (Mobile, Tablet, Desktop)

> **Document Version:** 2.0.0  
> **Source Documents:** `design/screen-inventory.md`, `design/ux-architecture.md`, `design/user-flows.md`, `design/navigation-model.md`, `reference/sales-module-source.pdf`  
> **Target Application:** Kati CRM — Enterprise Banking Sales Module (Diamond Trust Bank Africa)  
> **Status:** Cross-Platform Responsive Architecture (Mobile-Derived, Ergonomically Adapted)  

---

## 1. Executive Summary & Philosophy: "Mobile-Derived, Not Mobile-Stretched"

A common architectural pitfall in responsive web redesigns is taking a mobile layout and simply stretching it across wider screens. On a 1440px desktop monitor, an unconstrained single-column mobile card layout results in 1200px-wide input fields, awkward whitespace, and severe loss of information density.

Conversely, shrinking a desktop interface to mobile results in unreadable 14-column tables, tiny 16px touch targets, and nested scroll traps.

The **Kati CRM Responsive Strategy** establishes a unified design system that is **mobile-first in principle, but ergonomically adapted to each form factor**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MOBILE (360px–430px)     TABLET (768px–1024px)             DESKTOP (1280px–1440px+)   │
│                                                                                        │
│ [☰] Kati      [🔍]       ┌────┬───────────────────────┐    ┌──────┬──────────────────┐ │
│ ────────────────────     │[R] │[📊] [👥] [💬] [⋯]     │    │NAV   │[📊] [👥] [💬]    │ │
│ [ 📊 Dashboard ]         │ A  │───────────────────────│    │DRAWER│──────────────────│ │
│ [ 👥 Leads     ]         │ I  │ SPLIT-PANE LAYOUT     │    │(18   │ 6-STAGE KANBAN   │ │
│ [ 💬 Engagements]        │ L  │ ┌───────┬───────────┐ │    │MOD-  │ or 14-COL TABLE  │ │
│                          │    │ │List   │Detail Pane│ │    │ULES) │ with Sticky Keys │ │
│ Bottom Nav Bar (64px)    │    │ │(40%)  │(60%)      │ │    │      │                  │ │
│ Bottom Action Sheets     │    │ └───────┴───────────┘ │    │      │ Slide-Over Drawer│ │
│ Single-Column Cards      │    │ Floating Popovers     │    │      │ Desktop Modals   │ │
└──────────────────────────┴────┴───────────────────────┴────┴──────┴──────────────────┘
```

### Core Responsive Principles
1. **Shared Information Architecture:** The underlying data models, business rules, validation criteria, and status lifecycles are identical across all breakpoints.
2. **Adaptive Layout Containers:**
   - Single-Column Stream on Mobile (`< 600px`).
   - Split-Pane Master-Detail on Tablet (`600px – 1199px`).
   - Multi-Column Workspaces with Persistent Navigation on Desktop (`≥ 1200px`).
3. **Ergonomic Input Translation:**
   - Bottom Sheets on Mobile → Floating Popovers on Tablet → Slide-Overs / Dialog Modals on Desktop.
   - Floating Action Buttons (FAB) on Mobile → Header Action Toolbars on Tablet/Desktop.
   - Touch gestures (swipe-to-call) on Mobile → Hover states and keyboard shortcuts (`Cmd+K`, `Esc`) on Desktop.

---

## 2. Breakpoint Architecture & Ergonomic Specifications

| Breakpoint Tier | Viewport Width | Typical Target Hardware | Primary Input | Layout Paradigm | Navigation Framework |
|---|---|---|---|---|---|
| **Compact (Mobile)** | `< 600px` (360px–430px) | iPhone 13/14/15/16, Samsung Galaxy S22/S23/S24, Pixel 7/8 | Touch (One-handed thumb zone) | Single-column vertical stream, horizontal card carousels | Bottom Navigation Bar (4 tabs) + Hamburger App Launcher |
| **Medium (Tablet Portrait)** | `600px – 839px` | iPad Mini, iPad 10.2" (Portrait), Galaxy Tab A8 | Touch (Two-handed grip) | 2-column grid or collapsible master-detail | Collapsible Navigation Rail (icon-only) + Top Segmented Tabs |
| **Expanded (Tablet Landscape & Laptop)** | `840px – 1199px` | iPad Pro 11"/12.9", Surface Pro, 13" MacBook Air | Touch + Trackpad / Stylus | Split-Pane Master-Detail (40% List / 60% Detail) | Persistent Navigation Rail + Secondary Sub-Nav Bar |
| **Large (Enterprise Desktop)** | `≥ 1200px` (1280px–1920px+) | 24"–27" External Monitors, Workstations | Precision Mouse + Physical Keyboard | High-density multi-column tables, 6-column Kanban, multi-pane 360 | Persistent Expanded 18-Module Sidebar + Horizontal Sub-Nav |

---

## 3. Navigation Framework Translation

### 3.1 Primary Global Navigation (18 Enterprise Modules)
* **Mobile (`< 600px`):** **Modal App Launcher Drawer**. Accessed via top-left hamburger (`☰`). Closes automatically upon module selection.
* **Tablet (`600px – 1199px`):** **Collapsible Navigation Rail (80px width)**. Displays vertically stacked icons with tooltips. Tapping the rail expander expands to a 260px drawer over the viewport.
* **Desktop (`≥ 1200px`):** **Persistent Expanded Sidebar (260px width)**. Fully visible on the left edge, organizing all 18 enterprise modules into 4 functional collapsible clusters with active module highlight.

### 3.2 Sales Module Navigation (6 Submodules)
* **Mobile (`< 600px`):** **Bottom Navigation Bar (64px)** with 4 primary destinations (`Dashboard`, `Leads`, `Engagements`, `More`). Secondary submodules (`Customer Engagement`, `Collections`, `Reports`) nested cleanly inside Tab 3 and Tab 4.
* **Tablet (`600px – 1199px`):** **Top Horizontal Sub-Nav Bar**. Directly beneath the header, displaying all 6 submodule tabs with touch-friendly 48px hit areas.
* **Desktop (`≥ 1200px`):** **Persistent Secondary Sub-Nav Bar**. Full horizontal tab strip with active orange indicator bar, quick-search omnibox, agent queue indicator (`8022`), and PBX login switch.

### 3.3 Contextual Actions & Overlays
* **Mobile (`< 600px`):** **Native Modal Bottom Sheet (`ModalBottomSheet`)**. Slides up from bottom, spanning 100% width. Dismissed by swipe down or backdrop tap.
* **Tablet (`600px – 1199px`):** **Floating Contextual Popover**. Anchored directly to the card/row trigger button with a directional arrow. Dimmed backdrop optional.
* **Desktop (`≥ 1200px`):** **Anchored Dropdown Menu / Slide-Over Right Panel**. Fast actions open inline dropdown menus. Complex inspection flows open an offcanvas right drawer (600px width) allowing the user to keep the master table visible in the background.

---

## 4. Screen-by-Screen Layout Translation Matrix (All 16 Screens)

The table below defines the explicit responsive adaptation for each documented source screen across Mobile, Tablet, and Desktop:

| Screen # & Name | Mobile Layout (`< 600px`) | Tablet Layout (`600px – 1199px`) | Desktop Layout (`≥ 1200px`) |
|---|---|---|---|
| **1.0 Sales Dashboard** | • 2x4 vertical KPI grid<br/>• Horizontal swipe pipeline funnel<br/>• Stacked conversion & donut charts<br/>• `+ New Lead` FAB | • 4x2 KPI grid<br/>• 3x2 wrapped Kanban board<br/>• Side-by-side analytics charts<br/>• Header action button | • 8 KPI continuous horizontal strip<br/>• 6-stage parallel Kanban board<br/>• Side-by-side charts with interactive date range picker & employee filter bar |
| **2.0 All Leads Table** | • Vertical Rich Lead Cards<br/>• Sticky search bar & status chips<br/>• Filter & Sort bottom sheets<br/>• Swipe card actions (call / status) | • **Split-Pane Master-Detail:**<br/>  - Left (40%): Scrollable Lead Cards<br/>  - Right (60%): Selected Lead Profile & Activity Log<br/>• Filter popover panel | • High-density 14-column data table<br/>• Sticky Lead ID & Customer columns<br/>• Inline collapsible 9-control filter drawer<br/>• Multi-row checkbox batch actions |
| **3.1 Lead Capture (New Customer)** | • Full-screen vertical form<br/>• 4 collapsible cards<br/>• Smooth animated referee field<br/>• Sticky bottom action dock | • 2-column card grid:<br/>  - Col 1: Customer Profile & Lead Info<br/>  - Col 2: Commercial & Assignment<br/>• Sticky bottom action bar | • 2-column card layout (75% width)<br/>• Right-hand sticky `Summary` jump rail (25% width)<br/>• Full keyboard navigation (`Tab` index) |
| **3.2 Lead Capture (Existing Customer)** | • Full-screen form with CBS lookup<br/>• Customer Card with prominent `[ View Customer 360 ]` button<br/>• Single-column fields | • 2-column form grid<br/>• Customer Profile Card pinned at top<br/>• Modal dialog Customer 360 preview | • 2-column form grid<br/>• Customer Quick Profile Card mounted in left sidebar<br/>• Right-hand summary rail |
| **3.2.1 Customer 360 (Accounts)** | • Full-screen view<br/>• Horizontal chip tabs<br/>• Product checklist expands *inside* account card<br/>• Omnichannel phone dock | • Split-pane layout:<br/>  - Left: Fixed 300px Customer Biodata<br/>  - Right: Tabbed accounts grid with dynamic products list | • 3-pane master cockpit:<br/>  - Left (280px): Biodata & contact flags<br/>  - Middle (flexible): Account cards grid & active products checklist<br/>  - Far-Right: Floating communication dock |
| **3.2.2 Customer 360 (Mobile Banking)** | • Touch-friendly cards showing MSISDN, PIN badge (`Active PIN`), and branch code | • 2-column grid of mobile registration cards | • 12-row dense tabular registry with PIN status pills and branch routing codes |
| **3.2.3 Customer 360 (Bancassurance)** | • Stacked policy cards with `GENERAL` and `LIFE` badges, policy #, and expiry | • 2-column policy card grid | • Multi-column insurance portfolio cards grid with expiration alerts |
| **3.2.4 Customer 360 (Credit Card)** | • Stacked card cards with masked PANs, replacement status, and credit limits | • 2-column credit card cards grid | • High-density credit card cards with facility limits and omnichannel dock |
| **4.0 Lead Actions Menu** | • Modal Bottom Sheet spanning 100% width with 52px touch targets | • Floating anchored popover menu | • Row-anchored dropdown menu + hover quick action icons on table row |
| **4.1 Schedule Meeting (Add Event)** | • Dedicated full-screen form sheet with native OS date/time pickers | • Centered modal dialog (560px width) with 2-column inputs | • Centered desktop modal (720px width) with Nylas calendar sync, staff chips & customer links |
| **4.2 Update Status** | • Half-height bottom sheet with color-coded status selector chips | • Centered modal dialog (440px width) | • Centered desktop modal (480px width) with status dropdown and audit comment area |
| **4.3 Reassign Lead** | • Half-height bottom sheet with active officer chips and 44px delete icons | • Centered modal dialog (480px width) | • Centered desktop modal (520px width) with multi-user chips, role tags & combo box |
| **4.4.1 Lead Details (Profile Tab)** | • Full-screen view<br/>• Hero header with direct call dock<br/>• Segmented Profile/Log tab<br/>• Sticky bottom action dock | • Right pane of Split-Pane view on Tablet landscape<br/>• Or slide-over right panel (540px) | • Slide-over right drawer (600px width) or 2-column modal dialog (768px width) |
| **4.4.2 Lead Details (Activity Log Tab)** | • Chronological vertical timeline stream with connected nodes | • Timeline stream in Right pane of Split-Pane view | • Chronological event cards stream inside slide-over drawer or modal |
| **5.0 Login Page (SSO)** | • Full-screen mobile login card<br/>• Single-column layout<br/>• Mobile email keyboard | • Centered 420px authentication card with bank branding backdrop | • Centered 440px authentication card with split corporate brand imagery |
| **5.1 Company & Profile Settings** | • Full-screen view with collapsible accordions (Company, Tax, 2FA, Profile) | • 2-column settings dashboard | • Multi-tab settings workspace with sidebar navigation (Company, API Keys, Taxes, Security, Profile) |

---

## 5. Architectural Detail: Tablet Split-Pane Experience

On Tablet Landscape and Desktop viewports (`≥ 840px`), the application unlocks the **Split-Pane Master-Detail Pattern** for Screen 2.0 (`All Leads`):

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  Kati Sales Hub         [🔍 Search Leads...]   [Filters ⏷]   [+ New Lead] [👤]   │
├─────────────────────────────────────┬────────────────────────────────────────────┤
│  LEADS MASTER LIST (40% Width)      │  SELECTED LEAD DETAIL (60% Width)          │
│                                     │                                            │
│  ┌───────────────────────────────┐  │  ZAMZAM HASSAN MOHAMED     [Warm]          │
│  │ ▶ ZAMZAM HASSAN MOHAMED       │  │  Lead ID: L-2026-000184    KES 6,666       │
│  │   L-2026-000184  • Warm       │  │  ────────────────────────────────────────  │
│  │   KES 6,666 • Griffindor      │  │  [ 📞 Call ]  [ 💬 Chat ]  [ ✉️ Email ]      │
│  └───────────────────────────────┘  │                                            │
│  ┌───────────────────────────────┐  │  [ Profile Overview ]    [ Activity Log ]  │
│  │   COLLINS W SAKWA             │  │                                            │
│  │   L-2026-000182  • Cold       │  │  • Customer Details: Retail / Individual   │
│  │   KES 1,000,000 • Ravenclaw   │  │  • Branch: Griffindor Branch (042)         │
│  │                               │  │  • Product Interests: Savings Account      │
│  └───────────────────────────────┘  │  • Assigned: Branson Allann                │
│  ┌───────────────────────────────┐  │                                            │
│  │   MATEEN PREMJI               │  │  ACTION BAR:                               │
│  │   L-2026-000179  • Converted  │  │  [ Update Status ]  [ Reassign ] [Schedule]│
│  └───────────────────────────────┘  │                                            │
└─────────────────────────────────────┴────────────────────────────────────────────┘
```

### Why Split-Pane Improves Tablet Productivity:
1. **Zero Context Switching:** Sales representatives can triage and update 20+ leads consecutively without ever leaving the list view.
2. **Instant Cause-and-Effect:** Updating a status or reassignment in the right pane immediately updates the badge color and assignee chip on the left master card.
3. **Ergonomic Two-Handed Interaction:** Left thumb scrolls the master list; right thumb triggers detail actions.

---

## 6. Input Ergonomics & Hardware Adaptation

### 6.1 Touch vs. Mouse Precision
* **Touch Targets (Mobile & Tablet):** Strictly enforce minimum bounding boxes of **48x48px** with at least 8px padding between adjacent interactive elements.
* **Hover States (Desktop):** Enhance desktop productivity with subtle background fills on table rows and reveal quick-action shortcuts (e.g., Quick Call icon, Quick Status button) directly on row hover.
* **Cursor Affordances:** Interactive elements use `cursor: pointer`; disabled controls use `cursor: not-allowed`.

### 6.2 Physical Keyboard Shortcuts (Desktop & Tablet with Magic Keyboard)
To empower power users and call-center agents:
* `Cmd / Ctrl + K`: Focus Global Search Omnibox.
* `Cmd / Ctrl + N`: Open New Lead Capture Form.
* `Esc`: Dismiss open Modal, Popover, or Slide-Over Drawer.
* `J` / `K` or `↓` / `↑`: Move selection up/down the Leads master list.
* `Cmd / Ctrl + Enter`: Submit active form or modal (e.g., Create Lead, Update Status).

### 6.3 Virtual Keyboard Management (Mobile & Tablet Portrait)
* **Viewport Resize Behavior:** Forms utilize CSS `interactive-widget=resizes-content` to ensure the viewport smoothly contracts when the mobile keyboard appears.
* **Scroll-Into-View:** Focused input elements are automatically scrolled into the upper 50% of the visible viewport, preventing virtual keyboard occlusion.
* **Input-Specific Keypads:**
  - Phone Number inputs → `type="tel"`
  - Currency / Estimated Value → `type="number"` with decimal support
  - Email Address → `type="email"` with autocomplete disabled for corporate privacy

---

## 7. Responsive Style & Spacing Tokens

| Design Token | Mobile (`< 600px`) | Tablet (`600px – 1199px`) | Desktop (`≥ 1200px`) |
|---|---|---|---|
| **Page Margin** | 16px | 24px | 32px |
| **Card Gap / Padding** | 12px / 16px | 16px / 20px | 20px / 24px |
| **Base Font Size** | 14px (Body), 18px (H2), 22px (H1) | 15px (Body), 20px (H2), 24px (H1) | 14px (Body), 20px (H2), 26px (H1) |
| **Form Column Count** | 1 Column | 2 Columns | 2 Columns + 25% Rail |
| **Grid Column Count** | 1 Col (List) / 2 Col (KPIs) | 2–3 Columns | 4–6 Columns (Kanban) |
| **Elevation / Shadow** | Level 1 (Flat borders + subtle shadow) | Level 2 (Floating cards) | Level 2 (Cards) & Level 4 (Modals) |

---

## 8. Conclusion

The Kati CRM Responsive Web Strategy bridges mobile-first speed and desktop enterprise productivity. By mapping the identical information architecture into appropriate responsive containers—from mobile bottom sheets and cards to tablet split-panes and desktop data tables—the system provides Diamond Trust Bank staff with a cohesive, professional experience on any device.
