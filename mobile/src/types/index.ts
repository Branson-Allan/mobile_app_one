export type LeadStatus =
  | 'New'
  | 'Cold'
  | 'Warm'
  | 'Hot'
  | 'Nurturing'
  | 'Converted'
  | 'Lost';

export type CustomerSegment = 'Retail' | 'Corporate' | 'Business';
export type LeadPriority = 'Low' | 'Medium' | 'High';

export interface Lead {
  id: string; // e.g., 'L-2026-000180'
  customer: string;
  phone: string;
  location: string;
  segment: CustomerSegment;
  productInterest: string;
  priority: LeadPriority;
  potentialValue: number;
  potentialCurrency: string; // 'KES', 'USD'
  assignedTo: string[]; // names of assigned staff
  status: LeadStatus;
  leadSource: string;
  referee?: string;
  convertedValue?: number;
  convertedCurrency?: string;
  createdDate: string;
  notes?: string;
  branch: string;
  initiator: string;
  cif?: string; // Link to customer 360 if existing customer
}

export interface BankAccount {
  accountNumber: string;
  accountClass: string;
  branchName: string;
  branchCode: string;
  hasFdr: boolean;
  status: 'Active' | 'Dormant' | 'Closed';
  coOwners: string[];
  cif: string;
  activeProducts: { name: string; active: boolean }[];
}

export interface MobileBankingProfile {
  accountNumber: string;
  branchName: string;
  branchCode: string;
  pinStatus: 'Active Pin' | 'One Time Pin';
}

export interface BancassurancePolicy {
  policyNumber: string;
  businessLine: 'GENERAL' | 'LIFE';
  expirationDate: string;
  ipenProduct?: string;
  ipenProductType?: string;
}

export interface CreditCardFacility {
  maskedPan: string;
  status: 'Normal' | 'Replaced' | 'Blocked';
  limit: number;
  currency: string;
  originalAmt?: number;
}

export interface ActivityEvent {
  id: string;
  date: string;
  time?: string;
  type: 'Status Updated' | 'Lead Created' | 'Meeting Scheduled' | 'Reassigned';
  title: string;
  detail: string;
  comments?: string;
  author: string;
}

export interface Customer360 {
  cif: string;
  idPassport: string;
  fullName: string;
  gender: string;
  nationality: string;
  dob: string;
  age: number;
  phone: string;
  alternativePhone?: string;
  telephone?: string;
  email: string;
  secondaryEmail?: string;
  address: string;
  customerType: string;
  accounts: BankAccount[];
  mobileBanking: MobileBankingProfile[];
  bancassurance: BancassurancePolicy[];
  creditCards: CreditCardFacility[];
  activityHistory: ActivityEvent[];
  compliance: {
    kycStatus: 'Verified' | 'Pending' | 'Review Required';
    riskRating: 'Low' | 'Medium' | 'High';
    amlChecked: boolean;
  };
  statistics: {
    helpdeskTotal: number;
    helpdeskOpen: number;
    helpdeskDone: number;
    calendarScheduled: number;
    calendarConfirmed: number;
    calendarCancelled: number;
    feedbackCount: number;
    feedbackRating: number;
  };
}

export type MainTab = 'dashboard' | 'leads' | 'customers' | 'more';
export type Customer360Segment = 'accounts' | 'mobileBanking' | 'bancassurance' | 'creditCard';
export type LeadDetailsTab = 'profile' | 'activityLog';
