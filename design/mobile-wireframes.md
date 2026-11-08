# Mobile Structural Wireframes & Layout Blueprints: Kati Enterprise Sales Module

> **Document Version:** 1.0.0  
> **Source Baseline:** `design/mobile-screen-specifications.md` / `design/mobile-navigation-framework.md`  
> **Target Viewport:** Mobile Smartphone (360px–430px width)  
> **Status:** Phase 2 Visual Wireframes

---

## 1. Global Mobile Application Shell

```
┌────────────────────────────────────────┐
│ [kati] DTB Africa    (● Online▾) [🔔8] [👤]│  <-- App Bar (56px)
├────────────────────────────────────────┤
│                                        │
│                                        │
│          SCROLLABLE CONTENT AREA       │
│                                        │
│                                        │
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │  <-- Bottom Nav (64px)
└────────────────────────────────────────┘
```

---

## 2. Screen M-1.0: Mobile Sales Dashboard

```
┌────────────────────────────────────────┐
│ [kati] DTB Africa    (● Online▾) [🔔8] [👤]│
├────────────────────────────────────────┤
│ 📅 1 Jun – 19 Sep, 2026 ▾   [⚙️ Filter]│
├────────────────────────────────────────┤
│ PERFORMANCE OVERVIEW                   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Total Lead│ │Converted │ │Hot Leads │ │
│ │ 11       │ │ 2        │ │ 1        │ │
│ └──────────┘ └──────────┘ └──────────┘ │
│ ◄─────── Swipe for 8 metrics ────────► │
├────────────────────────────────────────┤
│ LEAD PIPELINE                          │
│ [New (2)] [Cold (2)] [Warm (3)] [Hot(1)]│
│ ┌────────────────────────────────────┐ │
│ │ ⚠️ COLLINS w SAKWA   KSh 1,000,000 │ │
│ │ Salary Account • Courtyard Branch  │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ LEAD CONVERSION TREND                  │
│  6┤      ╭─╮                           │
│  4┤      │ │                           │
│  2┤    ╭─╯ ╰─╮   ╭─╮                   │
│  0┴────┴─────┴───┴─┴──────────────     │
│   Jun 1      Jul 13    Sep 14, 2026    │
├────────────────────────────────────────┤
│ PRODUCT INTEREST DISTRIBUTION          │
│                ╭─────╮                 │
│               │  ⭕  │ Total: 11       │
│                ╰─────╯                 │
│  🔴 Savings: 35%    🟠 Salary: 25%     │
│  🟢 Overdraft: 15%  🔵 Debit: 15%      │
│  ⚫ World Card: 10%                    │
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │
└────────────────────────────────────────┘
```

---

## 3. Screen M-2.0: Mobile All Leads Master View

```
┌────────────────────────────────────────┐
│ [kati] DTB Africa    (● Online▾) [🔔8] [👤]│
├────────────────────────────────────────┤
│ ┌──────────────────────────┐ ┌───────┐ │
│ │🔍 Search leads, phone, ID│ │Filter2│ │
│ └──────────────────────────┘ └───────┘ │
├────────────────────────────────────────┤
│ [All 36] [Hot 1] [Warm 4] [Cold 4] [..]│
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ L-2026-000180        [Converted] ⋮ │ │
│ │ JEREMIAH VINCENT AKWIRI            │ │
│ │ 📞 254742121445 • Kakamega • Retail │ │
│ │ ────────────────────────────────── │ │
│ │ 💼 Salary Account  💰 KES 1,200    │ │
│ │ 👤 Demo Account    📅 01-Sep-2026  │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ L-2026-000001             [Warm] ⋮ │ │
│ │ Andrew11 Desart                    │ │
│ │ 📞 37369096106 • Nairobi • Corp    │ │
│ │ ────────────────────────────────── │ │
│ │ 💼 Debit Card      💰 USD 42,542   │ │
│ │ 👤 Nelly Nelly     📅 26-Aug-2026  │ │
│ └────────────────────────────────────┘ │
│                                        │
│                            ┌─────────┐ │
│                            │ ➕ Lead │ │  <-- FAB
│                            └─────────┘ │
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │
└────────────────────────────────────────┘
```

---

## 4. Screen M-2.0-F: Mobile Leads Filter Sheet

```
┌────────────────────────────────────────┐
│                ════════                │  <-- Drag Handle
│ Filter Leads               [Reset] [✕] │
├────────────────────────────────────────┤
│ Search Keyword                         │
│ ┌────────────────────────────────────┐ │
│ │ e.g. Customer name, Lead ID        │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Lead Status                            │
│ [✓ All] [New] [Cold] [Warm] [Hot]      │
│ [Nurturing] [Converted] [Lost]         │
│                                        │
│ Customer Segment                       │
│ [✓ Retail] [Corporate] [Business]      │
│                                        │
│ Lead Priority                          │
│ [High] [✓ Medium] [Low]                │
│                                        │
│ Date Range                             │
│ ┌──────────────────┐┌────────────────┐ │
│ │From: 02/02/2026  ││To: 19/09/2026  │ │
│ └──────────────────┘└────────────────┘ │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │       Apply Filters (36 Leads)     │ │  <-- Sticky CTA
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

## 5. Screen M-3.1: Mobile Create Lead (New Customer)

```
┌────────────────────────────────────────┐
│ [←] Capture New Lead               [✕] │
├────────────────────────────────────────┤
│ [ ● New Customer ] [ Existing Customer]│  <-- Segment Switcher
├────────────────────────────────────────┤
│ 1. CUSTOMER IDENTIFICATION             │
│ Customer Name *                        │
│ ┌────────────────────────────────────┐ │
│ │ Allan Branson                      │ │
│ └────────────────────────────────────┘ │
│ Phone Number *                         │
│ ┌────────────────────────────────────┐ │
│ │ +254  0750800900                   │ │
│ └────────────────────────────────────┘ │
│ Physical Location                      │
│ ┌────────────────────────────────────┐ │
│ │ Nairobi               [📍 Use GPS] │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ 2. LEAD INFORMATION                    │
│ Description *                          │
│ ┌────────────────────────────────────┐ │
│ │ Test Area                          │ │
│ └────────────────────────────────────┘ │
│ Branch Name *                          │
│ ┌────────────────────────────────────┐ │
│ │ Ravenclaw                        ▾ │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ 3. LEAD DETAILS                        │
│ Lead Source *: [ Referral          ▾ ] │
│ Referee (Dependent field):             │
│ ┌────────────────────────────────────┐ │
│ │ Branson                            │ │
│ └────────────────────────────────────┘ │
│ Estimated Value *:                     │
│ ┌───────┐ ┌──────────────────────────┐ │
│ │ USD ▾ │ │ 25,000                   │ │
│ └───────┘ └──────────────────────────┘ │
│ Selected Products:                     │
│ [ Salary Account 🗑 ] [ Savings 🗑 ]   │
├────────────────────────────────────────┤
│ 4. ASSIGNMENT & REMARKS                │
│ Assigned Team Members:                 │
│ [ NellyM (Collections Mgr) ✕ ]         │
│ [ Derrick Ombaki (Admin) ✕ ]           │
├────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────────┐ │
│ │    Cancel    │  │   Create Lead    │ │  <-- Sticky Bottom Bar
│ └──────────────┘  └──────────────────┘ │
└────────────────────────────────────────┘
```

---

## 6. Screen M-3.2: Mobile Create Lead (Existing Customer)

```
┌────────────────────────────────────────┐
│ [←] Capture Existing Lead          [✕] │
├────────────────────────────────────────┤
│ [ New Customer ] [ ● Existing Customer]│
├────────────────────────────────────────┤
│ SEARCH EXISTING CUSTOMER               │
│ ┌────────────────────────────────────┐ │
│ │🔍 mateen                           │ │
│ └────────────────────────────────────┘ │
│                                        │
│ VERIFIED CUSTOMER PROFILE              │
│ ┌────────────────────────────────────┐ │
│ │ 👤 Mateen Premji               [✓] │ │
│ │ 📞 254703133854 • CIF: 176753      │ │
│ │ ✉️ mateen@calltronix.com           │ │
│ │                                    │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │   🔍 View Customer 360 Profile  │ │ │  <-- Direct 360 Gateway!
│ │ └────────────────────────────────┘ │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ 2. LEAD INFORMATION                    │
│ Branch: [ Griffindor ▾ ]               │
│ Description: [ High-value cross-sell ] │
├────────────────────────────────────────┤
│ 3. COMMERCIAL DETAILS                  │
│ Product: [ World Credit Card       ▾ ] │
│ Estimate: KES [ 2,000,000            ] │
├────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────────┐ │
│ │    Cancel    │  │   Create Lead    │ │
│ └──────────────┘  └──────────────────┘ │
└────────────────────────────────────────┘
```

---

## 7. Screen M-3.2.1: Mobile Customer 360 (Overview & Accounts)

```
┌────────────────────────────────────────┐
│ [←] Customer 360                   [⋮] │
├────────────────────────────────────────┤
│ 👤 BILAL MUGHAL                    [✓] │
│ CIF: 837649  •  ID: 36930306           │
│ 26 yrs • 12/28/1999 • Nationality: KE  │
├────────────────────────────────────────┤
│ [📞 Call]  [✉️ Email]  [💬 Chat]  [➕ Task]│  <-- Quick Comms Bar
├────────────────────────────────────────┤
│ [Accounts] [Mobile] [Insurance] [Cards]│  <-- Segmented Tabs
├────────────────────────────────────────┤
│ CORE BANKING ACCOUNTS (3)              │
│ ┌────────────────────────────────────┐ │
│ │ Acc: 5501117002           [Active] │ │
│ │ Nyali Branch (Code: 038)           │ │
│ │ Co-owners: W. Ndeti, R. Haji, ...  │ │
│ │             [ + Add to Task ]      │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ Acc: 0837649001 (Salary)  [Active] │ │
│ │ Courtyard Branch (Code: 041)       │ │
│ │             [ + Add to Task ]      │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ ACTIVE PRODUCTS (For Selected Acc):    │
│  [✓] Current Account   [✓] Salary Plus │
│  [✓] Debit Card        [ ] Credit Card │
├────────────────────────────────────────┤
│ [▼] DTB Compliance (KYC Verified)      │
├────────────────────────────────────────┤
│ ACTIVITY HISTORY          [Filter: Leads]│
│ • Sep 19, 2026: Lead L-2026-000184     │
│ • Sep 15, 2026: Helpdesk Ticket #272   │
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │
└────────────────────────────────────────┘
```

---

## 8. Screen M-3.2.2: Mobile Customer 360 (Mobile Banking)

```
┌────────────────────────────────────────┐
│ [←] Customer 360                   [⋮] │
├────────────────────────────────────────┤
│ 👤 MATEEN PREMJI                   [✓] │
│ CIF: 176753 • Phone: 0703 133854       │
├────────────────────────────────────────┤
│ [Accounts] [●Mobile] [Insurance][Cards]│
├────────────────────────────────────────┤
│ MOBILE BANKING PROFILES (12)           │
│ ┌────────────────────────────────────┐ │
│ │ Acc: 0176753003     [One Time Pin] │ │
│ │ Courtyard Branch • Code: 041       │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ Acc: 0176753001       [Active Pin] │ │
│ │ Courtyard Branch • Code: 041       │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ Acc: 5176753002       [Active Pin] │ │
│ │ Courtyard Branch • Code: 041       │ │
│ └────────────────────────────────────┘ │
│ ◄─────── Scroll for all 12 rows ─────► │
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │
└────────────────────────────────────────┘
```

---

## 9. Screen M-3.2.4: Mobile Customer 360 (Credit Card)

```
┌────────────────────────────────────────┐
│ [←] Customer 360                   [⋮] │
├────────────────────────────────────────┤
│ 👤 MATEEN PREMJI                   [✓] │
│ CIF: 176753 • Phone: 0703 133854       │
├────────────────────────────────────────┤
│ [Accounts] [Mobile] [Insurance][●Cards]│
├────────────────────────────────────────┤
│ CREDIT CARD FACILITIES (2)             │
│ ┌────────────────────────────────────┐ │
│ │ 💳 CREDIT CARD          [Replaced] │ │
│ │ 5244 06XX XXXX 7240                │ │
│ │ Credit Limit: KES 2,000,000        │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ 💳 CREDIT CARD            [Normal] │ │
│ │ 5244 06XX XXXX 0895                │ │
│ │ Credit Limit: KES 2,000,000        │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ OMNICHANNEL ASSISTANCE                 │
│ [📞 Voice] [💬 Messenger 99+] [✉️ Email]│
├────────────────────────────────────────┤
│  [📊 Dash]  [👥 Leads]  [🏢 360]  [⋯ More] │
└────────────────────────────────────────┘
```

---

## 10. Screen M-4.0: Mobile Lead Actions Bottom Sheet

```
┌────────────────────────────────────────┐
│                ════════                │
│ Lead Actions                       [✕] │
│ L-2026-000184: ZAMZAM HASSAN MOHAMED   │
├────────────────────────────────────────┤
│ [📅]  Schedule Meeting                 │
│       Set up appointment & sync Nylas  │
├────────────────────────────────────────┤
│ [✏️]  Update Status                    │
│       Advance lead along the pipeline  │
├────────────────────────────────────────┤
│ [🎯]  Reassign Lead                    │
│       Transfer or add collaborative RM │
├────────────────────────────────────────┤
│ [👁️]  View Lead Details                │
│       Inspect profile & audit trail    │
├────────────────────────────────────────┤
│ [👤]  View Customer 360 Profile        │
│       Audit accounts, cards & history  │
├────────────────────────────────────────┤
│ [📥]  Export as PDF                    │
│       Download lead summary document   │
├────────────────────────────────────────┤
│ [✉️]  Export as PDF via Email          │
│       Send document directly via email │
└────────────────────────────────────────┘
```

---

## 11. Screen M-4.1: Mobile Schedule Meeting (Add Event)

```
┌────────────────────────────────────────┐
│ [←] Schedule Meeting               [✕] │
├────────────────────────────────────────┤
│ Lead Context:                          │
│ L-2026-000184 • ZAMZAM HASSAN MOHAMED  │
├────────────────────────────────────────┤
│ Meeting Status *:                      │
│ ┌────────────────────────────────────┐ │
│ │ In-Discussion                [➕] ▾ │ │
│ └────────────────────────────────────┘ │
│ Department: [ Sales & Corporate    ▾ ] │
│ Location:   [ Head Office, Floor 3 ▾ ] │
├────────────────────────────────────────┤
│ START DATE & TIME                      │
│ ┌──────────────────┐┌────────────────┐ │
│ │📅 19/09/2026     ││⏰ 06:45 PM     │ │
│ └──────────────────┘└────────────────┘ │
│ END DATE & TIME                        │
│ ┌──────────────────┐┌────────────────┐ │
│ │📅 19/09/2026     ││⏰ 12:00 AM     │ │
│ └──────────────────┘└────────────────┘ │
├────────────────────────────────────────┤
│ Purpose of Meeting:                    │
│ ┌────────────────────────────────────┐ │
│ │ Salary Account pitch & onboarding  │ │
│ └────────────────────────────────────┘ │
│ Calendar Sync: [ Nylas Calendar: Main▾]│
│ Assigned Staff: [ Branson Allann   ✕ ] │
│ Linked Customer:[ ZAMZAM HASSAN    ✕ ] │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │        Create Meeting Event        │ │  <-- Sticky Bottom CTA
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

## 12. Screen M-4.2: Mobile Quick Status Update Sheet

```
┌────────────────────────────────────────┐
│                ════════                │
│ Update Status                      [✕] │
│ L-2026-000184: ZAMZAM HASSAN MOHAMED   │
├────────────────────────────────────────┤
│ Select New Pipeline Stage *:           │
│ [ New ]  [ Cold ]  [ Warm ]            │
│ [ Hot ]  [●Nurturing] [ Converted ]    │
│ [ Lost ]                               │
│                                        │
│ Comments / Remarks (Optional):         │
│ ┌────────────────────────────────────┐ │
│ │ Customer confirmed follow-up next  │ │
│ │ Tuesday after internal review.     │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────────┐ │
│ │    Cancel    │  │   Update Status  │ │
│ └──────────────┘  └──────────────────┘ │
└────────────────────────────────────────┘
```

---

## 13. Screen M-4.3: Mobile Reassign Lead Sheet

```
┌────────────────────────────────────────┐
│                ════════                │
│ Reassign Lead                      [✕] │
│ L-2026-000184                          │
├────────────────────────────────────────┤
│ Currently Assigned Team Members:       │
│ ┌────────────────────────────────────┐ │
│ │ Calendar event (Administrator)   [✕]│
│ ├────────────────────────────────────┤ │
│ │ Branson Allann (Rel Mgr)         [✕]│
│ └────────────────────────────────────┘ │
│                                        │
│ Add Team Member:                       │
│ ┌────────────────────────────────────┐ │
│ │🔍 Search staff by name/role...   ▾ │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Handover Notes (Optional):             │
│ ┌────────────────────────────────────┐ │
│ │ Transferred for corporate review   │ │
│ └────────────────────────────────────┘ │
├────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────────┐ │
│ │    Cancel    │  │   Save Changes   │ │
│ └──────────────┘  └──────────────────┘ │
└────────────────────────────────────────┘
```

---

## 14. Screen M-4.4.1 & M-4.4.2: Mobile Lead Details & Audit Hub

```
┌────────────────────────────────────────┐
│ [←] Lead Details                   [⋮] │
├────────────────────────────────────────┤
│ [ ● Profile Details ] [ Activity Log ] │  <-- Segmented Switcher
├────────────────────────────────────────┤
│ CUSTOMER OVERVIEW                      │
│ ZAMZAM HASSAN MOHAMED                  │
│ 📞 254729562604   [ Call ]  [ SMS ]    │
│ 📍 P.O BOX 105791-00101 NAIROBI        │
├────────────────────────────────────────┤
│ COMMERCIAL SPECIFICATIONS              │
│ Lead Type:      New Business           │
│ Product:        Savings Account        │
│ Source / Ref:   Referral (Branson)     │
│ Estimated Val:  KES 6,666              │
│ Priority:       [ Low ]                │
│ Pipeline Stage: [ Nurturing ]          │
├────────────────────────────────────────┤
│ WORKFLOW METADATA                      │
│ Branch:         Griffindor             │
│ Initiator:      Calendar event         │
│ Notes:          High-net-worth client  │
├────────────────────────────────────────┤
│ ┌──────────────────┐┌────────────────┐ │
│ │  Update Status   ││Schedule Meeting│ │  <-- Bottom Quick Actions
│ └──────────────────┘└────────────────┘ │
└────────────────────────────────────────┘

        ▼ When switching to [ Activity Log ] ▼

┌────────────────────────────────────────┐
│ [←] Lead Details                   [⋮] │
├────────────────────────────────────────┤
│ [ Profile Details ] [ ● Activity Log ] │
├────────────────────────────────────────┤
│ CHRONOLOGICAL AUDIT TRAIL              │
│                                        │
│ 🟢 Sep 19, 2026 • 04:30 PM             │
│    Status Updated                      │
│    "Status updated from Warm to        │
│     Nurturing. Comments: zzz"          │
│    👤 Branson Allann                   │
│    │                                   │
│ 🟡 Sep 19, 2026 • 02:15 PM             │
│    Status Updated                      │
│    "Status updated from Warm to Warm.  │
│     Comments: xxx"                     │
│    👤 Demo Account                     │
│    │                                   │
│ ⚪ Sep 19, 2026 • 10:00 AM             │
│    Lead Created                        │
│    "Lead created from Referral source" │
│    👤 Calendar event                   │
└────────────────────────────────────────┘
```

---

## 15. Screen M-5.0: Mobile SSO Authentication

```
┌────────────────────────────────────────┐
│                                        │
│                 [kati]                 │
│               DTB Africa               │
│      Customer Excellence Platform      │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ CORPORATE EMAIL ADDRESS            │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │ ✉️ branbs@dtbafrica.com         │ │ │
│ │ └────────────────────────────────┘ │ │
│ │                                    │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │        Log In with SSO         │ │ │  <-- Primary CTA
│ │ └────────────────────────────────┘ │ │
│ │                                    │ │
│ │ ─────────────── OR ─────────────── │ │
│ │                                    │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │   🛡️ Sign in with Biometrics    │ │ │
│ │ └────────────────────────────────┘ │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Privacy Policy  •  Security  •  Help   │
└────────────────────────────────────────┘
```

---

## 16. Screen M-5.1: Mobile User Profile & Company Details

```
┌────────────────────────────────────────┐
│ [←] Settings & Profile                 │
├────────────────────────────────────────┤
│ USER IDENTITY                          │
│     ╭───────╮                          │
│    │  👤☁️  │ Branson Allan            │
│     ╰───────╯ Rel Manager • Courtyard  │
│ Phone: +254 710928843                  │
│ WhatsApp: +254 710928843               │
├────────────────────────────────────────┤
│ COMPANY DETAILS                        │
│ Company:    Central Electricals        │
│ Phone:      079387223                  │
│ Address:    Chișinău, Moldova          │
│ Currency:   [ KES ▾ ]                  │
│ API Key:    1677317336... [📋 Copy]    │
├────────────────────────────────────────┤
│ SECURITY & GOVERNANCE                  │
│ Two-Factor Auth:  [ Add Second Step ]  │
│ Password:         [ Change Password ]  │
│ Tax Settings:     [ + Add Tax Rule  ]  │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │        Sign Out of Kati CRM        │ │  <-- Danger Logout
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```
