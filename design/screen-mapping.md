# Source-to-Screen Mapping & Inventory Count: Kati Enterprise Sales Module

> **Document Version:** 1.0.0  
> **Source Document:** `reference/sales-module-source.pdf` (`references/mobileApp.pdf`)  
> **Target Application:** Kati CRM — Enterprise Banking Sales Module (Diamond Trust Bank Africa)  
> **Status:** Quantitative Audit & Source-to-Screen Mapping (No redesign modifications)

---

## 1. Quantitative Screen Totals

* **Total Number of Source PDF Pages Audited:** 20 pages
* **Total Number of Source UI Screenshots / Visual Artifacts:** 21 images (including transparency masks)
* **Total Number of Documented Source Screens / Distinct UI States:** **16 screens**
* **Total Number of Functional Modules Represented in Source:** 4 modules (Sales, Contacts, System/Authentication, System Settings)
* **Total Number of Submodules Represented in Source:** 12 submodules

---

## 2. Source Screens by Module

### 2.1 Sales Module (10 Screens)
The core business domain under evaluation comprises 10 distinct screen states:
1. **Screen 1.0:** `Dashboard` (Sales Dashboard landing page)
2. **Screen 2.0:** `All LEADS tABLE` (All Leads Table and KPI management)
3. **Screen 3.1:** `Create a new lead for an New Customer` (Capture Lead — New Customer)
4. **Screen 3.2:** `Create a new lead for an Existing Customer` (Capture Lead — Existing Customer)
5. **Screen 4.0:** `Lead Actions` (Row-level contextual ellipsis menu)
6. **Screen 4.1:** `Schedule lead Meeting` (Add Event calendar scheduling modal)
7. **Screen 4.2:** `Update status pop up page` (Pipeline status transition modal)
8. **Screen 4.3:** `Re-assign lead pop up page` (Multi-user assignment modal)
9. **Screen 4.4.1:** `View Lead Details pop up and Activity log` (Lead Details — Profile tab)
10. **Screen 4.4.2:** `View Lead Details Activity log` (Lead Details — Activity Log tab)

### 2.2 Contacts Module / Customer 360 (4 Screens)
Deeply integrated relationship management views accessible via the existing customer flow:
11. **Screen 3.2.1:** `Existing Customer profile/360` (Customer 360 — Accounts & Linked Products segment)
12. **Screen 3.2.2:** `Existing Customer profile/360 - Mobile banking` (Customer 360 — Mobile Banking segment)
13. **Screen 3.2.3:** `Existing Customer profile/360 - Bancasurrance` (Customer 360 — Bancassurance segment)
14. **Screen 3.2.4:** `Existing Customer profile/360 - Credit Card` (Customer 360 — Credit Card segment & Omnichannel dock)

### 2.3 System / Authentication Module (1 Screen)
Entry point to the application:
15. **Screen 5.0:** `Login page` (Corporate SSO authentication card)

### 2.4 System Settings / User Profile Module (1 Screen)
Organization configuration and employee profile:
16. **Screen 5.1:** `User profile / Company Details` (Company details, API key, taxes, 2FA, password, personal profile)

---

## 3. Source Screens by Submodule

| Module | Submodule | Source Screen Number & Name | Key Functional Focus |
|---|---|---|---|
| **Sales** | Dashboard | **Screen 1.0:** Dashboard | Executive KPI cards, 6-stage Kanban pipeline, trend & product charts |
| **Sales** | Leads / All Leads | **Screen 2.0:** All LEADS tABLE | 14-column master table, 7 KPI status cards, 9-field filter panel, pagination, export |
| **Sales** | Leads / Lead Capture | **Screen 3.1:** Capture Lead (New Customer) | 4-card form for prospective customers, conditional referee, geolocation |
| **Sales** | Leads / Lead Capture | **Screen 3.2:** Capture Lead (Existing Customer) | Autocomplete customer search, CBS pre-fill, sidebar mini-card, 4-card form |
| **Sales** | Leads / Actions | **Screen 4.0:** Lead Actions Context Menu | 6 row-level action triggers (Schedule, Update, Reassign, Details, PDF, Email) |
| **Sales** | Leads / Calendar & Events | **Screen 4.1:** Schedule lead Meeting | Add Event dialog, Nylas calendar sync, start/end dates/times, resources, staff/customer linkage |
| **Sales** | Leads / Pipeline Management | **Screen 4.2:** Update status pop up page | Pipeline status transition dropdown, transition comments, audit update |
| **Sales** | Leads / Ownership & Assignment | **Screen 4.3:** Re-assign lead pop up page | Multi-user collaborative assignment, role tags, deletion controls, handover notes |
| **Sales** | Leads / Details | **Screen 4.4.1:** Lead Details (Profile Tab) | 2-column read-only lead attribute view, customer details, financial value, status |
| **Sales** | Leads / Audit & Activity History | **Screen 4.4.2:** Lead Details (Activity Log Tab) | Chronological event stream, status changes, timestamps, actor stamps, comments |
| **Contacts** | Customer 360 / Accounts | **Screen 3.2.1:** Customer 360 (Accounts) | Master biodata, multi-phone contact info, core banking accounts, dynamic products, compliance |
| **Contacts** | Customer 360 / Mobile Banking | **Screen 3.2.2:** Customer 360 (Mobile Banking) | 12-row registry of mobile banking accounts, PIN status (Active vs OTP), branch codes |
| **Contacts** | Customer 360 / Bancassurance | **Screen 3.2.3:** Customer 360 (Bancassurance) | Insurance policy cards (General & Life lines), policy numbers, expiration dates |
| **Contacts** | Customer 360 / Credit Card | **Screen 3.2.4:** Customer 360 (Credit Card) | Credit card facilities, masked PANs, card lifecycle status (Normal/Replaced), limits, omnichannel dock |
| **System** | Authentication | **Screen 5.0:** Login page | Corporate email input, Single Sign-On (SSO) button, channel branding |
| **System Settings** | Company & Account Settings | **Screen 5.1:** User profile / Company Details | Corporate identity, currency, API credentials, tax setup, 2FA, password change, employee profile |

---

## 4. Visually Similar and Functionally Symmetrical Screens

Analysis of the 16 source screens reveals four major clusters of visual and functional symmetry:

### Cluster 1: Lead Capture Form Sibling States (Screens 3.1 & 3.2)
* **Symmetry:** Both screens share an identical four-card macro structure, identical secondary sub-nav tab bar, identical right-hand sticky `Summary` anchor navigation rail, identical Card 2 (`Lead Information`), identical Card 3 (`Lead Details`), identical Card 4 (`Assignment & Remarks`), and identical bottom action buttons (`Cancel` and `Create Lead`).
* **Distinction:**
  - **Screen 3.1 (New Customer):** Card 1 displays manual text inputs for `Customer Name *`, `Phone Number *`, and `Physical Location`.
  - **Screen 3.2 (Existing Customer):** Card 1 replaces manual inputs with a live auto-complete search field (`Search Customer *`) and read-only populated text labels (`Full Name`, `Phone Number`, `Account Number`, `Location`). Furthermore, Screen 3.2 mounts a Customer Quick Profile Card into the top-left sidebar.

### Cluster 2: Customer 360 Relationship Sibling States (Screens 3.2.1, 3.2.2, 3.2.3, 3.2.4)
* **Symmetry:** All four screens share an identical viewport layout:
  - Top application bar with queue and PBX controls.
  - Left-hand master biodata panel (Customer personal info, contact details with flags, communication action icons).
  - Bottom-right `DTB Compliance` collapsible accordion.
  - Bottom-right `Activity History` feed with 6 entity filter pills.
  - Bottom-right touchpoint statistics widgets (`Helpdesk`, `Calendar`, `Feedback`).
* **Distinction:**
  - Toggled entirely by the four radio buttons at the top of the detail pane:
    * **3.2.1 (`Accounts`):** Displays account cards with co-owners, `+ Add to Task`, and dynamic account-product checklist.
    * **3.2.2 (`Mobile Banking`):** Displays a 12-row table of digital banking accounts and PIN statuses.
    * **3.2.3 (`Bancassurance`):** Displays General and Life insurance policy cards and expiration dates.
    * **3.2.4 (`Credit Card`):** Displays credit card cards with masked PANs and replacement statuses, plus the floating omnichannel toolstrip on the far-right edge.

### Cluster 3: Lead Details Modal Sibling Tabs (Screens 4.4.1 & 4.4.2)
* **Symmetry:** Both screens share an identical modal dialog container, modal header with eye icon and title `Lead Details`, Close (`✕`) button, internal tab navigation bar (`[Profile]` and `[Activity Log]`), and bottom `Cancel` button.
* **Distinction:**
  - **Screen 4.4.1 (`Profile` Tab):** Displays a two-column static key-value summary of lead attributes.
  - **Screen 4.4.2 (`Activity Log` Tab):** Displays a vertical chronological stream of audit log cards with status updates, comments, and actor stamps.

### Cluster 4: Lead Action Dialog Siblings (Screens 4.2 & 4.3)
* **Symmetry:** Both screens are compact, centered modal dialogs over a dark semi-transparent backdrop overlay, sharing identical header iconography, pre-filled read-only `Lead ID`, a multi-line `Comments (Optional)` text area, and dual action buttons (`Cancel` and `Update`).
* **Distinction:**
  - **Screen 4.2 (`Update Status`):** Contains a single `Status *` dropdown selector.
  - **Screen 4.3 (`Reassign Lead`):** Contains an `Edit Assigned` list of active user chips with role tags and delete buttons (`✕`), paired with an `Add Assignment` dropdown combo box.

---

## 5. Workflow State Analysis (Screens as States vs. Distinct Screens)

The project rules specify:
> *"Every source screen must eventually have a corresponding redesigned mobile experience unless there is a documented reason why two source screens are intentionally represented as states of one mobile screen. Do not merge screens merely to reduce the screen count."*

Below is the formal evaluation of which source screens represent distinct functional screens versus dynamic view states of a shared workflow:

| Workflow Group | Source Screens Involved | Structural Relationship in Source | Redesign Treatment Principle |
|---|---|---|---|
| **Lead Capture** | Screen 3.1 & Screen 3.2 | **Two dynamic states of the same form.** Toggling the `Customer Lead Type` radio button switches the UI between manual input (3.1) and auto-complete lookup (3.2) on the same page route. | In mobile redesign, these must be treated as two distinct states of a unified Lead Capture experience (e.g., segmented toggle or wizard step), preserving 100% of both fields and the sidebar avatar gateway without creating disjointed routes. |
| **Customer 360** | Screens 3.2.1, 3.2.2, 3.2.3, 3.2.4 | **Four tab/segment states of a master relationship view.** The user remains on the same customer record while radio buttons swap the content of the `DTB Customer Info` pane. | On desktop, these are radio-switched panes. On mobile, each of the four banking facets represents significant density. They must be mapped as dedicated tabbed or sub-page states within the Customer 360 mobile hub so no data (accounts, PINs, policies, cards) is lost. |
| **Lead Details** | Screen 4.4.1 & Screen 4.4.2 | **Two tab states of an inspection dialog.** Toggling the `[Profile]` and `[Activity Log]` tabs swaps the body content within the same modal container. | On mobile, these represent two views of a Lead Details hub. They will map to a segmented control or tabbed mobile screen (`Overview / Profile` vs `Timeline / Activity Log`). |
| **Lead Actions** | Screen 4.0 vs Screens 4.1, 4.2, 4.3, 4.4.1 | **Menu state vs. Execution states.** Screen 4.0 is a transient floating popup menu whose sole purpose is to route the user into one of the four execution dialogs or download actions. | On mobile, Screen 4.0 maps naturally to a bottom action sheet or swipe action menu that triggers the respective action screens. |
| **Operational Hub** | Screen 1.0 & Screen 2.0 | **Two completely distinct operational screens.** Screen 1.0 is an executive/analytical dashboard; Screen 2.0 is a transactional master data table. | Both require completely independent, full-fledged mobile screen architectures (Dashboard view vs. Leads listing view). Neither can be merged into the other. |
| **Authentication & Settings** | Screen 5.0 & Screen 5.1 | **Two completely distinct system screens.** Screen 5.0 is the public unauthenticated entry gate; Screen 5.1 is the authenticated corporate/user profile settings page. | Require independent mobile screens (Login Screen and Settings Screen). |

---

## 6. Comprehensive Source-to-Mobile Traceability Matrix

To ensure absolute adherence to the non-negotiable rule (*"Every source screen must eventually have a corresponding redesigned mobile experience"*), the matrix below establishes baseline 1:1 traceability for all subsequent design phases:

| Source Screen # | Source Screen Name | Functional Scope | Mobile Redesign Requirement | Mandatory Business Elements to Preserve |
|---|---|---|---|---|
| **1.0** | Dashboard | Sales executive overview & pipeline health | Dedicated Mobile Dashboard Screen | 8 KPI cards, 6 pipeline stages with counts & amounts, conversion trend line chart, product interest distribution donut chart, multi-attribute filter drawer. |
| **2.0** | All LEADS tABLE | Master leads operational management | Dedicated Mobile Leads Screen | 7 status KPI summary cards, full-attribute lead data cards (replacing 14-col table), multi-field filter drawer, pagination/infinite scroll, bulk export trigger, row action trigger. |
| **3.1** | Create a new lead (New Customer) | Lead capture for non-customers | Mobile Lead Capture Screen (New Customer State) | 4-card structure, Customer Name, Phone, Geolocation capture, Lead Type, Description, Branch dropdown, Source, conditional Referee field, Priority, Currency/Value, multi-product tag selection, Initiator, Status, Notes, multi-assignee tags with roles. |
| **3.2** | Create a new lead (Existing Customer) | Lead capture for bank customers | Mobile Lead Capture Screen (Existing Customer State) | Live customer auto-complete search with suggestions, CBS auto-fill metadata, persistent Customer 360 entry point (replacing hidden sidebar avatar), identical commercial & assignment fields as 3.1. |
| **3.2.1** | Customer 360 (Accounts & Products) | Core banking accounts & active products | Dedicated Mobile Customer 360 Screen (Accounts Tab) | Master biodata, multi-phone contact list, communication shortcuts (call/email/chat), account cards with co-owners & branch codes, `+ Add to Task`, dynamic product checklist per account, compliance accordion, multi-channel activity history, touchpoint stats. |
| **3.2.2** | Customer 360 (Mobile Banking) | Digital banking & PIN audit | Mobile Customer 360 Screen (Mobile Banking Tab) | 12-row mobile banking records, PIN status badges (`Active Pin` vs `One Time Pin`), registered account numbers, branch names and branch codes (`041`). |
| **3.2.3** | Customer 360 (Bancassurance) | Insurance policy portfolio | Mobile Customer 360 Screen (Bancassurance Tab) | General and Life policy cards, Policy numbers, expiration dates, IPEN product indicators. |
| **3.2.4** | Customer 360 (Credit Card) | Credit card facilities & omnichannel | Mobile Customer 360 Screen (Credit Card Tab) | Credit card cards, masked card numbers, card status (`Normal`, `Replaced`), credit limits (`KES 2,000,000`), mobile-accessible omnichannel communication actions. |
| **4.0** | Lead Actions Context Menu | Contextual lead workflow triggers | Mobile Action Sheet / Context Menu | 6 distinct action triggers: Schedule Meeting, Update Status, Reassign Lead, View Details, Export as PDF, Export as PDF via email. |
| **4.1** | Schedule lead Meeting (Add Event) | Meeting scheduling & calendar sync | Dedicated Mobile Event Creation Screen / Full-Screen Modal | Lead ID context, Meeting Status + custom add, Location, Department, Start/End date-time pickers, Resources, Purpose, Description, Nylas calendar sync, Staff assignment chip, Customer linkage chip. |
| **4.2** | Update status pop up page | Fast pipeline status update | Mobile Status Transition Sheet / Modal | Lead ID and Customer context, pipeline status selector dropdown, transition remarks text area, audit submission. |
| **4.3** | Re-assign lead pop up page | Multi-user ownership & handover | Mobile Reassignment Sheet / Modal | Lead ID context, active assignees list with role tags and deletion targets, add assignee user picker, handover comments text area. |
| **4.4.1** | View Lead Details (Profile Tab) | Comprehensive lead inspection | Mobile Lead Details Screen (Profile View) | Tab switcher (`Profile` vs `Activity Log`), 16 lead attributes organized into readable mobile cards, customer contact links. |
| **4.4.2** | View Lead Details (Activity Log Tab) | Chronological audit trail | Mobile Lead Details Screen (Activity Log View) | Tab switcher (`Profile` vs `Activity Log`), vertical timeline cards showing status changes, timestamps, actor stamps, and user comments. |
| **5.0** | Login page | Corporate Single Sign-On | Dedicated Mobile Authentication Screen | Corporate email input, "Log In with SSO" trigger, security policies link, branding. |
| **5.1** | User profile / Company Details | Corporate & account settings | Dedicated Mobile Settings & Profile Screen | Company identity, physical address, operating currency, API key with copy action, taxes list with add trigger, 2FA configuration, password update, employee photo upload, profile attributes. |

---

## 7. Conclusion & Next Phase Readiness

* **Zero Scope Reduction:** All 16 source screens and their underlying data points, actions, dependencies, and business rules have been captured, cataloged, and accounted for.
* **No Unsanctioned Mergers:** Every screen is documented with its individual integrity preserved.
* **Analysis Phase Complete:** All 6 required analysis tasks (Tasks 1 through 6) have been thoroughly satisfied. The project is fully documented and prepared for user review prior to commencing mobile design phases.
