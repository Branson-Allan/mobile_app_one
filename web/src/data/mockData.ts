import { Lead, Customer360Profile, Assignee, ActivityEvent } from '../types';

export const INITIAL_ASSIGNEES: Assignee[] = [
  { id: 'usr-1', name: 'Branson Allann', role: 'Relationship Manager' },
  { id: 'usr-2', name: 'Derrick Ombaki', role: 'Administrator' },
  { id: 'usr-3', name: 'NellyM', role: 'Collections Manager' },
  { id: 'usr-4', name: 'Permission Permission', role: 'System Admin' },
  { id: 'usr-5', name: 'Calendar Event', role: 'Operations Officer' },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'L-2026-000184',
    customerName: 'ZAMZAM HASSAN MOHAMED',
    phone: '+254 712 345 678',
    location: 'P.O BOX 234 50100 KAKAMEGA',
    branch: 'Griffindor Branch',
    branchCode: '042',
    segment: 'Retail',
    productInterests: ['Savings account'],
    priority: 'Low',
    estimatedValue: 6666,
    currency: 'KES',
    convertedValue: 0,
    assignedTo: [INITIAL_ASSIGNEES[0], INITIAL_ASSIGNEES[1]],
    status: 'Warm',
    leadSource: 'Referral',
    referee: 'fff',
    initiator: 'Calendar Event',
    notes: '6666',
    createdDate: '19-Sep-2026',
    cif: '176753'
  },
  {
    id: 'L-2026-000182',
    customerName: 'COLLINS W SAKWA',
    phone: '+254 722 000 111',
    location: 'Nairobi CBD, Kenya',
    branch: 'Ravenclaw Branch',
    branchCode: '038',
    segment: 'Corporate',
    productInterests: ['Salary Account', 'Debit Card'],
    priority: 'Medium',
    estimatedValue: 1000000,
    currency: 'KES',
    convertedValue: 0,
    assignedTo: [INITIAL_ASSIGNEES[3]],
    status: 'Cold',
    leadSource: 'Door to Door',
    initiator: 'Branson Allann',
    notes: 'High potential payroll account transfer.',
    createdDate: '15-Sep-2026',
    cif: '837901'
  },
  {
    id: 'L-2026-000179',
    customerName: 'MATEEN PREMJI',
    phone: '+254 703 133 854',
    location: 'Courtyard Towers, Nairobi',
    branch: 'Courtyard Branch',
    branchCode: '041',
    segment: 'Retail',
    productInterests: ['World Credit Card'],
    priority: 'High',
    estimatedValue: 2000000,
    currency: 'KES',
    convertedValue: 2000000,
    assignedTo: [INITIAL_ASSIGNEES[0]],
    status: 'Converted',
    leadSource: 'Contact Centre',
    initiator: 'Branson Allann',
    notes: 'Existing premier client approved for World Credit facility.',
    createdDate: '01-Sep-2026',
    cif: '837649',
    accountNumber: '5501117002'
  },
  {
    id: 'L-2026-000175',
    customerName: 'VIVIAN ONYANGO',
    phone: '+254 711 999 888',
    location: 'Kisumu City, Kenya',
    branch: 'Ravenclaw Branch',
    branchCode: '038',
    segment: 'Retail',
    productInterests: ['Savings account'],
    priority: 'Low',
    estimatedValue: 20000,
    currency: 'KES',
    convertedValue: 20000,
    assignedTo: [INITIAL_ASSIGNEES[0], INITIAL_ASSIGNEES[2]],
    status: 'New',
    leadSource: 'Website Inquiry',
    initiator: 'System Admin',
    notes: 'Walk-in savings account opening enquiry.',
    createdDate: '26-Aug-2026'
  },
  {
    id: 'L-2026-000171',
    customerName: 'TEST VERTICAL VERTICAL',
    phone: '+254 733 111 222',
    location: 'Mombasa Road, Nairobi',
    branch: 'Courtyard Branch',
    branchCode: '041',
    segment: 'Business',
    productInterests: ['World Credit Card'],
    priority: 'High',
    estimatedValue: 25000,
    currency: 'KES',
    convertedValue: 0,
    assignedTo: [INITIAL_ASSIGNEES[1]],
    status: 'Hot',
    leadSource: 'Contact Centre',
    initiator: 'Derrick Ombaki',
    notes: 'Urgent credit facility evaluation needed.',
    createdDate: '30-Jul-2026'
  },
  {
    id: 'L-2026-000168',
    customerName: 'JEREMIAH VINCENT AKWIRI',
    phone: '+254 799 444 555',
    location: 'Eldoret, Kenya',
    branch: 'Griffindor Branch',
    branchCode: '042',
    segment: 'Retail',
    productInterests: ['Salary Account'],
    priority: 'Low',
    estimatedValue: 1200,
    currency: 'KES',
    convertedValue: 1200,
    assignedTo: [INITIAL_ASSIGNEES[0]],
    status: 'Converted',
    leadSource: 'Referral',
    referee: 'Vincent Akwiri',
    initiator: 'Branson Allann',
    notes: 'Account active and funded.',
    createdDate: '02-Jul-2026'
  },
  {
    id: 'L-2026-000162',
    customerName: 'ANDREW11 DESART',
    phone: '+254 750 800 900',
    location: 'Westlands, Nairobi',
    branch: 'Ravenclaw Branch',
    branchCode: '038',
    segment: 'Retail',
    productInterests: ['Debit Card', 'Savings account'],
    priority: 'Medium',
    estimatedValue: 42542,
    currency: 'USD',
    convertedValue: 0,
    assignedTo: [INITIAL_ASSIGNEES[0], INITIAL_ASSIGNEES[3]],
    status: 'Nurturing',
    leadSource: 'Door to Door',
    initiator: 'Branson Allann',
    notes: 'Foreign currency account requested.',
    createdDate: '30-Jun-2026'
  },
  {
    id: 'L-2026-000155',
    customerName: 'CENTRAL ELECTRICALS LTD',
    phone: '+254 793 872 230',
    location: 'Industrial Area, Nairobi',
    branch: 'Courtyard Branch',
    branchCode: '041',
    segment: 'Corporate',
    productInterests: ['Overdraft Facility'],
    priority: 'High',
    estimatedValue: 5000000,
    currency: 'KES',
    convertedValue: 0,
    assignedTo: [INITIAL_ASSIGNEES[0], INITIAL_ASSIGNEES[2]],
    status: 'Warm',
    leadSource: 'Direct Sales',
    initiator: 'Branson Allann',
    notes: 'Working capital facility discussion ongoing.',
    createdDate: '14-Jun-2026'
  }
];

export const MOCK_CUSTOMER_360: Customer360Profile = {
  cif: '837649',
  nationalId: '36930306',
  fullName: 'MATEEN PREMJI',
  phone: '+254 703 133 854',
  altPhone: '+254 722 999 111',
  email: 'mateen@calltronix.com',
  altEmail: 'mateen.premji@gmail.com',
  address: 'P.O BOX 41829 00100 NAIROBI GPO',
  gender: 'Male',
  dob: '14-May-2000',
  age: 26,
  nationality: 'Kenyan',
  verified: true,
  accounts: [
    {
      accountNumber: '5501117002',
      accountType: 'Salary Account',
      balance: 452300,
      currency: 'KES',
      branch: 'Courtyard Branch',
      branchCode: '041',
      status: 'Active',
      coOwners: ['Sole Account Holder'],
      activeProducts: [
        { id: 'p-1', name: 'Mobile Banking Registration', enrolled: true },
        { id: 'p-2', name: 'Visa Gold Debit Card', enrolled: true },
        { id: 'p-3', name: 'E-Statements Monthly', enrolled: true },
        { id: 'p-4', name: 'SMS Transaction Alerts', enrolled: true },
        { id: 'p-5', name: 'Cheque Book Facility', enrolled: false }
      ]
    },
    {
      accountNumber: '5501117001',
      accountType: 'Current Account (Business)',
      balance: 1280000,
      currency: 'KES',
      branch: 'Nyali Branch',
      branchCode: '038',
      status: 'Active',
      coOwners: ['Premji Holdings Ltd'],
      activeProducts: [
        { id: 'p-1', name: 'Corporate Internet Banking', enrolled: true },
        { id: 'p-2', name: 'Sweeping Facility', enrolled: true },
        { id: 'p-3', name: 'Overdraft Limit KES 500K', enrolled: true }
      ]
    },
    {
      accountNumber: '0837649001',
      accountType: 'DTB Junior Savings',
      balance: 85000,
      currency: 'KES',
      branch: 'Courtyard Branch',
      branchCode: '041',
      status: 'Active',
      coOwners: ['Mateen Premji (Guardian)'],
      activeProducts: [
        { id: 'p-1', name: 'Automated Monthly Standing Order', enrolled: true }
      ]
    }
  ],
  mobileProfiles: [
    {
      id: 'mb-1',
      msisdn: '254703133854',
      accountNumber: '5501117002',
      branch: 'Courtyard Branch',
      branchCode: '041',
      pinStatus: 'Active PIN',
      registeredDate: '12-Jan-2023'
    },
    {
      id: 'mb-2',
      msisdn: '254722999111',
      accountNumber: '5501117001',
      branch: 'Nyali Branch',
      branchCode: '038',
      pinStatus: 'Active PIN',
      registeredDate: '15-Mar-2024'
    },
    {
      id: 'mb-3',
      msisdn: '254700000123',
      accountNumber: '5501117002',
      branch: 'Courtyard Branch',
      branchCode: '041',
      pinStatus: 'One Time PIN',
      registeredDate: '01-Sep-2026'
    }
  ],
  policies: [
    {
      policyNumber: 'B/101/1002/2023/000002/0011/01',
      line: 'GENERAL INSURANCE',
      productName: 'Comprehensive Motor Private Insurance',
      insurer: 'Jubilee Insurance Kenya',
      startDate: '06-Oct-2023',
      expiryDate: '05-Oct-2027',
      status: 'Active'
    },
    {
      policyNumber: 'IL202302360223',
      line: 'LIFE ASSURANCE',
      productName: 'DTB Afya Imara Critical Illness Cover',
      insurer: 'APA Life Assurance',
      startDate: '27-Apr-2023',
      expiryDate: '26-Apr-2028',
      status: 'Active'
    }
  ],
  creditCards: [
    {
      cardTitle: 'World Credit Card (Primary Facility)',
      maskedPan: '5244 06XX XXXX 7240',
      status: 'REPLACED',
      creditLimit: 2000000,
      currency: 'KES',
      expiry: '12/28',
      cardType: 'Mastercard World'
    },
    {
      cardTitle: 'Titanium Credit Card (Replacement Active)',
      maskedPan: '5244 06XX XXXX 0895',
      status: 'NORMAL',
      creditLimit: 2000000,
      currency: 'KES',
      expiry: '08/29',
      cardType: 'Mastercard Titanium'
    }
  ],
  compliance: {
    kycStatus: 'Passed',
    amlRiskScore: 'Low',
    lastVerifiedDate: '15-Aug-2026',
    pepStatus: false
  }
};

export const INITIAL_ACTIVITY_LOGS: ActivityEvent[] = [
  {
    id: 'act-1',
    leadId: 'L-2026-000184',
    timestamp: '19-Sep-2026 06:45 PM',
    relativeTime: '2 hours ago',
    actor: 'Branson Allann',
    actorRole: 'Relationship Manager',
    type: 'STATUS_CHANGED',
    summary: 'Status updated from Warm to Nurturing',
    comment: 'Customer confirmed interest in salary account onboarding.'
  },
  {
    id: 'act-2',
    leadId: 'L-2026-000184',
    timestamp: '19-Sep-2026 04:30 PM',
    relativeTime: '4 hours ago',
    actor: 'Branson Allann',
    actorRole: 'Relationship Manager',
    type: 'MEETING_SCHEDULED',
    summary: 'Meeting scheduled: Salary Account Pitch',
    comment: 'Booked Courtyard Branch Boardroom 1 for 22-Sep-2026.'
  },
  {
    id: 'act-3',
    leadId: 'L-2026-000184',
    timestamp: '19-Sep-2026 02:15 PM',
    relativeTime: '6 hours ago',
    actor: 'Calendar Event',
    actorRole: 'Operations Officer',
    type: 'CREATED',
    summary: 'Lead created via Referral source',
    comment: 'Referred by branch walk-in referee fff.'
  }
];

export const AVAILABLE_BRANCHES = [
  { name: 'Courtyard Branch', code: '041' },
  { name: 'Griffindor Branch', code: '042' },
  { name: 'Ravenclaw Branch', code: '038' },
  { name: 'Nyali Branch', code: '035' },
  { name: 'Westlands Branch', code: '012' }
];

export const AVAILABLE_PRODUCTS = [
  'Salary Account',
  'Savings account',
  'World Credit Card',
  'Titanium Credit Card',
  'Debit Card',
  'Overdraft Facility',
  'Personal Loan',
  'Mortgage Facility',
  'Bancassurance Motor Policy'
];
