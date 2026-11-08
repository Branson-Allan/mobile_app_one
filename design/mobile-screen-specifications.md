# Mobile Screen Specifications & Component Blueprints: Kati Enterprise Sales Module

> **Document Version:** 1.0.0  
> **Source Baseline:** `reference/sales-module-source.pdf` / `design/screen-mapping.md`  
> **Target Platform:** Mobile (iOS / Android / Flutter Cross-Platform, 360px–430px viewports)  
> **Status:** Phase 2 Comprehensive Screen Specifications

---

## 1. Specification Matrix & Traceability

This document defines the complete mobile interaction, data display, component architecture, and responsive behaviors for all **16 source screens** (plus the dedicated mobile filter sheet `M-2.0-F`).

| Mobile Screen ID | Source Screen # | Redesigned Screen Title | UI Pattern & Modality | Primary Deliverables & Changes |
|---|---|---|---|---|
| **M-1.0** | Screen 1.0 | Mobile Sales Dashboard | Native Screen (Tab 1) | Carousel KPI cards, horizontal pipeline chips, stacked charts, filter trigger |
| **M-2.0** | Screen 2.0 | Mobile All Leads Master | Native Screen (Tab 2) | 14-col table replaced by `Comp-LeadCard` list, search bar, KPI chips, FAB |
| **M-2.0-F** | Screen 2.0 (Drawer) | Mobile Leads Filter Sheet | Modal Bottom Sheet (85%) | Multi-attribute filter sheet with preset chips, date wheels, sticky CTA |
| **M-3.1** | Screen 3.1 | Capture Lead (New Customer) | Full-Screen Flow | 4 collapsible cards, GPS geolocation button, dynamic referee, product/staff tags |
| **M-3.2** | Screen 3.2 | Capture Lead (Existing Customer) | Full-Screen Flow | Autocomplete customer search, CBS prefill, direct Customer 360 gateway card |
| **M-3.2.1** | Screen 3.2.1 | Customer 360: Overview & Accounts | Native Screen (Tab 3) | Master biodata card, comms bar, account cards, dynamic products, compliance |
| **M-3.2.2** | Screen 3.2.2 | Customer 360: Mobile Banking | Tabbed Segment View | Card-based registry of 12 mobile banking accounts, PIN status tags |
| **M-3.2.3** | Screen 3.2.3 | Customer 360: Bancassurance | Tabbed Segment View | General & Life insurance policy cards, expiration dates, IPEN indicators |
| **M-3.2.4** | Screen 3.2.4 | Customer 360: Credit Card | Tabbed Segment View | Visual credit cards, masked PANs, limits, card status, omnichannel dock |
| **M-4.0** | Screen 4.0 | Lead Actions Sheet | Modal Bottom Sheet | Native action sheet with 7 thumb-friendly rows replacing desktop ellipsis |
| **M-4.1** | Screen 4.1 | Schedule Meeting (Add Event) | Full-Screen Modal Flow | Native date/time wheels, Nylas calendar sync, resources, staff/customer chips |
| **M-4.2** | Screen 4.2 | Quick Status Update Sheet | Modal Bottom Sheet (50%) | Quick stage selector chips, transition remarks text area, instant save CTA |
| **M-4.3** | Screen 4.3 | Reassign Lead Sheet | Modal Bottom Sheet (60%) | Active assignees with role badges and 32px delete hits, staff picker, notes |
| **M-4.4.1** | Screen 4.4.1 | Lead Details: Profile View | Dedicated Screen / Hub | Segmented control `[Profile]`, 2-column data mapped to readable mobile cards |
| **M-4.4.2** | Screen 4.4.2 | Lead Details: Activity Log | Dedicated Screen / Hub | Segmented control `[Activity Log]`, chronological vertical event timeline |
| **M-5.0** | Screen 5.0 | Mobile SSO Authentication | Standalone Screen | Corporate email input, solid magenta SSO button, biometrics, branding |
| **M-5.1** | Screen 5.1 | Company & User Profile | Dedicated Screen (Hub) | Photo upload, personal profile, company details, currency, API key, 2FA |

---

## 2. Screen-by-Screen Mobile Specifications

---

### Screen M-1.0: Mobile Sales Dashboard
* **Source Screen:** Screen 1.0 (`Dashboard`)
* **Navigation Placement:** Tab 1 on Mobile Bottom Navigation Bar (`Dashboard`).
* **Route / Path:** `/dashboard`

#### Layout & Visual Architecture:
1. **Persistent Top App Bar (56px):**
   * Kati brand logo + "DTB Africa" badge.
   * Telephony Presence Pill (`Online ▾`).
   * Notification Bell (`🔔8`).
   * User Profile Avatar (`👤`).
2. **Contextual Filter & Date Sub-Header (Height 44px):**
   * Left: Active date range chip (`1 Jun – 19 Sep, 2026 ▾`). Tapping opens quick date range wheel.
   * Right: Filter funnel icon button (`Filter (0)`). Tapping opens Dashboard Filter Sheet.
3. **Performance Overview Carousel (Horizontal Scroll):**
   * Replaces 8 desktop horizontal cards with a swipeable, edge-padded horizontal carousel.
   * Displays 8 `Comp-MetricCard` tiles:
     - `Total Leads: 11`
     - `Converted Leads: 2` (Green accent)
     - `Hot Leads: 1` (Rose accent)
     - `Warm Leads: 3` (Orange accent)
     - `Cold Leads: 2` (Sky accent)
     - `Follow-Ups Today: 0`
     - `Meetings Today: 0`
     - `Open Engagements: 5`
4. **Lead Pipeline Summary Section:**
   * Replaces the 6-column desktop Kanban board with an interactive **Horizontal Stage Bar**:
     - `New (2)` | `Cold (2)` | `Warm (3)` | `Hot (1)` | `Nurturing (1)` | `Converted (2)`
   * Tapping any stage chip filters the mini-list below or navigates to Screen M-2.0 with that status pre-selected.
   * Mini-card preview showing urgent leads in that stage (e.g., `COLLINS w SAKWA — KSh 1,000,000`).
5. **Analytics & Trends Section (Vertically Stacked):**
   * **Chart 1 — Lead Conversion Trend:** Full-width time-series line chart with pinch-to-zoom and scrub tooltip showing conversion count across date intervals (`Jun 1` to `Sep 14, 2026`).
   * **Chart 2 — Product Interest Distribution:** Interactive donut chart with centered total count and a clear, 2-column tappable legend below:
     - 🔴 `Savings account` | 🟠 `Salary Account`
     - 🟡 `Personal Loan`   | 🟢 `Overdraft Facility`
     - 🔵 `Debit Card`      | ⚫ `World Credit Card`

---

### Screen M-2.0: Mobile All Leads Master Screen
* **Source Screen:** Screen 2.0 (`All LEADS tABLE`)
* **Navigation Placement:** Tab 2 on Mobile Bottom Navigation Bar (`Leads`).
* **Route / Path:** `/leads`

#### Layout & Visual Architecture:
1. **Search & Filter Action Bar (Height 56px):**
   * **Quick Search Input:** Full-width text input with magnifying glass icon ("Search by customer name, phone, or Lead ID...").
   * **Filter Button (`Filter`):** Prominent button with filter funnel icon displaying active badge counter (`Filter (2)`). Tapping opens Screen M-2.0-F.
   * **Export Action:** Compact tray icon button to export leads summary.
2. **Horizontal Status Filter Pill Strip (Height 40px):**
   * Swipeable horizontal pill strip displaying counts:
     - `All (36)` [Active, Dark Navy]
     - `Hot (1)` [Rose]
     - `Warm (4)` [Orange]
     - `Cold (4)` [Sky]
     - `Nurturing (1)` [Purple]
     - `Converted (4)` [Green]
     - `Lost (3)` [Slate]
3. **Master Leads Feed (List View):**
   * Replaces the 14-column desktop table with a vertical list of `Comp-LeadCard` components (10 per page, with pull-to-refresh and infinite scroll pagination).
   * **Lead Card Data Elements:**
     - Lead ID (`L-2026-000180`)
     - Status Badge (`[ Converted ]`)
     - Action Ellipsis Button (`⋮` with 48x48px touch target)
     - Customer Name (`JEREMIAH VINCENT AKWIRI`)
     - Tap-to-call phone link (`📞 254742121445`)
     - Location & Segment (`📍 Kakamega • Retail`)
     - Product Interest (`💼 Salary Account`)
     - Potential & Converted Values (`💰 KES 1,200 | Converted: KES 12,000.00`)
     - Assigned Staff & Created Date (`👤 Demo Account, Mutai • 01-Sep-2026`)
4. **Floating Action Button (FAB):**
   * Solid Orange circular FAB anchored in bottom-right corner: `+ New Lead` (height 56px, width 56px, elevation 3).
   * Tapping FAB navigates to Screen M-3.1 (Lead Capture Flow).

---

### Screen M-2.0-F: Mobile Leads Filter Sheet
* **Source Screen:** Screen 2.0 (Collapsible Filter Drawer)
* **Modality:** Modal Bottom Sheet (85% viewport height with top drag handle).
* **Trigger:** Tapping `Filter` button on Screen M-2.0.

#### Layout & Controls:
1. **Sheet Header (Sticky):**
   * Title: "Filter Leads" (18px Semi-Bold).
   * Right: "Reset All" text button.
   * Close: Top-right `✕` icon.
2. **Scrollable Filter Criteria:**
   * **Customer / Keyword:** Text search input.
   * **Lead Status:** Multi-select wrap chips (`New`, `Cold`, `Warm`, `Hot`, `Nurturing`, `Converted`, `Lost`).
   * **Customer Segment:** Multi-select chips (`Retail`, `Corporate`, `Business`).
   * **Lead Priority:** Multi-select chips (`Low`, `Medium`, `High`).
   * **Lead Source:** Dropdown picker sheet (`Referral`, `Contact Centre`, `Door to Door`, `Website Inquiry`).
   * **Assigned Employee:** Searchable staff selector picker.
   * **Date Range:** "Date From" and "Date To" native date pickers.
3. **Sheet Footer (Sticky at bottom, Elevation 3):**
   * Primary Button: `Apply Filters (36 Leads)` — Solid brand orange, full width, height 48px.

---

### Screen M-3.1: Mobile Create Lead (New Customer)
* **Source Screen:** Screen 3.1 (`Create a new lead for an New Customer`)
* **Modality:** Full-Screen Flow with fixed top header and sticky bottom bar.
* **Route / Path:** `/leads/create`

#### Layout & Form Architecture:
1. **Top Header Bar (56px):**
   * Left: Back arrow (`←`).
   * Title: "Capture New Lead".
   * Right: Close button (`✕`).
2. **Customer Type Segmented Switcher (Card 1 Top):**
   * Full-width segmented control:
     * `[ ● New Customer ]` | `[ Existing Customer ]`
   * Selecting `Existing Customer` seamlessly morphs form to Screen M-3.2.
3. **Card 1: Customer Identification:**
   * `Customer Name *`: Text input with person icon.
   * `Phone Number *`: Phone input with auto-country prefix (`+254`).
   * `Physical Location`: Text input paired with a native **"Use Current GPS Location" button** that queries device geolocation.
4. **Card 2: Lead Categorization:**
   * `Lead Type *`: Select dropdown (`New Lead`).
   * `Description *`: Multi-line text area (3 rows).
   * `Branch Name *`: Dropdown picker sheet (`Ravenclaw`, `Griffindor`, `Courtyard`).
5. **Card 3: Commercial & Product Details:**
   * `Lead Source *`: Dropdown (`Referral`, `Door to Door`, etc.).
   * **Conditional Referee Field:** Strictly renders below `Lead Source` only if source is `Referral` or `Referee`. Smooth animated expansion prevents jarring layout reflow.
   * `Customer Segment *`: Dropdown (`Retail`, `Corporate`, `Business`).
   * `Lead Priority *`: Segmented chip selector (`Low`, `Medium`, `High`).
   * `Estimated Value *`: Currency dropdown (`USD`, `KES`) + numeric input.
   * `Product Type *`: Dropdown to select products. Selected items render as dismissible tag chips with **isolated 32px delete trash targets** (`Salary Account 🗑`, `Savings account 🗑`).
6. **Card 4: Assignment & Remarks:**
   * `Lead Initiator *`: Dropdown (`Branson Allann`).
   * `Lead Status *`: Dropdown selector (`New`).
   * `Comments or Notes`: Multi-line text area.
   * `Add Assignment`: User picker sheet. Selected staff render as chips with role badges and delete icons (`NellyM [Collections Manager] ✕`).
7. **Sticky Bottom Action Bar:**
   * Dual Buttons: `Cancel` (outlined, 40% width) and `Create Lead` (solid orange, 60% width, height 48px).

---

### Screen M-3.2: Mobile Create Lead (Existing Customer)
* **Source Screen:** Screen 3.2 (`Create a new lead for an Existing Customer`)
* **Modality:** Full-Screen Flow.
* **Route / Path:** `/leads/create?type=existing`

#### Distinct Mobile Interactions:
1. **Customer Type Switcher:** Set to `[ Existing Customer ]`.
2. **Card 1: Autocomplete Customer Lookup:**
   * Search Input: `Search Customer *` with instant search icon.
   * **Results Dropdown Sheet:** Displays matching customers with Name, Email, and Phone.
   * **Populated Customer Summary Card:** Once selected, replaces the input with a verified customer card:
     * Customer Avatar with green verified checkmark.
     * Full Name (`Mateen Premji`), Phone (`254703133854`), Account (`-`), Location (`-`).
     * **Direct Customer 360 Action Button:** `[ 🔍 View Customer 360 ]` — Tapping deep-links directly to Screen M-3.2.1, completely eliminating the desktop hidden sidebar avatar problem!
3. **Cards 2, 3, 4:** Identical to Screen M-3.1.
4. **Sticky Bottom Action Bar:** `Cancel` and `Create Lead`.

---

### Screen M-3.2.1: Mobile Customer 360 — Overview & Accounts
* **Source Screen:** Screen 3.2.1 (`Existing Customer profile/360`)
* **Navigation Placement:** Tab 3 on Bottom Navigation Bar (`Customers`), or via Lead Card link.
* **Route / Path:** `/customers/:cif`

#### Layout & Architecture:
1. **Customer Identity Header Card:**
   * Customer Avatar circle with verified badge.
   * Customer Full Name (`BILAL MUGHAL`), National ID/Passport (`36930306`), CIF (`837649`).
   * Age & DOB (`26 yrs • 12/28/1999 • KE`).
2. **Quick Omnichannel Contact Toolbar (Height 48px):**
   * 4 Round Action Buttons:
     * `[ 📞 Call ]` (Triggers native phone dialer)
     * `[ ✉️ Email ]` (Triggers native mail client)
     * `[ 💬 Chat ]` (Opens CRM messaging)
     * `[ ➕ Task ]` (Opens Add Task modal)
3. **DTB Banking Segments (Sticky Segmented Tab Strip):**
   * Replaces desktop radio buttons with a swipeable, thumb-friendly 4-segment tab bar:
     * `[ Accounts ]` (Active)
     * `[ Mobile Banking ]`
     * `[ Bancassurance ]`
     * `[ Credit Card ]`
4. **Accounts Content Section (Under `Accounts` Tab):**
   * **Account Cards List:** Vertically stacked cards for each core banking account:
     - Card 1: Account `5501117002` | `Nyali Branch (038)` | Status: `Active` | Co-owners: `William Ndeti, Riaz S. Haji, Farez Madataly Kanji, Tazmina Kassam` | `[ + Add to Task ]`
     - Card 2: Account `5501117001` | `Courtyard Branch (041)` | Status: `Active`
     - Card 3: Account `0837649001` | `DTB Salary Account` | `Courtyard Branch`
   * **Dynamic Products per Selected Account:**
     - Prominent label: *"Active Products for Selected Account:"*
     - Product checklist with green checkmark badges.
5. **DTB Compliance Section (Collapsible Accordion):**
   * Tap to expand KYC risk ratings, AML verification, and documentation flags.
6. **Multi-Channel Activity History Feed:**
   * Horizontal filter chips: `All`, `Tickets`, `Leads` (active), `Orders`, `Events`.
   * Timeline stream of recent interactions.
7. **Touchpoint Performance Counters:**
   * 3 Summary Tiles: `Helpdesk: 272 Total (4 Open)`, `Calendar: 0 Scheduled`, `Feedback: 0 Reviews`.

---

### Screen M-3.2.2: Mobile Customer 360 — Mobile Banking
* **Source Screen:** Screen 3.2.2 (`Mobile banking`)
* **Modality:** Tab segment within Customer 360.
* **Route / Path:** `/customers/:cif/mobile-banking`

#### Layout:
* Persistent Customer Identity Header & Comms Toolbar at top.
* Active Segment: `[ Mobile Banking ]`.
* **Mobile Banking Registry List:**
  * Replaces 12-row desktop table with clean, scannable cards:
    - Card Header: Account Number (`0176753003`) + PIN Status Badge (`[ Active Pin ]` in green or `[ One Time Pin ]` in amber).
    - Branch Affiliation: `Courtyard Branch (Code: 041)`.
    - Registration status and security flags.

---

### Screen M-3.2.3: Mobile Customer 360 — Bancassurance
* **Source Screen:** Screen 3.2.3 (`Bancasurrance`)
* **Modality:** Tab segment within Customer 360.
* **Route / Path:** `/customers/:cif/bancassurance`

#### Layout:
* Persistent Customer Identity Header & Comms Toolbar at top.
* Active Segment: `[ Bancassurance ]`.
* **Insurance Policy Cards:**
  * **Policy 1:** Policy Number `B/101/1002/2023/000002/0011/01` | Business Line: `GENERAL` | Expiration: `5/10/25` | IPEN Status: Valid.
  * **Policy 2:** Policy Number `IL202302360223` | Business Line: `LIFE` | Expiration: `4/26/28` | IPEN Status: Valid.

---

### Screen M-3.2.4: Mobile Customer 360 — Credit Card
* **Source Screen:** Screen 3.2.4 (`Credit Card`)
* **Modality:** Tab segment within Customer 360.
* **Route / Path:** `/customers/:cif/credit-card`

#### Layout:
* Persistent Customer Identity Header & Comms Toolbar at top.
* Active Segment: `[ Credit Card ]`.
* **Visual Credit Card Graphic Cards:**
  * **Card 1 (Replaced):**
    - Dark Navy card container with chip graphic.
    - Masked Card Number: `5244 06XX XXXX 7240`.
    - Status Badge: `Replaced` (Amber pill).
    - Credit Limit: `KES 2,000,000`.
  * **Card 2 (Normal):**
    - Deep Blue card container with chip graphic.
    - Masked Card Number: `5244 06XX XXXX 0895`.
    - Status Badge: `Normal` (Green pill).
    - Credit Limit: `KES 2,000,000`.
* **Mobile Omnichannel Dock:** Fixed bar at bottom offering direct channels: Call, Messenger (`99+`), Email (`99+`).

---

### Screen M-4.0: Mobile Lead Actions Sheet
* **Source Screen:** Screen 4.0 (`Lead Actions`)
* **Modality:** Modal Bottom Sheet sliding up from viewport bottom.
* **Trigger:** Tapping row action ellipsis (`⋮`) on any lead card.

#### Layout & Action Items (Each 56px height, 48px touch target):
1. **Sheet Header:** Drag handle bar, Lead ID (`L-2026-000184`), Customer Name (`ZAMZAM HASSAN MOHAMED`), and Close (`✕`).
2. **Action Item 1 — Schedule Meeting:** Calendar icon -> Opens Screen M-4.1.
3. **Action Item 2 — Update Status:** Pencil edit icon -> Opens Screen M-4.2.
4. **Action Item 3 — Reassign Lead:** Target/user icon -> Opens Screen M-4.3.
5. **Action Item 4 — View Details:** Eye icon -> Opens Screen M-4.4.1.
6. **Action Item 5 — View Customer 360:** User check icon -> Navigates to Screen M-3.2.1.
7. **Action Item 6 — Export as PDF:** Download tray icon -> Initiates PDF export.
8. **Action Item 7 — Export as PDF via Email:** Mail icon -> Dispatches PDF via email.

---

### Screen M-4.1: Mobile Schedule Meeting (Add Event)
* **Source Screen:** Screen 4.1 (`Schedule lead Meeting`)
* **Modality:** Full-Screen Modal Flow with fixed header.
* **Route / Path:** `/leads/:id/schedule`

#### Layout & Controls:
1. **Header:** Title "Schedule Meeting" | Close button (`✕`).
2. **Context Banner:** Lead ID (`L-2026-000184`) and Customer (`ZAMZAM HASSAN MOHAMED`).
3. **Form Controls (Optimized for Mobile):**
   * `Status`: Dropdown picker (`In-Discussion`) + `(+)` button to add custom status.
   * `Location & Department`: Dropdown pickers.
   * `Date & Time Start`: Native date & time picker wheels (`19/09/26, 6:45 PM`).
   * `Date & Time End`: Native date & time picker wheels (`19/09/26, 12:00 AM`).
   * `Resources`: Dropdown picker.
   * `Purpose of Meeting`: Text input.
   * `Description`: Multi-line text area.
   * `Nylas Calendar`: Select dropdown (`Calendar`).
   * `User/Staff`: Staff picker chip (`Branson Allann`).
   * `Customer`: Customer picker chip (`ZAMZAM HASSAN MOHAMED`).
4. **Sticky Bottom Button:** Solid orange `Create Meeting Event` (height 48px).

---

### Screen M-4.2: Mobile Quick Status Update Sheet
* **Source Screen:** Screen 4.2 (`Update status pop up page`)
* **Modality:** Interactive Modal Bottom Sheet (50% screen height).
* **Trigger:** Selected from Screen M-4.0 Action Sheet.

#### Layout:
1. **Header:** Edit icon, "Update Lead Status", Close (`✕`).
2. **Lead Context:** Lead ID (`L-2026-000184`), Customer (`ZAMZAM HASSAN MOHAMED`).
3. **Visual Status Chips (Wrap Grid):**
   * `[ New ]` | `[ Cold ]` | `[ Warm ]` | `[ Hot ]` | `[ Nurturing ]` | `[ Converted ]` | `[ Lost ]`
   * Active selection highlighted with high-contrast border and background.
4. **Comments (Optional):** Text area for audit remarks.
5. **Action Buttons:** `Cancel` (outlined) and `Update Status` (solid orange).

---

### Screen M-4.3: Mobile Reassign Lead Sheet
* **Source Screen:** Screen 4.3 (`Re-assign lead pop up page`)
* **Modality:** Interactive Modal Bottom Sheet (60% screen height).
* **Trigger:** Selected from Screen M-4.0 Action Sheet.

#### Layout:
1. **Header:** Target icon, "Reassign Lead", Close (`✕`).
2. **Lead Context:** Lead ID (`L-2026-000184`).
3. **Current Assigned Team Members:**
   * List of assigned chips with role tags and **isolated 32px delete targets**:
     * `Calendar event` `[Administrator]` `[✕]`
     * `Branson Allann` `[Relationship Manager]` `[✕]`
4. **Add Assignment:** Dropdown user picker combo box.
5. **Comments (Optional):** Handover notes text area.
6. **Action Buttons:** `Cancel` and `Update Assignment`.

---

### Screen M-4.4.1: Mobile Lead Details (Profile View)
* **Source Screen:** Screen 4.4.1 (`View Lead Details pop up`)
* **Modality:** Dedicated Mobile Screen.
* **Route / Path:** `/leads/:id/details`

#### Layout:
1. **Header:** Back arrow (`←`), "Lead Details", Action Ellipsis (`⋮`).
2. **Segmented Control Tab Bar (Sticky):**
   * `[ Profile ]` (Active) | `[ Activity Log ]`
3. **Customer Card:** Name (`ZAMZAM HASSAN MOHAMED`), Phone link, Location.
4. **Commercial Details Card:** Lead Type, Source (`Referral`), Referee (`fff`), Priority (`Low`), Product (`Savings account`), Estimated Value (`KES 6666`), Status Badge (`Nurturing`).
5. **Operational Metadata Card:** Branch (`Griffindor`), Initiator (`Calendar event`), Notes (`6666`), Assigned Staff.
6. **Bottom Action Dock:** Quick buttons for `Update Status` and `Schedule Meeting`.

---

### Screen M-4.4.2: Mobile Lead Details (Activity Log View)
* **Source Screen:** Screen 4.4.2 (`View Lead Details Activity log`)
* **Modality:** Segment within Lead Details Hub.
* **Route / Path:** `/leads/:id/activity`

#### Layout:
1. **Sticky Segmented Control:** `[ Activity Log ]` active.
2. **Vertical Chronological Timeline Stream:**
   * Replaces desktop list with a connected vertical line-and-node timeline:
     - **Node 1 (Sep 19, 2026):** `Status Updated` — "Status updated from Warm to Nurturing." (Comments: `zzz`).
     - **Node 2 (Sep 19, 2026):** `Status Updated` — "Status updated from Warm to Warm." (Comments: `xxx`).
     - **Node 3 (Sep 19, 2026):** `Lead Created` — "Lead created from Referral source."

---

### Screen M-5.0: Mobile SSO Authentication Screen
* **Source Screen:** Screen 5.0 (`Login page`)
* **Modality:** Standalone Screen.
* **Route / Path:** `/login`

#### Layout:
1. **Branding:** Centered Kati CRM logo + "DTB Africa" subtitle + "Customer Excellence" slogan.
2. **Card Container:**
   * Label: `CORPORATE EMAIL ADDRESS`.
   * Input: Text field with email icon (`branbs@gmail.com`).
   * Primary Button: Solid magenta `Log In with SSO` (height 48px).
   * Biometric Option: `[ 🛡️ Sign in with FaceID / Biometrics ]`.
3. **Footer:** Links to Privacy Policies, Support, and Security Disclaimers.

---

### Screen M-5.1: Mobile Company & User Profile Screen
* **Source Screen:** Screen 5.1 (`Company Details / User profile`)
* **Navigation Placement:** Accessed via top app bar user profile avatar or Tab 4 (More).
* **Route / Path:** `/settings/profile`

#### Layout:
1. **Header:** Back arrow, "Profile & Company Settings".
2. **Employee Profile Card:**
   * Avatar circle with photo upload cloud button.
   * Name: `Branson Allan`.
   * Employer Phone: `254710928843` | WhatsApp ID: `+254710928843`.
3. **Company Details Card:**
   * Company Name: `Central Electricals`.
   * Phone: `079387223` | Address: `Chișinău, Moldova`.
   * Operating Currency: Dropdown selector (`KES ▾`).
   * Enterprise API Key: Monospace string with one-tap `[ Copy ]` button.
4. **Security & Governance Card:**
   * Two-Factor Authentication: Status indicator + `[ Add Second Step ]` button.
   * Change Password: Registered email + `[ Change Password ]` button.
   * Tax Configuration: Taxes list + `[ + Add Tax ]` trigger.
5. **Logout Action:** Red outlined button: `Sign Out of Kati CRM`.
