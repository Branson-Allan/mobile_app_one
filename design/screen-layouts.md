# Mobile Screen Layouts & Detailed UI Specifications: Kati CRM Sales Module

> **Document Version:** 1.0.0  
> **Source Documents:** `reference/sales-module-source.pdf` (`references/mobileApp.pdf`), `design/screen-inventory.md`, `design/ux-architecture.md`, `design/user-flows.md`, `design/navigation-model.md`, `design/design-system.md`  
> **Target Application:** Kati CRM — Enterprise Banking Sales Module (Diamond Trust Bank Africa)  
> **Status:** Stage 4 Detailed Screen Layouts & Wireframes (All 16 Source Screens)  

---

## 1. Executive Summary & Layout Architecture

This document establishes the concrete, component-level mobile screen layouts, structural ASCII wireframes, layout hierarchies, and interaction behaviors for all **16 source screens** across the Kati CRM Sales Module.

### 1.1 Mobile Viewport Baseline
* **Primary Target Canvas:** $390 \times 844\,\text{px}$ (iPhone 13/14/15/16 baseline) with responsive fluid scaling for $360\,\text{px}$ (Android standard) through $430\,\text{px}$ (Max/Plus devices).
* **Safe Areas:** System status bar ($44\,\text{px}$ top), Home gesture bar ($34\,\text{px}$ bottom inset).
* **Persistent Bottom Nav Bar:** $64\,\text{px}$ fixed height with $16\,\text{px}$ content padding.
* **Touch Targets:** Strictly $\ge 48 \times 48\,\text{px}$ for all tappable controls.

---

## 2. Suite 1: Operational Dashboards & Master Lists

---

### Screen 1.0: Mobile Sales Dashboard
* **Source Screen:** Screen 1.0 (PDF Page 1, Image `img-000.png`)
* **Mobile Screen ID:** `SCR-1.0-DASHBOARD`
* **Hierarchy Tier:** Tier 1 (Persistent Shell Root — Bottom Nav Tab 1)
* **Primary Goal:** Provide sales officers and managers with an immediate executive briefing of daily actions, pipeline distribution, and conversion trends on mobile.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│ [☰] Kati CRM      Queue: 8022  ● [👤]   │ <-- Top App Bar (56px)
├─────────────────────────────────────────┤
│ Good morning, Branson 👋               │ <-- Display Greeting (H1)
│ Diamond Trust Bank • Sales Hub          │ <-- Caption Subtitle
├─────────────────────────────────────────┤
│ DAILY ACTION TRIGGERS                   │ <-- Section Header (H3)
│ ┌───────────────────┬─────────────────┐ │
│ │ Follow-Ups Today  │ Meetings Today  │ │
│ │ 0                 │ 0               │ │
│ └───────────────────┴─────────────────┘ │
│ ┌───────────────────┬─────────────────┐ │
│ │ Open Engagements  │ Total Leads     │ │
│ │ 5                 │ 11              │ │
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ PIPELINE HEALTH (SWIPE HORIZONTAL ⏵)    │
│ ┌───────────────┐ ┌───────────────────┐ │
│ │ WARM (3)      │ │ HOT (1)           │ │
│ │ KES 4,500,000 │ │ KES 25,000        │ │
│ │ Collins Sakwa │ │ test vertical     │ │
│ └───────────────┘ └───────────────────┘ │
├─────────────────────────────────────────┤
│ CONVERSION TREND (TOUCH SCRUB)          │
│ ┌─────────────────────────────────────┐ │
│ │ [Line Chart: Jun 1 - Sep 14]        │ │
│ │ Peak: Sep 14 (6 Leads)              │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ PRODUCT INTEREST DISTRIBUTION           │
│ ┌─────────────────────────────────────┐ │
│ │  ( ◎ )  35% Salary Account (Orange) │ │
│ │  Donut  25% Savings Account (Red)   │ │
│ │  Chart  20% World Card (Dark Grey)  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│                                 ( + )   │ <-- Extended FAB (56px)
├─────────────────────────────────────────┤
│   [📊]       [👥]       [💬]     [⋯]    │ <-- Bottom Nav (64px)
│ Dashboard   Leads    Engagements More   │
└─────────────────────────────────────────┘
```

#### Component Hierarchy & Specifications
1. **Top Application Bar:**
   - Left: Hamburger icon (`☰`, $48\times 48\,\text{px}$ touch target) opens Global App Launcher.
   - Center: Kati CRM brand identity + Queue indicator pill (`Queue: 8022 ▾`).
   - Right: Agent presence dot (Green `#16A34A` for Online) over user avatar circle ($32\,\text{px}$).
2. **Greeting Header:**
   - Title: `Display 1` ($24\,\text{px}$, Bold `#0F172A`).
   - Subtitle: `Caption` ($12\,\text{px}$, `#64748B`).
3. **Performance Overview (8 KPI Cards in 2-Column Grid):**
   - Grid spacing: $12\,\text{px}$ gap, horizontal padding $16\,\text{px}$.
   - Cards: Background `#FFFFFF`, border $1\,\text{px}$ `#E2E8F0`, radius `radius-lg` ($12\,\text{px}$), elevation `elevation-1`.
   - Card Row 1: `Follow-Ups Today (0)`, `Meetings Today (0)`.
   - Card Row 2: `Open Engagements (5)`, `Total Leads (11)`.
   - Card Row 3: `Hot Leads (1)`, `Warm Leads (3)`.
   - Card Row 4: `Cold Leads (2)`, `Converted Leads (2)`.
4. **Lead Pipeline Board (Horizontal Swipe Funnel):**
   - Transformed from desktop 6-column side-by-side Kanban to a **Horizontal Card Carousel**.
   - Width per stage card: $160\,\text{px}$, margin-right $12\,\text{px}$.
   - Displays stage name, count badge, aggregated value (`KES`), and top lead card preview.
   - Tap behavior: Tapping any stage card navigates directly to Screen 2.0 pre-filtered to that stage.
5. **Analytics Charts Section:**
   - *Lead Conversion Trend:* Single-touch interactive line chart with scrub tooltip displaying date and count.
   - *Product Interest Distribution:* Donut chart with touchable color-coded legend chips below chart.
6. **Floating Action Button (FAB):**
   - Label: `+ New Lead` (extended pill on screen load, collapses to `+` during active scroll down).
   - Position: `bottom: 80px, right: 16px`, background `#EA580C`, elevation `elevation-4`.

---

### Screen 2.0: Mobile All Leads Hub
* **Source Screen:** Screen 2.0 (PDF Pages 2–3, Image `img-001.png`)
* **Mobile Screen ID:** `SCR-2.0-ALL-LEADS`
* **Hierarchy Tier:** Tier 1 (Persistent Shell Root — Bottom Nav Tab 2)
* **Primary Goal:** Enable high-velocity lead search, multi-attribute filtering, status triage, and rapid action triggering on mobile.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│ All Leads (36)              [⤓]  [⏷]    │ <-- Header: Title, Export, Filter
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 🔍 Search by customer, ID, phone... │ │ <-- Sticky Search Bar (44px)
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [All 36] [Hot 1] [Warm 4] [Cold 4] [..] │ <-- Fast Status Filter Chips
├─────────────────────────────────────────┤
│ SORT: Date Created ▾         36 Leads   │ <-- Quick Sort Pill & Counter
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ZAMZAM HASSAN MOHAMED       [ Warm ]│ │ <-- Lead Card 1
│ │ L-2026-000184      Priority: (●) Low│ │
│ │ ─────────────────────────────────── │ │
│ │ 📞 +254 712 345 678                 │ │
│ │ 📍 Griffindor Branch (042)           │ │
│ │ 💼 Retail          💰 KES 6,666     │ │
│ │ ─────────────────────────────────── │ │
│ │ [ Savings Account ]                 │ │
│ │ 👤 Branson Allann               ⋯   │ │ <-- 48px Action Menu Trigger
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ COLLINS W SAKWA             [ Cold ]│ │ <-- Lead Card 2
│ │ L-2026-000182      Priority: (●) Med│ │
│ │ ─────────────────────────────────── │ │
│ │ 📞 +254 722 000 111                 │ │
│ │ 📍 Ravenclaw Branch (038)           │ │
│ │ 💼 Corporate       💰 KES 1,000,000 │ │
│ │ ─────────────────────────────────── │ │
│ │ [ Salary Account ]                  │ │
│ │ 👤 Permission Permission        ⋯   │ │
│ └─────────────────────────────────────┘ │
│                                 ( + )   │ <-- Extended FAB (56px)
├─────────────────────────────────────────┤
│   [📊]       [👥]       [💬]     [⋯]    │ <-- Bottom Nav (64px)
│ Dashboard   Leads    Engagements More   │
└─────────────────────────────────────────┘
```

#### Component Hierarchy & Specifications
1. **Header Toolbar:**
   - Title: `Heading 2` ("All Leads", count badge `(36)` in `Neutral-500`).
   - Actions: Bulk Export tray icon button ($48\times 48\,\text{px}$) and Multi-attribute Filter funnel icon button ($48\times 48\,\text{px}$) with active badge counter.
2. **Sticky Search Header:**
   - Background `#FFFFFF`, elevation `elevation-2` on scroll.
   - Text input: $44\,\text{px}$ height, search icon left, clear (`✕`) icon right when non-empty. Debounced 300ms.
3. **Fast Status Filter Strip:**
   - Horizontal scrollable chip bar pinned beneath search: `[ All (36) ]`, `[ Hot (1) ]`, `[ Warm (4) ]`, `[ Cold (4) ]`, `[ Nurturing (1) ]`, `[ Converted (4) ]`, `[ Lost (3) ]`.
   - Active chip: Solid orange `#EA580C` background, white text.
4. **Rich Lead Cards Stream (Replacing 14-Column Table):**
   - Margin: $12\,\text{px}$ vertical gap between cards, $16\,\text{px}$ side margins.
   - Container: Background `#FFFFFF`, border $1\,\text{px}$ `#E2E8F0`, radius `radius-lg` ($12\,\text{px}$).
   - Header Row: Customer Name (`Body Large`, Bold `#0F172A`) + 7-state color-coded Status Pill.
   - Key-Value Metadata:
     - Phone: Clickable `tel:` link with telephone icon.
     - Location/Branch: Branch name and code (`Griffindor Branch 042`).
     - Segment & Potential Value: `Retail` / `Corporate`, currency-formatted value (`KES 6,666`).
   - Footer Row: Product Interest tags (`[ Savings Account ]`), Assignee avatar chip (`Branson Allann`), and Action Ellipsis button (`⋯`, $48\times 48\,\text{px}$).
5. **Card Gestures:**
   - *Swipe Right (Green):* Directly launches phone dialer with customer MSISDN.
   - *Swipe Left (Blue):* Reveals shortcut action buttons: `[ Status ]` and `[ Meeting ]`.
   - *Card Tap:* Pushes Screen 4.4.1 (Lead Details Hub).

---

## 3. Suite 2: Lead Capture Experience

---

### Screens 3.1 & 3.2: Mobile Lead Capture Suite
* **Source Screens:** Screen 3.1 (New Customer, PDF Pages 4–5) & Screen 3.2 (Existing Customer, PDF Pages 6–7)
* **Mobile Screen ID:** `SCR-3.0-LEAD-CAPTURE`
* **Hierarchy Tier:** Tier 2 (Full-Screen Pushed View with Sticky Action Dock)
* **Primary Goal:** Complete lead intake for walk-in prospects or existing bank clients, with automated geolocation, smooth dynamic fields, and immediate Customer 360 linkage.

#### Structural ASCII Wireframe — New Customer Mode (Screen 3.1)
```
┌─────────────────────────────────────────┐
│ [←] Capture New Lead            [Save]  │ <-- Top Bar with Back Chevron
├─────────────────────────────────────────┤
│ CUSTOMER LEAD TYPE *                    │
│ ┌───────────────────┬─────────────────┐ │
│ │ (●) New Customer  │ ( ) Existing    │ │ <-- Segmented Control (40px)
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ CARD 1: CUSTOMER PROFILE                │
│ Customer Name *                         │
│ ┌─────────────────────────────────────┐ │
│ │ Allan Branson                       │ │
│ └─────────────────────────────────────┘ │
│ Phone Number *                          │
│ ┌─────────────────────────────────────┐ │
│ │ 0750800900                          │ │
│ └─────────────────────────────────────┘ │
│ Physical Location                       │
│ ┌─────────────────────────────────────┐ │
│ │ Nairobi                             │ │
│ └─────────────────────────────────────┘ │
│ [ 📍 Detect Current GPS Location ]     │ <-- Location Trigger Button
├─────────────────────────────────────────┤
│ CARD 2: LEAD INFORMATION                │
│ Lead Type *                             │
│ ┌─────────────────────────────────────┐ │
│ │ New Lead                          ▾ │ │
│ └─────────────────────────────────────┘ │
│ Description *                           │
│ ┌─────────────────────────────────────┐ │
│ │ Test Area                           │ │
│ └─────────────────────────────────────┘ │
│ Branch Name *                           │
│ ┌─────────────────────────────────────┐ │
│ │ Ravenclaw                         ▾ │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ CARD 3: COMMERCIAL DETAILS              │
│ Lead Source *                           │
│ ┌─────────────────────────────────────┐ │
│ │ Referral                          ▾ │ │
│ └─────────────────────────────────────┘ │
│ Referee * (Rendered dynamically)        │
│ ┌─────────────────────────────────────┐ │
│ │ Branson                             │ │
│ └─────────────────────────────────────┘ │
│ Segment: [● Retail] [Corporate] [B2B]   │
│ Priority: [Low] [● Medium] [High]       │
│ Currency & Estimated Value *            │
│ [ USD ▾ ] [ 25,000                   ]  │
│ Products: [ Salary Account 🗑 ] [ + ]   │
├─────────────────────────────────────────┤
│ CARD 4: ASSIGNMENT & NOTES              │
│ Initiator: Branson Allann               │
│ Status: [● New]                         │
│ Assignees: [ NellyM (Coll) ✕ ] [ + ]    │
│ Notes: High Value Client                │
├─────────────────────────────────────────┤
│ [ Cancel ]             [ Create Lead ]  │ <-- Sticky Action Dock (64px)
└─────────────────────────────────────────┘
```

#### Structural ASCII Wireframe — Existing Customer Mode (Screen 3.2)
```
┌─────────────────────────────────────────┐
│ [←] Capture New Lead            [Save]  │
├─────────────────────────────────────────┤
│ CUSTOMER LEAD TYPE *                    │
│ ┌───────────────────┬─────────────────┐ │
│ │ ( ) New Customer  │ (●) Existing    │ │ <-- Segmented Toggle to Existing
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ CARD 1: CBS CUSTOMER LOOKUP             │
│ Search Customer *                       │
│ ┌─────────────────────────────────────┐ │
│ │ 🔍 mateen                         ✕ │ │ <-- Live CBS Search Input
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ MATEEN PREMJI              [Verif]  │ │ <-- Hydrated Customer Card
│ │ CIF: 837649      Phone: 254703133854 │ │
│ │ Courtyard Branch (041)              │ │
│ │                                     │ │
│ │ [ View Customer 360 Profile ↗ ]     │ │ <-- EXPLICIT SOLUTION TO
│ └─────────────────────────────────────┘ │     DESKTOP HIDDEN ENTRY FLAW
├─────────────────────────────────────────┤
│ CARD 2: LEAD INFORMATION (Same as 3.1)  │
│ CARD 3: COMMERCIAL DETAILS              │
│ Target Product: [ World Credit Card 🗑] │
│ Estimated Value: [ KES 2,000,000      ] │
│ CARD 4: ASSIGNMENT (Same as 3.1)        │
├─────────────────────────────────────────┤
│ [ Cancel ]             [ Create Lead ]  │ <-- Sticky Action Dock
└─────────────────────────────────────────┘
```

#### Component Hierarchy & Form Behaviors
1. **Container:** Full-screen pushed view. Top app bar contains back chevron (`←`) with dirty-form confirmation guard.
2. **Customer Lead Type Segmented Switcher:** $40\,\text{px}$ height segmented pill. Toggling switches Card 1 between manual inputs (Screen 3.1) and CBS lookup (Screen 3.2) on the same route.
3. **Automated Geolocation Trigger:** $44\,\text{px}$ secondary button `[ 📍 Detect Current GPS Location ]` queries native location services and populates city/address string.
4. **Smooth Dynamic Conditional Logic:**
   - When `Lead Source` is changed to `Referral`, the `Referee *` text field smoothly expands into view with CSS height transition ($200\,\text{ms}$ ease-out). No layout jarring.
5. **Explicit Customer 360 Entry Gateway:**
   - In Existing Customer mode (3.2), the customer summary card renders a prominent, solid secondary button **`[ View Customer 360 Profile ↗ ]`** ($48\,\text{px}$ height). Tapping pushes Screen 3.2.1, completely eliminating the desktop flaw where Customer 360 was hidden inside a collapsed sidebar mini-card.
6. **Sticky Action Dock:**
   - Pinned at bottom, elevated with `elevation-4` ($64\,\text{px}$ height): Left: `[ Cancel ]` (Outlined, 35% width); Right: `[ Create Lead ]` (Solid Orange, 65% width). Automatically adjusts above virtual keyboard via `interactive-widget=resizes-content`.

---

## 4. Suite 3: Customer 360 Relationship Hub

---

### Screens 3.2.1 – 3.2.4: Mobile Customer 360 Hub
* **Source Screens:** Screens 3.2.1 (Accounts), 3.2.2 (Mobile Banking), 3.2.3 (Bancassurance), 3.2.4 (Credit Cards) (PDF Pages 8–15)
* **Mobile Screen ID:** `SCR-3.2-CUSTOMER-360`
* **Hierarchy Tier:** Tier 2 (Full-Screen Pushed Relationship Inspector)
* **Primary Goal:** Perform in-depth financial auditing of a customer's core accounts, mobile banking registrations, PIN security, insurance policies, and credit facilities on a mobile device.

#### Structural ASCII Wireframe — Accounts View (Screen 3.2.1)
```
┌─────────────────────────────────────────┐
│ [←] Customer 360                [⋯]     │ <-- Top App Bar
├─────────────────────────────────────────┤
│ MATEEN PREMJI                  [Verif]  │ <-- Master Biodata Card
│ CIF: 837649 • National ID: 36930306    │
│ Age: 26 • Gender: Male                  │
│ ─────────────────────────────────────── │
│ [ 📞 Call ]   [ 💬 WhatsApp ] [ ✉️ Email]│ <-- Omnichannel Quick Dock
├─────────────────────────────────────────┤
│ [🏦 Accounts] [📱 Mobile] [🛡️ Ins] [💳] │ <-- Segmented Chip Tabs (48px)
├─────────────────────────────────────────┤
│ CORE BANKING ACCOUNTS (3)               │
│ ┌─────────────────────────────────────┐ │
│ │ Salary Account             [Active] │ │ <-- Account Card 1
│ │ A/C: 5501117002    Branch: 041       │ │
│ │ Co-Owners: Sole Account Holder      │ │
│ │ ─────────────────────────────────── │ │
│ │ ACTIVE PRODUCTS CHECKLIST (EXPANDED)│ │ <-- In-Place Causality
│ │ [✔] Mobile Banking Registration     │ │     (Resolves desktop disconnect)
│ │ [✔] Visa Debit Card Active          │ │
│ │ [✔] E-Statements Enrolled           │ │
│ │ ─────────────────────────────────── │ │
│ │ [ + Add to Task ]                   │ │ <-- 44px Action Trigger
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Current Account            [Active] │ │ <-- Account Card 2
│ │ A/C: 5501117001    Branch: 038       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ▼ DTB COMPLIANCE & KYC STATUS (PASS)    │ <-- Collapsible Accordion
├─────────────────────────────────────────┤
│ ACTIVITY HISTORY (TOUCHPOINTS)          │
│ [All] [Tickets (272)] [Leads] [Orders]  │
│ • Sep 19: Salary Account Lead Created   │
│ • Aug 14: Helpdesk Ticket Closed #8812  │
└─────────────────────────────────────────┘
```

#### Structural Wireframe Variations: Sibling Segment Tabs

##### Mobile Banking Segment Tab (Screen 3.2.2)
```
┌─────────────────────────────────────────┐
│ [🏦 Accounts] [📱 Mobile] [🛡️ Ins] [💳] │
├─────────────────────────────────────────┤
│ DIGITAL BANKING PROFILES (12)           │
│ ┌─────────────────────────────────────┐ │
│ │ Registered MSISDN: 254703133854     │ │ <-- Profile Card 1
│ │ Linked A/C: 5501117002              │ │
│ │ Branch: Courtyard Branch (041)      │ │
│ │ PIN Status: [ Active PIN (Green) ]  │ │ <-- High-Visibility Badge
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Registered MSISDN: 254722000000     │ │ <-- Profile Card 2
│ │ Linked A/C: 5501117001              │ │
│ │ PIN Status: [ OTP Generated (Amber)]│ │
│ └─────────────────────────────────────┘ │
```

##### Bancassurance Segment Tab (Screen 3.2.3)
```
┌─────────────────────────────────────────┐
│ [🏦 Accounts] [📱 Mobile] [🛡️ Ins] [💳] │
├─────────────────────────────────────────┤
│ INSURANCE PORTFOLIO (2 POLICIES)        │
│ ┌─────────────────────────────────────┐ │
│ │ Policy: B/101/1002/2023/000002/0011 │ │
│ │ Line: [ GENERAL INSURANCE ]         │ │
│ │ Insurer: Jubilee Insurance          │ │
│ │ Expiration Date: 05-Oct-2027        │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Policy: IL202302360223              │ │
│ │ Line: [ LIFE ASSURANCE ]            │ │
│ │ Expiration Date: 26-Apr-2028        │ │
│ └─────────────────────────────────────┘ │
```

##### Credit Card Segment Tab (Screen 3.2.4)
```
┌─────────────────────────────────────────┐
│ [🏦 Accounts] [📱 Mobile] [🛡️ Ins] [💳] │
├─────────────────────────────────────────┤
│ ACTIVE CREDIT FACILITIES (2 CARDS)      │
│ ┌─────────────────────────────────────┐ │
│ │ World Credit Card (Primary)         │ │
│ │ Card PAN: 5244 06XX XXXX 7240       │ │ <-- Masked PAN Display
│ │ Status: [ REPLACED ] (Amber Badge)  │ │
│ │ Credit Limit: KES 2,000,000         │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Titanium Credit Card (Secondary)    │ │
│ │ Card PAN: 5244 06XX XXXX 0895       │ │
│ │ Status: [ NORMAL ] (Green Badge)    │ │
│ │ Credit Limit: KES 2,000,000         │ │
│ └─────────────────────────────────────┘ │
```

#### Component Hierarchy & Specifications
1. **Master Biodata Header Card:**
   - Background `#FFFFFF`, padding `16px`, elevation `elevation-1`.
   - Customer Name (`Heading 2` $20\,\text{px}$ bold) with verified green checkmark badge.
   - 3-column metadata: CIF, National ID, Age, Gender.
   - Omnichannel Quick Dock: 3 horizontal circular buttons ($44\times 44\,\text{px}$) for immediate Call, WhatsApp, and Email.
2. **Horizontal Segmented Chip Tabs (Replacing Desktop Tiny Radio Buttons):**
   - Height: $48\,\text{px}$ with generous hit areas.
   - Tabs: `Accounts (3)`, `Mobile Banking (12)`, `Bancassurance (2)`, `Credit Cards (2)`.
   - Active tab highlighted in solid orange `#EA580C` with white text.
3. **Causality Fix on Accounts & Dynamic Products (3.2.1):**
   - In desktop, clicking an account card updated a products checklist far down the screen off-viewport.
   - On mobile, tapping an Account Card **expands the active product checklist directly inside that account card container**, providing immediate visual confirmation of active products.

---

## 5. Suite 4: Contextual Actions & Overlays

---

### Screen 4.0: Lead Actions Context Menu
* **Source Screen:** Screen 4.0 (PDF Page 16, Image `img-012.png`)
* **Mobile Screen ID:** `SCR-4.0-LEAD-ACTIONS`
* **Hierarchy Tier:** Tier 3 (Modal Bottom Sheet Overlay)
* **Primary Goal:** Expose all 6 lead workflow triggers with thumb-friendly $52\,\text{px}$ touch rows, eliminating off-screen desktop dropdown clipping.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│              [── Handle ──]             │ <-- Drag Down Handle
│ LEAD ACTIONS: L-2026-000184             │ <-- Sheet Title (H3)
│ ZAMZAM HASSAN MOHAMED • Status: Warm    │ <-- Context Subtitle
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 📅  Schedule Meeting                │ │ <-- 52px Touch Row (Screen 4.1)
│ ├─────────────────────────────────────┤ │
│ │ 🔄  Update Status                   │ │ <-- 52px Touch Row (Screen 4.2)
│ ├─────────────────────────────────────┤ │
│ │ 👥  Reassign Lead                   │ │ <-- 52px Touch Row (Screen 4.3)
│ ├─────────────────────────────────────┤ │
│ │ 👁️  View Details & Activity Log     │ │ <-- 52px Touch Row (Screen 4.4)
│ ├─────────────────────────────────────┤ │
│ │ 📄  Export as PDF                   │ │ <-- 52px Touch Row (Download)
│ ├─────────────────────────────────────┤ │
│ │ ✉️  Export as PDF via Email         │ │ <-- 52px Touch Row (Email)
│ └─────────────────────────────────────┘ │
│ [ Cancel ]                              │ <-- Full-Width Ghost Button
└─────────────────────────────────────────┘
```

#### Specifications:
* Slide-up modal bottom sheet, width 100%, top corners `radius-lg` ($16\,\text{px}$).
* Background: `#FFFFFF`, elevation `elevation-3`, dimmed backdrop `rgba(15, 23, 42, 0.4)`.
* Each action item has minimum height of $52\,\text{px}$, $20\,\text{px}$ icon, $15\,\text{px}$ semibold text, and chevron right arrow (`›`).

---

### Screen 4.1: Schedule Meeting (Add Event) Form Sheet
* **Source Screen:** Screen 4.1 (PDF Page 16, Image `img-013.png`)
* **Mobile Screen ID:** `SCR-4.1-SCHEDULE-MEETING`
* **Hierarchy Tier:** Tier 2 (Full-Screen Form Sheet)
* **Primary Goal:** Schedule a client meeting, configure Nylas calendar sync, and reserve resources without desktop modal scroll collapse.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│ [✕] Schedule Meeting           [Create] │ <-- Top Bar with Close '✕'
├─────────────────────────────────────────┤
│ LEAD CONTEXT: L-2026-000184             │
│ Customer: ZAMZAM HASSAN MOHAMED         │
├─────────────────────────────────────────┤
│ Meeting Status *                        │
│ ┌───────────────────────────────────┬─┐ │
│ │ In-Discussion                     │+│ │ <-- Dropdown with '+' custom
│ └───────────────────────────────────┴─┘ │
│ Location *                              │
│ ┌─────────────────────────────────────┐ │
│ │ Courtyard Branch - Boardroom 1    ▾ │ │
│ └─────────────────────────────────────┘ │
│ Department *                            │
│ ┌─────────────────────────────────────┐ │
│ │ Retail Banking                    ▾ │ │
│ └─────────────────────────────────────┘ │
│ Start Date & Time *                     │
│ [ 📅 19-Sep-2026 ]  [ ⏰ 06:45 PM ]     │ <-- Native Mobile Date/Time Pickers
│ End Date & Time *                       │
│ [ 📅 19-Sep-2026 ]  [ ⏰ 12:00 AM ]     │
│ Purpose of Meeting *                    │
│ ┌─────────────────────────────────────┐ │
│ │ Salary Account Presentation         │ │
│ └─────────────────────────────────────┘ │
│ ▼ Additional Details & Room Notes       │ <-- Collapsible Details Accordion
│ Calendar Sync: Nylas Calendar ▾         │
│ Staff Assigned: [ Branson Allann ✕ ]    │
│ Linked Customer: [ ZAMZAM HASSAN ✕ ]    │
├─────────────────────────────────────────┤
│ [ Cancel ]             [ Create Event ] │ <-- Sticky Action Dock
└─────────────────────────────────────────┘
```

#### Specifications:
* Full-screen sheet with sticky bottom dock. Virtual keyboard auto-adjusts scroll position.
* Native mobile date wheel and time pickers replace desktop free-text date inputs.

---

### Screen 4.2: Update Status Bottom Sheet
* **Source Screen:** Screen 4.2 (PDF Page 17, Image `img-014.png`)
* **Mobile Screen ID:** `SCR-4.2-UPDATE-STATUS`
* **Hierarchy Tier:** Tier 3 (Half-Height Bottom Sheet)
* **Primary Goal:** Execute rapid 5-second lead qualification transitions with audit comments.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│              [── Handle ──]             │
│ Update Pipeline Status                  │
│ Lead: L-2026-000184 • Current: [ Warm ] │
├─────────────────────────────────────────┤
│ SELECT NEW STATUS *                     │
│ ┌──────────┐ ┌──────────┐ ┌───────────┐ │
│ │ ( ) New  │ │ ( ) Cold │ │ (●) Warm  │ │ <-- 1-Tap Color-Coded Chips
│ ├──────────┤ ├──────────┤ ├───────────┤ │
│ │ ( ) Hot  │ │( )Nurture│ │( )Convert │ │
│ └──────────┘ └──────────┘ └───────────┘ │
│                                         │
│ Transition Comments (Optional)          │
│ ┌─────────────────────────────────────┐ │
│ │ Customer confirmed interest in      │ │ <-- Multi-line Text Area
│ │ salary account onboarding           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [ Update Status ]                       │ <-- Solid Orange Button (48px)
└─────────────────────────────────────────┘
```

#### Specifications:
* Half-height bottom sheet ($380\,\text{px}$ height).
* Status options rendered as a 3x2 grid of color-coded chips for single-tap selection.
* Button: Full-width solid orange `#EA580C`. Updates lead instantly, writes to audit log, and dismisses sheet.

---

### Screen 4.3: Reassign Lead Bottom Sheet
* **Source Screen:** Screen 4.3 (PDF Page 17, Image `img-015.png`)
* **Mobile Screen ID:** `SCR-4.3-REASSIGN-LEAD`
* **Hierarchy Tier:** Tier 3 (Half-Height Bottom Sheet)
* **Primary Goal:** Modify collaborative sales assignees with prominent touch-friendly deletion controls.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│              [── Handle ──]             │
│ Reassign Lead Ownership                 │
│ Lead ID: L-2026-000184                  │
├─────────────────────────────────────────┤
│ CURRENT ASSIGNED TEAM                   │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 Branson Allann                   │ │
│ │    Role: [ Relationship Manager ]   │ │
│ │    [ 🗑 Remove Officer ]            │ │ <-- Explicit 44px Delete Target
│ ├─────────────────────────────────────┤ │
│ │ 👤 Calendar Event                   │ │
│ │    Role: [ Administrator ]          │ │
│ │    [ 🗑 Remove Officer ]            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ADD NEW ASSIGNMENT                      │
│ ┌─────────────────────────────────────┐ │
│ │ 🔍 Search staff member to add...  ▾ │ │ <-- Searchable User Picker
│ └─────────────────────────────────────┘ │
│ Handover Notes (Optional)               │
│ ┌─────────────────────────────────────┐ │
│ │ Transferred for corporate onboarding│ │
│ └─────────────────────────────────────┘ │
│ [ Update Assignment ]                   │ <-- Solid Orange Button (48px)
└─────────────────────────────────────────┘
```

#### Specifications:
* Resolves desktop tiny $12\,\text{px}$ `✕` delete hit-box by providing an explicit $44\,\text{px}$ destructive remove button for each assigned officer.
* Searchable staff dropdown opens a nested bottom-sheet picker.

---

## 6. Suite 5: Lead Details & Audit History

---

### Screens 4.4.1 & 4.4.2: Mobile Lead Details Hub
* **Source Screens:** Screen 4.4.1 (Profile Tab, PDF Page 18) & Screen 4.4.2 (Activity Log Tab, PDF Page 19)
* **Mobile Screen ID:** `SCR-4.4-LEAD-DETAILS`
* **Hierarchy Tier:** Tier 2 (Full-Screen Pushed Inspection View)
* **Primary Goal:** Complete inspection of lead attributes and historical chronological audit trail without desktop modal text squishing.

#### Structural ASCII Wireframe — Profile Tab (Screen 4.4.1)
```
┌─────────────────────────────────────────┐
│ [←] Lead Details                [Edit]  │ <-- Top App Bar
├─────────────────────────────────────────┤
│ ZAMZAM HASSAN MOHAMED        [ Nurture] │ <-- Hero Card
│ Lead ID: L-2026-000184   Value: KES 6666│
│ ─────────────────────────────────────── │
│ [ 📞 Call ]   [ 💬 WhatsApp ] [ ✉️ Email]│ <-- Direct Contact Dock
├─────────────────────────────────────────┤
│ ┌───────────────────┬─────────────────┐ │
│ │ [● Profile]       │ [ Activity Log] │ │ <-- Segmented View Switcher
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ CUSTOMER INFORMATION                    │
│ • Phone Number: +254 712 345 678        │
│ • Address: P.O BOX 234 50100 KAKAMEGA   │
│ • Customer Segment: Retail / Individual │
├─────────────────────────────────────────┤
│ LEAD SPECIFICATIONS                     │
│ • Lead Type: New Lead                   │
│ • Lead Source: Referral (Referee: fff)  │
│ • Branch: Griffindor Branch (042)        │
│ • Priority: (●) Low                     │
│ • Description: Customer salary account  │
├─────────────────────────────────────────┤
│ TARGET PRODUCTS                         │
│ • [ Savings Account ]                   │
├─────────────────────────────────────────┤
│ ASSIGNMENT & CREATION                   │
│ • Initiator: Calendar Event             │
│ • Assigned Officers: Branson Allann     │
│ • Internal Notes: 6666                  │
├─────────────────────────────────────────┤
│ [ Status ]     [ Reassign ] [ Schedule ]│ <-- Sticky Bottom Action Dock
└─────────────────────────────────────────┘
```

#### Structural ASCII Wireframe — Activity Log Tab (Screen 4.4.2)
```
┌─────────────────────────────────────────┐
│ [←] Lead Details                [Edit]  │
├─────────────────────────────────────────┤
│ ZAMZAM HASSAN MOHAMED        [ Nurture] │
├─────────────────────────────────────────┤
│ ┌───────────────────┬─────────────────┐ │
│ │ [ Profile ]       │ [● Activity Log]│ │ <-- Activity Log Tab Active
│ └───────────────────┴─────────────────┘ │
├─────────────────────────────────────────┤
│ CHRONOLOGICAL AUDIT TRAIL               │
│                                         │
│ ● 19-Sep-2026 06:45 PM (2 hours ago)    │ <-- Timeline Node 1
│ │ Status Updated: Warm → Nurturing      │
│ │ Actor: Branson Allann [RM]            │
│ │ Comment: Customer confirmed interest  │
│ │                                       │
│ ● 19-Sep-2026 04:30 PM (4 hours ago)    │ <-- Timeline Node 2
│ │ Status Updated: Warm → Warm           │
│ │ Actor: Branson Allann [RM]            │
│ │ Comment: Called client, meeting fixed │
│ │                                       │
│ ● 19-Sep-2026 02:15 PM                  │ <-- Timeline Node 3
│   Lead Created from Referral Source     │
│   Actor: Calendar Event [Admin]         │
│                                         │
├─────────────────────────────────────────┤
│ [ Status ]     [ Reassign ] [ Schedule ]│ <-- Sticky Bottom Action Dock
└─────────────────────────────────────────┘
```

#### Specifications:
* Replaces desktop cramped 2-column modal with a dedicated full-screen pushed view.
* Profile tab organizes 16 lead attributes into single-column clean cards.
* Activity log tab renders vertical chronological timeline stream with connecting nodes and actor badges.
* Sticky bottom action dock provides 1-tap triggers: `[ Status ]` (opens 4.2), `[ Reassign ]` (opens 4.3), `[ Schedule ]` (opens 4.1).

---

## 7. Suite 6: Authentication & Settings

---

### Screen 5.0: Mobile SSO Login Gate
* **Source Screen:** Screen 5.0 (PDF Page 20, Image `img-018.png`)
* **Mobile Screen ID:** `SCR-5.0-LOGIN-SSO`
* **Hierarchy Tier:** Tier 0 (Root Authentication Gate)
* **Primary Goal:** Secure corporate Single Sign-On authentication for banking staff.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│                                         │
│               [ DTB LOGO ]              │ <-- Bank Brand Mark
│             DIAMOND TRUST BANK          │
│                                         │
│               Kati CRM                  │
│       Enterprise Sales Portal           │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Corporate Email Address *           │ │ <-- Email Input with Focus
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ allan.branson@dtbafrica.com     │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │ Use your official DTB Africa email   │ │
│ │                                     │ │
│ │ [ Log In with SSO ]                 │ │ <-- Solid Magenta Button (52px)
│ └─────────────────────────────────────┘ │
│                                         │
│ 🔒 Protected by Diamond Trust Bank      │
│    Enterprise Security & 2FA Policies   │
└─────────────────────────────────────────┘
```

#### Specifications:
* Form centered vertically with responsive top margin ($80\,\text{px}$).
* Email input utilizes `type="email"` mobile keyboard.
* Button: Solid corporate magenta/maroon `#8B1D41` with $52\,\text{px}$ height. Launches secure In-App Browser for SAML/OAuth2 token exchange.

---

### Screen 5.1: Mobile Settings & Company Profile
* **Source Screen:** Screen 5.1 (PDF Page 20, Image `img-019.png`)
* **Mobile Screen ID:** `SCR-5.1-SETTINGS-PROFILE`
* **Hierarchy Tier:** Tier 2 (Full-Screen Pushed View via App Drawer)
* **Primary Goal:** Manage enterprise credentials, copy API keys, configure 2FA, and manage personal profile.

#### Structural ASCII Wireframe (390px Viewport)
```
┌─────────────────────────────────────────┐
│ [←] Company & User Profile              │ <-- Top App Bar
├─────────────────────────────────────────┤
│ ▼ COMPANY DETAILS                       │ <-- Collapsible Section 1
│ • Name: Central Electricals             │
│ • Phone: 079387223                      │
│ • Currency: [ KES ▾ ]                   │
│ • Enterprise API Key:                   │
│   ┌───────────────────────────────────┐ │
│   │ 1677317336185x147232494608711680  │ │
│   └───────────────────────────────────┘ │
│   [ 📋 Copy API Key ]                  │ <-- 1-Tap Copy Action
├─────────────────────────────────────────┤
│ ▶ TAXES CONFIGURATION (3 RULES)         │ <-- Collapsible Section 2
├─────────────────────────────────────────┤
│ ▼ SECURITY & TWO-FACTOR (2FA)           │ <-- Collapsible Section 3
│ • 2FA Status: Enabled (SMS/Authenticator│
│ • Login: bransontechnologies@outlook.com│
│ [ Add Second Step ]  [ Change Password ]│
├─────────────────────────────────────────┤
│ ▼ EMPLOYEE PERSONAL PROFILE             │ <-- Collapsible Section 4
│ ┌─────────┐ Branson Allan               │
│ │ Avatar  │ Role: Relationship Manager  │
│ │ [Photo] │ Employer Phone: 254710928843│
│ └─────────┘ WhatsApp: +254710928843     │
│ [ 📷 Upload Profile Picture ]           │
├─────────────────────────────────────────┤
│ [ 🚪 Log Out of Kati CRM ]              │ <-- Destructive Logout Action
└─────────────────────────────────────────┘
```

#### Specifications:
* Single-column vertical scroll with expandable accordion sections.
* API key features a dedicated 1-tap copy button with instant confirmation toast.
* Avatar photo upload triggers native mobile camera/gallery picker.
* Bottom of view features red destructive `[ Log Out ]` button that clears session tokens and resets root view to Screen 5.0.

---

## 8. Summary Traceability Matrix (Source to Stage 4 Specs)

| Source Screen # | Source Screen Name | Stage 4 Mobile Screen ID | Mobile Layout Pattern | Key Mobile Enhancements |
|---|---|---|---|---|
| **1.0** | Sales Dashboard | `SCR-1.0-DASHBOARD` | Bottom Nav Tab 1 Root | 2x4 KPI grid, horizontal swipe pipeline funnel, scrub charts, extended FAB. |
| **2.0** | All Leads Table | `SCR-2.0-ALL-LEADS` | Bottom Nav Tab 2 Root | Rich Lead Cards stream, sticky search, horizontal status chips, swipe-to-call. |
| **3.1** | Create Lead (New Cust) | `SCR-3.0-LEAD-CAPTURE` | Full-Screen Pushed Form | GPS location trigger, smooth conditional referee animation, sticky action dock. |
| **3.2** | Create Lead (Exist Cust) | `SCR-3.0-LEAD-CAPTURE` | Full-Screen Pushed Form | Live CBS search, hydrated customer card with **prominent Customer 360 button**. |
| **3.2.1** | Cust 360 (Accounts) | `SCR-3.2-CUSTOMER-360` | Full-Screen Pushed Hub | Omnichannel quick dock, horizontal tabs, in-place expandable active products. |
| **3.2.2** | Cust 360 (Mobile Banking) | `SCR-3.2-CUSTOMER-360` | Segment Tab 2 | Clean profile cards replacing 12-row table, high-visibility PIN badges. |
| **3.2.3** | Cust 360 (Bancassurance) | `SCR-3.2-CUSTOMER-360` | Segment Tab 3 | Insurance cards with General/Life badges, policy numbers, and expiration dates. |
| **3.2.4** | Cust 360 (Credit Card) | `SCR-3.2-CUSTOMER-360` | Segment Tab 4 | Masked PAN cards, replacement status badges, credit facility limits. |
| **4.0** | Lead Actions Menu | `SCR-4.0-LEAD-ACTIONS` | Modal Bottom Sheet | 100% width sheet, 6 large 52px action items with clear icons. |
| **4.1** | Schedule Lead Meeting | `SCR-4.1-SCHEDULE-MEETING`| Full-Screen Form Sheet | Pre-filled lead context, native OS date/time pickers, Nylas sync verification. |
| **4.2** | Update Status Pop-up | `SCR-4.2-UPDATE-STATUS` | Half-Height Bottom Sheet | 3x2 grid of 1-tap color-coded status chips, quick transition comments. |
| **4.3** | Reassign Lead Pop-up | `SCR-4.3-REASSIGN-LEAD` | Half-Height Bottom Sheet | Active team roster with 44px delete targets, searchable user picker. |
| **4.4.1** | Lead Details (Profile) | `SCR-4.4-LEAD-DETAILS` | Full-Screen Pushed View | Hero header, single-column attribute cards, direct contact dock. |
| **4.4.2** | Lead Details (Activity Log)| `SCR-4.4-LEAD-DETAILS` | Segment Tab 2 View | Chronological vertical timeline stream with connecting nodes and actor stamps. |
| **5.0** | Login Page | `SCR-5.0-LOGIN-SSO` | Full-Screen Auth Gate | Centered mobile card, email keyboard, 52px solid magenta SSO button. |
| **5.1** | Company & User Profile | `SCR-5.1-SETTINGS-PROFILE`| Full-Screen Pushed View | Collapsible accordions, 1-tap API key copy, photo upload, 2FA management. |

---

## 9. Conclusion & Implementation Handoff

The **Stage 4 Mobile Screen Layouts & Detailed UI Specifications** complete the visual blueprints for the Kati CRM Sales Module. Every screen from the 20-page source document is represented with 100% functional completeness, strict adherence to the visual design tokens, and optimal touch ergonomics for enterprise banking field sales.
