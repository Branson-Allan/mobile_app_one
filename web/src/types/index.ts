export type LeadStatus = 'New' | 'Cold' | 'Warm' | 'Hot' | 'Nurturing' | 'Converted' | 'Lost';

export type LeadPriority = 'Low' | 'Medium' | 'High';

export type CustomerSegment = 'Retail' | 'Corporate' | 'Business';

export interface Assignee {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface ActivityEvent {
  id: string;
  leadId: string;
  timestamp: string;
  relativeTime: string;
  actor: string;
  actorRole: string;
  type: 'CREATED' | 'STATUS_CHANGED' | 'MEETING_SCHEDULED' | 'REASSIGNED' | 'NOTE_ADDED';
  summary: string;
  comment?: string;
  metadata?: Record<string, string>;
}

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  branch: string;
  branchCode: string;
  segment: CustomerSegment;
  productInterests: string[];
  priority: LeadPriority;
  estimatedValue: number;
  currency: string;
  convertedValue?: number;
  assignedTo: Assignee[];
  status: LeadStatus;
  leadSource: string;
  referee?: string;
  initiator: string;
  notes: string;
  createdDate: string;
  cif?: string;
  accountNumber?: string;
}

export interface BankAccount {
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  branch: string;
  branchCode: string;
  status: 'Active' | 'Dormant' | 'Frozen';
  coOwners: string[];
  activeProducts: { id: string; name: string; enrolled: boolean }[];
}

export interface MobileBankingProfile {
  id: string;
  msisdn: string;
  accountNumber: string;
  branch: string;
  branchCode: string;
  pinStatus: 'Active PIN' | 'One Time PIN' | 'Locked';
  registeredDate: string;
}

export interface InsurancePolicy {
  policyNumber: string;
  line: 'GENERAL INSURANCE' | 'LIFE ASSURANCE';
  productName: string;
  insurer: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

export interface CreditCardFacility {
  cardTitle: string;
  maskedPan: string;
  status: 'NORMAL' | 'REPLACED' | 'BLOCKED';
  creditLimit: number;
  currency: string;
  expiry: string;
  cardType: string;
}

export interface Customer360Profile {
  cif: string;
  nationalId: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  email: string;
  altEmail?: string;
  address: string;
  gender: string;
  dob: string;
  age: number;
  nationality: string;
  verified: boolean;
  accounts: BankAccount[];
  mobileProfiles: MobileBankingProfile[];
  policies: InsurancePolicy[];
  creditCards: CreditCardFacility[];
  compliance: {
    kycStatus: 'Passed' | 'Pending Review' | 'Flagged';
    amlRiskScore: 'Low' | 'Medium' | 'High';
    lastVerifiedDate: string;
    pepStatus: boolean;
  };
}

export interface ScheduledMeeting {
  id: string;
  leadId: string;
  customerName: string;
  meetingStatus: string;
  location: string;
  department: string;
  startDateTime: string;
  endDateTime: string;
  resources: string;
  purpose: string;
  description: string;
  calendarName: string;
  staffAssigned: string;
}
