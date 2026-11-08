# Screen Inventory: Kati Enterprise Sales Module

> **Document Version:** 1.0.0  
> **Source Document:** `reference/sales-module-source.pdf` (`references/mobileApp.pdf`)  
> **Status:** Baseline Research & Screen Audit (No design modifications)  
> **Target Application:** Kati CRM — Enterprise Banking Sales Module (DTB Africa)

---

## 1. Inventory Summary

The source PDF contains **16 documented screen states** spanning the Sales Module, Customer 360 (Contacts), Lead Action modals, Authentication, and User/Company Settings. 

| Screen # | Screen Name in Source | Module | Submodule | UI Pattern | Key Dependencies |
|---|---|---|---|---|---|
| **1.0** | Dashboard | Sales | Dashboard | Desktop Dashboard | Leads, Pipeline, KPI Services |
| **2.0** | All LEADS tABLE | Sales | Leads (All Leads) | Data Table + KPI Bar | Leads DB, User Assignments |
| **3.1** | Create a new lead for an New Customer | Sales | Lead Capture | Full-page Multi-card Form | Geolocation, Branch/Product catalogs |
| **3.2** | Create a new lead for an Existing Customer | Sales | Lead Capture | Multi-card Form + Autocomplete | Customer CBS/CRM Lookup, Profile mini-card |
| **3.2.1** | Existing Customer profile/360 — Accounts | Contacts | Customer 360 | Split-pane Master-Detail | Core Banking (Accounts, Products), Helpdesk |
| **3.2.2** | Existing Customer profile/360 — Mobile banking | Contacts | Customer 360 | Split-pane Master-Detail | Digital Banking Switch / PIN Registry |
| **3.2.3** | Existing Customer profile/360 — Bancasurrance | Contacts | Customer 360 | Split-pane Master-Detail | Bancassurance Policy Registry / IPEN |
| **3.2.4** | Existing Customer profile/360 — Credit Card | Contacts | Customer 360 | Split-pane Master-Detail | Card Management System (CMS), Omnichannel |
| **4.0** | Lead Actions Context Menu | Sales | Leads | Dropdown / Anchored Context Menu | Row item selection |
| **4.1** | Schedule lead Meeting (Add Event) | Sales | Calendar / Events | Modal Dialog | Nylas Calendar, Staff Directory |
| **4.2** | Update status pop up page | Sales | Pipeline Management | Modal Dialog | Lead state machine, Audit log |
| **4.3** | Re-assign lead pop up page | Sales | Ownership & Assignment | Modal Dialog | Staff directory, Multi-assignment rules |
| **4.4.1** | View Lead Details pop up — Profile Tab | Sales | Lead Details | Tabbed Modal Dialog | Lead record, Customer record |
| **4.4.2** | View Lead Details Activity log | Sales | Audit Trail | Tabbed Modal Dialog | Audit log event store |
| **5.0** | Login page | System | Authentication | Centered SSO Login Card | SSO / Identity Provider (OAuth2/SAML) |
| **5.1** | User profile / Company Details | System Settings | Profile & Organization | Settings Form + Left Rail | Tenant config, Auth API, 2FA |

---

## 2. Detailed Screen Specifications

---

### Screen 1.0: Sales Dashboard
* **Screen Number:** 1.0 (PDF Page 1, Image `img-000.png`)
* **Existing Screen Name:** Dashboard (Sales Dashboard)
* **Module:** Sales
* **Submodule:** Dashboard
* **Purpose:** Acts as the executive and operational landing page for sales representatives, managers, and supervisors upon entering the Sales module. Provides immediate visibility into pipeline volume, stage health, conversion trends, product distribution, and daily action triggers (follow-ups, meetings).
* **Primary User:** All Sales users (Sales Representatives, Sales Managers, Collections Officers, Supervisors, Admins).
* **Main Actions:**
  1. Filter entire dashboard data by Customer, Employee, Region, Branch, and Date Range.
  2. Toggle / clear dashboard filter bar (`X` button).
  3. View high-level pipeline cards segmented by pipeline status.
  4. Inspect Lead Conversion Trend timeline.
  5. Inspect Product Interest Distribution donut chart.
  6. Navigate between Sales submodules via the secondary sub-nav tab bar.
  7. Access global system modules via the persistent left-hand sidebar navigation.
* **Important Information Displayed:**
  * **Secondary Sub-Navigation Tabs:** Dashboard (active, orange), All Leads, Customer Engagement, All Engagements, Collections, Report & Analytics.
  * **Dashboard Filter Controls:**
    - Customer search input with search icon
    - Employee dropdown
    - Region dropdown
    - Branch dropdown
    - Date From (e.g., `1 June, 2026`)
    - Date To (e.g., `19 September, 2026`)
    - Filter toggle icon and Close/Clear (`X`) icon
  * **Performance Overview (8 KPI summary cards):**
    - Total Leads: `11`
    - Converted Leads: `2`
    - Hot Leads: `1`
    - Warm Leads: `3`
    - Cold Leads: `2`
    - Follow-Ups Today: `0`
    - Meetings Scheduled today: `0`
    - Open Engagements: `5`
  * **Lead Pipeline Board (Kanban Columns with count badges):**
    - **New (2):** Vivian — `KES 20000`; Vivian Onyango — Savings account — `KES 20000`
    - **Cold (2):** Collins Sakwa — `KSh 98700`; COLLINS w SAKWA — Salary Account — `KSh 1000000`
    - **Warm (3):** test2 email — `KSh 12000`; Collins Sakwa — Debit Card — `KSh 10000`; Andrew11 Desart — Debit Card — `KSh 42542`
    - **Hot (1):** test vertical vertical — World Credit Card — `KSh 25000`
    - **Nurturing (1):** Test Contact — Overdraft Facility
    - **Converted (2):** Vivian Onyango — `KSh 20000`; JEREMIAH VINCENT AKWIRI — Salary Account — `KSh 1200`
  * **Lead Conversion Trend Chart:** Multi-point time series line chart with date intervals along the X-axis (`Jun 1, 2026` to `Sep 14, 2026`) and lead count along the Y-axis (`0` to `6`).
  * **Product Interest Distribution Chart:** Donut chart broken down by product categories:
    - Savings account (Red)
    - Salary Account (Orange)
    - Personal Loan (Yellow)
    - Overdraft Facility (Light Green)
    - Debit Card (Light Blue)
    - World Credit Card (Dark Grey)
* **Navigation Entry Point:** Initial landing page after successful login; clicking "Sales" on the global sidebar navigation; or clicking the "Dashboard" sub-tab from any Sales page.
* **Navigation Destination:**
  - Clicking "All Leads" tab -> navigates to Screen 2.0 (All Leads Table).
  - Clicking other sub-tabs -> navigates to Customer Engagement, All Engagements, Collections, Report & Analytics.
  - Clicking global menu items -> navigates to other Kati CRM modules.
* **Forms Involved:** Dashboard Filter panel (horizontal inline form with 6 input controls).
* **Tables/Lists Involved:** Kanban pipeline columns containing individual lead mini-cards.
* **Filters/Search Functionality:** Customer (text search), Employee (select), Region (select), Branch (select), Date From (date picker), Date To (date picker), Reset/Close.
* **Tabs:** Secondary Sub-navigation bar (Dashboard, All Leads, Customer Engagement, All Engagements, Collections, Report & Analytics).
* **Menus:** Left global navigation drawer (18 modules).
* **Popups/Modals:** None on landing.
* **Important States:**
  - Filter bar expanded vs. collapsed.
  - Filtered results applied vs. unfiltered defaults.
  - Empty pipeline stages vs. populated pipeline stages.
* **Dependencies on Another Screen:** Requires authenticated session (Screen 5.0). Data is driven by Leads (Screen 2.0) and CRM Engagements.

---

### Screen 2.0: All Leads Table
* **Screen Number:** 2.0 (PDF Pages 2–3, Image `img-001.png`)
* **Existing Screen Name:** All LEADS tABLE
* **Module:** Sales
* **Submodule:** Leads (All Leads)
* **Purpose:** Central operational workspace to view, search, filter, paginate, export, and manage the full lifecycle of all sales leads across the institution. Allows quick triggering of lead actions and initiation of lead creation.
* **Primary User:** Sales Representative, Sales Manager, Collections Officer, Supervisor, System Admin.
* **Main Actions:**
  1. View all leads in a tabular view with complete business metadata.
  2. Filter leads using multi-attribute criteria.
  3. Toggle filter panel visibility (Filter funnel icon / Close icon).
  4. Initiate new lead creation via the "+ New Lead" button.
  5. Bulk export leads via the top-right download/tray button.
  6. Trigger row-level context menu via the three-dot vertical ellipsis (`⋮`).
  7. Change pagination density ("Items per page", e.g., `10`) and view total count ("Total 36").
  8. Switch to other Sales submodules via the top tab bar.
* **Important Information Displayed:**
  * **Top Sub-Navigation Bar:** Dashboard, All Leads (active, orange button with link icon), Customer Engagement, All Engagements, Collections, Report & Analytics.
  * **Header Utility Actions:**
    - Download / Export list icon
    - Filter toggle funnel icon
    - Close / Clear (`X`) icon
  * **Filter Panel (Collapsible Drawer with 9 inputs):**
    - Customer (Search input with magnifying glass)
    - Keyword / ID (Text field)
    - Employee (Dropdown selector)
    - Lead Status (Dropdown selector)
    - Lead Source (Dropdown selector)
    - Customer Segment (Dropdown selector)
    - Priority (Dropdown selector)
    - Date From (Date picker, e.g., `2 February, 2026`)
    - Date To (Date picker, e.g., `19 September, 2026`)
  * **Summary KPI Cards (7 horizontal cards):**
    - Total Leads: `36`
    - Hot Leads: `1`
    - Warm Leads: `4`
    - Cold Leads: `4`
    - Nurturing: `1`
    - Converted: `4`
    - Lost: `3`
  * **Table Controls:**
    - "+ New Lead" button (Orange outlined button with plus icon)
    - Items per page dropdown (`10`, `25`, `50`)
    - Total records counter ("Total 36")
  * **All Leads Data Table Columns (14 columns, Orange header):**
    1. **Lead ID:** Structured ID (e.g., `L-2026-000181`, `L-2026-000180`)
    2. **Customer:** Customer name string (e.g., `jjjejejej`, `JEREMIAH VINCENT AKWIRI`, `Andrew11 Desart`, `Test Contact`, `Collins Sakwa`, `Vivian Onyango`)
    3. **Phone:** Contact phone number (e.g., `9990504044`, `254742121445`, `37369096106`, `1234567890`)
    4. **Location:** Physical address or municipality (e.g., `P.O BOX 234 50100 KAKAMEGA`, `Nairobi`, `Probolinggo`)
    5. **Segment:** Customer segment (`Retail`, `Corporate`, `Business`)
    6. **Product Interest:** Targeted banking product (`Savings account`, `Salary Account`, `Debit Card`, `Overdraft Facility`, `World Credit Card`)
    7. **Priority:** Urgency level (`Low`, `Medium`, `High`)
    8. **Potential Vale:** Estimated monetary value (*Note: labeled with typo "Potential Vale" in source*; e.g., `KES`, `KES 1200`, `USD 42542`, `KES 200000`, `KES 1000000`, `KES 25000`, `KES 20000`, `KES 10000`, `KES 98700`)
    9. **Assigned To:** Assigned staff member(s) (e.g., `Member 3`, `Demo Account,Mutai Mutai`, `Nelly Nelly`, `Demo Account`, `System Admin`, `Permission Permission,System Admin`, `,System Admin`)
    10. **Status:** Color-coded status badge:
        - `New` (Yellow pill)
        - `Cold` (Light Blue pill)
        - `Warm` (Light Orange pill)
        - `Hot` (Red/Coral pill)
        - `Nurturing` (Purple pill)
        - `Converted` (Green pill)
        - `Lost` (Grey pill)
    11. **Lead Source:** Inbound or outbound channel (`Contact Centre`, `Referral`, `Door to Door`, `Website Inquiry`)
    12. **Converted Value:** Realized value upon conversion (e.g., `KES -`, `KES 12000.00`, `USD -`)
    13. **Created Date:** Creation date (e.g., `15-Sep-2026`, `01-Sep-2026`, `26-Aug-2026`, `30-Jul-2026`, `02-Jul-2026`, `30-Jun-2026`)
    14. **Actions:** Three-dot vertical ellipsis button (`⋮`) triggering Screen 4.0.
* **Navigation Entry Point:**
  - Clicking "All Leads" sub-tab from Dashboard (Screen 1.0) or another Sales sub-tab.
  - System redirect upon completing or canceling lead creation (Screens 3.1, 3.2).
  - System redirect upon submitting or closing lead action modals (Screens 4.1, 4.2, 4.3, 4.4.1).
* **Navigation Destination:**
  - Clicking "+ New Lead" -> navigates to Screen 3.1 (Capture Lead).
  - Clicking row action ellipsis (`⋮`) -> opens Screen 4.0 (Lead Actions Context Menu).
  - Clicking top sub-tabs -> navigates to Dashboard, Customer Engagement, Collections, Report & Analytics.
* **Forms Involved:** Filter drawer form.
* **Tables/Lists Involved:** All Leads data table (14 columns, 10 visible rows per page).
* **Filters/Search Functionality:** Multi-field filter (Customer text search, Keyword/ID, Employee dropdown, Status dropdown, Source dropdown, Segment dropdown, Priority dropdown, Date From, Date To).
* **Tabs:** Secondary Sub-navigation bar.
* **Menus:** Row action ellipsis menu (`⋮`), Items per page dropdown, Export menu.
* **Popups/Modals:** Directly triggers Lead Actions Context Menu (Screen 4.0), which opens child modals (Screens 4.1, 4.2, 4.3, 4.4.1/4.4.2).
* **Important States:**
  - Default view vs. filtered results.
  - Active ellipsis menu on a specific row.
  - Loading / paginating states.
* **Dependencies on Another Screen:** Directly connects to Lead Creation (3.1/3.2) and Lead Actions (4.0–4.4.2).

---

### Screen 3.1: Create New Lead Form (New Customer)
* **Screen Number:** 3.1 (PDF Pages 3–5, Image `img-002.png`)
* **Existing Screen Name:** Create a new lead for an New Customer
* **Module:** Sales
* **Submodule:** Leads / Lead Capture
* **Purpose:** Capture complete details for a prospective new customer who does not have an existing profile in the CRM or Core Banking System.
* **Primary User:** Sales Representative, Relationship Officer.
* **Main Actions:**
  1. Select customer type radio button (`New Customer`).
  2. Input prospect contact and demographic information (Customer Name, Phone Number, Physical Location).
  3. Input lead categorization (Lead Type, Description, Branch Name).
  4. Input commercial details (Lead Source, Customer Segment, conditional Referee, Lead Priority, Estimate Value with currency, Product Type multi-select).
  5. Delete selected products via trash icon (`🗑`).
  6. Set assignment and workflow remarks (Lead Initiator, Lead Status, Comments or Notes, Add Assignment).
  7. Remove assigned staff members via remove icon (`✕`).
  8. Click "Create Lead" button to submit and save.
  9. Click "Cancel" or header Close (`✕`) button to abort.
  10. Use right-hand sticky "Summary" jump navigation to scroll between form sections.
* **Important Information Displayed:**
  * **Header:** "Capture Lead" title with icon and top-right Close (`✕`) button.
  * **Right Sticky Anchor Summary Rail:**
    - Lead Type Selection
    - Lead Information
    - Lead Details
    - Assignment & Remarks
  * **Section 1: Lead Type Selection Card:**
    - Customer Lead Type *: Radio options `(●) New Customer` | `( ) Existing Customer`
    - Customer Name *: Text input (e.g., `Allan Branson`)
    - Phone Number *: Text input (e.g., `0750800900`)
    - Physical Location: Text input (e.g., `Nairobi`) — *Note: captures geolocation data according to PDF notes.*
  * **Section 2: Lead Information Card:**
    - Lead Type *: Dropdown / text input (e.g., `New Lead`)
    - Description *: Multi-line text area (e.g., `Test Area`)
    - Branch Name *: Dropdown selector (e.g., `Ravenclaw`, `Griffindor`)
  * **Section 3: Lead Details Card:**
    - Lead Source *: Dropdown selector (e.g., `Referral`, `Door to Door`, `Website Inquiry`, `Contact Centre`)
    - Customer Segment *: Dropdown selector (e.g., `Retail`, `Corporate`, `Business`)
    - Referee: Text input (e.g., `Branson`) — *Crucial dependency: This field is strictly dynamic/dependent; it only renders if Lead Source is "Referral" or "Referee", otherwise hidden.*
    - Lead Priority *: Dropdown selector (e.g., `Medium`, `High`, `Low`)
    - Estimate Value *: Currency dropdown (`USD`, `KES`) + numeric amount input (e.g., `25,000`)
    - Product Type *: Dropdown selector to choose products. Selected products display below as dismissible line items with trash icons:
      * `Salary Account` [Trash icon]
      * `Savings account` [Trash icon]
  * **Section 4: Assignment & Remarks Card:**
    - Lead Initiator *: Dropdown selector (e.g., `Branson Allann`)
    - Lead Status *: Dropdown selector (e.g., `New`, `Warm`, `Cold`, `Hot`, `Nurturing`)
    - Comments or Notes: Multi-line text area (e.g., `High Value Client`)
    - Add Assignment: Dropdown selector to choose additional team members.
    - Assigned To: List of selected assignees with role badges and delete (`✕`) buttons:
      * `NellyM` `[Collections Manager]` `[✕]`
      * `Derrick Ombaki` `[Administrator]` `[✕]`
  * **Bottom Form Action Buttons:**
    - "Cancel" button (light/outlined button)
    - "Create Lead" button (prominent solid orange button)
* **Navigation Entry Point:** From All Leads Table (Screen 2.0), clicking the "+ New Lead" button.
* **Navigation Destination:**
  - Clicking "Create Lead" -> creates lead and redirects to All Leads table (`/all-leads` or `/myleads`).
  - Clicking "Cancel" or Close (`✕`) -> discards inputs and redirects to All Leads table.
  - Toggling radio to "Existing Customer" -> switches view to Screen 3.2.
* **Forms Involved:** Long-form multi-card creation form with 17 distinct field controls.
* **Tables/Lists Involved:** Multi-selected Product tags with delete icons; Multi-selected Assignee chips with role tags.
* **Filters/Search Functionality:** Dropdown lookups for Branch, Source, Segment, Priority, Products, Initiator, and Staff.
* **Tabs:** Top sub-navigation bar remains visible.
* **Menus:** Right-hand sticky anchor jump rail (Summary).
* **Popups/Modals:** Form is presented as a full-page structured form (not a modal overlay).
* **Important States:**
  - `Customer Lead Type` set to "New Customer" (displays name/phone/location inputs).
  - Dynamic `Referee` field visible vs. hidden based on `Lead Source`.
  - Empty product list vs. multi-product additions.
  - Single assignee vs. collaborative multi-assignment.
* **Dependencies on Another Screen:** Branches catalog, Products catalog, User directory, Geolocation service.

---

### Screen 3.2: Create New Lead Form (Existing Customer)
* **Screen Number:** 3.2 (PDF Pages 6–7, Image `img-003.png`)
* **Existing Screen Name:** Screen Name 3.2: Create a new lead for an Existing Customer
* **Module:** Sales
* **Submodule:** Leads / Lead Capture
* **Purpose:** Capture a new sales lead, cross-sell, or product interest for a customer who already has an established record in the institution. Connects directly to existing customer biodata and launches Customer 360.
* **Primary User:** Sales Representative, Relationship Manager.
* **Main Actions:**
  1. Select customer type radio button (`Existing Customer`).
  2. Search for existing customer via the dynamic "Search Customer *" input.
  3. Select matching customer from auto-complete search results dropdown.
  4. View auto-populated customer summary fields (Full Name, Phone Number, Account Number, Location).
  5. View Customer Quick Profile card on top-left sidebar (Avatar, Phone, Email, Masked Account/CIF).
  6. Click customer avatar on top-left sidebar to navigate to Customer 360 view (Screen 3.2.1).
  7. Complete Lead Information, Lead Details, and Assignment & Remarks sections.
  8. Submit lead creation ("Create Lead") or abort ("Cancel").
* **Important Information Displayed:**
  * **Global Kati Header:** Kati logo, Global Search input, Calendar icon, Notification bell with counter badge (`8`), Online status pill (`Online ▾`), Logged-in user pill (`Central Electricals / Branson Allann`).
  * **Left Sidebar Customer Quick Profile Card:**
    - Collapse / expand chevron (`^`) and Close (`✕`) icon
    - Customer Avatar circle with green verified checkmark
    - Phone number display: `254703133854 Phone`
    - Email display: `mateen@calltronix.com`
    - Masked account/CIF display: `25470313####`
    - Customer Type selector dropdown (`Customer Type ▾`)
  * **Section 1: Lead Type Selection Card:**
    - Customer Lead Type *: Radio options `( ) New Customer` | `(●) Existing Customer`
    - Search Customer *: Search input with search icon (query typed: `mateen`).
    - Auto-complete search results dropdown:
      * `Mateen Premji` (`mateen@calltronix.com`)
      * `mateen@calltronix.com`
      * `karim@centralelectricals.com`
      * `Andrew11 Desart` (`cravtovandrei1978@gmail.com`)
      * `test vertical vertical` (`testvertikal@julia.alert.com`)
      * `test2 email` (`test2@email.com`)
      * Pagination link: `Next >`
    - Populated Customer Metadata (read-only):
      * Full Name: `Mateen Premji`
      * Phone Number: `254703133854`
      * Account Number: `-`
      * Location: `-`
  * **Section 2: Lead Information Card:** Lead Type *, Description *, Branch Name * (`Griffindor`).
  * **Section 3: Lead Details Card:** Lead Source *, Customer Segment *, Lead Priority *, Estimate Value * (`KES`), Product Type *.
  * **Section 4: Assignment & Remarks Card:** Lead Initiator * (`Branson Allann`), Lead Status *, Comments or Notes, Add Assignment.
  * **Right Sticky Anchor Summary Rail:** Jump links to 4 sections.
  * **Bottom Buttons:** "Cancel" and "Create Lead".
* **Navigation Entry Point:** From All Leads Table, clicking "+ New Lead", then selecting "Existing Customer" radio.
* **Navigation Destination:**
  - Clicking the customer avatar on top-left sidebar -> navigates directly to Screen 3.2.1 (Existing Customer profile/360).
  - Clicking "Create Lead" or "Cancel" -> redirects to All Leads table (`/all-leads`).
* **Forms Involved:** Auto-complete customer search form integrated into lead capture form.
* **Tables/Lists Involved:** Search results list with `Next >` pagination; product items; assigned users.
* **Filters/Search Functionality:** Real-time customer search lookup with asynchronous suggestions.
* **Tabs:** Sub-navigation bar.
* **Menus:** Left sidebar global menu, top profile dropdown, right summary jump rail.
* **Popups/Modals:** Full-page form with dynamic auto-complete popup menu.
* **Important States:**
  - Unselected customer vs. selected customer.
  - Left sidebar profile mini-card collapsed vs. expanded.
  - Auto-suggest dropdown open vs. closed.
* **Dependencies on Another Screen:** Core Banking System (CBS) customer directory; navigates directly to Screen 3.2.1.

---

### Screen 3.2.1: Existing Customer Profile / 360 — Accounts & DTB Products
* **Screen Number:** 3.2.1 (PDF Pages 7–9, Image `img-005.png`)
* **Existing Screen Name:** 3.2.1 Screen Name: Existing Customer profile/360
* **Module:** Contacts
* **Submodule:** Customer 360 / Accounts
* **Purpose:** Serve as the 360-degree relationship view of an existing bank customer, displaying static biodata, core banking accounts, account-linked active products, compliance status, cross-channel activity history, and touchpoint statistics.
* **Primary User:** Sales Representative, Relationship Manager, Customer Service Officer.
* **Main Actions:**
  1. View complete customer biodata and multi-phone contact information.
  2. Perform direct omnichannel customer outreach (Profile icon, Call icon, Email icon).
  3. Trigger customer contextual actions (Chat/Comments, Group/Team, Edit customer profile, View details, Settings).
  4. Switch between bank information segments via radio tabs: Accounts, Mobile Banking, Bancassurance, Credit Card.
  5. Select an account card from the accounts grid to dynamically load linked products.
  6. Click "+ Add to Task" button on any individual account card.
  7. Expand / collapse DTB Compliance accordion.
  8. Filter Activity History by entity type (All, Tickets, Leads, Orders, Events, Recommendations) or date.
  9. Review performance statistics (Helpdesk, Calendar, Feedback).
* **Important Information Displayed:**
  * **Top Application Bar:** Kati logo, Search input, Calendar, Notifications (`212`), Online toggle, Current Queue (`8022`), PBX login checkbox, Logged-in user (`Diamond Trust Bank / System Admin`).
  * **Left Sidebar Customer Profile Card:**
    - Avatar circle with green checkmark
    - Full Name: `BILAL MUGHAL`
    - Email: `mughalbilal89@gmail.com`
    - Phone: `0797 686905`
    - Customer Type selector dropdown
  * **Left Panel: Customer Details:**
    - Action Icons Bar: User Profile, Phone Handset, Email Envelope | Chat bubble, Users team, Pencil edit, Eye view, Cog settings.
    - **Personal Information:**
      * Full Name: `BILAL MUGHAL`
      * Gender: `Male`
      * Nationality: `KE`
      * Date of Birth: `12/28/1999`
      * Age: `26`
      * ID/Passport: `36930306`
      * CIF (Customer Information File Number): `837649`
    - **Contact Details:**
      * Phone: `+254` (Kenya flag) `0797 686905`
      * Alternative Phone: `+254` (Kenya flag) `0702 965954`
      * Telephone: `+254` (Kenya flag) `702965954`
      * Email (Contacts): `mughalbilal89@gmail.com`
      * Secondary Email: `mughalbilal89@gmail.com`
      * Customer Address Full: [Text area]
  * **Right Panel: DTB Customer Info — Accounts Segment:**
    - Segment Toggle Radio Buttons:
      * `(●) Accounts`
      * `( ) Mobile Banking`
      * `( ) Bancassurance`
      * `( ) Credit Card`
      * Status indicator: `Active [✓] [^]`
    - **Account Cards (3 cards displayed):**
      * **Account Card 1:** Button `[+ Add to Task]`, Account Number: `5501117002`, Account Class: `-`, Parent: `0`, Child: `0`, Business Nature: `-`, ISICLEVEL1: `-`, Has FDR: `no`, Status: `Active`, Group Name: `-`, Relationship Type: `-`, Bank Branch Name: `NYALI BRANCH`, Bank Branch Code: `038`, Co-owners: `WILLIAM NDETI, RIAZ S. HAJI, FAREZ MADATALY KANJI, TAZMINA AMINMOHAMED KASSAM`, CIF: `02201104`.
      * **Account Card 2:** Button `[+ Add to Task]`, Account Number: `5501117001`, Account Class: `-`, Parent: `0`, Child: `0`, Business Nature: `-`, ISICLEVEL1: `-`, Has FDR: `no`, Status: `Active`, Group Name: `-`, Relationship Type: `-`, Bank Branch Name: `COURTYARD BRANCH`, Bank Branch Code: `041`, Co-owners: `FARID AHMAD SWALEH, FAREZ MADATALY KANJI, TAZMINA AMINMOHAMED KASSAM`, CIF: `0837649`.
      * **Account Card 3:** Button `[+ Add to Task]`, Account Number: `0837649001`, Account Class: `DTB Salary Account`, Parent: `0`, Child: `0`, Business Nature: `-`, ISICLEVEL1: `-`, Has FDR: `no`, Status: `Active`, Group Name: `-`, Relationship Type: `-`, Bank Branch Name: `COURTYARD BRANCH`, Bank Branch Code: `041`, Co-owners: `-`, CIF: `0837649`.
    - Selection Instruction: *"Select one of the above accounts"*
    - Dynamic Products Section: Products linked to selected account (only active products marked with a checkmark).
  * **DTB Compliance Accordion:** Collapsible header (`DTB Compliance [^]`).
  * **Activity History Stream:**
    - Filter Radios: `( ) All` | `( ) Tickets` | `(●) Leads` | `( ) Orders` | `( ) Events` | `( ) Recommendations` | Calendar date icon.
  * **Statistic Summary Widgets:**
    - Helpdesk Card: Total: `272`, Open: `4`, Done: `268`
    - Calendar Card: Scheduled: `0`, Confirmed: `0`, Cancelled: `0`
    - Feedback Card: Count: `0`, Star rating (`0`)
* **Navigation Entry Point:**
  - Clicking customer profile avatar on top-left sidebar from Screen 3.2.
  - From Contacts module via customer search.
* **Navigation Destination:**
  - Switching DTB info radio buttons -> Screen 3.2.2 (Mobile Banking), Screen 3.2.3 (Bancassurance), Screen 3.2.4 (Credit Card).
  - Clicking "+ Add to Task" -> triggers task creation modal.
  - Clicking global menu -> navigates back to Sales module.
* **Forms Involved:** Customer biodata form, Contact details form, Activity history filter bar.
* **Tables/Lists Involved:** Account cards grid, Co-owners listing, Dynamic products checklist, Activity stream.
* **Filters/Search Functionality:** Account selection, Segment radio tabs, Activity history radio filters.
* **Tabs:** DTB Customer Info radio tabs (Accounts, Mobile Banking, Bancassurance, Credit Card); Activity history filter pills.
* **Menus:** Top app bar queue/PBX controls, Left global sidebar, Customer header icon action toolbar.
* **Popups/Modals:** Add to Task modal; Edit customer modal.
* **Important States:**
  - Multiple bank accounts present; dynamic product checklist updates based on selected account card.
  - Compliance section expanded vs. collapsed.
  - Activity history filtered by Leads vs. Tickets vs. Orders.
* **Dependencies on Another Screen:** Core Banking System (T24/CBS), Helpdesk module, Calendar module.

---

### Screen 3.2.2: Existing Customer Profile / 360 — Mobile Banking
* **Screen Number:** 3.2.2 (PDF Pages 9–11, Image `img-007.png`)
* **Existing Screen Name:** 3.2.2 : Screen Name: Existing Customer profile/360 - Mobile banking
* **Module:** Contacts
* **Submodule:** Customer 360 / Mobile Banking
* **Purpose:** Display all digital/mobile banking registrations, registered accounts, PIN credential statuses, and associated servicing branches for the customer.
* **Primary User:** Sales Representative, Relationship Manager, Digital Banking Support.
* **Main Actions:**
  1. View customer biodata and contact details.
  2. Inspect tabular list of all customer mobile banking records.
  3. Switch between DTB Customer Info segments.
  4. View customer activity history and touchpoint statistics.
* **Important Information Displayed:**
  * **Customer Personal Information:** Name: `MATEEN PREMJI`, Gender: `Male`, Nationality: `KE`, DOB: `04/17/1989`, Age: `37`, ID/Passport: `35081509`, CIF: `176753`, Phone: `0703 133854`, Address: `P.O BOX 66856 00800`.
  * **DTB Customer Info — Mobile Banking Segment:**
    - Segment Toggle Radio Buttons: `( ) Accounts` | `(●) Mobile Banking` | `( ) Bancassurance` | `( ) Credit Card`
    - **Mobile Banking Records Table (12 rows displayed):**
      * Columns: `Pin Status`, `Account Number`, `Bank Branch Name`, `Branch Code`
      * Row 1: `One Time Pin` | `0176753003` | `COURTYARD BRANCH` | `041`
      * Row 2: `Active Pin` | `0176753001` | `COURTYARD BRANCH` | `041`
      * Row 3: `Active Pin` | `0176753003` | `COURTYARD BRANCH` | `041`
      * Row 4: `Active Pin` | `5176753002` | `COURTYARD BRANCH` | `041`
      * Row 5: `Active Pin` | `0176753002` | `COURTYARD BRANCH` | `041`
      * Row 6: `One Time Pin` | `0176753002` | `COURTYARD BRANCH` | `041`
      * Row 7: `One Time...` | `5176753002` | `COURTYARD BRANCH` | `041`
      * Row 8: `One Time...` | `0176753002` | `COURTYARD BRANCH` | `041`
      * Row 9: `One Time...` | `0176753003` | `COURTYARD BRANCH` | `041`
      * Row 10: `One Time Pin` | `0176753001` | `COURTYARD BRANCH` | `041`
      * Row 11: `One Time...` | `0176753001` | `COURTYARD BRANCH` | `041`
      * Row 12: `One Time Pin` | `5176753002` | `COURTYARD BRANCH` | `041`
  * **DTB Compliance Accordion:** Collapsible header.
  * **Activity History & Statistics:** Helpdesk (Total: `11`, Open: `0`, Done: `11`), Calendar, Feedback.
* **Navigation Entry Point:** Clicking "(●) Mobile Banking" radio tab within Screen 3.2.1.
* **Navigation Destination:** Clicking other segment radios (Accounts 3.2.1, Bancassurance 3.2.3, Credit Card 3.2.4).
* **Forms Involved:** Customer biodata form.
* **Tables/Lists Involved:** Mobile banking 4-column data table.
* **Filters/Search Functionality:** Segment radio buttons; Activity history filters.
* **Tabs:** DTB Customer Info radio tabs.
* **Menus:** Left sidebar global menu.
* **Popups/Modals:** None visible.
* **Important States:** Pin status values (`Active Pin` vs. `One Time Pin`). Customer can have multiple mobile banking registrations.
* **Dependencies on Another Screen:** Digital Banking switch / Mobile banking backend registry.

---

### Screen 3.2.3: Existing Customer Profile / 360 — Bancassurance
* **Screen Number:** 3.2.3 (PDF Pages 11–12, Image `img-008.png`)
* **Existing Screen Name:** 3.2. 3 Screen Name: Existing Customer profile/360 - Bancasurrance
* **Module:** Contacts
* **Submodule:** Customer 360 / Bancassurance
* **Purpose:** Display all insurance policies held by the customer through bank assurance partnerships (General, Life, policy numbers, expiration dates).
* **Primary User:** Sales Representative, Bancassurance Officer, Relationship Manager.
* **Main Actions:**
  1. View customer biodata and contact details.
  2. Inspect Bancassurance policy cards.
  3. Switch between DTB Customer Info segments.
  4. View customer activity history and touchpoint statistics.
* **Important Information Displayed:**
  * **Customer Personal Information:** Name: `PAUL OGACHO`, Gender: `Male`, Nationality: `KE`, DOB: `07/08/1989`, Age: `37`, ID/Passport: `27891339`, CIF: `6432`, Phone: `0711 118859`, Telephone: `780118859`, Address: `P.O. BOX 52374 00100 NAIROBI`.
  * **DTB Customer Info — Bancassurance Segment:**
    - Segment Toggle Radio Buttons: `( ) Accounts` | `( ) Mobile Banking` | `(●) Bancassurance` | `( ) Credit Card`
    - **Bancassurance Policy Cards (2 policies displayed):**
      * **Policy Card 1:** Policy_Number: `B/101/1002/2023/000002/0011/01` | Business Line Name: `GENERAL` | Expiration Date: `5/10/25` | Ipen Product: `-` | Ipen Product Type: `-`
      * **Policy Card 2:** Policy_Number: `IL202302360223` | Business Line Name: `LIFE` | Expiration Date: `4/26/28` | Ipen Product: `-` | Ipen Product Type: `-`
  * **DTB Compliance Accordion:** Collapsible header.
  * **Activity History & Statistics:** Helpdesk (Total: `82`, Open: `0`, Done: `82`), Calendar, Feedback.
* **Navigation Entry Point:** Clicking "(●) Bancassurance" radio tab within Customer 360.
* **Navigation Destination:** Switching to Accounts (3.2.1), Mobile Banking (3.2.2), or Credit Card (3.2.4).
* **Forms Involved:** Customer profile form.
* **Tables/Lists Involved:** Policy cards grid.
* **Filters/Search Functionality:** Segment radio buttons; Activity history filters.
* **Tabs:** DTB Customer Info radio tabs.
* **Menus:** Left sidebar global menu.
* **Popups/Modals:** None visible.
* **Important States:** Active vs. expired policies; General vs. Life insurance lines. A customer can have multiple policies.
* **Dependencies on Another Screen:** Bancassurance policy system / IPEN integration.

---

### Screen 3.2.4: Existing Customer Profile / 360 — Credit Card
* **Screen Number:** 3.2.4 (PDF Pages 12–13, Image `img-010.png`)
* **Existing Screen Name:** 3.2.4 Screen Name: Existing Customer profile/360 - Credit Card
* **Module:** Contacts
* **Submodule:** Customer 360 / Credit Card
* **Purpose:** Display credit card facilities, card numbers (masked), replacement statuses, credit limits, and provide access to omnichannel communication channels.
* **Primary User:** Sales Representative, Card Specialist, Relationship Manager.
* **Main Actions:**
  1. View customer biodata and contact details.
  2. Inspect credit card cards and approved credit limits.
  3. Switch between DTB Customer Info segments.
  4. Access floating omnichannel communication toolbar (Contact search, Voice call, Messenger, Email).
  5. View activity history and touchpoint statistics.
* **Important Information Displayed:**
  * **Customer Personal Information:** Name: `MATEEN PREMJI`, Gender: `Male`, Nationality: `KE`, DOB: `04/17/1989`, Age: `37`, ID/Passport: `35081509`, CIF: `176753`, Phone: `0703 133854`, Address: `P.O BOX 66856 00800`.
  * **DTB Customer Info — Credit Card Segment:**
    - Segment Toggle Radio Buttons: `( ) Accounts` | `( ) Mobile Banking` | `( ) Bancassurance` | `(●) Credit Card`
    - **Credit Card Cards (2 cards displayed):**
      * **Credit Card 1:** Status badge `Replaced` | Masked Card Number: `524406XXXXXX7240` | Card Original AMT: `-` | Limit: `KES 2000000`
      * **Credit Card 2:** Status badge `Normal` | Masked Card Number: `524406XXXXXX0895` | Card Original AMT: `-` | Limit: `KES 2000000`
  * **Floating Omnichannel Rail (Far Right Edge):**
    - Contact (Search icon)
    - Voice (Handset icon)
    - Messenger (Messenger icon with counter badge `99+`)
    - Email (Envelope icon with counter badge `99+`)
  * **DTB Compliance Accordion:** Collapsible header.
  * **Activity History & Statistics:** Helpdesk (Total: `11`, Open: `0`, Done: `11`), Calendar, Feedback.
* **Navigation Entry Point:** Clicking "(●) Credit Card" radio tab within Customer 360.
* **Navigation Destination:** Switching to Accounts (3.2.1), Mobile Banking (3.2.2), or Bancassurance (3.2.3).
* **Forms Involved:** Customer profile form.
* **Tables/Lists Involved:** Credit card cards grid.
* **Filters/Search Functionality:** Segment radio buttons; Activity history filters.
* **Tabs:** DTB Customer Info radio tabs.
* **Menus:** Floating right-hand omnichannel dock.
* **Popups/Modals:** None visible.
* **Important States:** Card status (`Normal`, `Replaced`, `Blocked`). Customer can have multiple primary and supplementary cards.
* **Dependencies on Another Screen:** Card Management System (CMS) / Card issuing switch.

---

### Screen 4.0: Lead Actions Context Menu
* **Screen Number:** 4.0 (PDF Page 13, Image `img-012.png`)
* **Existing Screen Name:** 4.0 : Lead Actions
* **Module:** Sales
* **Submodule:** Leads / Actions
* **Purpose:** Contextual dropdown menu anchored to an individual lead record in the All Leads table, exposing all executable workflows on that lead.
* **Primary User:** Sales Representative, Relationship Manager, Supervisor.
* **Main Actions:**
  1. Click "Schedule Meeting" -> opens Screen 4.1.
  2. Click "Update Status" -> opens Screen 4.2.
  3. Click "Reassign Lead" -> opens Screen 4.3.
  4. Click "View Details" -> opens Screen 4.4.1.
  5. Click "Export as PDF" -> triggers immediate lead PDF download.
  6. Click "Export as PDF via email" -> dispatches lead PDF summary via email.
* **Important Information Displayed:**
  * **Floating Action Menu (6 items with icons):**
    1. `Schedule Meeting` [Calendar-plus icon]
    2. `Update Status` [Pencil edit icon]
    3. `Reassign Lead` [Target / user icon]
    4. `View Details` [Eye view icon]
    5. `Export as PDF` [Download tray icon]
    6. `Export as PDF via email` [Mail download icon]
  * *Pain point documented in PDF:* Unable to view customer profile directly from the leads table actions.
* **Navigation Entry Point:** Clicking the three-dot vertical ellipsis (`⋮`) in the Actions column of any lead row in the All Leads Table (Screen 2.0).
* **Navigation Destination:**
  - Schedule Meeting -> opens Screen 4.1 modal.
  - Update Status -> opens Screen 4.2 modal.
  - Reassign Lead -> opens Screen 4.3 modal.
  - View Details -> opens Screen 4.4.1 modal.
  - Export actions -> executes background export task and closes menu.
* **Forms Involved:** None.
* **Tables/Lists Involved:** Menu item list.
* **Filters/Search Functionality:** None.
* **Tabs:** None.
* **Menus:** Anchored popup context menu.
* **Popups/Modals:** Menu itself is an anchored popup overlay.
* **Important States:** Open anchored to selected row; dismiss on outside click or selection.
* **Dependencies on Another Screen:** Directly anchored to Screen 2.0; gates entry to Screens 4.1, 4.2, 4.3, 4.4.1.

---

### Screen 4.1: Schedule Lead Meeting (Add Event Modal)
* **Screen Number:** 4.1 (PDF Pages 14–15, Image `img-013.png`)
* **Existing Screen Name:** 4.1 Schedule meeting / Screen Name: Schedule lead Meeting
* **Module:** Sales
* **Submodule:** Leads / Calendar & Events
* **Purpose:** Schedule an appointment, pitch, or follow-up meeting with a lead, synchronizing with staff calendars and reserving conference resources.
* **Primary User:** Sales Representative, Relationship Manager.
* **Main Actions:**
  1. View pre-filled Lead Id (`L-2026-000184`).
  2. Select meeting Status (`In-Discussion`) or add a custom status via the `(+)` button.
  3. Select Location and Department from dropdowns.
  4. Select start date and start time (`19/09/26 6:45 PM`).
  5. Select end date and end time (`19/09/26 12:00 AM`).
  6. Select Resources from dropdown.
  7. Enter Purpose of Meeting text.
  8. Toggle location/details accordion (`^`).
  9. Enter physical Location string and meeting Description.
  10. Select calendar integration (`Nylas Calendar: Calendar`).
  11. Select and link User/Staff member (`Branson Allann`).
  12. Search and link Customer (`ZAMZAM HASSAN MOHAMED`).
  13. Click "Create" button to submit event.
  14. Close modal via `(✕)` icon or header menu.
* **Important Information Displayed:**
  * **Modal Header:** "Add Event" title, hamburger menu icon, Close `(✕)` button.
  * **Lead Id Display:** `L-2026-000184`
  * **Form Controls (14 inputs):**
    - Status: Dropdown (`In-Discussion`) + `(+)` add button
    - Location: Dropdown selector
    - Department: Dropdown selector
    - Date Start: Date picker (`19/09/26`) + Time picker (`6:45 PM`)
    - Date End: Date picker (`19/09/26`) + Time picker (`12:00 AM`)
    - Resources: Dropdown selector
    - Purpose of Meeting: Text field
    - Accordion toggle chevron (`^`)
    - Location (additional): Text field
    - Description: Multi-line text area
    - Nylas Calendar: Dropdown selector (`Calendar`)
    - User/Staff: Dropdown selector + Linked staff box (`Branson Allann`)
    - Customer: Search input with search icon + Linked customer box (`ZAMZAM HASSAN MOHAMED`)
  * **Action Button:** "Create" (solid orange button).
* **Navigation Entry Point:** Screen 4.0 context menu -> "Schedule Meeting".
* **Navigation Destination:** Submitting ("Create") or closing redirects back to All Leads table (`/myleads`).
* **Forms Involved:** Event scheduling multi-field form.
* **Tables/Lists Involved:** Staff and customer lookup results.
* **Filters/Search Functionality:** Customer search field inside modal.
* **Tabs:** None.
* **Menus:** Header hamburger menu icon.
* **Popups/Modals:** Centered desktop modal dialog over dark backdrop overlay.
* **Important States:** Pre-filled lead context; collapsed vs. expanded location/description section.
* **Dependencies on Another Screen:** Lead record (Screen 2.0), Nylas Calendar integration, Staff directory.

---

### Screen 4.2: Update Status Pop Up Page
* **Screen Number:** 4.2 (PDF Pages 15–16, Image `img-014.png`)
* **Existing Screen Name:** 4.2 Screen Name: Update status pop up page
* **Module:** Sales
* **Submodule:** Leads / Pipeline Management
* **Purpose:** Update the sales qualification or pipeline status of an active lead and record audit remarks.
* **Primary User:** Sales Representative, Sales Manager, Collections Officer.
* **Main Actions:**
  1. View read-only Lead ID (`L-2026-000184`) and Customer Name (`ZAMZAM HASSAN MOHAMED`).
  2. Select new status from the Status dropdown (`Warm`, `Cold`, `Hot`, `Nurturing`, `Converted`, `Lost`).
  3. Enter optional transition remarks in "Comments (Optional)".
  4. Submit status update ("Update" button).
  5. Cancel update ("Cancel" button or `(✕)` icon).
* **Important Information Displayed:**
  * **Modal Header:** Edit pencil icon, "Update Status" title, Close `(✕)` button.
  * **Lead Context:** Lead ID (`L-2026-000184`), Customer (`ZAMZAM HASSAN MOHAMED`).
  * **Form Fields:**
    - Status *: Dropdown selector (currently selected: `Warm`)
    - Comments (Optional): Multi-line text area
  * **Action Buttons:**
    - "Cancel" (outlined button)
    - "Update" (solid orange button)
* **Navigation Entry Point:** Screen 4.0 context menu -> "Update Status".
* **Navigation Destination:** Submitting ("Update") or canceling redirects back to All Leads table (`/myleads`).
* **Forms Involved:** Status update form.
* **Tables/Lists Involved:** Status options dropdown list.
* **Filters/Search Functionality:** None.
* **Tabs:** None.
* **Menus:** Status dropdown.
* **Popups/Modals:** Compact centered desktop modal dialog over dark backdrop overlay.
* **Important States:** Selected pipeline status; audit validation.
* **Dependencies on Another Screen:** Lead record (Screen 2.0); logs changes to Screen 4.4.2.

---

### Screen 4.3: Re-assign Lead Pop Up Page
* **Screen Number:** 4.3 (PDF Pages 16–17, Image `img-015.png`)
* **Existing Screen Name:** 4.3 : Screen Name: Re-assign lead pop up page
* **Module:** Sales
* **Submodule:** Leads / Ownership & Assignment
* **Purpose:** Transfer or collaborate on lead ownership by reassigning the lead to one or more officers, relationship managers, or collections specialists.
* **Primary User:** Sales Manager, Supervisor, Relationship Manager.
* **Main Actions:**
  1. View pre-filled Lead ID (`L-2026-000184`).
  2. View currently assigned users with roles and remove unwanted assignees (`✕`).
  3. Search and select a new assignee from the "Add Assignment" dropdown.
  4. Enter handover or context notes in "Comments (Optional)".
  5. Submit reassignment ("Update" button).
  6. Cancel reassignment ("Cancel" button or `(✕)` icon).
* **Important Information Displayed:**
  * **Modal Header:** Target/user icon, "Reassign Lead" title, Close `(✕)` button.
  * **Lead ID Display:** `L-2026-000184`
  * **Edit Assigned List (Assignee chips with roles):**
    - `Calendar event` `[Administrator]` `[✕]`
    - `Branson Allann` `[Relationship Manager]` `[✕]`
  * **Add Assignment:** Dropdown combo box to select new users.
  * **Comments (Optional):** Multi-line text area.
  * **Action Buttons:** "Cancel" and "Update".
* **Navigation Entry Point:** Screen 4.0 context menu -> "Reassign Lead".
* **Navigation Destination:** Submitting ("Update") or canceling redirects back to All Leads table (`/myleads`).
* **Forms Involved:** Lead assignment form with multi-user chips.
* **Tables/Lists Involved:** Assigned users list; user selection dropdown.
* **Filters/Search Functionality:** User search within dropdown.
* **Tabs:** None.
* **Menus:** User combo box.
* **Popups/Modals:** Compact centered desktop modal dialog over dark backdrop overlay.
* **Important States:** Multiple assignees vs. single assignee; assignee deletion state.
* **Dependencies on Another Screen:** Lead record (Screen 2.0), User & Role directory; logs changes to Screen 4.4.2.

---

### Screen 4.4.1: View Lead Details Pop Up (Profile Tab)
* **Screen Number:** 4.4.1 (PDF Pages 17–18, Image `img-016.png`)
* **Existing Screen Name:** 4.4.1 Screen Name: View Lead Details pop up and Activity log
* **Module:** Sales
* **Submodule:** Leads / Details
* **Purpose:** Comprehensive read-only view of a lead's profile, contact information, financial estimates, qualification parameters, and ownership details.
* **Primary User:** Sales Representative, Relationship Manager, Supervisor.
* **Main Actions:**
  1. View complete lead parameters organized into a two-column summary.
  2. Switch to the "Activity Log" tab (Screen 4.4.2) to inspect the audit history.
  3. Close modal via "Cancel" button or `(✕)` icon.
* **Important Information Displayed:**
  * **Modal Header:** Eye icon, "Lead Details" title, Close `(✕)` button.
  * **Modal Internal Tabs:**
    - `[Profile]` (Active, underlined)
    - `[Activity Log]` (Inactive)
  * **Left Column:**
    - Lead ID: `L-2026-000184`
    - Customer Details:
      * Name: `ZAMZAM HASSAN MOHAMED`
      * Phone: `254729562604`
      * Location: `P.O BOX 105791-00101 NAIROBI`
    - Lead Type: `jhjj`
    - Source: `Referral`
    - Referee: `fff`
    - Priority: `Low`
    - Product Interests: `Savings account`
    - Initiator: `Calendar event`
    - Notes: `6666`
  * **Right Column:**
    - Branch: `Griffindor`
    - Description: `fff`
    - Customer Segment: `Retail`
    - Estimated Value: `KES 6666`
    - Assigned To: `,`
    - Status: `Nurturing` (Purple status badge)
  * **Bottom Button:** "Cancel" (outlined button).
* **Navigation Entry Point:** Screen 4.0 context menu -> "View Details".
* **Navigation Destination:**
  - Clicking `[Activity Log]` tab -> switches view to Screen 4.4.2.
  - Clicking "Cancel" or `(✕)` -> returns to All Leads table (`/myleads`).
* **Forms Involved:** Read-only structured profile layout.
* **Tables/Lists Involved:** Two-column property list.
* **Filters/Search Functionality:** None.
* **Tabs:** Modal internal tabs (`Profile` vs. `Activity Log`).
* **Menus:** None.
* **Popups/Modals:** Two-tab desktop modal dialog over dark backdrop overlay.
* **Important States:** Active tab selection.
* **Dependencies on Another Screen:** Lead record (Screen 2.0), Customer record.

---

### Screen 4.4.2: View Lead Details Activity Log
* **Screen Number:** 4.4.2 (PDF Pages 18–19, Image `img-017.png`)
* **Existing Screen Name:** 4.4.2 Screen Name: View Lead Details Activity log
* **Module:** Sales
* **Submodule:** Leads / Audit & Activity History
* **Purpose:** Inspect the chronological audit trail and activity log of a lead, tracking creations, status transitions, user comments, and actor stamps.
* **Primary User:** Sales Representative, Relationship Manager, Compliance Auditor, Supervisor.
* **Main Actions:**
  1. View sequential activity cards detailing all historical events for the lead.
  2. Switch back to the "Profile" tab (Screen 4.4.1).
  3. Close modal via "Cancel" button or `(✕)` icon.
* **Important Information Displayed:**
  * **Modal Header:** Eye icon, "Lead Details" title, Close `(✕)` button.
  * **Modal Internal Tabs:**
    - `[Profile]` (Inactive)
    - `[Activity Log]` (Active, underlined)
  * **Activity History Stream (3 events displayed):**
    - **Event 1:** Date: `Sep 19, 2026` | Event Title: `Status Updated` | Details: `Status updated by from Warm to Nurturing.` | Comments: `Comments: zzz`
    - **Event 2:** Date: `Sep 19, 2026` | Event Title: `Status Updated` | Details: `Status updated by from Warm to Warm.` | Comments: `Comments: xxx`
    - **Event 3:** Date: `Sep 19, 2026` | Event Title: `Lead Created` | Details: `Lead created by from Referral source.`
  * **Bottom Button:** "Cancel" (outlined button).
* **Navigation Entry Point:** Clicking `[Activity Log]` tab within the Lead Details modal (Screen 4.4.1).
* **Navigation Destination:**
  - Clicking `[Profile]` tab -> switches back to Screen 4.4.1.
  - Clicking "Cancel" or `(✕)` -> returns to All Leads table (`/myleads`).
* **Forms Involved:** None (read-only stream).
* **Tables/Lists Involved:** Timeline card stream of audit log entries.
* **Filters/Search Functionality:** None inside modal.
* **Tabs:** Modal internal tabs (`Profile` vs. `Activity Log`).
* **Menus:** None.
* **Popups/Modals:** Two-tab desktop modal dialog over dark backdrop overlay.
* **Important States:** Populated activity stream vs. empty activity stream.
* **Dependencies on Another Screen:** CRM event store / audit logging engine.

---

### Screen 5.0: Login Page
* **Screen Number:** 5.0 (PDF Page 19, Image `img-018.png`)
* **Existing Screen Name:** 5.0 Login page
* **Module:** Authentication / System
* **Submodule:** Login
* **Purpose:** Authenticate enterprise users into the Kati CRM application via corporate email address and Single Sign-On (SSO).
* **Primary User:** All enterprise users.
* **Main Actions:**
  1. Input corporate email address.
  2. Click "Log In with SSO" to authenticate via enterprise IdP.
  3. Access public links (Privacy Policies, Pricing, Log In).
  4. Dismiss login dialog via `(✕)` icon.
* **Important Information Displayed:**
  * **Header:** Kati CRM logo, "PRIVACY POLICIES", "PRICING", "LOG IN".
  * **Login Dialog:**
    - Dialog Title: "Log In" with Close `(✕)` button
    - Field Label: "EMAIL ADDRESS"
    - Text Input: e.g., `branbs@gmail.comn`
    - Action Button: "Log In with SSO" (prominent solid magenta/red button)
  * **Background Branding:** "built for Customer Excellence!" with channel icons (Phone, SMS, Webchat, Facebook, Email, Instagram, LinkedIn, WhatsApp, Google My Business, TikTok).
* **Navigation Entry Point:** Initial system entry point; session expiration; direct URL access (`dtbafrica.katicrm.com/version-test/`).
* **Navigation Destination:** Successful authentication redirects to Screen 1.0 (Sales Dashboard) or previously requested route.
* **Forms Involved:** SSO login form (email input).
* **Tables/Lists Involved:** None.
* **Filters/Search Functionality:** None.
* **Tabs:** None.
* **Menus:** Public header navigation links.
* **Popups/Modals:** Centered authentication card modal over dark branded background.
* **Important States:** Initial state, input validation error, SSO redirecting.
* **Dependencies on Another Screen:** Enterprise Identity Provider (SAML / OAuth2 / OIDC).

---

### Screen 5.1: User Profile / Company Details
* **Screen Number:** 5.1 (PDF Page 20, Image `img-019.png`)
* **Existing Screen Name:** User profile : / Company Details
* **Module:** System Settings / User Profile
* **Submodule:** Company & Account Settings
* **Purpose:** Manage organizational profile, corporate address, operating currency, API authentication tokens, tax rates, two-factor authentication (2FA), password changes, and personal employee profile details.
* **Primary User:** System Administrator, Sales Manager, Individual User.
* **Main Actions:**
  1. View company branding, phone number, and physical headquarters address.
  2. Select institutional operating currency (`KES ▾`).
  3. Inspect and copy enterprise API key.
  4. Add new tax configuration (`+ Add new Tax`).
  5. Enable Two-Factor Authentication (`Add Second Step`).
  6. Request login password change (`Change`).
  7. Upload employee profile photograph (Cloud upload avatar).
  8. Update personal identity info (First Name, Last Name, Employer Phone, WhatsApp ID).
  9. Toggle left navigation sidebar.
* **Important Information Displayed:**
  * **Global Kati Header:** Kati logo, Search input, Calendar, Notifications (`8`), Online status, Logged-in user pill (`Central Electricals / Branson Allan`), Hamburger drawer toggle.
  * **Left Settings Sidebar:** "Details" tab with map pin icon.
  * **Section: Company Details:**
    - Company Logo: Kati CRM circle
    - Company Name: `Central Electricals`
    - Company Phone number: `079387223`
    - Address: `2009, Strada Universității 5, MD-2009, Chișinău, Moldova`
    - Currency: `KES` (dropdown selector)
    - API Key: `1677317336185x147232494608711680` with help (`?`) and copy icons
  * **Section: Taxes:**
    - Headers: `Taxes name`, `Value`
    - Action: `+ Add new Tax`
  * **Section: Two-Factor Authentication:**
    - Action Button: `Add Second Step` (orange button)
  * **Section: Change Login Password:**
    - Email: `bransontechnologies@outlook.com`
    - Action Button: `Change` (orange button)
  * **Section: User Profile / Personal Info:**
    - Photo upload circle with cloud upload icon
    - First Name: `Branson`
    - Last Name: `Allan`
    - Employer Phone number: `254710928843`
    - Whatsapp ID: `+254710928843`
* **Navigation Entry Point:** Clicking logged-in user pill in top-right application header from any page in the CRM.
* **Navigation Destination:** Return to Sales module via sidebar; logout; 2FA setup flows.
* **Forms Involved:** Company settings form, 2FA configuration form, Password change form, User profile form.
* **Tables/Lists Involved:** Taxes list; API credentials display.
* **Filters/Search Functionality:** None.
* **Tabs:** Left-side settings navigation.
* **Menus:** Sidebar hamburger menu; Currency dropdown.
* **Popups/Modals:** Add Tax modal, 2FA verification modal, Password change dialog.
* **Important States:** 2FA enabled vs. disabled; edit vs. read-only mode.
* **Dependencies on Another Screen:** Core authentication service, Multi-tenant organization store.
